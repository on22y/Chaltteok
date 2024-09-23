import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import MainBtn from '../components/MainBtn';
import BoxComponent from '../components/BoxComponent';
import TextComponent from '../components/TextComponent';
import mainImg from '../assets/images/mainImg.png';
import UnderlineBtn from '../components/UnderlineBtn';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleTest = () => {
    navigate('/test');
  };

  return (
    <div className="homePage">
      <UnderlineBtn subText="테스트 경험이 있다면!" text="로그인" onClick={handleLogin} />
      <div className="homePage-content">
        <BoxComponent height="527px">
          <TextComponent text="인터넷나이" fontSize="64px" strokeWidth="1px" />
          <TextComponent text="테스트" strokeWidth="0.8px" colorClass="textLightgreen" fontSize="42px" />

          <img className="mainImg" src={mainImg} width={185} />

          <TextComponent
            text="당신이 살고 있을"
            colorClass="textYellow"
            fontSize="24px"
            strokeWidth="0.1px"
            style={{ marginTop: '10px' }}
          />
          <TextComponent
            text="인터넷 세상의 나이를 찾아서..."
            colorClass="textYellow"
            fontSize="24px"
            strokeWidth="0.1px"
            style={{ marginTop: '10px' }}
          />
        </BoxComponent>
        <MainBtn text="진단하기" subText="지금까지 ___명이 참여했어요" onClick={handleTest} />
      </div>
    </div>
  );
}

export default Home;
