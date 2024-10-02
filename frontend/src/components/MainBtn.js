import React from 'react';
import './MainBtn.css';

function MainBtn({ text, subText, onClick, onSubTextClick, width, height, fontSize }) {
  const buttonStyle = {
    width: width ? `calc(${width} * var(--scale))` : 'calc(204px * var(--scale))',
    height: height ? `calc(${height} * var(--scale))` : 'calc(72px * var(--scale))',
    fontSize: fontSize ? `calc(${fontSize} * var(--scale))` : 'calc(28px * var(--scale))',
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
