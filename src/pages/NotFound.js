import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
`;

const ErrorCode = styled(motion.h1)`
  font-size: clamp(6rem, 20vw, 15rem);
  line-height: 1;
  margin: 0;
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.tertiary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.8;
`;

const ErrorTitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 3rem);
  margin: 1rem 0 2rem;
  text-transform: uppercase;
`;

const ErrorMessage = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HomeButton = styled(motion.div)`
  a {
    display: inline-block;
    padding: 1rem 2.5rem;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: transparent;
      outline: 2px solid ${props => props.theme.colors.primary};
    }
  }
`;

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.5 }
  }
};

const NotFound = () => {
  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ErrorCode
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        404
      </ErrorCode>
      
      <ErrorTitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Page Not Found
      </ErrorTitle>
      
      <ErrorMessage
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </ErrorMessage>
      
      <HomeButton
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" className="hoverable">Back to Homepage</Link>
      </HomeButton>
    </PageContainer>
  );
};

export default NotFound; 