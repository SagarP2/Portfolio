import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SessionManager from '../components/SessionManager';
import { refreshSession } from '../utils/sessionUtils';
import ProjectManagement from './admin/ProjectManagement';
import ServiceManagement from './admin/ServiceManagement';
import AboutManagement from './admin/AboutManagement';
import ContentManagement from './admin/ContentManagement';
import DashboardAnalytics from '../components/DashboardAnalytics';
import NewContent from './admin/NewContent';

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
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <DashboardContainer>
      <BackgroundGradient />
      <Sidebar>
        <SidebarHeader>
          <DashboardTitle>Admin Dashboard</DashboardTitle>
        </SidebarHeader>
        <NavSection>
          <NavHeader>Main</NavHeader>
          <NavLink to="/admin" active={isActive('/admin')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </NavLink>
          <NavHeader>Management</NavHeader>
          <NavLink to="/admin/blog" active={isActive('/admin/blog')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
            Blog
          </NavLink>
          <NavLink to="/admin/projects" active={isActive('/admin/projects')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Projects
          </NavLink>
          <NavLink to="/admin/services" active={isActive('/admin/services')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Services
          </NavLink>
          <NavLink to="/admin/about" active={isActive('/admin/about')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About
          </NavLink>
        </NavSection>
        <LogoutButton onClick={logout}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </LogoutButton>
      </Sidebar>

      <MainContent>
        <Routes>
          <Route path="/" element={
            <>
              <ContentHeader>
                <PageTitle>Dashboard Overview</PageTitle>
              </ContentHeader>
              <DashboardAnalytics />
              <Grid>
                <DashboardCard
                  onClick={() => navigate('/admin/blog')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                    </svg>
                    Blog Management
                  </h3>
                  <p>Create and manage your blog posts, categories, and content</p>
                </DashboardCard>

                <DashboardCard
                  onClick={() => navigate('/admin/projects')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Project Management
                  </h3>
                  <p>Showcase and organize your portfolio projects and case studies</p>
                </DashboardCard>

                <DashboardCard
                  onClick={() => navigate('/admin/services')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Service Management
                  </h3>
                  <p>Update and maintain your professional services and offerings</p>
                </DashboardCard>

                <DashboardCard
                  onClick={() => navigate('/admin/about')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    About Management
                  </h3>
                  <p>Edit your profile, skills, experience, and personal information</p>
                </DashboardCard>
              </Grid>
            </>
          } />
          <Route path="blog" element={
            <ManagementCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
                Blog Management
              </h2>
              <ContentManagement />
            </ManagementCard>
          } />
          <Route path="blog/new" element={
            <ManagementCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Blog Post
              </h2>
              <NewContent />
            </ManagementCard>
          } />
          <Route path="projects" element={
            <ManagementCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Project Management
              </h2>
              <ProjectManagement />
            </ManagementCard>
          } />
          <Route path="services" element={
            <ManagementCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Service Management
              </h2>
              <ServiceManagement />
            </ManagementCard>
          } />
          <Route path="about" element={
            <ManagementCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About Management
              </h2>
              <AboutManagement />
            </ManagementCard>
          } />
        </Routes>
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard; 