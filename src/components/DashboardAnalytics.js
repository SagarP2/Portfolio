import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AnalyticsGrid = styled.div`
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatTitle = styled.h4`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin: 0;
  font-weight: 500;
`;

const StatValue = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
  margin: 0;
  font-weight: 600;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.positive ? '#10B981' : '#EF4444'};
`;

const ChartContainer = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
`;

const RecentActivity = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
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
      <AnalyticsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatTitle>{stat.title}</StatTitle>
            <StatValue>{stat.value}</StatValue>
            <StatChange positive={stat.positive}>
              {stat.change}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.positive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"} />
              </svg>
            </StatChange>
          </StatCard>
        ))}
      </AnalyticsGrid>

      <ChartContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <ChartTitle>Visitor Analytics</ChartTitle>
        {/* Add your chart component here */}
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          Chart Component Placeholder
        </div>
      </ChartContainer>

      <RecentActivity
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <ChartTitle>Recent Activity</ChartTitle>
        <ActivityList>
          {recentActivity.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon>{activity.icon}</ActivityIcon>
              <ActivityContent>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivity>
    </>
  );
};

export default DashboardAnalytics; 