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
        setState(response.data.state); // response에서 'state'로 받아온 값을 설정
      } catch (error) {
        console.error('Error fetching the type value:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="LoggedTypePage">
      <UnderlineBtn subText="인터넷 생활 오답노트가 필요하다면," text="해설지 확인" onClick={handleLoggedAnswerClick} />

      <div className="LoggedTypePage-textDeco">
        <TextComponent text="여전히" colorClass="textRed" fontSize="28px" strokeWidth="0.5px" />
        <div className="typeComponent-content">
          <img className="textDecoImg" src={textDecoImg} width={100} height={45} />
        </div>
      </div>

      <div className="LoggedTypePage-content">
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

        <MainBtn text="진단 다시하기" subText="여전히 내 나이 인정 못한다면?" onClick={handleLoggedTestClick} />
        <img className="lineImg" src={lineImg} width={318} />
        <MainBtn
          text="신조어 제보"
          subText="요즘은 이런단어 쓴단다 ~"
          width="130px"
          height="48px"
          fontSize="18px"
          onClick={handleWordClick}
        />
      </div>
    </div>
  );
}

export default LoggedType;
