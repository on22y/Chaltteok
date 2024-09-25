import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestComponent.css';
import MainBtn from './MainBtn';
import BoxComponent from './BoxComponent';
import TextComponent from './TextComponent';
import InputBox from './InputBox';

function TestComponent({ num }) {
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    // 3초 동안 로딩 페이지 표시
    navigate('/loading');

    // 3초 후에 결과 페이지로 이동
    setTimeout(() => {
      navigate('/type');
    }, 3000);
  };

  return (
    <div className="testComponent">
      <BoxComponent height="533px">
        <div className="questionContent">
          <TextComponent text={num} fontSize="64px" strokeWidth="1px" />
          <div className="question">
            다음 대화를 보고, 녹색 대화창의 <br />
            의미를 작성하시오.
          </div>
        </div>

        <div className="chatContainer">
          <div className="chatBubble leftBubble">왼쪽 채팅</div>
          <div className="chatBubble rightBubble">오른쪽 채팅</div>
        </div>

        <InputBox text="정답을 입력해주세요." />
      </BoxComponent>
      <MainBtn text="다음문제" subText="못돌아가 히히" onClick={handleNextQuestion} />
    </div>
  );
}

export default TestComponent;
