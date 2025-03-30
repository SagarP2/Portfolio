import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Button = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ServiceCard = styled.div`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ServiceIcon = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.primary}10;
  color: ${props => props.theme.colors.primary};
  font-size: 3rem;
`;

const ServiceContent = styled.div`
  padding: 1.5rem;
`;

const ServiceTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const EditButton = styled(Button)`
  background: ${props => props.theme.colors.secondary};
  flex: 1;

  &:hover {
    background: ${props => props.theme.colors.secondaryDark};
  }
`;

const DeleteButton = styled(Button)`
  background: ${props => props.theme.colors.error};
  flex: 1;

  &:hover {
    background: ${props => props.theme.colors.errorDark};
  }
`;

const ServiceManagement = () => {
  // TODO: Implement service management functionality
  return (
    <Container>
      <Header>
        <h2>Service Management</h2>
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add New Service
        </Button>
      </Header>

      <ServiceGrid>
        {/* Service cards will be rendered here */}
      </ServiceGrid>
    </Container>
  );
};

export default ServiceManagement; 