import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { refreshSession } from '../utils/sessionUtils';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.darkBackground};
`;

const Spinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid ${props => props.theme.colors.primary};
`;

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  // Refresh session when entering protected routes
  useEffect(() => {
    if (isAuthenticated()) {
      refreshSession();
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner 
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </LoadingContainer>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 