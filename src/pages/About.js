import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  padding: 6rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  background-color: var(--color-background);
  color: var(--color-text);
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--color-heading);
  font-weight: 700;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
`;

const Highlight = styled.span`
  color: var(--color-primary);
  font-weight: 600;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Stack on smaller screens
  }
`;

const TeamMemberCard = styled(motion.div)`
  background: #1a1a1a;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center; // Center align content
`;

const RoleTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
`;

const MemberName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const MemberImage = styled.img`
  width: 100px; // Set a fixed width for the image
  height: 100px; // Set a fixed height for the image
  border-radius: 50%; // Make the image circular
  margin-bottom: 1rem; // Space between image and text
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
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const About = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <Title>{aboutData.title || 'About Us'}</Title>
        <Grid>
          <ImageContainer variants={itemVariants}>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Team working together" 
            />
          </ImageContainer>
          <ContentSection variants={containerVariants}>
            <Paragraph variants={itemVariants}>
              At <Highlight>Techveda</Highlight>, we believe in the power of technology to transform businesses and enhance lives. Founded in 2020, our journey began with a simple mission: to create digital solutions that make a difference.
            </Paragraph>
            <Paragraph variants={itemVariants}>
              We're a team of passionate designers, developers, and strategists who thrive on solving complex problems through innovative technology. With expertise spanning web development, mobile applications, UI/UX design, and digital marketing, we bring a comprehensive approach to every project.
            </Paragraph>
            <Paragraph variants={itemVariants}>
              What sets us apart is our commitment to understanding your unique needs. We don't just build products; we craft experiences that align with your business goals and resonate with your audience. Our collaborative process ensures that your vision is at the heart of everything we create.
            </Paragraph>
            <Paragraph variants={itemVariants}>
              From startups to established enterprises, we've helped clients across industries elevate their digital presence and achieve measurable results. We're excited about the possibilities that technology brings and look forward to helping you navigate the ever-evolving digital landscape.
            </Paragraph>
          </ContentSection>
        </Grid>
        <Title variants={itemVariants}>Our Team</Title>
        <TeamGrid>
          <TeamMemberCard>
            <MemberImage
              src="https://i.pinimg.com/736x/0d/0f/46/0d0f46f7f1397e49a57496db4e167e64.jpg"
              alt="Sagar"
            />
            <RoleTitle>MERN Stack Developer</RoleTitle>
            <MemberName>Sagar Panchal</MemberName>
            <Paragraph>
              Developing and maintaining server-side applications using Node.js
              and Express.js.
            </Paragraph>
            <Paragraph>
              Managing databases and handling data with MongoDB for efficient
              storage and retrieval.
            </Paragraph>
            <Paragraph>
              Testing and documenting APIs using Postman to ensure functionality
              and reliability.
            </Paragraph>
          </TeamMemberCard>

          <TeamMemberCard>
            <MemberImage
              src="https://i.pinimg.com/736x/97/11/ae/9711ae2ba5f13571a92e852be5878c40.jpg"
              alt="Priyanshu"
            />
            <RoleTitle>Frontend Developer</RoleTitle>
            <MemberName>Priyanshu Patel</MemberName>
            <Paragraph>
              Creating responsive and interactive user interfaces using React.js
              and CSS.
            </Paragraph>
            <Paragraph>
              Collaborating with backend developers to integrate APIs and
              enhance user experience.
            </Paragraph>
          </TeamMemberCard>
        </TeamGrid>
      </ContentContainer>
    </PageContainer>
  );
};

export default About;
