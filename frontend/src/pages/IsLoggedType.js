import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './IsLoggedType.css';
import TypeComponent from '../components/TypeComponent';
import UnderlineBtn from '../components/UnderlineBtn';
import MainBtn from '../components/MainBtn';
import lineImg from '../assets/images/lineImg.png';

function IsLoggedType() {
  const [state, setState] = useState('');

  const navigate = useNavigate();

  const handleAnswerClick = () => {
    navigate('/isLogged/answer');
  };

  const handleSignupClick = () => {
    navigate('/signuppage');
  };

  const handleWordClick = () => {
    navigate('/word');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/isLogged/type/getResult');
        const newState = response.data.state || 'default_state'; // 새로운 진단 결과

        setState(newState);

        // 로컬 스토리지에서 이전 진단 결과 불러오기
        const previousState = localStorage.getItem('currentState');

        // 비교 후 저장
        localStorage.setItem('previousState', previousState); // 기존 currentState를 previousState로 이동
        localStorage.setItem('currentState', newState); // 새로운 state를 currentState로 저장
      } catch (error) {
        console.error('Error fetching the state value:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="isLoggedTypePage">
      <UnderlineBtn subText="인터넷 생활 오답노트가 필요하다면," text="해설지 확인" onClick={handleAnswerClick} />

      <div className="isLoggedTypePage-content">
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

        <MainBtn text="회원가입" subText="내 나이 인정 못한다면?" onClick={handleSignupClick} />
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

export default IsLoggedType;
