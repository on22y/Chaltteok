import React, { useState, useEffect, useContext } from 'react';
import TextComponent from './TextComponent';
import type1 from '../assets/images/type1.png';
import type2 from '../assets/images/type2.png';
import type3 from '../assets/images/type3.png';
import type4 from '../assets/images/type4.png';
import type5 from '../assets/images/type5.png';
import type6 from '../assets/images/type6.jpg';
import { LoadingContext } from '../components/LoadingContext';

function TypeComponent({ state, detail }) {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [imageLoaded, setImageLoaded] = useState(false);

  let imgSrc;
  switch (state) {
    case '잼민이':
      imgSrc = type1;
      break;
    case 'K-고딩':
      imgSrc = type6;
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
  }

  // 이미지가 로드되면 로딩을 멈춤
  const handleImageLoad = () => {
    setImageLoaded(true);
    stopLoading();
  };

  return (
    <div className="typeComponent">
      <TextComponent text={`당신은 '${state}'!`} fontSize="42px" shadowSize="3.2px" />

      {!imageLoaded && <TextComponent text="Loading image..." fontSize="18px" shadowSize="1.9px" />}
      <img className="imgComponent" src={imgSrc} width={198} alt={state} onLoad={handleImageLoad} />

      <TextComponent colorClass="textLightgreen" text={detail} fontSize="24px" shadowSize="2.1px" />
    </div>
  );
}

export default TypeComponent;
