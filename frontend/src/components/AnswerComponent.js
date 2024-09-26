import React, { useState, useEffect } from 'react';
import './AnswerComponent.css';
import TextComponent from './TextComponent';
import BoxComponent from './BoxComponent';

function AnswerComponent({ word, about_word, answer }) {
  return (
    <div className="answerComponent">
      <TextComponent text="해설" fontSize="32px" strokeWidth="0.5px" colorClass="textPink" />
      <BoxComponent width="318px" height="177px">
        <div className="solution">
          <div className="solution-main">핵심 단어 - {word}</div>
          <div className="solution-sub">{about_word}</div>

          <div className="solution-main">
            정답 문장 <br />
          </div>
          <div className="solution-sub">{answer}</div>
        </div>
      </BoxComponent>
    </div>
  );
}

export default AnswerComponent;
