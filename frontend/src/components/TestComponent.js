import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TestComponent.css';
import TextComponent from './TextComponent';

function TestComponent({ num, questionNum }) {
  // 채팅 데이터를 담을 state
  const [leftChat, setLeftChat] = useState('');
  const [rightChat, setRightChat] = useState('');
  const [chatValue, setChatValue] = useState(''); // value 값을 저장할 state

  // // 백엔드로부터 데이터를 불러오는 함수
  // useEffect(() => {
  //   // 1 ~ 20번 중 랜덤으로 문제 번호 선택
  //   const randomQuestionNum = Math.floor(Math.random() * 20) + 1;
  //   setRandomNum(randomQuestionNum); // 선택된 번호를 상태에 저장

  //   const fetchQuestion = async () => {
  //     try {
  //       const response = await axios.post('/Logged/test/calledQuestion', {
  //         num: randomQuestionNum, // 랜덤 문제 번호로 요청
  //       });
  //       setLeftChat(response.data.text1); // 왼쪽 채팅에 text1 설정
  //       setRightChat(response.data.text2); // 오른쪽 채팅에 text2 설정
  //       setChatValue(response.data.value); // DB에서 받아온 value 값 설정
  //     } catch (error) {
  //       console.error('Error fetching the question data:', error);
  //     }
  //   };

  //   fetchQuestion(); // 컴포넌트가 마운트될 때 데이터 불러오기
  // }, []);

  // const handleNextQuestion = () => {
  //   // 3초 동안 로딩 페이지 표시
  //   navigate('/loading');

  //   // 3초 후에 결과 페이지로 이동
  //   setTimeout(() => {
  //     navigate('/logged/type');
  //   }, 3000);
  // };

  // 서버에서 받아오는 문제 데이터(랜덤 생성 완료)를 순차적으로 가져옴
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.post('/Logged/test/calledQuestion', {
          num: questionNum, // 순차적으로 전달받은 문제 번호로 요청
        });
        setLeftChat(response.data.text1);
        setRightChat(response.data.text2);
        setChatValue(response.data.value);
      } catch (error) {
        console.error('Error fetching the question data:', error);
      }
    };

    fetchQuestion();
  }, [questionNum]);

  return (
    <div className="testComponent">
      <div className="questionContent">
        <TextComponent text={num} fontSize="64px" strokeWidth="1px" />
        <div className="question">
          다음 대화를 보고, 녹색 대화창의 <br />
          의미를 작성하시오.
        </div>
      </div>

      <div className="chatContainer">
        <div className={`chatBubble leftBubble ${chatValue === 'R' ? 'greenBubble' : ''}`}>{leftChat}</div>
        <div className={`chatBubble rightBubble ${chatValue === 'L' ? 'greenBubble' : ''}`}>{rightChat}</div>
      </div>
    </div>
  );
}

export default TestComponent;
