import React from 'react';
import './MainBtn.css';

function MainBtn({ text, subText, onClick, width, height, fontSize }) {
  const buttonStyle = {
    width: width || '204px', // width가 props로 전달되면 그 값을 사용하고, 없으면 기본값 200px
    height: height || '72px', // height가 props로 전달되면 그 값을 사용하고, 없으면 기본값 50px
    fontSize: fontSize || '28px', // fontSize가 전달되지 않으면 기본값 28px
  };

  return (
    <div className="mainBtnContainer">
      <button type="submit" className="mainBtn" onClick={onClick} style={buttonStyle}>
        {text}
      </button>
      <div className="mainBtnsubText">{subText}</div>
    </div>
  );
}

export default MainBtn;
