import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import API from '../../api';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  h1 {
    color: ${props => props.theme.colors.text};
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      width: 24px;
      height: 24px;
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const AddButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceIcon = styled.div`
  width: 100%;
  height: 120px;
  background: ${props => props.theme.colors.primary}15;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  svg {
    width: 48px;
    height: 48px;
    color: ${props => props.theme.colors.primary};
  }
`;

const ServiceContent = styled.div`
  padding: 1.5rem;
`;

const ServiceTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 18px;
    height: 18px;
    color: ${props => props.theme.colors.primary};
  }
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &.edit {
    background: ${props => props.theme.colors.primary}15;
    color: ${props => props.theme.colors.primary};
  }

  &.delete {
    background: ${props => props.theme.colors.error}15;
    color: ${props => props.theme.colors.error};
  }

  &:hover {
    transform: translateY(-2px);
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
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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
  border-radius: 8px;
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
  border-radius: 8px;
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

const SubServiceSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const SubServiceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const SubServiceItem = styled.div`
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  position: relative;
`;

const RemoveSubServiceButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${props => props.theme.colors.error}15;
  color: ${props => props.theme.colors.error};
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.error}25;
  }
`;

const AddSubServiceButton = styled(motion.button)`
  margin-top: 1rem;
  background: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  
  &:hover {
    background: ${props => props.theme.colors.primary}25;
  }
`;

const LearnMoreButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    slug: '',
    subServices: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API.get('/api/services');
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch services');
      }

      if (!Array.isArray(response.data.data)) {
        throw new Error('Expected data to be an array');
      }

      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError(error.message || 'Failed to load services');
      addToast(error.message || 'Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await API.put(`/api/services/${editingService._id}`, formData);
        addToast('Service updated successfully', 'success');
      } else {
        await API.post('/api/services', formData);
        addToast('Service created successfully', 'success');
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      addToast(error.message || 'Failed to save service', 'error');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || '',
      description: service.description || '',
      icon: service.icon || '',
      slug: service.slug || '',
      subServices: service.subServices || []
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await API.delete(`/api/services/${id}`);
        addToast('Service deleted successfully', 'success');
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        addToast(error.message || 'Failed to delete service', 'error');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubServiceChange = (index, field, value) => {
    setFormData(prev => {
      const newSubServices = [...prev.subServices];
      newSubServices[index] = {
        ...newSubServices[index],
        [field]: value
      };
      return {
        ...prev,
        subServices: newSubServices
      };
    });
  };

  const addSubService = () => {
    setFormData(prev => ({
      ...prev,
      subServices: [...prev.subServices, { title: '', description: '', imageUrl: '' }]
    }));
  };

  const removeSubService = (index) => {
    setFormData(prev => ({
      ...prev,
      subServices: prev.subServices.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      icon: '',
      slug: '',
      subServices: []
    });
    setShowModal(false);
  };

  const handleLearnMore = (service) => {
    console.log('Navigating to service:', service); // Debug log
    navigate(`/services/${service._id}`);  // Changed to match the existing route pattern
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <h1>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            Service Management
          </h1>
        </Header>
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading services...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          Service Management
        </h1>
        <AddButton
          onClick={() => {
            setEditingService(null);
            setFormData({
              title: '',
              description: '',
              icon: '',
              slug: '',
              subServices: []
            });
            setShowModal(true);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add New Service
        </AddButton>
      </Header>

      <ServiceGrid>
        {services.map(service => (
          <ServiceCard
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ServiceIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </ServiceIcon>
            <ServiceContent>
              <ServiceTitle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                {service.title}
              </ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              {service.features && service.features.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ color: props => props.theme.colors.text, marginBottom: '0.5rem' }}>Features:</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {service.features.map((feature, index) => (
                      <li key={index} style={{ 
                        color: props => props.theme.colors.textSecondary,
                        marginBottom: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <ActionButtons>
                <Button 
                  className="edit" 
                  onClick={() => handleEdit(service)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit
                </Button>
                <Button 
                  className="delete" 
                  onClick={() => handleDelete(service._id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  Delete
                </Button>
              </ActionButtons>
              
              <LearnMoreButton
                onClick={() => handleLearnMore(service)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Learn More
              </LearnMoreButton>
            </ServiceContent>
          </ServiceCard>
        ))}
      </ServiceGrid>

      {showModal && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
            <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter service title"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <TextArea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter service description"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="icon">Icon (SVG path)</Label>
                <Input
                  type="text"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="Enter SVG path"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Enter service slug"
                  required
                />
              </FormGroup>

              <SubServiceSection>
                <Label>Sub Services</Label>
                <SubServiceList>
                  {formData.subServices.map((subService, index) => (
                    <SubServiceItem key={index}>
                      <RemoveSubServiceButton
                        onClick={() => removeSubService(index)}
                        type="button"
                      >
                        ×
                      </RemoveSubServiceButton>
                      <FormGroup>
                        <Label>Sub Service Title</Label>
                        <Input
                          type="text"
                          value={subService.title}
                          onChange={(e) => handleSubServiceChange(index, 'title', e.target.value)}
                          placeholder="Enter sub service title"
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Sub Service Description</Label>
                        <TextArea
                          value={subService.description}
                          onChange={(e) => handleSubServiceChange(index, 'description', e.target.value)}
                          placeholder="Enter sub service description"
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Image URL</Label>
                        <Input
                          type="url"
                          value={subService.imageUrl || ''}
                          onChange={(e) => handleSubServiceChange(index, 'imageUrl', e.target.value)}
                          placeholder="Enter image URL for sub service"
                        />
                      </FormGroup>
                    </SubServiceItem>
                  ))}
                </SubServiceList>
                <AddSubServiceButton
                  type="button"
                  onClick={addSubService}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add Sub Service
                </AddSubServiceButton>
              </SubServiceSection>

              <Button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default ServiceManagement; 