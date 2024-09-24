import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TypeComponent.css';
import MainBtn from './MainBtn';
import TextComponent from './TextComponent';
import BoxComponent from './BoxComponent';
import mainImg from '../assets/images/mainImg.png';
import lineImg from '../assets/images/lineImg.png';
import UnderlineBtn from './UnderlineBtn';

function TypeComponent({ type, detail }) {
  const navigate = useNavigate();

  const handleAnswerClick = () => {
    navigate('/answer');
  };

  const handleSignupClick = () => {
    navigate('/signuppage');
  };

  const handleWordClick = () => {
    navigate('/word');
  };

  return (
    <div className="typeComponent">
      <UnderlineBtn subText="인터넷 생활 오답노트가 필요하다면," text="해설지 확인" onClick={handleAnswerClick} />
      <div className="typeComponent-content">
        <TextComponent text={type} fontSize="42px" strokeWidth="0.8px" />

        <BoxComponent width="318px" height="270px">
          <img className="mainImg" src={mainImg} width={185} />
        </BoxComponent>

        <TextComponent colorClass="textLightgreen" text={detail} fontSize="24px" strokeWidth="0.1px" />

        <MainBtn text="회원가입" subText="내 나이 인정 못한다면?" onClick={handleSignupClick} />
        <img className="lineImg" src={lineImg} width={318} />
        <MainBtn
          text="신조어 제보"
          subText="요즘은 이런단어 쓴단다 ~"
          width="130px"
          height="48px"
          fontSize="18px"
          onClick={handleWordClick}
        />
      </div>
    </div>
  );
}

export default TypeComponent;
