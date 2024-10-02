import React from 'react';
import './Loading.css';
import loadingImg from '../assets/images/loadingImg.png';
import TextComponent from '../components/TextComponent';

function Loading() {
  return (
    <div className="loadingPage">
      <img className="loadingImg" src={loadingImg} width={198} />
      <TextComponent
        text={
          <>
            인터넷 나이
            <br />
            계산중
            <br />
            .........
          </>
        }
        fontSize="42px"
        strokeWidth="2px"
      />
    </div>
  );
}

export default Loading;
