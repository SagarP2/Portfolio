import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/Toast';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: ${props => props.theme.colors.background};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: ${props => props.theme.colors.cardBg};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    color: ${props => props.theme.colors.text};
    margin: 0;
  }
`;

const Button = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
    transform: none;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ContentCard = styled.div`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ContentImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ContentContent = styled.div`
  padding: 1.5rem;
`;

const ContentTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
`;

const ContentText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled(Button)`
  background: ${props => props.theme.colors.secondary};
  flex: 1;

  &:hover {
    background: ${props => props.theme.colors.secondaryDark};
  }
`;

const DeleteButton = styled(Button)`
  background: ${props => props.theme.colors.error};
  flex: 1;

  &:hover {
    background: ${props => props.theme.colors.errorDark};
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.cardBg};
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  h2 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  width: 100%;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  width: 100%;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
`;

const ContentManagement = () => {
  const [contents, setContents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    image: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await axios.get('/api/content');
      setContents(response.data);
    } catch (error) {
      console.error('Error fetching contents:', error);
      addToast('Failed to fetch content list', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim() || !formData.date) {
        addToast('Please fill in all required fields', 'error');
        setIsSubmitting(false);
        return;
      }

      // Create the content data object
      const contentData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        date: formData.date,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
      };

      console.log('Submitting content data:', contentData);

      if (editingContent) {
        await axios.patch(`/api/content/${editingContent._id}`, contentData);
        addToast('Content updated successfully', 'success');
      } else {
        const response = await axios.post('/api/content', contentData);
        console.log('Server response:', response.data);
        addToast('Content saved successfully', 'success');
      }

      handleCloseModal();
      fetchContents();
    } catch (error) {
      console.error('Error saving content:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = 'Failed to save content. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
        if (error.response.data.errors) {
          errorMessage += ': ' + error.response.data.errors.join(', ');
        }
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      addToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      content: content.content,
      author: content.author,
      tags: content.tags.join(', '),
      image: content.image,
      date: new Date(content.date).toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await axios.delete(`/api/content/${id}`);
        addToast('Content deleted successfully', 'success');
        fetchContents();
      } catch (error) {
        console.error('Error deleting content:', error);
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            'Failed to delete content. Please try again.';
        addToast(errorMessage, 'error');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContent(null);
    setFormData({
      title: '',
      content: '',
      author: '',
      tags: '',
      image: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Container>
      <Header>
        <h2>Content Management</h2>
        <Button
          onClick={() => {
            setEditingContent(null);
            setFormData({
              title: '',
              content: '',
              author: '',
              tags: '',
              image: '',
              date: new Date().toISOString().split('T')[0]
            });
            setIsModalOpen(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add New Content
        </Button>
      </Header>

      <ContentGrid>
        {contents.map(content => (
          <ContentCard key={content._id}>
            <ContentContent>
              <ContentTitle>{content.title}</ContentTitle>
              <ContentText>{content.content.substring(0, 150)}...</ContentText>
              <TagsContainer>
                {content.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagsContainer>
              <MetaInfo>
                <span>{content.author}</span>
                <span>{new Date(content.date).toLocaleDateString()}</span>
              </MetaInfo>
              <ActionButtons>
                <EditButton
                  onClick={() => handleEdit(content)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Edit
                </EditButton>
                <DeleteButton
                  onClick={() => handleDelete(content._id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete
                </DeleteButton>
              </ActionButtons>
            </ContentContent>
          </ContentCard>
        ))}
      </ContentGrid>

      {isModalOpen && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <h2>{editingContent ? 'Edit Content' : 'Add New Content'}</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter content title"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="content">Content</Label>
                <TextArea
                  id="content"
                  value={formData.content}
                  onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter content details"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="author">Author</Label>
                <Input
                  type="text"
                  id="author"
                  value={formData.author}
                  onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Enter author name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="e.g., technology, business, news"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  type="text"
                  id="image"
                  value={formData.image}
                  onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="Enter image URL"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </FormGroup>

              <Button 
                type="submit" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : (editingContent ? 'Update Content' : 'Add Content')}
              </Button>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default ContentManagement; 