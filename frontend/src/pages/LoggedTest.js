import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestComponent from '../components/TestComponent';

function LoggedTest() {
  const [currentQuestion, setCurrentQuestion] = useState(1); // 첫 번째 문제부터 시작
  const totalQuestions = 10; // 총 10문제

  const navigate = useNavigate();

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/loading');
      setTimeout(() => {
        navigate('/Logged/type');
      }, 3000);
    }
  };

  return (
    <div className="testPage">
      <TestComponent num={`Q${currentQuestion}`} onNext={handleNextQuestion} />
    </div>
  );
}

export default LoggedTest;
