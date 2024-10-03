import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Answer.css';
import axios from 'axios';
import NumList from '../components/NumList';
import TestComponent from '../components/TestComponent';
import MainBtn from '../components/MainBtn';
import BoxComponent from '../components/BoxComponent';
import trueImg from '../assets/images/trueImg.png';
import AnswerComponent from '../components/AnswerComponent';
import CustomLeftArrowIcon from '../components/CustomLeftArrowIcon';
import CustomRightArrowIcon from '../components/CustomRightArrowIcon';

function IsLoggedAnswer() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]); // 문제 데이터 배열
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 문제 인덱스
  const [selectedQuestion, setSelectedQuestion] = useState(1); // 선택된 문제 번호

  const [word, setWord] = useState(''); // 신조어 단어
  const [about_word, setAbout_Word] = useState(''); // 신조어 단어 해설
  const [answer, setAnswer] = useState(''); // 정답 문장

  // 로컬 스토리지에서 문제 리스트를 가져옴
  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('isloggedtestQuestions'));

    if (savedQuestions && savedQuestions.length > 0) {
      setQuestions(savedQuestions);
    }
  }, []); // 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행

  // 해당 문제의 해설 데이터를 서버에서 가져옴
  useEffect(() => {
    const fetchAnswerData = async () => {
      try {
        const response = await axios.post('/IsLogged/answer', {
          num: questions[currentQuestionIndex]?.num, // 문제 번호로 해설 데이터 요청
        });
        setWord(response.data.word);
        setAbout_Word(response.data.about_word);
        setAnswer(response.data.answer);
      } catch (error) {
        console.error('Error fetching the answer data:', error);
      }
    };

    if (questions.length > 0) {
      fetchAnswerData();
    }
  }, [currentQuestionIndex, questions]);

  const handleQuestionClick = (questionNum) => {
    setCurrentQuestionIndex(questionNum - 1); // 클릭한 문제 번호로 currentQuestionIndex 업데이트
    setSelectedQuestion(questionNum); // 선택된 문제 번호 업데이트
  };

  const handleLeftArrowClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedQuestion(currentQuestionIndex); // selectedQuestion과 동기화
    }
  };

  const handleRightArrowClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedQuestion(currentQuestionIndex + 2); // selectedQuestion과 동기화
    }
  };

  const handleSignupClick = () => {
    navigate('/signuppage');
  };

  const handleGoHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="answerPage">
      <BoxComponent height="604px">
        <div className="numListWithArrows">
          <div onClick={handleLeftArrowClick} style={{ cursor: 'pointer' }}>
            <CustomLeftArrowIcon />
          </div>
          <NumList
            totalQuestions={questions.length}
            onQuestionClick={handleQuestionClick}
            selectedQuestion={selectedQuestion}
          />
          <div onClick={handleRightArrowClick} style={{ cursor: 'pointer' }}>
            <CustomRightArrowIcon />
          </div>
        </div>
        {/* <img className="trueImg" src={trueImg} width={86} height={151} /> */}
        {questions.length > 0 && (
          <>
            <TestComponent
              num={`Q${currentQuestionIndex + 1}.`} // 현재 문제 번호 1부터 시작
              question={questions[currentQuestionIndex]} // 저장된 문제에서 가져옴
            />
            <AnswerComponent word={word} about_word={about_word} answer={answer} />
          </>
        )}
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
