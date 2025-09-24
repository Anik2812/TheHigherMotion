import React, { useEffect, useState } from 'react';

const CursorGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x - 8,
          top: position.y - 8,
          width: 16,
          height: 16,
          background: '#F21F0C',
          borderRadius: '50%',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
      
      {/* Glow effect */}
      <div
        className={`fixed pointer-events-none z-40 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          left: position.x - 25,
          top: position.y - 25,
          width: 50,
          height: 50,
          background: 'radial-gradient(circle, rgba(242, 31, 12, 0.4) 0%, rgba(242, 31, 12, 0.1) 50%, transparent 100%)',
          borderRadius: '50%',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
    </>
  );
};

export default CursorGlow;