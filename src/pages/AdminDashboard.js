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

const DashboardCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBg};
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  h3 {
    color: ${props => props.theme.colors.text};
    margin: 0 0 0.5rem;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await refreshSession();
      } catch (error) {
        console.error('Session refresh failed:', error);
        navigate('/admin/login');
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <DashboardContainer>
      <BackgroundGradient />
      <Sidebar
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <SidebarHeader>
          <DashboardTitle>Admin Panel</DashboardTitle>
        </SidebarHeader>

        <NavSection>
          <NavHeader>Main</NavHeader>
          <NavLink to="/admin" active={isActive('/admin')}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/projects" active={isActive('/admin/projects')}>
            Projects
          </NavLink>
          <NavLink to="/admin/services" active={isActive('/admin/services')}>
            Services
          </NavLink>
          <NavLink to="/admin/about" active={isActive('/admin/about')}>
            About
          </NavLink>
          <NavLink to="/admin/content" active={isActive('/admin/content')}>
            Content
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
      </Sidebar>

      <MainContent>
        <ContentHeader>
          <PageTitle>Dashboard Overview</PageTitle>
        </ContentHeader>

        <Routes>
          <Route path="/" element={<DashboardAnalytics />} />
          <Route path="/projects" element={<ProjectManagement />} />
          <Route path="/services" element={<ServiceManagement />} />
          <Route path="/about" element={<AboutManagement />} />
          <Route path="/content" element={<ContentManagement />} />
          <Route path="/content/new" element={<NewContent />} />
        </Routes>

        {location.pathname !== '/admin' && (
          <BackToSiteButton>
            <BackToSiteLink to="/admin">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </BackToSiteLink>
          </BackToSiteButton>
        )}

        <Grid>
          <DashboardCard
            onClick={() => navigate('/admin/content')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3>Content Management</h3>
            <p>Manage your website content</p>
          </DashboardCard>

          <DashboardCard
            onClick={() => navigate('/admin/content/new')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3>Create New Content</h3>
            <p>Add new content to your website</p>
          </DashboardCard>
        </Grid>
      </MainContent>
      <SessionManager />
    </DashboardContainer>
  );
};

export default AdminDashboard; 