import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import API from '../api';

const ServicesContainer = styled.div`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const ServicesHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 3rem;
    color: var(--color-text);
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      width: 60px;
      height: 4px;
      background: var(--color-primary);
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 2px;
    }
  }

  p {
    font-size: 1.2rem;
    color: var(--color-text-secondary);
    max-width: 800px;
    margin: 1.5rem auto 0;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  height: 80px;
  width: 80px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
  box-shadow: 0 8px 20px rgba(var(--color-primary-rgb), 0.3);
  font-size: 32px;
  color: white;
  margin: 0 auto 1.5rem;
  transition: all 0.4s ease;
  
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

const ServiceCard = styled(motion.div)`
  position: relative;
  background: rgba(25, 25, 30, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 2.5rem 2rem;
  transition: all 0.4s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(var(--color-primary-rgb), 0.2);
    
    &:before {
      opacity: 1;
    }
    
    ${IconWrapper} {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 12px 30px rgba(var(--color-primary-rgb), 0.4);
    }
  }

  h3 {
    color: var(--color-text);
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    color: var(--color-text-secondary);
    margin-bottom: 2rem;
    text-align: center;
    line-height: 1.6;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 4.8em; /* 3 lines * 1.6 line-height */
  }
`;

const ServiceLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  border-radius: 30px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  box-shadow: 0 4px 15px rgba(var(--color-primary-rgb), 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  svg {
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;
  }
  
  span {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(var(--color-primary-rgb), 0.4);
    
    &:before {
      opacity: 1;
    }
    
    svg {
      transform: translateX(3px);
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: var(--color-primary);
  font-size: 1.2rem;
  gap: 1rem;

  svg {
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--color-error);
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  margin: 1rem 0;
`;

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await API.get('/api/services');
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to fetch services');
        }
        
        setServices(response.data.data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message || 'Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <ServicesContainer>
        <LoadingSpinner>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="6"/>
            <line x1="12" y1="18" x2="12" y2="22"/>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
            <line x1="2" y1="12" x2="6" y2="12"/>
            <line x1="18" y1="12" x2="22" y2="12"/>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
          </svg>
          Loading services...
        </LoadingSpinner>
      </ServicesContainer>
    );
  }

  if (error) {
    return (
      <ServicesContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </ServicesContainer>
    );
  }

  return (
    <ServicesContainer>
      <ServicesHeader>
        <h1>Our Services</h1>
        <p>Explore our comprehensive range of services designed to meet your business needs</p>
      </ServicesHeader>

      <ServicesGrid>
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (services.indexOf(service) % 3) }}
            whileHover={{ scale: 1.02 }}
          >
            <IconWrapper>
              {service.icon && (
                service.icon.startsWith('http') ? 
                <img src={service.icon} alt={service.title} /> : 
                <span>{service.icon}</span>
              )}
            </IconWrapper>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ServiceLink 
              to={`/services/${service.slug}`}
              state={{ 
                title: service.title, 
                description: service.description, 
                slug: service.slug,
                icon: service.icon,
                subServices: service.subServices
              }}
            >
              <span>Learn More</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </ServiceLink>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};

export default Services;