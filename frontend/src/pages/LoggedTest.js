import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Test.css';
import TestComponent from '../components/TestComponent';
import BoxComponent from '../components/BoxComponent';
import InputBox from '../components/InputBox';
import MainBtn from '../components/MainBtn';

function LoggedTest() {
  const navigate = useNavigate();

  const totalQuestions = 10; // 총 10문제를 불러옴
  const dataset = Array.from({ length: 250 }, (_, index) => index + 1); // 1~250의 문제 데이터셋 (**데이터셋 수에 맞게 수정 필요)

  const [questionNumbers, setQuestionNumbers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 문제 번호를 랜덤하게 선택하여 출력
  useEffect(() => {
    const randomQuestions = [];
    while (randomQuestions.length < totalQuestions) {
      const randomNum = Math.floor(Math.random() * dataset.length);
      const selectedQuestion = dataset[randomNum];

      if (!randomQuestions.includes(selectedQuestion)) {
        randomQuestions.push(selectedQuestion);
      }
    }
    setQuestionNumbers(randomQuestions); // 랜덤으로 선택된 문제 번호 설정
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionNumbers.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/loading');
      setTimeout(() => {
        navigate('/Logged/type');
      }, 3000);
    }
  };

  return (
    <div className="testPage">
      {/* <BoxComponent height="533px"> */}
      {questionNumbers.length > 0 && (
        <TestComponent
          num={`Q${currentQuestionIndex + 1}.`}
          questionNum={questionNumbers[currentQuestionIndex]} // 실제 문제 번호는 랜덤
          onNext={handleNextQuestion}
        />
      )}

      {/* <InputBox text="정답을 입력해주세요." />
      </BoxComponent>
      <MainBtn
        text={currentQuestionIndex === questionNumbers.length - 1 ? '제출하기' : '다음문제'}
        subText="못돌아가 히히"
        onClick={handleNextQuestion}
      /> */}

      {/* <MainBtn text="다음문제" subText="못돌아가 히히" onClick={handleNextQuestion} /> */}
    </div>
  );
}

export default LoggedTest;
