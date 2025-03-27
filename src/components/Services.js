import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServicesSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  position: relative;
  overflow: hidden;
  background: var(--color-background);
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
  margin-bottom: ${props => props.theme.spacing.xl};
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
  }
`;

const ServicesList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ServiceItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${props => props.theme.spacing.lg} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    .service-arrow {
      transform: translateX(10px);
      color: var(--color-primary);
    }
  }
`;

const ServiceContent = styled.div`
  flex: 1;
  padding-right: ${props => props.theme.spacing.xl};
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: var(--color-gray);
  line-height: 1.6;
`;

const ServiceArrow = styled.span`
  font-size: 1.5rem;
  transition: transform 0.3s ease, color 0.3s ease;
  margin-top: 8px;
`;

const Services = () => {
  const services = [
    {
      title: "UI/UX Design",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been."
    },
    {
      title: "Branding",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been."
    },
    {
      title: "Animation",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been."
    },
    {
      title: "3D Design",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been."
    },
    {
      title: "Graphic Design",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been."
    }
  ];

  return (
    <ServicesSection id="services">
      <Container>
        <SectionHeading
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Services And Works
        </SectionHeading>
        
        <ServicesList
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <ServiceContent>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceContent>
              <ServiceArrow className="service-arrow">→</ServiceArrow>
            </ServiceItem>
          ))}
        </ServicesList>
      </Container>
    </ServicesSection>
  );
};

export default Services; 