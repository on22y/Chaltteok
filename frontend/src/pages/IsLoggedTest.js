import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Test.css';
import TextComponent from '../components/TextComponent';
import TestComponent from '../components/TestComponent';
import BoxComponent from '../components/BoxComponent';
import TextArea from '../components/TextArea';
import MainBtn from '../components/MainBtn';
import axios from 'axios';
import { LoadingContext } from '../components/LoadingContext';

function IsLoggedTest() {
  const totalQuestions = 10;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true); // 질문 로딩 상태
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post('/isLogged/test/calledQuestion', {
          count: totalQuestions,
        });
        setQuestions(response.data.questions);
        localStorage.setItem('isloggedtestQuestions', JSON.stringify(response.data.questions));
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
    const nickname = localStorage.getItem('nickname');
    if (answer.trim()) {
      try {
        startLoading(); // 로딩 시작
        await axios.post('/isLogged/test/submitAnswer', {
          questionId: questions[currentQuestionIndex].id,
          answer: answer,
          nickname: nickname,
        });
        setAnswer('');
      } catch (error) {
        console.error('Error submitting answer:', error);
      } finally {
        stopLoading(); // 로딩 종료
      }
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      startLoading(); // 로딩 시작 (마지막 질문 제출 시)
      navigate('/loading');
      setTimeout(() => {
        stopLoading(); // 로딩 종료
        navigate('/islogged/type');
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

export default IsLoggedTest;
