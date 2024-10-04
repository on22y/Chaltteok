import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Test.css';
import TextComponent from '../components/TextComponent';
import TestComponent from '../components/TestComponent';
import BoxComponent from '../components/BoxComponent';
import TextArea from '../components/TextArea';
import MainBtn from '../components/MainBtn';
import axios from 'axios';

function LoggedTest() {
  const totalQuestions = 10;
  const [questions, setQuestions] = useState([]); // 문제 데이터를 저장할 상태
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 문제 번호는 0부터 시작
  const [answer, setAnswer] = useState(''); // 입력한 답변을 저장할 상태
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true); // 질문 로딩 상태
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
      } finally {
        setIsLoadingQuestions(false); // 질문 로딩 상태 해제
      }
    };

    fetchQuestions();
  }, []);

  const handleNextQuestion = async () => {
    // if (answer.trim() === '') {
    //   alert('정답을 입력해주세요!');
    //   return;
    // }
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
        {isLoadingQuestions ? (
          <TextComponent text="Loading questions..." fontSize="24px" shadowSize="2.1px" colorClass="textRed" />
        ) : (
          questions.length > 0 && (
            <TestComponent
              num={`Q${currentQuestionIndex + 1}.`}
              question={questions[currentQuestionIndex]}
              onNext={handleNextQuestion}
            />
          )
        )}
        <TextArea text="정답을 입력해주세요." value={answer} onChange={(e) => setAnswer(e.target.value)} />
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
