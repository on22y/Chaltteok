import React from 'react';
import './TextComponent.css';

function TextComponent({ text, colorClass, fontSize, strokeWidth = '3px', strokeColor = '#2f2f2f', style }) {
  const appliedClass = colorClass ? `textContainer ${colorClass}` : 'textContainer textGreen';

  const textStyle = {
    fontSize: `calc(${fontSize} * var(--scale))`,
    WebkitTextStroke: `calc(${strokeWidth} * var(--scale)) ${strokeColor}`,
    ...style,
  };

  return (
    <div className={appliedClass} style={textStyle}>
      {text}
    </div>
  );
}

export default TextComponent;
