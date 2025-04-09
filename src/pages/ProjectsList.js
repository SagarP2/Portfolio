import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    color: ${props => props.theme.colors.text};
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: #1a1a1a;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProjectTitle = styled.h2`
  color: #ffffff;
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: #a1a1aa;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TechnologiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: auto 0 1.5rem 0;
`;

const Technology = styled.span`
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ViewDetailsButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: #2563eb;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const GitHubLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: #3b82f6;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #a1a1aa;
    cursor: not-allowed;
  }
`;

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6; // Set to display 3 projects per page

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <div className="loading-spinner">Loading...</div>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="error-message">{error}</div>
      </Container>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);

  return (
    <Container>
      <Header>
        <h1>Our Projects</h1>
        <p>Explore our portfolio of innovative and impactful projects</p>
      </Header>

      <ProjectsGrid>
        {currentProjects.map((project, index) => (
          <ProjectCard
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectImage src={project.mainimage} alt={project.title} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.shortDescription}</ProjectDescription>
              <TechnologiesContainer>
                {project.technologies.map((tech, techIndex) => (
                  <Technology key={techIndex}>{tech}</Technology>
                ))}
              </TechnologiesContainer>
              <ProjectLinks>
                <GitHubLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </GitHubLink>
                <ViewDetailsButton to={`/projects/${project._id}`}>
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </ViewDetailsButton>
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      <PaginationContainer>
        <PaginationButton 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        <PaginationButton 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </Container>
  );
};

export default ProjectsList; 