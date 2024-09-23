import React from 'react';
import './MainBtn.css';

function MainBtn({ text, subText, onClick }) {
  return (
    <div className="mainBtnContainer">
      <button type="submit" className="mainBtn" onClick={onClick}>
        {text}
      </button>
      <div className="mainBtnsubText">{subText}</div>
    </div>
  );
}

export default MainBtn;
