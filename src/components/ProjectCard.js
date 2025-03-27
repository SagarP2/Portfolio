import React from 'react';
import styled from 'styled-components';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// SVG Icons as components instead of importing from react-icons/fi
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const CardWrapper = styled(motion.div)`
  position: relative;
  height: 100%;
  isolation: isolate;
  perspective: 1000px;
`;

const Card = styled(motion.div)`
  position: relative;
  background: rgba(30, 30, 30, 0.5);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
  position: relative;
  will-change: transform, box-shadow;
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  will-change: transform;
`;

const CardOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.8)
  );
  z-index: 1;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  z-index: 2;
`;

const CardTitle = styled(motion.h3)`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: var(--color-text);
`;

const CardDescription = styled(motion.p)`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
  flex: 1;
`;

const TagContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled(motion.span)`
  font-size: 0.75rem;
  background-color: rgba(var(--color-primary-rgb), 0.15);
  color: var(--color-primary);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
`;

const LinksContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-light);
  font-size: 0.9rem;
  text-decoration: none;
  
  svg {
    font-size: 1.1rem;
  }
`;

const ViewDetailsLink = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: var(--color-text);
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  
  svg {
    margin-left: 0.5rem;
    font-size: 1rem;
  }
`;

const FeaturedBadge = styled(motion.span)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.35rem 0.75rem;
  background-color: var(--color-primary);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 20px;
  z-index: 10;
`;

const CardShine = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: 12px;
  z-index: 3;
`;

// Animation variants
const containerVariants = {
  initial: { 
    opacity: 0, 
    y: 50 
  },
  animate: (custom) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      mass: 0.8,
      damping: 20,
      stiffness: 100,
      delay: custom * 0.1
    }
  }),
  exit: { 
    opacity: 0, 
    y: 30, 
    transition: { 
      duration: 0.3, 
      ease: "easeInOut" 
    } 
  }
};

const cardVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.95,
    y: 20 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.1,
    y: -3,
    backgroundColor: "rgba(59, 130, 246, 0.3)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  initial: { scale: 1.2 },
  animate: { 
    scale: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.23, 1, 0.32, 1] 
    } 
  },
  hover: { 
    scale: 1.1,
    transition: { 
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

const overlayVariants = {
  initial: { opacity: 0.4 },
  hover: { 
    opacity: 0.7,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      delay: 0.1,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const descriptionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      delay: 0.2,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

const tagContainerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.4,
      delay: 0.3,
      staggerChildren: 0.05
    }
  }
};

const tagVariants = {
  initial: { opacity: 0, scale: 0.8, y: 10 },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  },
  hover: {
    scale: 1.1,
    y: -3,
    backgroundColor: "rgba(var(--color-primary-rgb), 0.3)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const linksContainerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      delay: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

const linkVariants = {
  initial: { opacity: 0.8 },
  hover: { 
    x: -2, 
    color: "var(--color-primary)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: { scale: 0.97 }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05, 
    backgroundColor: "var(--color-secondary)",
    transition: { 
      duration: 0.2, 
      ease: "easeOut" 
    }
  },
  tap: { scale: 0.95 }
};

const featuredBadgeVariants = {
  initial: { opacity: 0, x: 20, scale: 0.8 },
  animate: (custom) => ({ 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 0.2 + (custom * 0.1) 
    } 
  })
};

const arrowVariants = {
  initial: { x: 0 },
  hover: { 
    x: 5,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.2
    }
  }
};

const ProjectCard = ({ project, index }) => {
  // Safely destructure with default values and handle both tags and technologies
  const { 
    id = '', 
    title = '', 
    description = '', 
    image = '', 
    technologies = [], 
    tags = [],
    github = '#', 
    live = '', 
    featured = false 
  } = project || {};
  
  // Use either technologies or tags array
  const techStack = technologies.length > 0 ? technologies : tags;
  
  // For 3D hover effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // For smooth movement
  const rotateX = useSpring(0, { stiffness: 200, damping: 10 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 10 });
  
  // For shine effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shine = useMotionTemplate`
    radial-gradient(
      150px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 80%
    )
  `;
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Calculate center point
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center
    const posX = e.clientX - centerX;
    const posY = e.clientY - centerY;
    
    // Update rotation (divided by factors to reduce the rotation amount)
    rotateX.set(posY / -20);
    rotateY.set(posX / 20);
    
    // Update shine effect position
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };
  
  const handleMouseLeave = () => {
    // Reset values on mouse leave
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <CardWrapper 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={index}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        variants={cardVariants}
        whileHover="hover"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000
        }}
      >
        {featured && (
          <FeaturedBadge
            variants={featuredBadgeVariants}
            initial="initial"
            animate="animate"
            custom={index}
          >
            Featured
          </FeaturedBadge>
        )}
        
        <CardImageContainer>
          <CardImage 
            src={image} 
            alt={title}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          />
          <CardOverlay variants={overlayVariants} initial="initial" whileHover="hover" />
        </CardImageContainer>
        
        <CardContent>
          <CardTitle 
            variants={titleVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            {title}
          </CardTitle>
          
          <CardDescription 
            variants={descriptionVariants}
            initial="initial"
            animate="animate"
          >
            {description}
          </CardDescription>
          
          <TagContainer
            variants={tagContainerVariants}
            initial="initial"
            animate="animate"
          >
            {techStack.map((tech, idx) => (
              <Tag 
                key={idx}
                variants={tagVariants}
                whileHover="hover"
              >
                {tech}
              </Tag>
            ))}
          </TagContainer>
          
          <LinksContainer
            variants={linksContainerVariants}
            initial="initial"
            animate="animate"
          >
            <ProjectLink 
              href={github} 
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              className="hoverable"
            >
              <GithubIcon /> GitHub
            </ProjectLink>
            
            {live && (
              <ProjectLink 
                href={live} 
                target="_blank"
                rel="noopener noreferrer"
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className="hoverable"
              >
                <ExternalLinkIcon /> Live Demo
              </ProjectLink>
            )}
            
            <ViewDetailsLink 
              to={`/projects/${id}`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="hoverable"
            >
              View Details
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                viewBox="0 0 16 16"
                variants={arrowVariants}
                initial="initial"
                whileHover="hover"
              >
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </motion.svg>
            </ViewDetailsLink>
          </LinksContainer>
        </CardContent>
        
        <CardShine style={{ background: shine }} />
      </Card>
    </CardWrapper>
  );
};

export default ProjectCard; 