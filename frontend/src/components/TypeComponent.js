import React, { useState, useEffect, useContext } from 'react';
import TextComponent from './TextComponent';
import type1 from '../assets/images/type1.png';
import type2 from '../assets/images/type2.png';
import type3 from '../assets/images/type3.png';
import type4 from '../assets/images/type4.png';
import type5 from '../assets/images/type5.png';
import type6 from '../assets/images/type6.png';
import statetype1 from '../assets/images/statetype1.png';
import statetype2 from '../assets/images/statetype2.png';
import statetype3 from '../assets/images/statetype3.png';
import statetype4 from '../assets/images/statetype4.png';
import statetype5 from '../assets/images/statetype5.png';
import statetype6 from '../assets/images/statetype6.png';
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

  let stateImgSrc;
  switch (state) {
    case '잼민이':
      stateImgSrc = statetype1;
      break;
    case 'K-고딩':
      stateImgSrc = statetype2;
      break;
    case '샌애기':
      stateImgSrc = statetype3;
      break;
    case '화석':
      stateImgSrc = statetype4;
      break;
    case '삼촌':
      stateImgSrc = statetype5;
      break;
    case '아재':
      stateImgSrc = statetype6;
      break;
  }

  // 이미지가 로드되면 로딩을 멈춤
  const handleImageLoad = () => {
    setImageLoaded(true);
    stopLoading();
  };

  return (
    <div className="typeComponent">
      <img className="stateImgComponent" src={stateImgSrc} width={365} alt={state} onLoad={handleImageLoad} />

      {!imageLoaded && <TextComponent text="Loading image..." fontSize="18px" shadowSize="1.9px" />}
      <img className="imgComponent" src={imgSrc} width={198} alt={state} onLoad={handleImageLoad} />

      <TextComponent colorClass="textLightgreen" text={detail} fontSize="24px" shadowSize="2.1px" />
    </div>
  );
}

export default TypeComponent;
