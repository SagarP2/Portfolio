import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const StatTitle = styled.h3`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
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
  color: ${props => props.theme.colors.text};
  margin: 0;
  font-size: 0.95rem;
`;

const ActivityTime = styled.p`
  color: ${props => props.theme.colors.gray};
  margin: 0;
  font-size: 0.85rem;
`;

const DashboardAnalytics = () => {
  // Mock data - replace with real data from your API
  const stats = [
    {
      title: 'Total Visitors',
      value: '12,345',
      change: '+12.5%',
      positive: true
    },
    {
      title: 'Active Users',
      value: '3,456',
      change: '+8.2%',
      positive: true
    },
    {
      title: 'Page Views',
      value: '45,678',
      change: '+15.3%',
      positive: true
    },
    {
      title: 'Bounce Rate',
      value: '32.1%',
      change: '-2.4%',
      positive: true
    }
  ];

  const recentActivity = [
    {
      icon: '📝',
      title: 'New blog post published',
      time: '2 hours ago'
    },
    {
      icon: '🛠️',
      title: 'Project "Website Redesign" updated',
      time: '4 hours ago'
    },
    {
      icon: '📧',
      title: 'New contact form submission',
      time: '5 hours ago'
    },
    {
      icon: '⭐',
      title: 'New service added',
      time: '6 hours ago'
    }
  ];

  return (
    <>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <StatTitle>{stat.title}</StatTitle>
            <StatValue>{stat.value}</StatValue>
            <StatChange positive={stat.positive}>{stat.change}</StatChange>
          </StatCard>
        ))}
      </StatsGrid>

      <ActivitySection>
        <ActivityHeader>
          <ActivitySectionTitle>Recent Activity</ActivitySectionTitle>
        </ActivityHeader>
        <ActivityList>
          {recentActivity.map((activity, index) => (
            <ActivityItem
              key={activity.title}
              as={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ActivityIcon>{activity.icon}</ActivityIcon>
              <ActivityContent>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivityList>
      </ActivitySection>
    </>
  );
};

export default DashboardAnalytics; 