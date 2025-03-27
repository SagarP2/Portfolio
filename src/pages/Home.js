import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Components
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Technologies from '../components/Technologies';
import Contact from '../components/Contact';
import Services from '../components/Services';

// Page transitions
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const Home = () => {
  // Smooth scroll behavior for browsers that support it
  React.useEffect(() => {
    // Check if the browser supports scroll behavior
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="relative"
    >
      <Hero />
      <Projects />
      <Technologies />
      <About />
      <Services /> 
      <Contact />
    </motion.div>
  );
};

export default Home; 