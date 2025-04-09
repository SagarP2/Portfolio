import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);
  
  // Track mouse position for parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized position (-1 to 1)
    const normalizedX = (clientX / innerWidth) * 2 - 1;
    const normalizedY = (clientY / innerHeight) * 2 - 1;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  // Delay animation start to avoid conflict with Techveda loader
  useEffect(() => {
    // Wait for document to be fully loaded plus additional delay
    if (document.readyState === 'complete') {
      // Add a delay after page is fully loaded to ensure Techveda animation is done
      const timer = setTimeout(() => {
        setAnimationReady(true);
      }, 1500); // 1.5 second delay after page load
      
      return () => clearTimeout(timer);
    } else {
      // If document not yet loaded, wait for load event
      const handleLoad = () => {
        const timer = setTimeout(() => {
          setAnimationReady(true);
        }, 1500);
        return () => clearTimeout(timer);
      };
      
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  return (
    <section 
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Hero content */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-heading leading-tight mb-4">
              We create <span className="text-primary-500">digital</span> experiences
            </h1>
            
            <h2 className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 font-body">
              Techveda delivers innovative web applications and digital solutions that drive growth and enhance user experiences
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
              <a 
                href="#projects" 
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center font-body"
              >
                See Our Work
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a 
                href="#contact" 
                className="px-6 py-3 border border-primary-500 text-primary-400 hover:bg-primary-500/10 font-medium rounded-lg transition-colors duration-300 flex items-center justify-center font-body"
              >
                Contact Us
              </a>
            </div>
          </div>
          
          {/* Image/visual content */}
          <div 
            className="mt-12 lg:mt-0 relative"
            style={{ 
              transform: `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: (imageLoaded && animationReady) ? 1 : 0, 
                scale: (imageLoaded && animationReady) ? 1 : 0.8,
                y: (imageLoaded && animationReady) ? 0 : 20
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }}
            >
              <motion.div
                className="absolute inset-0 bg-primary-500/20 z-10"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: (imageLoaded && animationReady) ? 0.2 : 0 
                }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 z-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ 
                  clipPath: (imageLoaded && animationReady) ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" 
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                  alt="Digital experience" 
                  className="w-full h-full object-cover"
                  onLoad={handleImageLoad}
                />
              </motion.div>
              
              {/* Corner accents - removed border and kept only subtle corner elements */}
              <motion.div 
                className="absolute top-0 left-0 w-16 h-16 z-30"
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ 
                  opacity: (imageLoaded && animationReady) ? 0.7 : 0, 
                  x: (imageLoaded && animationReady) ? 0 : -20, 
                  y: (imageLoaded && animationReady) ? 0 : -20 
                }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-2xl"></div>
              </motion.div>
              <motion.div 
                className="absolute bottom-0 right-0 w-16 h-16 z-30"
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ 
                  opacity: (imageLoaded && animationReady) ? 0.7 : 0, 
                  x: (imageLoaded && animationReady) ? 0 : 20, 
                  y: (imageLoaded && animationReady) ? 0 : 20 
                }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-2xl"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: animationReady ? 1 : 0, y: animationReady ? 0 : -20 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="text-sm mb-2 font-body">Scroll Down</p>
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.div>
    </section>
  );
};

export default Hero; 