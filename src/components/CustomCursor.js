import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
`;

const CursorDot = styled(motion.div)`
  position: fixed;
  width: 8px;
  height: 8px;
  background-color: var(--color-primary);
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: difference;
  z-index: 99999;
`;

const CursorCircle = styled(motion.div)`
  position: fixed;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99998;
  mix-blend-mode: difference;
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Using useCallback to prevent recreation of functions on each render
  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseOver = useCallback((e) => {
    // Check if the element or its parents have the hoverable class
    if (e.target.closest('.hoverable')) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback((e) => {
    if (e.target.closest('.hoverable')) {
      setIsHovering(false);
    }
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);
  
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Add CSS class to hide default cursor
    document.documentElement.classList.add('custom-cursor');
    
    // Add style to hide default cursor
    const style = document.createElement('style');
    style.textContent = `
      .custom-cursor, .custom-cursor * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      // Remove CSS class on cleanup
      document.documentElement.classList.remove('custom-cursor');
      document.head.removeChild(style);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut, handleMouseLeave, handleMouseEnter]);

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: isVisible ? 1 : 0,
      transition: {
        type: 'spring',
        mass: 0.1,
        stiffness: 800,
        damping: 20,
        opacity: { duration: 0.2 }
      }
    }
  };

  const circleVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: isHovering ? 1.5 : 1,
      opacity: isVisible ? (isHovering ? 0.8 : 0.5) : 0,
      transition: {
        type: 'spring',
        mass: 0.3,
        stiffness: 200,
        damping: 20,
        scale: {
          type: 'spring',
          mass: 0.3,
          stiffness: 200,
          damping: 20,
        },
        opacity: { duration: 0.2 }
      }
    }
  };

  // Don't render custom cursor on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <CursorWrapper>
      <CursorDot 
        variants={dotVariants}
        animate="default"
      />
      <CursorCircle 
        variants={circleVariants}
        animate="default"
      />
    </CursorWrapper>
  );
};

export default CustomCursor; 