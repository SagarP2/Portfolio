import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components
const BlogDetailSection = styled(motion.section)`
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
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.gray};
  text-decoration: none;
  font-size: 0.95rem;
  margin-bottom: 2rem;
  transition: color 0.2s;
  
  svg {
    margin-right: 0.5rem;
    transition: transform 0.2s;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    
    svg {
      transform: translateX(-3px);
    }
  }
`;

const BlogHeader = styled.div`
  margin-bottom: 3rem;
`;

const BlogImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BlogTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  
  span {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.gray};
    display: flex;
    align-items: center;
    margin-right: 1.5rem;
    margin-bottom: 0.5rem;
    
    svg {
      margin-right: 0.5rem;
      width: 16px;
      height: 16px;
    }
  }
`;

const BlogContent = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    margin: 2.5rem 0 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: ${props => props.theme.colors.gray};
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
    author: 'Alex Johnson',
    content: `
      <p>The web development landscape continues to evolve at a breathtaking pace, with new technologies, frameworks, and methodologies emerging regularly. As we move through 2023, several key trends are shaping the future of web development and changing how developers approach their craft.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>Artificial intelligence is revolutionizing web development by automating repetitive tasks, suggesting code improvements, and even generating entire components based on natural language descriptions. Tools like GitHub Copilot and AI-powered code completion are becoming indispensable for many developers, increasing productivity and allowing them to focus on more creative aspects of development.</p>
      
      <h2>WebAssembly Goes Mainstream</h2>
      <p>WebAssembly (Wasm) is gaining significant traction as it allows high-performance code written in languages like C++, Rust, and Go to run in the browser. This technology bridges the gap between web and native applications, enabling complex applications like video editing tools and games to run efficiently in the browser.</p>
      
      <h2>Serverless Architecture and Edge Computing</h2>
      <p>The shift towards serverless architecture continues to gain momentum, with more developers embracing the benefits of reduced operational complexity and improved scalability. Alongside this, edge computing is moving processing closer to the user, reducing latency and improving performance for web applications.</p>
      
      <blockquote>
        "The combination of serverless and edge computing is creating a new paradigm where web applications can be both highly scalable and incredibly responsive, regardless of user location."
      </blockquote>
      
      <h2>Micro-Frontends</h2>
      <p>As applications grow in complexity, the micro-frontend architecture is becoming more popular. This approach extends microservice concepts to frontend development, allowing teams to work independently on different parts of the application using their preferred technologies.</p>
      
      <h3>Key Benefits of Micro-Frontends</h3>
      <ul>
        <li>Independent deployment of application parts</li>
        <li>Technology flexibility for different teams</li>
        <li>Improved scalability of development</li>
        <li>Better fault isolation</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The future of web development looks incredibly dynamic, with AI assistance, performance improvements through WebAssembly and edge computing, and new architectural patterns all contributing to more powerful and user-friendly web experiences. Developers who stay adaptable and continue learning will be well-positioned to thrive in this evolving landscape.</p>
    `
  },
  // Additional sample blog posts would be here
];

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchBlog = async () => {
      setLoading(true);
      
      // In a real app, you would fetch from an API
      // const response = await fetch(`/api/blogs/${id}`);
      // const data = await response.json();
      
      // Using sample data for now
      setTimeout(() => {
        const found = sampleBlogs.find(blog => blog.id === parseInt(id, 10));
        setBlog(found || null);
        setLoading(false);
      }, 800);
    };

    fetchBlog();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <BlogDetailSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Container>
          <motion.div 
            style={{ textAlign: 'center', padding: '5rem 0' }}
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
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            <p style={{ marginTop: '1rem' }}>Loading blog post...</p>
          </motion.div>
        </Container>
      </BlogDetailSection>
    );
  }

  if (!blog) {
    return (
      <BlogDetailSection>
        <Container>
          <BackButton to="/blog">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </BackButton>
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <h2>Blog post not found</h2>
            <p>The blog post you're looking for doesn't exist or has been removed.</p>
          </div>
        </Container>
      </BlogDetailSection>
    );
  }

  return (
    <BlogDetailSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BackgroundGlow />
      
      <Container>
        <BackButton to="/blog">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </BackButton>
        
        <BlogHeader>
          <BlogImage>
            <img src={blog.image} alt={blog.title} />
          </BlogImage>
          
          <BlogTitle>{blog.title}</BlogTitle>
          
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
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {blog.author}
            </span>
          </BlogMeta>
        </BlogHeader>
        
        <BlogContent dangerouslySetInnerHTML={{ __html: blog.content }} />
      </Container>
    </BlogDetailSection>
  );
};

export default BlogDetail; 