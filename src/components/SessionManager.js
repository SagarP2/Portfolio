import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { refreshSession, getSession } from '../utils/sessionUtils';

// Styled Components
const TimeoutModal = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: rgba(18, 18, 18, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  width: 360px;
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const AlertIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  margin-right: 0.8rem;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0;
  color: ${props => props.theme.colors.text};
`;

const ModalContent = styled.p`
  font-size: 0.95rem;
  margin: 0 0 1.25rem;
  color: ${props => props.theme.colors.gray};
  line-height: 1.5;
`;

const ModalTimer = styled.div`
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
  color: ${props => props.theme.colors.text};
  
  span {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled(motion.button)`
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  border: none;
  
  &:focus {
    outline: none;
  }
`;

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const SecondaryButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.text};
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SessionManager = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // State
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [activity, setActivity] = useState(Date.now());
  
  // Constants
  const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const WARNING_BEFORE_TIMEOUT = 60 * 1000; // 1 minute
  const ACTIVITY_CHECK_INTERVAL = 60 * 1000; // 1 minute
  
  // Handle user activity
  const handleUserActivity = useCallback(() => {
    setActivity(Date.now());
    if (showTimeoutWarning) {
      handleSessionExtend();
    }
  }, [showTimeoutWarning]);
  
  // Setup activity listeners
  useEffect(() => {
    // Only track activity when user is authenticated
    if (!isAuthenticated()) return;
    
    // Events to track
    const activityEvents = [
      'mousedown', 'mousemove', 'keydown', 
      'scroll', 'touchstart', 'click'
    ];
    
    // Add event listeners
    activityEvents.forEach(event => 
      window.addEventListener(event, handleUserActivity)
    );
    
    // Cleanup
    return () => {
      activityEvents.forEach(event => 
        window.removeEventListener(event, handleUserActivity)
      );
    };
  }, [handleUserActivity, isAuthenticated]);
  
  // Check for inactivity
  useEffect(() => {
    if (!isAuthenticated()) return;
    
    const intervalId = setInterval(() => {
      const now = Date.now();
      const timeElapsed = now - activity;
      
      // If inactive for too long, show warning
      if (timeElapsed >= INACTIVITY_TIMEOUT - WARNING_BEFORE_TIMEOUT) {
        setShowTimeoutWarning(true);
      }
    }, ACTIVITY_CHECK_INTERVAL);
    
    return () => clearInterval(intervalId);
  }, [activity, isAuthenticated]);
  
  // Countdown timer for timeout warning
  useEffect(() => {
    if (!showTimeoutWarning) return;
    
    const countdownInterval = setInterval(() => {
      setSecondsLeft(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(countdownInterval);
          handleSessionTimeout();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, [showTimeoutWarning]);
  
  // Extend session
  const handleSessionExtend = () => {
    refreshSession();
    setShowTimeoutWarning(false);
    setSecondsLeft(60);
    setActivity(Date.now());
  };
  
  // Logout on session timeout
  const handleSessionTimeout = () => {
    logout();
    navigate('/admin/login');
  };
  
  if (!isAuthenticated()) {
    return null;
  }
  
  return (
    <AnimatePresence>
      {showTimeoutWarning && (
        <TimeoutModal
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <ModalHeader>
            <AlertIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </AlertIcon>
            <ModalTitle>Session Timeout Warning</ModalTitle>
          </ModalHeader>
          
          <ModalContent>
            Your session is about to expire due to inactivity. You will be automatically logged out if you take no action.
          </ModalContent>
          
          <ModalTimer>
            Time remaining: <span>{secondsLeft}</span> seconds
          </ModalTimer>
          
          <ButtonGroup>
            <PrimaryButton
              onClick={handleSessionExtend}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Stay Logged In
            </PrimaryButton>
            
            <SecondaryButton
              onClick={handleSessionTimeout}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Logout Now
            </SecondaryButton>
          </ButtonGroup>
        </TimeoutModal>
      )}
    </AnimatePresence>
  );
};

export default SessionManager; 