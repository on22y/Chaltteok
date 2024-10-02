import React from 'react';
import './NumList.css';

// 기본 문제 개수 20개로 설정
function NumList({ totalQuestions = 20, onQuestionClick }) {
  return (
    <div className="numListContainer">
      {Array.from({ length: totalQuestions }, (_, index) => {
        const questionNum = index + 1;

        return (
          <div
            key={questionNum}
            className="numList-Click"
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
