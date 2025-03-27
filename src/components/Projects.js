import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProjectsSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  position: relative;
  overflow: hidden;
`;

const BackgroundShape = styled.div`
  position: absolute;
  top: -300px;
  right: -300px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  opacity: 0.05;
  z-index: -1;
  filter: blur(80px);
`;

const BackgroundShape2 = styled.div`
  position: absolute;
  bottom: -200px;
  left: -200px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.secondary};
  opacity: 0.05;
  z-index: -1;
  filter: blur(60px);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const SectionHeading = styled(motion.h2)`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.lg};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 80px;
    height: 4px;
    background: #2563eb;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  max-width: 600px;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: rgba(255, 255, 255, 0.7);
`;

const Emphasis = styled.span`
  color: #2563eb;
  font-weight: 600;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterTab = styled.button`
  padding: 8px 16px;
  border: none;
  background: ${props => props.isActive ? '#2563eb' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.isActive ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isActive ? '#2563eb' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const ViewMoreButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => props.theme.spacing.xl} auto 0;
  padding: 1rem 2.5rem;
  background: transparent;
  border: 2px solid #2563eb;
  color: #2563eb;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  width: fit-content;
  min-width: 200px;
  
  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    background: #2563eb;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
    
    svg {
      transform: translateX(5px);
    }
    
    &:before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #2563eb;
  margin: 2rem auto;
`;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Sample project data (replace with actual API call)
const projectsData = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    type: 'Web Development',
    description: 'A complete e-commerce solution for a fashion brand with inventory management, payment processing, and analytics.',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API']
  },
  {
    id: '2',
    title: 'Health & Fitness App',
    type: 'Mobile App',
    description: 'A fitness tracking application that helps users monitor workouts, nutrition, and progress with personalized recommendations.',
    image: 'https://images.unsplash.com/photo-1510016177671-2eec1a6f2d8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React Native', 'Firebase', 'Redux', 'Node.js']
  },
  {
    id: '3',
    title: 'Real Estate Portal',
    type: 'Web Application',
    description: 'Property listing platform with advanced search, virtual tours, and agent-client communication tools.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'MongoDB', 'Express', 'AWS', 'Google Maps API']
  },
  {
    id: '4',
    title: 'School Management System',
    type: 'Enterprise Solution',
    description: 'Comprehensive school management system for student records, attendance, grades, and parent communication.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.IO', 'PDF Generation']
  },
  {
    id: '5',
    title: 'Restaurant Ordering System',
    type: 'Web Application',
    description: 'Digital menu and ordering system for restaurants with kitchen management and table service integration.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'GraphQL', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    id: '6',
    title: 'Job Portal',
    type: 'Web Platform',
    description: 'Job listing and application platform connecting employers with job seekers, featuring resume parsing and matching algorithms.',
    image: 'https://images.unsplash.com/photo-1568598035424-7070b67317d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Node.js', 'ElasticSearch', 'Redis', 'AWS']
  }
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData || []);
  const [isLoading, setIsLoading] = useState(false);
  
  const filterCategories = ['All', 'Web Development', 'Mobile App', 'Web Application', 'Enterprise Solution', 'Web Platform'];
  
  // Uncomment this to fetch projects from API instead of using sample data
  /*
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setFilteredProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  */
  
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => project.type === activeFilter));
    }
  }, [activeFilter]);
  
  return (
    <ProjectsSection id="projects">
      <BackgroundShape />
      <BackgroundShape2 />
      <Container>
        <SectionHeading
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Recent <Emphasis>Projects</Emphasis>
        </SectionHeading>
        
        <Description
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          At Techveda, we deliver tailored solutions for businesses of all sizes. 
          Explore our portfolio of successfully completed client projects that demonstrate 
          our technical expertise and commitment to excellence.
        </Description>
        
        <FilterTabs>
          {filterCategories.map(category => (
            <FilterTab 
              key={category} 
              isActive={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </FilterTab>
          ))}
        </FilterTabs>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h3>Loading projects...</h3>
          </div>
        ) : (
          <>
            <ProjectsGrid
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
              viewport={{ once: true }}
            >
              {filteredProjects.slice(0, 3).map(project => (
                <ProjectCard key={project.id || project._id} project={project} />
              ))}
            </ProjectsGrid>
            
            <ViewMoreButton
              to="/projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View More Projects
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </ViewMoreButton>
          </>
        )}
      </Container>
    </ProjectsSection>
  );
};

export default Projects; 