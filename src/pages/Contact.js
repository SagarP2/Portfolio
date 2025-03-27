import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  z-index: 1;
`;

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const ContactPage = () => {
  // Smooth scroll behavior
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }, []);

  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Contact />
    </PageContainer>
  );
};

export default ContactPage; 