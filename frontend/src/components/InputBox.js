import React from 'react';
import './InputBox.css';

function InputBox({ text }) {
  return (
    <div className="inputBoxContainer">
      <input type="text" placeholder={text} />
    </div>
  );
}

export default InputBox;
