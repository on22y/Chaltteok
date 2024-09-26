import React from 'react';
import './MainBtn.css';

function MainBtn({ text, subText, onClick, onSubTextClick, width, height, fontSize }) {
  const buttonStyle = {
    width: width || '204px',
    height: height || '72px',
    fontSize: fontSize || '28px',
  };

  return (
    <div className="mainBtnContainer">
      <button type="submit" className="mainBtn" onClick={onClick} style={buttonStyle}>
        {text}
      </button>
      <div className="mainBtnsubText" onClick={onSubTextClick} style={{ cursor: 'pointer' }}>
        {subText}
      </div>
    </div>
  );
}

export default MainBtn;
