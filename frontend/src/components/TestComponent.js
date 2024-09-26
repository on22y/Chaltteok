import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios를 import
import './TestComponent.css';
import MainBtn from './MainBtn';
import BoxComponent from './BoxComponent';
import TextComponent from './TextComponent';
import InputBox from './InputBox';

function TestComponent({ questionNum, num, onNext }) {
  const [leftChat, setLeftChat] = useState('');
  const [rightChat, setRightChat] = useState('');
  const [chatValue, setChatValue] = useState(''); // value 값을 저장할 state

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.post('/Logged/test/calledQuestion', {
          num: questionNum, // 여전히 DB의 문제 번호에 따라 데이터를 불러옴
        });
        setLeftChat(response.data.text1);
        setRightChat(response.data.text2);
        setChatValue(response.data.value);
      } catch (error) {
        console.error('Error fetching the question data:', error);
      }
    };

    fetchQuestion();
  }, [questionNum]); // questionNum이 바뀔 때마다 새 데이터를 불러옴

  return (
    <div className="testComponent">
      {/* <BoxComponent height="533px"> */}
      <div className="questionContent">
        <TextComponent text={num} fontSize="64px" strokeWidth="3px" />
        <div className="question">
          다음 대화를 보고, 녹색 대화창의 <br />
          의미를 작성하시오.
        </div>
      </div>

      <div className="chatContainer">
        <div className={`chatBubble leftBubble ${chatValue === 'R' ? 'greenBubble' : ''}`}>{leftChat}</div>
        <div className={`chatBubble rightBubble ${chatValue === 'L' ? 'greenBubble' : ''}`}>{rightChat}</div>
      </div>

      {/* <InputBox text="정답을 입력해주세요." />
      </BoxComponent>
      <MainBtn text="다음문제" subText="못돌아가 히히" onClick={onNext} /> */}
    </div>
  );
}

export default TestComponent;
