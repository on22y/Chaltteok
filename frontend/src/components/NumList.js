import React, { useState } from 'react';
import './NumList.css';

// 기본 문제 개수 20개로 설정
function NumList({ totalQuestions = 20, onQuestionClick, selectedQuestion }) {
  // const [selectedQuestion, setSelectedQuestion] = useState(1);

  // const handleClick = (questionNum) => {
  //   setSelectedQuestion(questionNum);
  //   onQuestionClick(questionNum);
  // };

  return (
    <div className="numListContainer">
      {Array.from({ length: totalQuestions }, (_, index) => {
        const questionNum = index + 1;
        const isSelected = questionNum === selectedQuestion; // 현재 선택된 문제 번호인지 확인

        return (
          <div
            key={questionNum}
            className={`numList-Click ${isSelected ? 'selected' : ''}`}
            onClick={() => onQuestionClick(questionNum)}
            style={{ fontSize: `calc(14px * var(--scale))` }}
          >
            {questionNum}
            {/* 문제 번호 클릭 시 호출 */}
          </div>
        );
      })}
    </div>
  );
}

export default NumList;
