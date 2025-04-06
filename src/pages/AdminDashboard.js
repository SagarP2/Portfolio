import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SessionManager from '../components/SessionManager';
import { refreshSession } from '../utils/sessionUtils';
import ProjectManagement from './admin/ProjectManagement';
import ServiceManagement from './admin/ServiceManagement';
import ContentManagement from './admin/ContentManagement';
import DashboardAnalytics from '../components/DashboardAnalytics';
import NewContent from './admin/NewContent';
import SubServiceManagement from '../components/admin/SubServiceManagement';

const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${props => props.theme.colors.darkBackground};
  color: ${props => props.theme.colors.text};
  position: relative;
  overflow: hidden;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: -20%;
  right: -10%;
  width: 70vw;
  height: 140vh;
  background: ${props => props.theme.gradients.primary};
  transform: rotate(-12deg);
  opacity: 0.04;
  z-index: 0;
  filter: blur(60px);
`;

const Sidebar = styled(motion.div)`
  width: 280px;
  background: rgba(18, 18, 18, 0.6);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2.5rem 1.5rem;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled(motion.div)`
  flex: 1;
  padding: 2.5rem;
  background: ${props => props.theme.colors.background};
  position: relative;
  z-index: 1;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const DashboardTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const NavSection = styled.div`
  flex: 1;
`;

const NavHeader = styled.div`
  color: ${props => props.theme.colors.gray};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
  font-weight: 500;
  position: relative;
  
  ${({ active, theme }) => active && `
    background: rgba(37, 99, 235, 0.1);
    color: ${theme.colors.primary};
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: ${theme.colors.primary};
      border-radius: 0 4px 4px 0;
    }
  `}
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
  }
  
  svg {
    margin-right: 0.75rem;
    width: 18px;
    height: 18px;
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const LogoutButton = styled(motion.button)`
  width: 100%;
  padding: 0.8rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
  
  svg {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const PageTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0;
`;

const ContentCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const BackToSiteButton = styled.div`
  margin-top: 1rem;
`;

const BackToSiteLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.colors.primary};
  }
  
  svg {
    margin-right: 0.75rem;
    width: 18px;
    height: 18px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
`;

const DashboardCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.gradients.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  &:hover::before {
    opacity: 0.05;
  }

  h3 {
    color: ${props => props.theme.colors.text};
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 1;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
    z-index: 1;
  }

  svg {
    width: 32px;
    height: 32px;
    color: ${props => props.theme.colors.primary};
  }
`;

const ManagementCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  h2 {
    color: ${props => props.theme.colors.text};
    margin: 0 0 1.5rem;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <DashboardContainer>
      <BackgroundGradient />
      <Sidebar
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <SidebarHeader>
          <DashboardTitle>Admin Dashboard</DashboardTitle>
          <p>Welcome, {user?.username}</p>
        </SidebarHeader>

        <NavSection>
          <NavHeader>Navigation</NavHeader>
          <NavLink to="/admin" active={location.pathname === '/admin'}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/projects" active={location.pathname === '/admin/projects'}>
            Projects
          </NavLink>
          <NavLink to="/admin/services" active={location.pathname === '/admin/services'}>
            Services
          </NavLink>
          <NavLink to="/admin/content" active={location.pathname === '/admin/content'}>
            Content
          </NavLink>
          <NavLink to="/admin/subservices" active={location.pathname === '/admin/subservices'}>
            Sub-Services
          </NavLink>
        </NavSection>

        <LogoutButton onClick={handleLogout}>
          Logout
        </LogoutButton>
      </Sidebar>

      <MainContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Routes>
          <Route path="/" element={<DashboardAnalytics />} />
          <Route path="/projects" element={<ProjectManagement />} />
          <Route path="/services" element={<ServiceManagement />} />
          <Route path="/content" element={<ContentManagement />} />
          <Route path="/subservices" element={<SubServiceManagement />} />
        </Routes>
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard; 