import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Test.css';
import TestComponent from '../components/TestComponent';
import BoxComponent from '../components/BoxComponent';
import InputBox from '../components/InputBox';
import MainBtn from '../components/MainBtn';
import axios from 'axios';

function LoggedTest() {
  const totalQuestions = 10;
  const [questions, setQuestions] = useState([]); // 문제 데이터를 저장할 상태
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 문제 번호는 0부터 시작
  const [answer, setAnswer] = useState(''); // 입력한 답변을 저장할 상태
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드에서 랜덤으로 문제 가져오기
    const fetchQuestions = async () => {
      try {
        const response = await axios.post('/Logged/test/calledQuestion', {
          count: totalQuestions, // 총 10개의 문제를 요청
        });
        setQuestions(response.data.questions);
        // 로컬 스토리지에 문제 저장
        localStorage.setItem('loggedtestQuestions', JSON.stringify(response.data.questions));
      } catch (error) {
        console.error('Error fetching the question data:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleNextQuestion = async () => {
    // 현재 문제에 대한 답변 제출
    if (answer.trim()) {
      try {
        await axios.post('/Logged/test/submitAnswer', {
          questionId: questions[currentQuestionIndex].id,
          answer: answer,
        });
        setAnswer(''); // 답변 초기화
      } catch (error) {
        console.error('Error submitting answer:', error);
      }
    }

    // 다음 문제로 이동
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 마지막 문제일 경우 '제출하기' 버튼이 작동
      navigate('/logged/loading');
      setTimeout(() => {
        navigate('/logged/type');
      }, 3000);
    }
  };

  return (
    <div className="testPage">
      <BoxComponent height="533px">
        {questions.length > 0 && (
          <TestComponent
            num={`Q${currentQuestionIndex + 1}.`} // 현재 문제 번호 1부터 시작
            question={questions[currentQuestionIndex]} // 백엔드에서 받은 문제 데이터 전달
            onNext={handleNextQuestion} // 다음 문제로 이동
          />
        )}
        <InputBox
          text="정답을 입력해주세요."
          value={answer} // 입력된 답변 전달
          onChange={(e) => setAnswer(e.target.value)} // 답변 입력 시 상태 업데이트
        />
      </BoxComponent>
      <MainBtn
        text={currentQuestionIndex === questions.length - 1 ? '제출하기' : '다음문제'}
        subText="못돌아가 히히"
        onClick={handleNextQuestion}
      />
    </div>
  );
}

export default LoggedTest;
