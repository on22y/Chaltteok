import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TestComponent from '../components/TestComponent';
import BoxComponent from '../components/BoxComponent';
import InputBox from '../components/InputBox';
import MainBtn from '../components/MainBtn';

function LoggedTest() {
  const totalQuestions = 10; // 총 10문제
  const dataset = Array.from({ length: 250 }, (_, index) => index + 1); // 1~250 문제 데이터셋

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 문제 번호는 0부터 시작
  const [questionNumbers, setQuestionNumbers] = useState([]); // 문제 번호 리스트

  const navigate = useNavigate();

  useEffect(() => {
    // 문제를 랜덤하게 선택하지 않고 순서대로 매김
    const sequentialQuestions = Array.from({ length: totalQuestions }, (_, index) => index + 1);
    setQuestionNumbers(sequentialQuestions); // 1부터 10까지 문제 번호 설정
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } // 다음 문제로 이동
    else {
      // 마지막 문제일 경우 '제출하기' 버튼이 작동
      navigate('/loading');
      setTimeout(() => {
        navigate('/logged/type');
      }, 3000);
    }
  };

  return (
    <div className="testPage">
      <BoxComponent height="533px">
        {questionNumbers.length > 0 && (
          <TestComponent
            num={`Q${currentQuestionIndex + 1}`} // 현재 문제 번호 1부터 시작
            questionNum={questionNumbers[currentQuestionIndex]} // 문제 데이터셋에서 순서대로 가져옴
            onNext={handleNextQuestion} // 다음 문제로 이동
          />
        )}
        <InputBox text="정답을 입력해주세요." />
      </BoxComponent>
      <MainBtn
        text={currentQuestionIndex === questionNumbers.length - 1 ? '제출하기' : '다음문제'}
        subText="못돌아가 히히"
        onClick={handleNextQuestion}
      />
    </div>
  );
}

export default LoggedTest;
