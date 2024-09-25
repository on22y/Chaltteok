import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Answer.css';
import NumList from '../components/NumList';
import TestComponent from '../components/TestComponent';
import MainBtn from '../components/MainBtn';
import BoxComponent from '../components/BoxComponent';

function IsLoggedAnswer() {
  const navigate = useNavigate();

  const [questionNumbers, setQuestionNumbers] = useState([]); // 랜덤 문제 번호 배열
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 문제 인덱스

  useEffect(() => {
    // 20개의 랜덤 문제 번호를 선택
    const randomNumbers = [];
    const totalQuestions = 250; // 데이터셋 전체 개수에 맞게 수정 필요

    while (randomNumbers.length < 20) {
      const randomNum = Math.floor(Math.random() * totalQuestions) + 1;
      if (!randomNumbers.includes(randomNum)) {
        randomNumbers.push(randomNum);
      }
    }

    setQuestionNumbers(randomNumbers);
  }, []);

  const handleSignupClick = () => {
    navigate('/signuppage');
  };
  return (
    <div className="answerPage">
      <BoxComponent height="604px">
        <NumList totalQuestions={20} />
        <TestComponent num={`Q${questionNumbers[currentQuestionIndex]}`} />
      </BoxComponent>
      <MainBtn text="회원가입" subText="홈으로 돌아가기" onClick={handleSignupClick} />
    </div>
  );
}

export default IsLoggedAnswer;
