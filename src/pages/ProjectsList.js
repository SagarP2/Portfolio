import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  position: relative;
  padding: 8rem 0 4rem;
  overflow-x: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--color-heading);
`;

const Description = styled(motion.p)`
  max-width: 700px;
  margin: 0 auto;
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.1 }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Sample projects data
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    description: "A full-featured e-commerce platform with secure payment processing and inventory management.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  {
    id: 2,
    title: "Fitness Tracking App",
    category: "Mobile Development",
    description: "A cross-platform mobile app for tracking workouts, nutrition, and health metrics.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["React Native", "Firebase", "Health API"]
  },
  {
    id: 3,
    title: "Real Estate Portal",
    category: "Web Development",
    description: "A property listing platform with advanced search features and virtual tours.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Vue.js", "Express", "PostgreSQL"]
  },
  {
    id: 4,
    title: "Financial Dashboard",
    category: "Data Visualization",
    description: "An interactive dashboard for tracking investments and financial metrics with real-time data.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["D3.js", "React", "Node.js", "API Integration"]
  },
  {
    id: 5,
    title: "Educational Platform",
    category: "Web Development",
    description: "An online learning platform with course management, video lessons, and student progress tracking.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["React", "Firebase", "WebRTC"]
  },
  {
    id: 6,
    title: "Restaurant Management System",
    category: "Business Software",
    description: "A comprehensive system for managing orders, inventory, and customer relationships for restaurants.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Angular", "Node.js", "MongoDB"]
  }
];

const ProjectsList = () => {
  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }, []);

  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
    >
      <Container>
        <PageHeader>
          <Title variants={itemVariants}>Our Projects</Title>
          <Description variants={itemVariants}>
            Explore our portfolio of innovative digital solutions that have helped businesses transform and grow.
          </Description>
        </PageHeader>
        
        <ProjectsGrid>
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </ProjectsGrid>
      </Container>
    </PageContainer>
  );
};

export default ProjectsList; 