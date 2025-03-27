import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  position: relative;
  padding: 7rem 1rem 3rem;
  overflow-x: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const SubTitle = styled(motion.p)`
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
  color: var(--color-text-secondary);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%);
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-primary);
  font-size: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
`;

const ServiceDescription = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
`;

const CTASection = styled(motion.div)`
  margin-top: 5rem;
  text-align: center;
  padding: 3rem 2rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--color-heading);
`;

const CTADescription = styled.p`
  max-width: 600px;
  margin: 0 auto 2rem;
  color: var(--color-text-secondary);
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-2px);
  }
  
  svg {
    margin-left: 0.5rem;
  }
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%);
  z-index: -1;
  filter: blur(60px);
`;

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1 
    }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const shapeVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 0.1,
    transition: { duration: 1, ease: "easeOut" }
  }
};

const services = [
  {
    icon: '💻',
    title: 'Web Development',
    description: 'We build responsive, fast, and user-friendly websites using modern technologies and best practices.'
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    description: 'Create cross-platform or native mobile applications that deliver exceptional user experiences.'
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'We craft intuitive interfaces and engaging user experiences that help your products stand out.'
  },
  {
    icon: '🛒',
    title: 'E-commerce Solutions',
    description: 'Build online stores that convert visitors into customers with seamless shopping experiences.'
  },
  {
    icon: '🔍',
    title: 'SEO Optimization',
    description: 'Improve your website visibility in search results to drive more organic traffic.'
  },
  {
    icon: '📊',
    title: 'Digital Marketing',
    description: 'Develop comprehensive digital marketing strategies to grow your online presence and reach.'
  }
];

const ServicesPage = () => {
  // Smooth scroll behavior
  useEffect(() => {
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
        <Header>
          <Title variants={itemVariants}>Our Services</Title>
          <SubTitle variants={itemVariants}>
            We offer comprehensive digital solutions to help your business grow and succeed in today's competitive landscape.
          </SubTitle>
        </Header>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index} variants={itemVariants}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
        
        <CTASection variants={itemVariants}>
          <CTATitle>Ready to Start Your Project?</CTATitle>
          <CTADescription>
            Let's discuss how our services can help you achieve your business goals. Contact us today for a free consultation.
          </CTADescription>
          <Button href="/contact">
            Get in Touch
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Button>
        </CTASection>
      </Container>
      
      <BackgroundShape 
        variants={shapeVariants}
        style={{ 
          width: '500px', 
          height: '500px', 
          top: '10%', 
          right: '-10%' 
        }}
      />
      
      <BackgroundShape 
        variants={shapeVariants}
        style={{ 
          width: '400px', 
          height: '400px', 
          bottom: '10%', 
          left: '-5%' 
        }}
      />
    </PageContainer>
  );
};

export default ServicesPage; 