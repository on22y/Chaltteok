import React, { useContext } from 'react';
import { LoadingContext } from '../components/LoadingContext';
import './LoadingIndicator.css';

function LoadingIndicator() {
  const { loading } = useContext(LoadingContext);

  if (!loading) return null; // 로딩 중이 아니면 아무것도 표시하지 않음

  return (
    <div className="loading-overlay">
      <div className="loading-text">Loading...</div>
    </div>
  );
}

export default LoadingIndicator;
