import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MypageComponent.css';
import MainBtn from './MainBtn';
import TextComponent from './TextComponent';
import BoxComponent from './BoxComponent';
import mainImg from '../assets/images/mainImg.png';
import lineImg from '../assets/images/lineImg.png';
import UnderlineBtn from './UnderlineBtn';
import mypageImg from '../assets/images/mypageImg.png';

function MypageComponent({ type, detail1, detail2 }) {
  const navigate = useNavigate();

  const handleAnswerClick = () => {
    navigate('/answer');
  };

  const handleTestClick = () => {
    navigate('/test');
  };

  const handleWordClick = () => {
    navigate('/word');
  };

  return (
    <div className="mypageComponent">
      <UnderlineBtn subText="인터넷 생활 오답노트가 필요하다면," text="해설지 확인" onClick={handleAnswerClick} />

      <div className="mypage-textDeco">
        <TextComponent text="여전히" colorClass="textRed" fontSize="28px" strokeWidth="0.2px" />
        <div className="typeComponent-content">
          <img className="mypageImg" src={mypageImg} width={100} height={45} />
        </div>
      </div>

      <TextComponent text={type} fontSize="42px" strokeWidth="0.8px" />

      <div className="mypageComponent-content">
        <BoxComponent width="318px" height="270px">
          <img className="mainImg" src={mainImg} width={185} />
        </BoxComponent>

        <TextComponent colorClass="textLightgreen" text={detail1} fontSize="24px" strokeWidth="0.1px" />
        <TextComponent colorClass="textLightgreen" text={detail2} fontSize="24px" strokeWidth="0.1px" />

        <MainBtn text="진단 다시하기" subText="여전히 내 나이 인정 못한다면?" onClick={handleTestClick} />
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

export default MypageComponent;
