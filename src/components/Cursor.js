import React, { useState, useEffect } from 'react';
import './Cursor.css';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setExpand(true);
      setTimeout(() => {
        setExpand(false);
      }, 500);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <div
        className={`cursor ${expand ? 'expand' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default Cursor;
