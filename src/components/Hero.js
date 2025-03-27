import React, { useState } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized position (-1 to 1)
    const normalizedX = (clientX / innerWidth) * 2 - 1;
    const normalizedY = (clientY / innerHeight) * 2 - 1;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
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
            <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                alt="Digital experience" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 animate-bounce">
        <p className="text-sm mb-2 font-body">Scroll Down</p>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero; 