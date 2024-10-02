import React from 'react';
import './BoxComponent.css';

function BoxComponent({ children, width, height }) {
  return (
    <div
      className="boxContainer"
      style={{ width: `calc(${width} * var(--scale))`, height: `calc(${height} * var(--scale))` }}
    >
      {children}
    </div>
  );
}

export default BoxComponent;
