import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestComponent from '../components/TestComponent';

function Test() {
  const navigate = useNavigate();

  return (
    <div className="testPage">
      <TestComponent num="Q1." />
    </div>
  );
}

export default Test;
