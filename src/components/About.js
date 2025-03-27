import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ContentWrapper = styled.div`
  @media (max-width: 992px) {
    order: 2;
  }
`;

const SectionHeading = styled(motion.h2)`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 80px;
    height: 4px;
    background: var(--color-primary);
    transition: width 0.3s ease;
    
    @media (max-width: 992px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const Emphasis = styled.span`
  color: var(--color-primary);
  font-weight: 600;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.8;
  color: var(--color-gray);
`;

const Stats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.lg} 0;
  
  @media (max-width: 992px) {
    max-width: 500px;
    margin: ${props => props.theme.spacing.lg} auto;
  }
`;

const StatItem = styled.div`
  padding: ${props => props.theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: var(--color-primary);
`;

const StatTitle = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

const SkillsContainer = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const SkillsTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: 600;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const SkillTag = styled(motion.span)`
  padding: 8px 16px;
  background: rgba(91, 61, 245, 0.1);
  color: var(--color-secondary);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--color-secondary);
    color: white;
    transform: translateY(-3px);
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  
  @media (max-width: 992px) {
    order: 1;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.medium};
  filter: brightness(0.9);
`;

const ExperienceBox = styled(motion.div)`
  position: absolute;
  bottom: -25px;
  left: -25px;
  background: var(--color-primary);
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.medium};
  
  @media (max-width: 992px) {
    left: 0;
  }
`;

const ExperienceNumber = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 5px;
`;

const ExperienceText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
`;

const BackgroundShape = styled.div`
  position: absolute;
  top: -200px;
  left: -200px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.secondary};
  opacity: 0.05;
  z-index: -1;
  filter: blur(60px);
`;

const About = () => {
  return (
    <AboutSection id="about">
      <BackgroundShape />
      <Container>
        <ContentWrapper>
          <SectionHeading
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About <Emphasis>Techveda</Emphasis>
          </SectionHeading>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Techveda is a dynamic duo of passionate developers dedicated to creating cutting-edge web applications and innovative digital solutions for businesses across various industries.
          </Description>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Founded by Rahul Sharma and Priya Patel, our team combines frontend expertise with backend mastery to deliver complete solutions that are reliable, scalable, and user-friendly.
          </Description>
          
          <Stats
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <StatItem>
              <StatNumber>4+</StatNumber>
              <StatTitle>Years Experience</StatTitle>
            </StatItem>
            <StatItem>
              <StatNumber>35+</StatNumber>
              <StatTitle>Projects Completed</StatTitle>
            </StatItem>
            <StatItem>
              <StatNumber>15+</StatNumber>
              <StatTitle>Happy Clients</StatTitle>
            </StatItem>
            <StatItem>
              <StatNumber>5+</StatNumber>
              <StatTitle>Tech Stacks</StatTitle>
            </StatItem>
          </Stats>
          
          <SkillsContainer>
            <SkillsTitle>Our Expertise</SkillsTitle>
            <SkillTags>
              <SkillTag whileHover={{ scale: 1.05 }}>React.js</SkillTag>
              <SkillTag whileHover={{ scale: 1.05 }}>Node.js</SkillTag>
              <SkillTag whileHover={{ scale: 1.05 }}>MongoDB</SkillTag>
              <SkillTag whileHover={{ scale: 1.05 }}>Express</SkillTag>
              <SkillTag whileHover={{ scale: 1.05 }}>Next.js</SkillTag>
              <SkillTag whileHover={{ scale: 1.05 }}>Redux</SkillTag>
              <SkillTag whileHover={{ scale: 1.05 }}>REST APIs</SkillTag>
              <SkillTag whileHover={{ scale: 1.05 }}>UI/UX Design</SkillTag>
            </SkillTags>
          </SkillsContainer>
        </ContentWrapper>
        
        <ImageWrapper
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ProfileImage 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
            alt="Techveda Team" 
          />
          <ExperienceBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ExperienceNumber>4+</ExperienceNumber>
            <ExperienceText>Years of Excellence</ExperienceText>
          </ExperienceBox>
        </ImageWrapper>
      </Container>
    </AboutSection>
  );
};

export default About; 