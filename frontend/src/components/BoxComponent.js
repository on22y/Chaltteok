import React from 'react';
import './BoxComponent.css';

function BoxComponent({ children, height }) {
  return (
    <div className="boxContainer" style={{ height: height }}>
      {children}
    </div>
  );
}

export default BoxComponent;
