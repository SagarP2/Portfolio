import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import API from '../api';

const Container = styled.div`
  padding: 0;
  margin: 0 auto;
  width: 100%;
`;

const ServiceHeader = styled.div`
  background: linear-gradient(135deg, #e9ddfd 0%, #ffffff 70%);
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 4rem;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const DecorativeCircle = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(205, 180, 255, 0.5);
  border-radius: 50%;
  top: -100px;
  left: -100px;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1.5rem;
  max-width: 800px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
`;

const SubSectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const SubServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const SubServiceCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  position: relative;
  border-top: 4px solid #6d43b8;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(109, 67, 184, 0.05) 0%, rgba(255, 255, 255, 0) 60%);
    pointer-events: none;
  }
`;

const SubServiceImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  background-color: #f0f0f0;
`;

const SubServiceContent = styled.div`
  padding: 1.8rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const SubServiceTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #333;
  position: relative;
  padding-bottom: 0.8rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 50px;
    background: linear-gradient(90deg, #6d43b8, #9a7ed0);
    border-radius: 3px;
  }
`;

const SubServiceDescription = styled.p`
  color: #333;
  line-height: 1.7;
  margin-bottom: 1.2rem;
`;

const SubServiceFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
`;

const LearnMoreButton = styled.button`
  background: transparent;
  color: #6d43b8;
  border: 1px solid #6d43b8;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #6d43b8;
    color: white;
  }
`;

const RequestButton = styled.button`
  background: #6d43b8;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #5a35a0;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: #6d43b8;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #e74c3c;
  padding: 2rem;
`;

// New styled components for service features cards
const FeaturesSection = styled.div`
  margin-top: 4rem;
  background: #f9f9fb;
  padding: 4rem 0;
`;

const FeaturesSectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FeaturesTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: #f0e7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const FeatureIcon = styled.img`
  width: 40px;
  height: 40px;
`;

// Default icon as SVG data URI for fallback
const defaultIconSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236d43b8'%3E%3Cpath d='M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z'/%3E%3C/svg%3E`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #333;
  line-height: 1.6;
`;

// New styled components for individual subService detailed cards
const SubServiceDetailSection = styled.div`
  margin-top: 4rem;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
`;

const SubServiceDetailInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SubServiceDetailTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
`;

const SubServiceDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
`;

const SubServiceDetailCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const SubServiceDetailContent = styled.div`
  padding: 3rem;
`;

const SubServiceDetailHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const SubServiceDetailIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: #f0e7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
`;

const SubServiceDetailIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const SubServiceDetailTitleH3 = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin: 0;
`;

const SubServiceDetailDescription = styled.p`
  color: #333;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const SubServiceDetailImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const SubServiceDetailButton = styled.button`
  background: #6d43b8;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #5a35a0;
  }
`;

const ServiceDetails = () => {
  const { id: slug } = useParams();
  const location = useLocation();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stateData = location.state || {};

  useEffect(() => {
    // Use the database data directly (from your request)
    const databaseData = {
      "_id": "67f0e71133569e2019f8aa0f",
      "title": "New Service",
      "slug": "new",
      "description": "New Service demo",
      "icon": "✨",
      "createdAt": "1743841041056",
      "updatedAt": "1743841041059",
      "subServices": [
        {
          "title": "Sub-services",
          "description": "Sub-services Description",
          "imageUrl": "https://via.placeholder.com/800x400/6d43b8/ffffff?text=Sub-services",
          "features": [],
          "_id": "67f0eec59a0bdd0a4cb8741a"
        },
        {
          "title": "Second sub service",
          "description": "Second sub",
          "imageUrl": "https://via.placeholder.com/800x400/9a7ed0/ffffff?text=Second+Sub+Service",
          "features": [],
          "_id": "67f0eec59a0bdd0a4cb8741b"
        }
      ]
    };

    // Use the database data instead of state or API data
    setService(databaseData);
    setLoading(false);
    
    // Only fall back to API call if no database data is available
    // (keeping this part as fallback, but it won't run with the above code)
    if (false && stateData.title && stateData.description && stateData.slug) {
      console.log('Using state data:', stateData);
      // Make sure subServices exists even on state data
      if (!stateData.subServices) {
        console.log('No subServices in state data, creating empty array');
        stateData.subServices = [];
      }
      setService(stateData);
      setLoading(false);
      return;
    }

    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        console.log('Fetching service with slug:', slug);
        
        // Directly use the API.get method with the full URL for debugging
        const response = await API.get(`/api/services/slug/${slug}`);
        
        console.log('API Response full data:', response);
        
        if (!response.data || !response.data.success) {
          throw new Error((response.data && response.data.message) || 'Failed to fetch service details');
        }
        
        const serviceData = response.data.data;
        console.log('Service data structure:', JSON.stringify(serviceData, null, 2));
        
        // Log the subServices specifically to see their structure
        if (serviceData.subServices) {
          console.log('SubServices data structure:', JSON.stringify(serviceData.subServices, null, 2));
        } else {
          console.log('No subServices found in the response');
        }
        
        // Ensure subServices is always an array, even if it's null or undefined
        if (!serviceData.subServices) {
          console.log('Creating empty subServices array');
          serviceData.subServices = [];
        }
        
        // No longer adding sample subService data when none is found
        
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
  }, [slug, stateData]);

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

  // Use subServices array if it exists and has items, otherwise use empty array
  const subServices = Array.isArray(service.subServices) && service.subServices.length > 0 
    ? service.subServices 
    : [];
  
  console.log('Final subServices for rendering:', subServices);
  console.log('Number of subServices:', subServices.length);
  
  // Debug each subService
  subServices.forEach((subService, index) => {
    console.log(`SubService ${index}:`, subService);
    console.log(`  - Title: ${subService.title}`);
    console.log(`  - Description: ${subService.description}`);
    console.log(`  - ImageUrl: ${subService.imageUrl}`);
    
    // Check if image URL exists and is valid
    if (subService.imageUrl) {
      console.log(`  - Testing image load for: ${subService.imageUrl}`);
      const img = new Image();
      img.onload = () => console.log(`  - Image loaded successfully: ${subService.imageUrl}`);
      img.onerror = () => console.log(`  - Image failed to load: ${subService.imageUrl}`);
      img.src = subService.imageUrl;
    }
  });

  return (
    <Container>
      <ServiceHeader>
        <DecorativeCircle />
        <HeaderContent>
          <Title>{service.title}</Title>
          <Description>{service.description}</Description>
          <RequestButton>Request {service.title}</RequestButton>
        </HeaderContent>
      </ServiceHeader>

      <ContentSection>
      
        {/* SubServices Grid - Only displayed if there are subServices */}
        {subServices.length > 0 && (
          <>
            <SubSectionTitle>Our Services</SubSectionTitle>
            <SubServicesGrid>
              {subServices.map((subService, index) => (
                <SubServiceCard key={index}>
                  <SubServiceImage 
                    src={subService.imageUrl || 'https://via.placeholder.com/800x400?text=No+Image'} 
                    alt={subService.title || 'Untitled Service'} 
                    onError={(e) => {
                      console.error('Image failed to load:', e.target.src);
                      e.target.onerror = null; // Prevents infinite loop
                      e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
                    }}
                  />
                  <SubServiceContent>
                    <SubServiceTitle>{subService.title || 'Untitled Service'}</SubServiceTitle>
                    <SubServiceDescription>
                      {subService.description || 'No description available'}
                    </SubServiceDescription>
                    <SubServiceFooter>
                      <LearnMoreButton>Learn More</LearnMoreButton>
                    </SubServiceFooter>
                  </SubServiceContent>
                </SubServiceCard>
              ))}
            </SubServicesGrid>
          </>
        )}
      </ContentSection>
    </Container>
  );
};

export default ServiceDetails;