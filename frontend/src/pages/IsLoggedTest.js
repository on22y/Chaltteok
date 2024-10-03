import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Test.css';
import TestComponent from '../components/TestComponent';
import BoxComponent from '../components/BoxComponent';
import InputBox from '../components/InputBox';
import MainBtn from '../components/MainBtn';
import axios from 'axios';

function IsLoggedTest() {
  const totalQuestions = 10;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
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
        await axios.post('/isLogged/test/submitAnswer', {
          questionId: questions[currentQuestionIndex].id,
          answer: answer,
        });
        setAnswer('');
      } catch (error) {
        console.error('Error submitting answer:', error);
      }
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 마지막 문제일 경우 '제출하기' 버튼이 작동
      navigate('/loading');
      setTimeout(() => {
        navigate('/islogged/type');
      }, 3000);
    }
  };

  return (
    <div className="testPage">
      <BoxComponent height="533px">
        {questions.length > 0 && (
          <TestComponent
            num={`Q${currentQuestionIndex + 1}.`}
            question={questions[currentQuestionIndex]}
            onNext={handleNextQuestion}
          />
        )}
        <InputBox text="정답을 입력해주세요." value={answer} onChange={(e) => setAnswer(e.target.value)} />
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
