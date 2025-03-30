import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h1 {
    color: ${props => props.theme.colors.text};
    font-size: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  .meta {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .date {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.875rem;
  }
`;

const Content = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;

  p {
    margin-bottom: 1.5rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }

  svg {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
  }
`;

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/content/${id}`);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <h1>Loading...</h1>
        </Header>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <Header>
          <h1>Post not found</h1>
          <BackButton to="/blog">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </BackButton>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton to="/blog">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Blog
      </BackButton>

      <Header>
        <h1>{post.title}</h1>
        <div className="meta">
          <span>By {post.author}</span>
          <span>•</span>
          <span className="date">{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <TagsContainer>
          {post.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsContainer>
      </Header>

      <Content>
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </Content>
    </Container>
  );
};

export default BlogPost; 