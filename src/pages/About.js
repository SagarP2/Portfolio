import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  padding: 6rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  background-color: var(--color-background);
  color: var(--color-text);
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--color-heading);
  font-weight: 700;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
`;

const Highlight = styled.span`
  color: var(--color-primary);
  font-weight: 600;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.2rem;
  color: var(--color-text-secondary);
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.2rem;
  color: #ef4444;
  text-align: center;
  padding: 2rem;
`;

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get('/about');
        
        if (!response.data) {
          throw new Error('No data received from the server');
        }
        
        if (!response.data.title || !response.data.paragraphs) {
          throw new Error('Invalid data format received from the server');
        }
        
        setAboutData(response.data);
      } catch (err) {
        console.error('Error fetching about data:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        
        setError(
          err.response?.data?.message || 
          err.message || 
          'Failed to load about content. Please try again later.'
        );
        
        // Set default data if there's an error
        setAboutData({
          title: 'About Us',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          paragraphs: [
            'Welcome to Techveda. We are experiencing technical difficulties loading our about content.',
            'Please try refreshing the page or contact support if the issue persists.'
          ],
          highlights: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Function to render paragraphs with highlights
  const renderParagraphs = () => {
    if (!aboutData || !aboutData.paragraphs) {
      return null;
    }

    return aboutData.paragraphs.map((paragraph, index) => {
      // Check if there are any highlights for this paragraph
      const paragraphHighlights = aboutData.highlights?.filter(h => h.paragraphIndex === index) || [];
      
      if (paragraphHighlights.length === 0) {
        // No highlights, just render the paragraph
        return (
          <Paragraph key={index}>
            {paragraph}
          </Paragraph>
        );
      }
      
      // There are highlights, need to split the paragraph and insert highlights
      let paragraphText = paragraph;
      const parts = [];
      let lastIndex = 0;
      
      // Sort highlights by their position in the text
      const sortedHighlights = [...paragraphHighlights].sort((a, b) => {
        const aIndex = paragraphText.indexOf(a.text);
        const bIndex = paragraphText.indexOf(b.text);
        return aIndex - bIndex;
      });
      
      // Process each highlight
      for (const highlight of sortedHighlights) {
        const highlightIndex = paragraphText.indexOf(highlight.text, lastIndex);
        
        if (highlightIndex === -1) {
          continue;
        }
        
        // Add text before the highlight
        if (highlightIndex > lastIndex) {
          parts.push(paragraphText.substring(lastIndex, highlightIndex));
        }
        
        // Add the highlighted text
        parts.push(
          <Highlight key={`highlight-${index}-${highlightIndex}`}>
            {highlight.text}
          </Highlight>
        );
        
        lastIndex = highlightIndex + highlight.text.length;
      }
      
      // Add any remaining text
      if (lastIndex < paragraphText.length) {
        parts.push(paragraphText.substring(lastIndex));
      }
      
      return (
        <Paragraph key={index}>
          {parts}
        </Paragraph>
      );
    });
  };

  if (loading) {
    return (
      <PageContainer>
        <ContentContainer>
          <LoadingContainer>Loading about content...</LoadingContainer>
        </ContentContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ContentContainer>
          <ErrorContainer>{error}</ErrorContainer>
        </ContentContainer>
      </PageContainer>
    );
  }

  if (!aboutData) {
    return (
      <PageContainer>
        <ContentContainer>
          <ErrorContainer>No about content available.</ErrorContainer>
        </ContentContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentContainer>
        <Title>{aboutData.title || 'About Us'}</Title>
        <Grid>
          <ImageContainer>
            <img 
              src={aboutData.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"} 
              alt="About Techveda" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
              }}
            />
          </ImageContainer>
          <ContentSection>
            {renderParagraphs()}
          </ContentSection>
        </Grid>
      </ContentContainer>
    </PageContainer>
  );
};

export default About; 