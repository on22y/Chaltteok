import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Answer.css';
import NumList from '../components/NumList';
import TestComponent from '../components/TestComponent';
import MainBtn from '../components/MainBtn';
import BoxComponent from '../components/BoxComponent';
import trueImg from '../assets/images/trueImg.png';
import AnswerComponent from '../components/AnswerComponent';

function IsLoggedAnswer() {
  const navigate = useNavigate();

  const [questionNumbers, setQuestionNumbers] = useState([]); // 랜덤 문제 번호 배열
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 문제 인덱스

  // useEffect(() => {
  //   // 20개의 랜덤 문제 번호를 선택
  //   const randomNumbers = [];
  //   const totalQuestions = 250; // 데이터셋 전체 개수에 맞게 수정 필요

  //   while (randomNumbers.length < 20) {
  //     const randomNum = Math.floor(Math.random() * totalQuestions) + 1;
  //     if (!randomNumbers.includes(randomNum)) {
  //       randomNumbers.push(randomNum);
  //     }
  //   }

  //   setQuestionNumbers(randomNumbers);
  // }, []);

  useEffect(() => {
    // 로컬 스토리지에서 문제 번호 리스트를 가져옴
    const savedQuestionNumbers = JSON.parse(localStorage.getItem('testQuestionNumbers'));

    if (savedQuestionNumbers && savedQuestionNumbers.length > 0) {
      setQuestionNumbers(savedQuestionNumbers);
    }
  });

  const handleSignupClick = () => {
    navigate('/signuppage');
  };

  const handleGoHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="answerPage">
      <BoxComponent height="604px">
        <NumList totalQuestions={20} />
        {/* <img className="trueImg" src={trueImg} width={86} height={151} /> */}
        {questionNumbers.length > 0 && (
          <TestComponent
            num={`Q${currentQuestionIndex + 1}`} // 현재 문제 번호 1부터 시작
            questionNum={questionNumbers[currentQuestionIndex]} // 저장된 문제 번호에서 가져옴
          />
        )}
        <AnswerComponent />
      </BoxComponent>
      <MainBtn
        text="회원가입"
        subText="홈으로 돌아가기"
        onClick={handleSignupClick}
        onSubTextClick={handleGoHomeClick}
      />
    </div>
  );
}

export default IsLoggedAnswer;
