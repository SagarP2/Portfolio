import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { fetchProjectById } from '../api';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
`;

const ProjectContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const ProjectHeader = styled.div`
  margin-bottom: 3rem;
`;

const ProjectTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
  }
`;

const ProjectDescription = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 800px;
  margin-bottom: 2rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TechnologiesContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Technology = styled.span`
  font-size: 0.8rem;
  background-color: var(--color-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  display: inline-block;
`;

const ProjectLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.primary ? 'var(--color-primary)' : 'transparent'};
  border: 2px solid ${props => props.primary ? 'var(--color-primary)' : 'var(--color-text)'};
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? 'transparent' : 'var(--color-text)'};
    color: ${props => props.primary ? 'var(--color-text)' : 'var(--color-bg)'};
  }
`;

const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 3rem;
`;

const ProjectImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--color-primary);
  margin: 4rem auto;
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

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await fetchProjectById(id);
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setLoading(false);
      }
    };
    
    getProject();
  }, [id]);

  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {loading ? (
        <LoadingSpinner 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : project ? (
        <ProjectContainer>
          <BackButton to="/projects" className="hoverable">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Projects
          </BackButton>
          
          <ProjectHeader>
            <ProjectTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {project.title}
            </ProjectTitle>
            
            <ProjectDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.description}
            </ProjectDescription>
            
            <TechnologiesContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.technologies.map((tech, index) => (
                <Technology key={index}>
                  {tech}
                </Technology>
              ))}
            </TechnologiesContainer>
            
            <ProjectLinks
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {project.githubLink && (
                <ProjectLink 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hoverable"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </ProjectLink>
              )}
              
              {project.liveLink && (
                <ProjectLink 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  primary
                  className="hoverable"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  View Live Project
                </ProjectLink>
              )}
            </ProjectLinks>
          </ProjectHeader>
          
          <ImageContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProjectImage src={project.image} alt={project.title} />
          </ImageContainer>
        </ProjectContainer>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h2>Project not found</h2>
          <BackButton to="/projects" style={{ marginTop: '1rem' }}>
            Back to Projects
          </BackButton>
        </div>
      )}
    </PageContainer>
  );
};

export default ProjectDetail; 