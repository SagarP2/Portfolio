import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Button = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const ContentCard = styled.div`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.inputBg};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.inputBg};
  color: ${props => props.theme.colors.text};
  min-height: 150px;
  resize: vertical;
  margin-bottom: 1rem;
`;

const ImagePreview = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const AboutManagement = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    skills: '',
    experience: '',
    education: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement about section update functionality
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <Header>
        <h2>About Page Management</h2>
        <Button
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Changes
        </Button>
      </Header>

      <ContentCard>
        <Form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>Basic Information</SectionTitle>
            <Input
              type="text"
              name="title"
              placeholder="Your Name"
              value={formData.title}
              onChange={handleChange}
            />
            <TextArea
              name="description"
              placeholder="About Me"
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="image"
              placeholder="Profile Image URL"
              value={formData.image}
              onChange={handleChange}
            />
            {formData.image && (
              <ImagePreview>
                <PreviewImage src={formData.image} alt="Profile" />
              </ImagePreview>
            )}
          </Section>

          <Section>
            <SectionTitle>Skills</SectionTitle>
            <TextArea
              name="skills"
              placeholder="List your skills (one per line)"
              value={formData.skills}
              onChange={handleChange}
            />
          </Section>

          <Section>
            <SectionTitle>Experience</SectionTitle>
            <TextArea
              name="experience"
              placeholder="Describe your work experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </Section>

          <Section>
            <SectionTitle>Education</SectionTitle>
            <TextArea
              name="education"
              placeholder="List your educational background"
              value={formData.education}
              onChange={handleChange}
            />
          </Section>
        </Form>
      </ContentCard>
    </Container>
  );
};

export default AboutManagement; 