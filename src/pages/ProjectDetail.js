import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primaryDark};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    color: ${(props) => props.theme.colors.text};
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .meta {
    color: ${(props) => props.theme.colors.textSecondary};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 1rem;
    flex-wrap: wrap;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const MainImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const SecondaryImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const Content = styled.div`
  color: ${(props) => props.theme.colors.text};
  line-height: 1.8;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const ContentSection = styled(Section)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
`;

const SectionContent = styled.div`
  color: ${(props) => props.theme.colors.text};
  line-height: 1.8;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h3`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const TechnologiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const Technology = styled.span`
  background: ${(props) => props.theme.colors.primary}20;
  color: ${(props) => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Tag = styled.span`
  background: ${(props) => props.theme.colors.textSecondary}20;
  color: ${(props) => props.theme.colors.textSecondary};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  flex-wrap: wrap;
`;

const ProjectLink = styled.a`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primaryDark};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`/api/projects/${id}`);
      setProject(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching project:", error);
      setError("Failed to fetch project details");
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <div className="loading-spinner">Loading...</div>
      </LoadingContainer>
    );
  }

  if (error || !project) {
    return (
      <Container>
        <Header>
          <h1>Project not found</h1>
          <BackButton to="/projects">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Projects
          </BackButton>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton to="/projects">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Projects
      </BackButton>

      <Header>
        <h1>{project.title}</h1>
        {project.subtitle && <h2>{project.subtitle}</h2>}
      </Header>

      <ImageContainer>
        {project.mainimage && (
          <MainImage src={project.mainimage} alt={project.title} />
        )}
      </ImageContainer>
      <ProjectLinks>
        {project.gitHubLink && (
          <ProjectLink
            href={project.gitHubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              />
            </svg>
            View on GitHub
          </ProjectLink>
        )}
        {project.officialWebsiteLink && (
          <ProjectLink
            href={project.officialWebsiteLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            Visit Website
          </ProjectLink>
        )}
        {project.demoLink && (
          <ProjectLink
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </ProjectLink>
        )}
      </ProjectLinks>
      <ContentSection>
        <SectionContent>{project.shortDescription}</SectionContent>
      </ContentSection>
      {project.technologies && project.technologies.length > 0 && (
        <Section>
          <SectionTitle>Technologies Used</SectionTitle>
          <TechnologiesContainer>
            {project.technologies.map((tech, index) => (
              <Technology key={index}>{tech}</Technology>
            ))}
          </TechnologiesContainer>
        </Section>
      )}

      {project.services && project.services.length > 0 && (
        <Section>
          <SectionTitle>Services</SectionTitle>
          <TagsContainer>
            {project.services.map((service, index) => (
              <Tag key={index}>{service}</Tag>
            ))}
          </TagsContainer>
        </Section>
      )}

      {project.industries && project.industries.length > 0 && (
        <Section>
          <SectionTitle>Industries</SectionTitle>
          <TagsContainer>
            {project.industries.map((industry, index) => (
              <Tag key={index}>{industry}</Tag>
            ))}
          </TagsContainer>
        </Section>
      )}
      
      <ContentSection>
        <SectionTitle>Technical Details</SectionTitle>
        <SectionContent>{project.technicalDescription}</SectionContent>
      </ContentSection>

<<<<<<< HEAD
      <ContentSection>
        <SectionTitle>Learning Outcomes</SectionTitle>
        <SectionContent>{project.learningDescription}</SectionContent>
      </ContentSection>

      {project.secondaryimage && (
        <SecondaryImage
          src={project.secondaryimage}
          alt={`${project.title} - Additional view`}
        />
      )}
=======
      <ProjectLinks>
        {project.gitHubLink && (
          <ProjectLink href={project.gitHubLink} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            View on GitHub
          </ProjectLink>
        )}
        {project.officialWebsiteLink && (
          <ProjectLink href={project.officialWebsiteLink} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Visit Website
          </ProjectLink>
        )}
        
      </ProjectLinks>
>>>>>>> 5d9b5ccc33725272fddbc10fb00b9349b3b3f90f
    </Container>
  );
};

export default ProjectDetail;
