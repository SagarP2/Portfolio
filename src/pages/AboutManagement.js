import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0;
  color: ${props => props.theme.colors.text};
`;

const SaveButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const ContentCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  color: ${props => props.theme.colors.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TeamMember = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const DeleteButton = styled(motion.button)`
  padding: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
  }
`;

const AddButton = styled(motion.button)`
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  color: ${props => props.theme.colors.text};
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const AboutManagement = () => {
  const [aboutData, setAboutData] = useState({
    title: '',
    subtitle: '',
    description: '',
    mission: '',
    vision: '',
    team: []
  });

  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    role: '',
    bio: ''
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get('/api/about');
      setAboutData(response.data);
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeamMemberChange = (e) => {
    const { name, value } = e.target;
    setNewTeamMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTeamMember = () => {
    if (newTeamMember.name && newTeamMember.role) {
      setAboutData(prev => ({
        ...prev,
        team: [...prev.team, { ...newTeamMember }]
      }));
      setNewTeamMember({ name: '', role: '', bio: '' });
    }
  };

  const handleRemoveTeamMember = (index) => {
    setAboutData(prev => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/about', aboutData);
      alert('About section updated successfully!');
    } catch (error) {
      console.error('Error updating about data:', error);
      alert('Error updating about section. Please try again.');
    }
  };

  return (
    <Container>
      <Header>
        <Title>About Section Management</Title>
        <SaveButton
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Changes
        </SaveButton>
      </Header>

      <ContentCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>Main Content</SectionTitle>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={aboutData.title}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Subtitle</Label>
              <Input
                type="text"
                name="subtitle"
                value={aboutData.subtitle}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <TextArea
                name="description"
                value={aboutData.description}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>Mission & Vision</SectionTitle>
            <FormGroup>
              <Label>Mission Statement</Label>
              <TextArea
                name="mission"
                value={aboutData.mission}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Vision Statement</Label>
              <TextArea
                name="vision"
                value={aboutData.vision}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>Team Members</SectionTitle>
            <TeamSection>
              {aboutData.team.map((member, index) => (
                <TeamMember key={index}>
                  <Input
                    type="text"
                    value={member.name}
                    readOnly
                    placeholder="Name"
                  />
                  <Input
                    type="text"
                    value={member.role}
                    readOnly
                    placeholder="Role"
                  />
                  <DeleteButton
                    onClick={() => handleRemoveTeamMember(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </DeleteButton>
                </TeamMember>
              ))}
              <FormGroup>
                <Label>Add New Team Member</Label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                  <Input
                    type="text"
                    name="name"
                    value={newTeamMember.name}
                    onChange={handleTeamMemberChange}
                    placeholder="Name"
                  />
                  <Input
                    type="text"
                    name="role"
                    value={newTeamMember.role}
                    onChange={handleTeamMemberChange}
                    placeholder="Role"
                  />
                  <Input
                    type="text"
                    name="bio"
                    value={newTeamMember.bio}
                    onChange={handleTeamMemberChange}
                    placeholder="Bio"
                  />
                  <AddButton
                    onClick={handleAddTeamMember}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                  </AddButton>
                </div>
              </FormGroup>
            </TeamSection>
          </Section>
        </Form>
      </ContentCard>
    </Container>
  );
};

export default AboutManagement; 