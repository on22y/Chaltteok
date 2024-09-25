import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TestComponent from '../components/TestComponent';

function IsLoggedTest() {
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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionNumbers.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/loading');
      setTimeout(() => {
        navigate('/isLogged/type'); // 20문제가 끝나면 결과 페이지로 이동
      }, 3000);
    }
  };

  return (
    <div className="testPage">
      {questionNumbers.length > 0 && (
        <TestComponent num={`Q${questionNumbers[currentQuestionIndex]}`} onNext={handleNextQuestion} />
      )}
    </div>
  );
}

export default IsLoggedTest;
