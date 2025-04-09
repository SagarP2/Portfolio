import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useToast } from '../../components/Toast';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-heading);
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: var(--color-primary);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--color-primary-dark);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ParagraphItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const ParagraphHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ParagraphActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  background: ${props => props.danger ? 'rgba(220, 38, 38, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.danger ? 'rgb(248, 113, 113)' : 'var(--color-text)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.danger ? 'rgba(220, 38, 38, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const HighlightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const HighlightItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const HighlightInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const HighlightSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  background: transparent;
  color: var(--color-text);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  
  img {
    max-width: 100%;
    max-height: 300px;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const AboutManagement = () => {
  const [formData, setFormData] = useState({
    title: 'About Us',
    image: '',
    paragraphs: [''],
    highlights: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/about');
      setFormData({
        title: response.data.title || 'About Us',
        image: response.data.image || '',
        paragraphs: response.data.paragraphs || [''],
        highlights: response.data.highlights || []
      });
    } catch (error) {
      console.error('Error fetching about content:', error);
      addToast('Failed to load about content', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...formData.paragraphs];
    newParagraphs[index] = value;
    setFormData({
      ...formData,
      paragraphs: newParagraphs
    });
  };

  const addParagraph = () => {
    setFormData({
      ...formData,
      paragraphs: [...formData.paragraphs, '']
    });
  };

  const removeParagraph = (index) => {
    if (formData.paragraphs.length <= 1) {
      addToast('Cannot remove the last paragraph', 'error');
      return;
    }
    
    const newParagraphs = formData.paragraphs.filter((_, i) => i !== index);
    
    // Update highlights to reflect the removed paragraph
    const newHighlights = formData.highlights.map(highlight => {
      if (highlight.paragraphIndex === index) {
        return null; // Remove highlights for the deleted paragraph
      } else if (highlight.paragraphIndex > index) {
        return {
          ...highlight,
          paragraphIndex: highlight.paragraphIndex - 1 // Adjust index for paragraphs after the deleted one
        };
      }
      return highlight;
    }).filter(Boolean); // Remove null values
    
    setFormData({
      ...formData,
      paragraphs: newParagraphs,
      highlights: newHighlights
    });
  };

  const handleHighlightChange = (index, field, value) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = {
      ...newHighlights[index],
      [field]: field === 'paragraphIndex' ? parseInt(value) : value
    };
    setFormData({
      ...formData,
      highlights: newHighlights
    });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [
        ...formData.highlights,
        { text: '', paragraphIndex: 0 }
      ]
    });
  };

  const removeHighlight = (index) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      highlights: newHighlights
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Validate form data
      if (!formData.title.trim()) {
        addToast('Title is required', 'error');
        setSaving(false);
        return;
      }
      
      if (!formData.image.trim()) {
        addToast('Image URL is required', 'error');
        setSaving(false);
        return;
      }
      
      if (formData.paragraphs.some(p => !p.trim())) {
        addToast('All paragraphs must have content', 'error');
        setSaving(false);
        return;
      }
      
      if (formData.highlights.some(h => !h.text.trim())) {
        addToast('All highlights must have text', 'error');
        setSaving(false);
        return;
      }
      
      console.log('Submitting form data:', formData);
      console.log('Admin token:', localStorage.getItem('admin_token'));
      
      // Send update request
      const response = await axios.put('/api/about', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      
      console.log('Server response:', response.data);
      
      addToast('About content updated successfully', 'success');
    } catch (error) {
      console.error('Error updating about content:', error);
      console.error('Error response:', error.response);
      addToast(error.response?.data?.message || 'Failed to update about content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Title>About Management</Title>
        <Card>
          <p>Loading...</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Title>About Management</Title>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Image URL</Label>
            <Input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
            {formData.image && (
              <ImagePreview>
                <img 
                  src={formData.image} 
                  alt="About page image preview" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x450?text=Invalid+Image+URL';
                  }}
                />
              </ImagePreview>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label>Paragraphs</Label>
            <ParagraphContainer>
              {formData.paragraphs.map((paragraph, index) => (
                <ParagraphItem key={index}>
                  <ParagraphHeader>
                    <Label>Paragraph {index + 1}</Label>
                    <ParagraphActions>
                      <ActionButton 
                        type="button" 
                        onClick={() => removeParagraph(index)}
                        danger
                      >
                        Remove
                      </ActionButton>
                    </ParagraphActions>
                  </ParagraphHeader>
                  <TextArea
                    value={paragraph}
                    onChange={(e) => handleParagraphChange(index, e.target.value)}
                    required
                  />
                </ParagraphItem>
              ))}
            </ParagraphContainer>
            <AddButton type="button" onClick={addParagraph}>
              + Add Paragraph
            </AddButton>
          </FormGroup>
          
          <FormGroup>
            <Label>Highlights</Label>
            <HighlightContainer>
              {formData.highlights.map((highlight, index) => (
                <HighlightItem key={index}>
                  <HighlightInput
                    type="text"
                    value={highlight.text}
                    onChange={(e) => handleHighlightChange(index, 'text', e.target.value)}
                    placeholder="Highlight text"
                  />
                  <HighlightSelect
                    value={highlight.paragraphIndex}
                    onChange={(e) => handleHighlightChange(index, 'paragraphIndex', e.target.value)}
                  >
                    {formData.paragraphs.map((_, i) => (
                      <option key={i} value={i}>
                        Paragraph {i + 1}
                      </option>
                    ))}
                  </HighlightSelect>
                  <ActionButton 
                    type="button" 
                    onClick={() => removeHighlight(index)}
                    danger
                  >
                    Remove
                  </ActionButton>
                </HighlightItem>
              ))}
            </HighlightContainer>
            <AddButton type="button" onClick={addHighlight}>
              + Add Highlight
            </AddButton>
          </FormGroup>
          
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AboutManagement; 