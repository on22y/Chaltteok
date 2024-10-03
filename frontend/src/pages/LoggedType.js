import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoggedType.css';
import TextComponent from '../components/TextComponent';
import TypeComponent from '../components/TypeComponent';
import UnderlineBtn from '../components/UnderlineBtn';
import MainBtn from '../components/MainBtn';
import lineImg from '../assets/images/lineImg.png';
import textDecoImg from '../assets/images/textDecoImg.png';

function LoggedType() {
  const [state, setState] = useState('');
  const [showTextDeco, setShowTextDeco] = useState(false); // 텍스트와 이미지 표시 여부

  const navigate = useNavigate();

  const handleLoggedAnswerClick = () => {
    navigate('/Logged/answer');
  };

  const handleLoggedTestClick = () => {
    navigate('/Logged/test');
  };

  const handleWordClick = () => {
    navigate('/word');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/Logged/type/getResult');
        const newState = response.data.state; // 서버에서 새로운 진단 결과 받아옴
        setState(newState);

        // 로컬 스토리지에서 이전 진단 결과 불러오기
        const previousState = localStorage.getItem('currentState');

        // 비교: 가장 최근의 결과와 바로 직전 결과가 동일한지 확인
        if (previousState && previousState === newState) {
          setShowTextDeco(true); // 동일할 경우 텍스트 및 이미지 표시
        } else {
          setShowTextDeco(false); // 다를 경우 비표시
        }

        // 현재 상태를 로컬 스토리지에 저장, 다음 번 진단에서 비교하기 위해 이전 상태로 사용됨
        localStorage.setItem('previousState', previousState); // 기존 currentState를 previousState로 이동
        localStorage.setItem('currentState', newState); // 새로운 state를 currentState로 저장
      } catch (error) {
        console.error('Error fetching the type value:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="LoggedTypePage">
      <UnderlineBtn subText="인터넷 생활 오답노트가 필요하다면," text="해설지 확인" onClick={handleLoggedAnswerClick} />

      <div className="LoggedTypePage-content">
        <div className="stateWithTextDeco">
          {showTextDeco && ( // 이전과 동일한 경우에만 표시
            <div className="LoggedTypePage-textDeco">
              <TextComponent text="여전히" colorClass="textRed" fontSize="28px" shadowSize="2.2px" />
              <div className="typeComponent-content">
                <img className="textDecoImg" src={textDecoImg} width={100} height={45} />
              </div>
            </div>
          )}

          <TypeComponent
            state={state}
            detail={
              <>
                당장 주변 고등학교로 뛰어가서
                <br />
                즐거운 대화를 나누세요.
              </>
            }
          />
        </div>

        <MainBtn text="진단 다시하기" subText="여전히 내 나이 인정 못한다면?" onClick={handleLoggedTestClick} />
        <img className="lineImg" src={lineImg} width={318} />
        <MainBtn
          text="신조어 제보"
          subText="요즘은 이런단어 쓴단다 ~"
          width="130px"
          height="48px"
          fontSize="18px"
          shadowSize={1.9}
          onClick={handleWordClick}
        />
      </div>
    </div>
  );
}

export default LoggedType;
