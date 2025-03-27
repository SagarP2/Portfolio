import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components
const BlogSection = styled(motion.section)`
  min-height: 100vh;
  padding: 8rem 2rem;
 
  position: relative;
  overflow: hidden;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: -30%;
  right: -10%;
  width: 70vw;
  height: 70vh;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0) 70%);
  z-index: 0;
  filter: blur(60px);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const PageHeader = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`;

const PageTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`;

const PageDescription = styled(motion.p)`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(motion.article)`
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${BlogCard}:hover & img {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  
  span {
    font-size: 0.85rem;
    color: ${props => props.theme.colors.gray};
    display: flex;
    align-items: center;
    margin-right: 1rem;
    
    svg {
      margin-right: 0.35rem;
    }
  }
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ReadMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.2s;
  }
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
    
    svg {
      transform: translateX(3px);
    }
  }
`;

// Sample blog data
const sampleBlogs = [
  {
    id: 1,
    title: 'The Future of Web Development in 2023',
    excerpt: 'Explore the emerging trends and technologies shaping the future of web development, from AI integration to new frameworks.',
    image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?auto=format&fit=crop&w=800&q=80',
    date: '2023-06-15',
    category: 'Technology',
    author: 'Alex Johnson'
  },
  {
    id: 2,
    title: 'Designing for Accessibility: Best Practices',
    excerpt: 'Learn how to create websites that are accessible to all users, regardless of abilities or disabilities.',
    image: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=800&q=80',
    date: '2023-05-28',
    category: 'Design',
    author: 'Mia Williams'
  },
  {
    id: 3,
    title: 'Optimizing React Performance in Large Applications',
    excerpt: 'Tips and techniques for maintaining high performance in complex React applications with numerous components.',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80',
    date: '2023-04-10',
    category: 'Development',
    author: 'David Chen'
  },
  {
    id: 4,
    title: 'The Rise of Serverless Architecture',
    excerpt: 'How serverless computing is changing the way we build and deploy applications in the modern web landscape.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    date: '2023-03-22',
    category: 'Cloud',
    author: 'Sarah Miller'
  },
  {
    id: 5,
    title: 'Building Responsive UIs with Tailwind CSS',
    excerpt: 'A deep dive into using Tailwind CSS to create beautiful, responsive user interfaces quickly and efficiently.',
    image: 'https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?auto=format&fit=crop&w=800&q=80',
    date: '2023-02-17',
    category: 'CSS',
    author: 'James Wilson'
  },
  {
    id: 6,
    title: 'The Importance of Cybersecurity in Web Development',
    excerpt: 'Why security should be a top priority for every web developer and how to implement basic security measures.',
    image: 'https://images.unsplash.com/photo-1510511336377-1a9caa095849?auto=format&fit=crop&w=800&q=80',
    date: '2023-01-05',
    category: 'Security',
    author: 'Emma Davis'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchBlogs = async () => {
      setLoading(true);
      // In a real app, you would fetch from an API
      // const response = await fetch('/api/blogs');
      // const data = await response.json();
      
      // Using sample data for now
      setTimeout(() => {
        setBlogs(sampleBlogs);
        setLoading(false);
      }, 800);
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <BlogSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BackgroundGlow />
      
      <Container>
        <PageHeader>
          <PageTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Blog
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Insights, thoughts and tutorials on web development, design, and technology.
          </PageDescription>
        </PageHeader>

        {loading ? (
          <motion.div 
            style={{ textAlign: 'center', padding: '3rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: '0 auto' }}
            >
              <motion.path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ 
                  rotate: 360,
                  pathLength: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </svg>
            <p style={{ marginTop: '1rem' }}>Loading blog posts...</p>
          </motion.div>
        ) : (
          <>
            <BlogGrid
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {blogs.map(blog => (
                <BlogCard key={blog.id} variants={itemVariants}>
                  <BlogImage>
                    <img src={blog.image} alt={blog.title} />
                  </BlogImage>
                  <BlogContent>
                    <BlogMeta>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(blog.date)}
                      </span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {blog.category}
                      </span>
                    </BlogMeta>
                    <BlogTitle>{blog.title}</BlogTitle>
                    <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
                    <ReadMoreButton to={`/blog/${blog.id}`}>
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </ReadMoreButton>
                  </BlogContent>
                </BlogCard>
              ))}
            </BlogGrid>
          </>
        )}
      </Container>
    </BlogSection>
  );
};

export default Blog; 