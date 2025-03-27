import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TechnologiesSection = styled(motion.section)`
  padding: 8rem 2rem;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--color-primary);
    border-radius: 2px;
  }
`;

const SectionDescription = styled(motion.p)`
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
  color: var(--color-text-light);
`;

const TabsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const Tab = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.active ? '#fff' : 'var(--color-text-light)'};
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-3px);
  }
`;

const TechGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1.5rem;
  }
`;

const BackgroundGlow = styled(motion.div)`
  position: absolute;
  width: 60vw;
  height: 60vw;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(var(--color-primary-rgb), 0.15) 0%,
    rgba(var(--color-primary-rgb), 0) 70%
  );
  z-index: -1;
  top: 10%;
  left: 10%;
  filter: blur(50px);
  opacity: 0.7;
`;

const TechCard = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  padding: 1rem;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const TechLogo = styled(motion.img)`
  width: 50%;
  height: auto;
  margin-bottom: 0.75rem;
  object-fit: contain;
  
  @media (max-width: 768px) {
    width: 40%;
  }
`;

const TechName = styled(motion.h4)`
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const descriptionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
};

const tabsContainerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut", 
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    } 
  }
};

const tabVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { y: -5, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};

const techGridVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      staggerChildren: 0.05
    } 
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3,
      when: "afterChildren",
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }
};

const techCardVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  },
  hover: { 
    y: -10, 
    scale: 1.05,
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const logoVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
  hover: { 
    rotate: [0, -5, 5, -5, 0],
    transition: { 
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const nameVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.2 } }
};

const Technologies = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  
  const tabs = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'design', label: 'Design' },
    { id: 'devops', label: 'DevOps' }
  ];
  
  const technologies = {
    frontend: [
      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Redux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
      { name: 'SASS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
      { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' }
    ],
    backend: [
      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg' },
      { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Spring', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
    ],
    database: [
      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'SQLite', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
    ],
    design: [
      { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Adobe XD', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg' },
      { name: 'Photoshop', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
      { name: 'Illustrator', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
      { name: 'Sketch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg' },
    ],
    devops: [
      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
      { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
      { name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
      { name: 'Nginx', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
      { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
      { name: 'GCP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
    ],
  };
  
  return (
    <TechnologiesSection
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      id="technologies"
    >
      <BackgroundGlow 
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, 30, -30, 0],
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ 
          duration: 20, 
          ease: "linear", 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <Container>
        <SectionHeader>
          <SectionTitle variants={titleVariants}>
            Technologies & Platforms
          </SectionTitle>
          <SectionDescription variants={descriptionVariants}>
            At Techveda, we leverage cutting-edge technologies to build scalable, efficient, and innovative solutions for our clients. Our expertise spans across various domains of modern software development.
          </SectionDescription>
        </SectionHeader>
        
        <TabsContainer 
          variants={tabsContainerVariants}
          initial="initial"
          animate="animate"
        >
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              variants={tabVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {tab.label}
            </Tab>
          ))}
        </TabsContainer>
        
        <AnimatePresence mode="wait">
          <TechGrid
            key={activeTab}
            variants={techGridVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {technologies[activeTab].map((tech, index) => (
              <TechCard
                key={tech.name}
                variants={techCardVariants}
                whileHover="hover"
                custom={index}
              >
                <TechLogo 
                  src={tech.logo}
                  alt={tech.name}
                  variants={logoVariants}
                  layoutId={`tech-logo-${tech.name}`}
                />
                <TechName variants={nameVariants}>{tech.name}</TechName>
              </TechCard>
            ))}
          </TechGrid>
        </AnimatePresence>
      </Container>
    </TechnologiesSection>
  );
};

export default Technologies; 