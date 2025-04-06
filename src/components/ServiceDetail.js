import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

const ServiceDetailSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  position: relative;
  overflow: hidden;
  background: var(--color-background);
  min-height: 80vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: var(--color-gray);

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-primary-light);
    }
  }
`;

const ServiceHeader = styled(motion.div)`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const ServiceTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: ${props => props.theme.spacing.md};
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: var(--color-primary);
    margin-top: ${props => props.theme.spacing.sm};
  }
`;

const ServiceStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  background: rgba(255, 255, 255, 0.03);
  padding: ${props => props.theme.spacing.lg};
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.md};

  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  p {
    color: var(--color-gray);
    font-size: 1rem;
  }
`;

const ServiceContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  h2 {
    font-size: 1.8rem;
    color: var(--color-text);
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    color: var(--color-gray);
    line-height: 1.8;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: fit-content;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-gray);
    margin-bottom: ${props => props.theme.spacing.xs};
    
    &:before {
      content: '→';
      color: var(--color-primary);
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: var(--color-primary);
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  margin-top: ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-primary-light);
    transform: translateY(-2px);
  }
`;

const LoadingSpinner = styled(motion.div)`
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

const ErrorMessage = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  color: var(--color-error);
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  margin: 1rem 0;
`;

const SubServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const SubServiceCard = styled(motion.div)`
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

const PriceTag = styled.span`
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
`;

const PopularBadge = styled.span`
  background: var(--color-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const SubServiceFeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    color: var(--color-text-secondary);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '✓';
      color: var(--color-primary);
    }
  }
`;

const DeliverablesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    color: var(--color-text-secondary);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '•';
      color: var(--color-primary);
    }
  }
`;

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await API.get(`/api/services/slug/${slug}`);
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to fetch service');
        }
        
        setService(response.data.data);

        // Fetch sub-services for this service
        const subServicesResponse = await API.get(`/api/services/${response.data.data._id}/subservices`);
        if (!subServicesResponse.data.success) {
          throw new Error(subServicesResponse.data.message || 'Failed to fetch sub-services');
        }
        setSubServices(subServicesResponse.data.data);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError(err.message || 'Failed to load service');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [slug]);

  if (loading) {
    return (
      <ServiceDetailSection>
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
          Loading service details...
        </LoadingSpinner>
      </ServiceDetailSection>
    );
  }

  if (error) {
    return <ServiceDetailSection>{error}</ServiceDetailSection>;
  }

  if (!service) {
    return <ServiceDetailSection>Service not found</ServiceDetailSection>;
  }

  return (
    <ServiceDetailSection>
      <Container>
        <Breadcrumb>
          <Link to="/">Home</Link> / <Link to="/services">Services</Link> / <span>{service.title}</span>
        </Breadcrumb>

        <ServiceHeader
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ServiceTitle>{service.title}</ServiceTitle>
        </ServiceHeader>

        <ServiceStats>
          {service.stats && service.stats.map((stat, index) => (
            <StatItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </StatItem>
          ))}
        </ServiceStats>

        <ServiceContent>
          <MainContent>
            <h2>Overview</h2>
            <p>{service.description}</p>
            {service.longDescription && <p>{service.longDescription}</p>}
            
            {service.process && (
              <>
                <h2>Our Process</h2>
                <p>{service.process}</p>
              </>
            )}
            
            <CTAButton to="/contact">Get Started</CTAButton>
          </MainContent>

          <Sidebar>
            <h2>Key Features</h2>
            <FeaturesList>
              {service.features && service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </FeaturesList>
          </Sidebar>
        </ServiceContent>

        <SubServicesGrid>
          {subServices.map((subService) => (
            <SubServiceCard
              key={subService._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>
                {subService.icon && <img src={subService.icon} alt={subService.title} />}
                {subService.title}
                {subService.isPopular && <PopularBadge>Popular</PopularBadge>}
              </h3>
              <PriceTag>${subService.price}</PriceTag>
              <p>{subService.description}</p>
              <p><strong>Duration:</strong> {subService.duration}</p>
              
              {subService.features && subService.features.length > 0 && (
                <>
                  <h4>Features</h4>
                  <SubServiceFeaturesList>
                    {subService.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </SubServiceFeaturesList>
                </>
              )}

              {subService.deliverables && subService.deliverables.length > 0 && (
                <>
                  <h4>Deliverables</h4>
                  <DeliverablesList>
                    {subService.deliverables.map((deliverable, index) => (
                      <li key={index}>{deliverable}</li>
                    ))}
                  </DeliverablesList>
                </>
              )}
            </SubServiceCard>
          ))}
        </SubServicesGrid>
      </Container>
    </ServiceDetailSection>
  );
};

export default ServiceDetail; 