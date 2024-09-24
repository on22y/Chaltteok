import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypeComponent from '../components/TypeComponent';

function Type() {
  const navigate = useNavigate();

  return (
    <div className="typePage">
      <TypeComponent
        type="당신은 'K-고딩'!"
        detail1="당장 주변 고등학교로 뛰어가서"
        detail2=" 즐거운 대화를 나누세요."
      />
    </div>
  );
}

export default Type;
