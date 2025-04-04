import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useToast } from './Toast';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid ${props => props.recent ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
`;

const StatTitle = styled.h3`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.recent ? '#10B981' : props.theme.colors.text};
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
`;

const StatChange = styled.div`
  font-size: 0.9rem;
  color: ${props => props.positive ? '#10B981' : '#EF4444'};
`;

const ActivitySection = styled.div`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ActivitySectionTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.2rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.h4`
  color: ${props => props.recent ? '#10B981' : props.theme.colors.text};
  margin: 0;
  font-size: 0.95rem;
  transition: color 0.3s ease;
`;

const ActivityTime = styled.p`
  color: ${props => props.theme.colors.gray};
  margin: 0;
  font-size: 0.85rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const DashboardAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: { count: '0', recent: false },
    totalServices: { count: '0', recent: false },
    totalBlogs: { count: '0', recent: false },
    totalVisitors: { count: '0', recent: false }
  });
  const { addToast } = useToast();

  const isRecent = (date) => {
    const activityDate = new Date(date);
    const now = new Date();
    const hoursDiff = Math.abs(now - activityDate) / 36e5; // Convert milliseconds to hours
    return hoursDiff <= 48; // Return true if activity is within last 48 hours
  };

  const fetchStats = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      };

      // Fetch total projects
      const projectsResponse = await axios.get('/api/projects', config);
      const projects = projectsResponse.data;
      const recentProject = projects.some(project => isRecent(project.updatedAt || project.createdAt));

      // Fetch total services
      const servicesResponse = await axios.get('/api/services', config);
      const services = servicesResponse.data.data;
      const recentService = services.some(service => isRecent(service.createdAt));

      // Fetch total blogs
      const blogsResponse = await axios.get('/api/content', config);
      const blogs = blogsResponse.data;
      const recentBlog = blogs.some(blog => isRecent(blog.date));

      setStats({
        totalProjects: { count: projects.length.toString(), recent: recentProject },
        totalServices: { count: services.length.toString(), recent: recentService },
        totalBlogs: { count: blogs.length.toString(), recent: recentBlog },
        totalVisitors: { count: '0', recent: false }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      addToast('Error fetching statistics', 'error');
    }
  };

  const fetchRecentActivities = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      };

      // Fetch recent blogs
      const blogsResponse = await axios.get('/api/content', config);
      const recentBlogs = blogsResponse.data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 2)
        .map(blog => ({
          icon: '📝',
          title: `New blog post: ${blog.title}`,
          time: new Date(blog.date).toLocaleDateString(),
          date: blog.date,
          isRecent: isRecent(blog.date)
        }));

      // Fetch recent projects
      const projectsResponse = await axios.get('/api/projects', config);
      const recentProjects = projectsResponse.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 2)
        .map(project => ({
          icon: '🛠️',
          title: `Project updated: ${project.title}`,
          time: new Date(project.updatedAt).toLocaleDateString(),
          date: project.updatedAt,
          isRecent: isRecent(project.updatedAt)
        }));

      // Fetch recent services
      const servicesResponse = await axios.get('/api/services', config);
      const recentServices = servicesResponse.data.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 2)
        .map(service => ({
          icon: '⭐',
          title: `New service: ${service.title}`,
          time: new Date(service.createdAt).toLocaleDateString(),
          date: service.createdAt,
          isRecent: isRecent(service.createdAt)
        }));

      // Combine all activities and sort by time
      const allActivities = [...recentBlogs, ...recentProjects, ...recentServices]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);

      setRecentActivities(allActivities);
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      addToast('Error fetching recent activities', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentActivities();
  }, []);

  return (
    <>
      <StatsGrid>
        {Object.entries(stats).map(([key, value], index) => (
          <StatCard
            key={key}
            recent={value.recent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <StatTitle>{key.replace(/([A-Z])/g, ' $1').trim()}</StatTitle>
            <StatValue recent={value.recent}>{value.count}</StatValue>
            <StatChange positive={value.recent}>+0%</StatChange>
          </StatCard>
        ))}
      </StatsGrid>

      <ActivitySection>
        <ActivityHeader>
          <ActivitySectionTitle>Recent Activity</ActivitySectionTitle>
        </ActivityHeader>
        {loading ? (
          <LoadingSpinner>Loading...</LoadingSpinner>
        ) : (
          <ActivityList>
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={activity.title}
                as={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ActivityIcon>{activity.icon}</ActivityIcon>
                <ActivityContent>
                  <ActivityTitle recent={activity.isRecent}>{activity.title}</ActivityTitle>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </ActivityList>
        )}
      </ActivitySection>
    </>
  );
};

export default DashboardAnalytics; 