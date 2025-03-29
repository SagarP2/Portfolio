import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Link as RouterLink, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SessionManager from '../components/SessionManager';
import { refreshSession } from '../utils/sessionUtils';
import BlogManagement from './BlogManagement';
import ProjectManagement from './ProjectManagement';
import ServiceManagement from './ServiceManagement';
import AboutManagement from './AboutManagement';
import DashboardAnalytics from '../components/DashboardAnalytics';

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
  }
  
  svg {
    margin-right: 0.75rem;
    width: 18px;
    height: 18px;
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

const BackToSiteButton = styled(motion.div)`
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

const AdminDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check authentication on mount and redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    } else {
      // Refresh session when dashboard loads
      refreshSession();
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  const isActive = (path) => {
    return location.pathname === '/admin/dashboard' + path;
  };

  return (
    <DashboardContainer>
      <BackgroundGradient />
      
      <Sidebar
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <SidebarHeader>
          <DashboardTitle>Admin Panel</DashboardTitle>
        </SidebarHeader>
        
        <NavSection>
          <NavHeader>Management</NavHeader>
          <NavLink to="/admin/dashboard" active={isActive('/dashboard') ? 1 : 0}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Overview
          </NavLink>
          <NavLink to="/admin/dashboard/projects" active={isActive('/dashboard/projects') ? 1 : 0}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Projects
          </NavLink>
          <NavLink to="/admin/dashboard/services" active={isActive('/dashboard/services') ? 1 : 0}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Services
          </NavLink>
          <NavLink to="/admin/dashboard/blog" active={isActive('/dashboard/blog') ? 1 : 0}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v10a2 2 0 002 2h5z" />
            </svg>
            Blog
          </NavLink>
          
          <NavHeader style={{ marginTop: '2rem' }}>Content</NavHeader>
          <NavLink to="/admin/dashboard/about" active={isActive('/dashboard/about') ? 1 : 0}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About
          </NavLink>
          <NavLink to="/admin/dashboard/contact" active={isActive('/dashboard/contact') ? 1 : 0}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact
          </NavLink>
        </NavSection>
        
        <LogoutButton 
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </LogoutButton>
        
        <BackToSiteButton
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <BackToSiteLink to="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            View Website
          </BackToSiteLink>
        </BackToSiteButton>
      </Sidebar>
      
      <MainContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Routes>
          <Route path="dashboard" element={
            <>
              <ContentHeader>
                <PageTitle>Dashboard Overview</PageTitle>
              </ContentHeader>
              <DashboardAnalytics />
            </>
          } />
          <Route path="dashboard/projects" element={
            <>
              <ContentHeader>
                <PageTitle>Projects Management</PageTitle>
              </ContentHeader>
              <ProjectManagement />
            </>
          } />
          <Route path="dashboard/services" element={
            <>
              <ContentHeader>
                <PageTitle>Services Management</PageTitle>
              </ContentHeader>
              <ServiceManagement />
            </>
          } />
          <Route path="dashboard/blog" element={
            <>
              <ContentHeader>
                <PageTitle>Blog Management</PageTitle>
              </ContentHeader>
              <BlogManagement />
            </>
          } />
          <Route path="dashboard/about" element={
            <>
              <ContentHeader>
                <PageTitle>About Page Editor</PageTitle>
              </ContentHeader>
              <AboutManagement />
            </>
          } />
          <Route path="dashboard/contact" element={
            <>
              <ContentHeader>
                <PageTitle>Contact Information</PageTitle>
              </ContentHeader>
              <ContentCard
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h3>Edit Contact Details</h3>
                <p>Update your contact information and social media links.</p>
              </ContentCard>
            </>
          } />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </MainContent>
      
      {/* Session manager for handling inactivity timeouts */}
      <SessionManager />
    </DashboardContainer>
  );
};

export default AdminDashboard; 