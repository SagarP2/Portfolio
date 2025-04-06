import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ServiceManagement from './ServiceManagement';
import SubServiceManagement from './SubServiceManagement';

const AdminPanelContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--color-background);
`;

const Sidebar = styled.div`
  width: 250px;
  background: rgba(255, 255, 255, 0.03);
  padding: ${props => props.theme.spacing.lg};
  border-right: 1px solid rgba(255, 255, 255, 0.05);
`;

const SidebarItem = styled(motion.div)`
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  border-radius: 8px;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.3s ease;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.xl};
  overflow-y: auto;
`;

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('services');

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServiceManagement />;
      case 'subservices':
        return <SubServiceManagement />;
      default:
        return <ServiceManagement />;
    }
  };

  return (
    <AdminPanelContainer>
      <Sidebar>
        <h2>Admin Panel</h2>
        <SidebarItem
          active={activeTab === 'services'}
          onClick={() => setActiveTab('services')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Service Management
        </SidebarItem>
        <SidebarItem
          active={activeTab === 'subservices'}
          onClick={() => setActiveTab('subservices')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sub-Service Management
        </SidebarItem>
      </Sidebar>
      <MainContent>
        {renderContent()}
      </MainContent>
    </AdminPanelContainer>
  );
};

export default AdminPanel; 