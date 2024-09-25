import React from 'react';
import './NumList.css';

// 기본 문제 개수 20개로 설정
function NumList({ totalQuestions = 20, onQuestionClick }) {
  return (
    <div className="numListContainer">
      {Array.from({ length: totalQuestions }, (_, index) => {
        const questionNum = index + 1;

        return <div key={questionNum}>{questionNum}</div>;
      })}
    </div>
  );
}

export default NumList;
