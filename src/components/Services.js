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
  }

  p {
    font-size: 1.2rem;
    color: var(--color-text-secondary);
    max-width: 800px;
    margin: 0 auto;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  h3 {
    color: var(--color-text);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 24px;
      height: 24px;
    }
  }

  p {
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
  }
`;

const ServiceLink = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-primary-light);
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
            transition={{ duration: 0.3 }}
          >
            <h3>
              {service.icon && <img src={service.icon} alt={service.title} />}
              {service.title}
            </h3>
            <p>{service.description}</p>
            <ServiceLink to={`/services/${service.slug}`}>
              Learn More
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