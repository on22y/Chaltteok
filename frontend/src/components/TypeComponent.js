import React from 'react';
import TextComponent from './TextComponent';
import mainImg from '../assets/images/mainImg.png';

function TypeComponent({ type, detail }) {
  return (
    <div className="typeComponent">
      <TextComponent text={type} fontSize="42px" />

      <img className="mainImg" src={mainImg} width={198} />

      <TextComponent colorClass="textLightgreen" text={detail} fontSize="24px" strokeWidth="0.5px" />
    </div>
  );
}

export default TypeComponent;
