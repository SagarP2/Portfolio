import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import SectionHeading from './SectionHeading';
import { Link } from 'react-router-dom';

const ProjectsSection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(180deg, #0a0a0a 0%, #111111 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(66, 153, 225, 0.3), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(66, 153, 225, 0.3), transparent);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(17, 17, 17, 0.8);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(66, 153, 225, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(66, 153, 225, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
`;

const ProjectImage = styled(motion.img)`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.7));
  }
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 2.5rem;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0.8) 0%, rgba(17, 17, 17, 0.95) 100%);
  position: relative;
`;

const ProjectTitle = styled.h3`
  color: #ffffff;
  font-size: 1.875rem;
  margin-bottom: 1rem;
  font-weight: 600;
  background: linear-gradient(90deg, #ffffff 0%, #a0aec0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, #4299e1, transparent);
  }
`;

const ProjectSubtitle = styled.p`
  color: #a0aec0;
  font-size: 1.125rem;
  margin-bottom: 2rem;
  font-weight: 500;
  line-height: 1.6;
`;

const ProjectDescription = styled.p`
  color: #a0aec0;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const TechBadge = styled(motion.span)`
  background: rgba(66, 153, 225, 0.1);
  color: #4299e1;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(66, 153, 225, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(66, 153, 225, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: rgba(66, 153, 225, 0.2);
    transform: translateY(-2px);
    
    &::before {
      transform: translateX(100%);
    }
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4299e1;
  text-decoration: none;
  font-size: 0.875rem;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  background: rgba(66, 153, 225, 0.1);
  border: 1px solid rgba(66, 153, 225, 0.2);
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(66, 153, 225, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: rgba(66, 153, 225, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(66, 153, 225, 0.2);
    
    &::before {
      transform: translateX(100%);
    }
  }

  svg {
    width: 20px;
    height: 20px;
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1) rotate(5deg);
  }
`;

const ViewDetailsButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  background: linear-gradient(90deg, #4299e1, #6b8ef8);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(66, 153, 225, 0.3);
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(10deg);
  }
`;

const ViewMoreSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const ViewMoreButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  background: linear-gradient(90deg, #4299e1, #6b8ef8);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(66, 153, 225, 0.3);
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(10deg);
  }
`;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.5
    }
  }
};

const item = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const imageAnimation = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        const sortedProjects = response.data.sort((a, b) => 
          new Date(b._id) - new Date(a._id)
        ).slice(0, 2);
        setProjects(sortedProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProjectsSection>
      <Container>
        <SectionHeading
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Latest Project
        </SectionHeading>
        <ProjectsGrid as={motion.div} variants={container} initial="hidden" animate="visible">
          {projects.map((project) => (
            <ProjectCard 
              key={project._id} 
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ProjectImage 
                src={project.mainimage} 
                alt={project.title}
                variants={imageAnimation}
                whileHover="hover"
              />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectSubtitle>{project.subtitle}</ProjectSubtitle>
                
                <ProjectLinks>
                  <ProjectLink 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </ProjectLink>
                  {project.demoLink && (
                    <ProjectLink 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      View Demo
                    </ProjectLink>
                  )}
                </ProjectLinks>
                
              </ProjectContent>
              <ViewDetailsButton to={`/projects/${project._id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </ViewDetailsButton>
            </ProjectCard>
          ))}
        </ProjectsGrid>
        <ViewMoreSection>
          <ViewMoreButton to="/projects">
            View More Projects
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </ViewMoreButton>
        </ViewMoreSection>
      </Container>
    </ProjectsSection>
  );
};

export default Projects; 