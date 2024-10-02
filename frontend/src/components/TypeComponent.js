import React from 'react';
import TextComponent from './TextComponent';
import mainImg from '../assets/images/mainImg.png';
import type1 from '../assets/images/type1.png';
import type2 from '../assets/images/type2.png';
import type3 from '../assets/images/type3.png';
import type4 from '../assets/images/type4.png';
import type5 from '../assets/images/type5.png';

function TypeComponent({ type, detail }) {
  let imgSrc;
  switch (type) {
    case '잼민이':
      imgSrc = type1;
      break;
    case '샌애기':
      imgSrc = type2;
      break;
    case '화석':
      imgSrc = type3;
      break;
    case '삼촌':
      imgSrc = type4;
      break;
    case '아재':
      imgSrc = type5;
      break;
    default:
      imgSrc = mainImg;
  }

  return (
    <div className="typeComponent">
      <TextComponent text={type} fontSize="42px" />

      <img className="imgComponent" src={imgSrc} width={198} alt={type} />

      <TextComponent colorClass="textLightgreen" text={detail} fontSize="24px" strokeWidth="0.5px" />
    </div>
  );
}

export default TypeComponent;
