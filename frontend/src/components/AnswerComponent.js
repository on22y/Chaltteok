import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnswerComponent.css';
import TextComponent from './TextComponent';
import BoxComponent from './BoxComponent';

function AnswerComponent({ num, questionNum }) {
  // 채팅 데이터를 담을 state
  const [leftChat, setLeftChat] = useState('');
  const [rightChat, setRightChat] = useState('');
  const [chatValue, setChatValue] = useState(''); // value 값을 저장할 state

  // 서버에서 받아오는 문제 데이터에 맞는 해설 데이터(랜덤 생성 완료)를 순차적으로 가져옴
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
    <div className="answerComponent">
      <TextComponent text="해설" fontsize="32px" strokeWidth="1px" colorClass="textPink" />
      <BoxComponent></BoxComponent>
    </div>
  );
}

export default AnswerComponent;
