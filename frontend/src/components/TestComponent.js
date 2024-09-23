import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestComponent.css';
import MainBtn from '../components/MainBtn';
import BoxComponent from '../components/BoxComponent';
import TextComponent from '../components/TextComponent';
import InputBox from '../components/InputBox';

function TestComponent(num) {
  return (
    <div className="testComponent">
      <BoxComponent height="660px">
        <TextComponent text={num} fontSize="64px" strokeWidth="1px" />
        <div className="question">다음 대화를 보고, 녹색 대화창의 의미를 작성하시오.</div>

        <div className="chatContainer">
          <div className="chatBubble greenBubble">니 오늘 왤케 꾸꾸꾸임?</div>
          <div className="chatBubble grayBubble">
            어 여기 ○○이 출몰지역이라 신경써야댐
            <br />
          </div>
          <small>*○○이 = 전애인</small>
        </div>

        <InputBox text="정답을 입력해주세요." />
      </BoxComponent>
      <MainBtn text="다음문제" subText="못돌아가 히히" />
    </div>
  );
}

export default TestComponent;
