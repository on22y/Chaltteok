import React, { useContext } from 'react';
import { LoadingContext } from '../components/LoadingContext';
import './LoadingIndicator.css';
import TextComponent from './TextComponent';

function LoadingIndicator() {
  const { loading } = useContext(LoadingContext);

  if (!loading) return null; // 로딩 중이 아니면 아무것도 표시하지 않음

  return (
    <div className="loading-overlay">
      <TextComponent text="Loading..." fontSize="42px" colorClass="textRed" shadowSize="3.2px" />
    </div>
  );
}

export default LoadingIndicator;
