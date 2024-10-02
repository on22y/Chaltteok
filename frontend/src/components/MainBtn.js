import React from 'react';
import './MainBtn.css';

function MainBtn({ text, subText, onClick, onSubTextClick, width, height, fontSize, backgroundColor }) {
  const buttonStyle = {
    width: width ? `calc(${width} * var(--scale))` : 'calc(204px * var(--scale))',
    height: height ? `calc(${height} * var(--scale))` : 'calc(72px * var(--scale))',
    fontSize: fontSize ? `calc(${fontSize} * var(--scale))` : 'calc(28px * var(--scale))',
    backgroundColor: backgroundColor || '#6ec207',
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
