import React from 'react';
import './Loding.css';
import mainImg from '../assets/images/mainImg.png';
import TextComponent from '../components/TextComponent';

function Loding() {
  return (
    <div className="lodingPage">
      <img className="mainImg" src={mainImg} width={185} />
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
      />
    </div>
  );
}

export default Loding;
