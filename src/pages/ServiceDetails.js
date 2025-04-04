import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import API from '../api';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ServiceTitle = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SubServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const SubServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const SubServiceImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SubServiceContent = styled.div`
  padding: 1.5rem;
`;

const SubServiceTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const SubServiceDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: ${props => props.theme.colors.primary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.error};
  padding: 2rem;
`;

const ServiceDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        console.log('Fetching service with slug:', slug); // Debug log
        
        // Try the services endpoint instead
        const response = await API.get(`/api/services/getById/${slug}`);
        
        console.log('API Response:', response); // Debug log
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to fetch service details');
        }
        
        const serviceData = response.data.data;
        console.log('Service data:', serviceData); // Debug log
        
        setService(serviceData);
      } catch (err) {
        console.error('Error fetching service details:', err);
        setError(err.message || 'Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchServiceDetails();
    }
  }, [slug]);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading...</LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (!service) {
    return (
      <Container>
        <ErrorMessage>Service not found</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <ServiceHeader>
        <ServiceTitle>{service.title}</ServiceTitle>
        <ServiceDescription>{service.description}</ServiceDescription>
      </ServiceHeader>

      <SubServicesGrid>
        {service.subServices?.map((subService, index) => (
          <SubServiceCard key={index}>
            {subService.imageUrl && (
              <SubServiceImage image={subService.imageUrl} />
            )}
            <SubServiceContent>
              <SubServiceTitle>{subService.title}</SubServiceTitle>
              <SubServiceDescription>
                {subService.description}
              </SubServiceDescription>
            </SubServiceContent>
          </SubServiceCard>
        ))}
      </SubServicesGrid>
    </Container>
  );
};

export default ServiceDetails; 