import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import API from '../../api';

const ServiceManagementContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const ServiceForm = styled.form`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};

  label {
    display: block;
    margin-bottom: ${props => props.theme.spacing.xs};
    color: var(--color-text);
  }

  input, textarea {
    width: 100%;
    padding: ${props => props.theme.spacing.sm};
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const Button = styled.button`
  background: var(--color-primary);
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-primary-light);
  }

  &.delete {
    background: var(--color-error);
    margin-left: ${props => props.theme.spacing.sm};

    &:hover {
      background: var(--color-error-light);
    }
  }
`;

const FeatureList = styled.div`
  margin-top: ${props => props.theme.spacing.md};
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: var(--color-primary);
  font-size: 1.2rem;
  gap: 1rem;

  svg {
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--color-error);
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  margin: 1rem 0;
`;

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    process: '',
    features: [''],
    subServices: [{
      title: '',
      description: '',
      features: ['']
    }]
  });

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
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, field, index = null, subIndex = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      if (subIndex !== null) {
        // Handle sub-service features
        const updatedSubServices = [...formData.subServices];
        updatedSubServices[index].features[subIndex] = value;
        setFormData({ ...formData, subServices: updatedSubServices });
      } else if (name === 'subServiceTitle' || name === 'subServiceDescription') {
        // Handle sub-service title or description
        const updatedSubServices = [...formData.subServices];
        updatedSubServices[index][name === 'subServiceTitle' ? 'title' : 'description'] = value;
        setFormData({ ...formData, subServices: updatedSubServices });
      } else {
        // Handle main service features
        const updatedFeatures = [...formData.features];
        updatedFeatures[index] = value;
        setFormData({ ...formData, features: updatedFeatures });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addFeature = (type, index = null) => {
    if (type === 'main') {
      setFormData({ ...formData, features: [...formData.features, ''] });
    } else if (type === 'sub') {
      const updatedSubServices = [...formData.subServices];
      updatedSubServices[index].features.push('');
      setFormData({ ...formData, subServices: updatedSubServices });
    }
  };

  const addSubService = () => {
    setFormData({
      ...formData,
      subServices: [...formData.subServices, { title: '', description: '', features: [''] }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await API.put(`/api/services/${editingService._id}`, formData);
      } else {
        await API.post('/api/services', formData);
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await API.delete(`/api/services/${id}`);
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      process: '',
      features: [''],
      subServices: [{
        title: '',
        description: '',
        features: ['']
      }]
    });
    setEditingService(null);
  };

  const editService = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      longDescription: service.longDescription || '',
      process: service.process || '',
      features: service.features || [''],
      subServices: service.subServices || [{
        title: '',
        description: '',
        features: ['']
      }]
    });
  };

  if (loading) {
    return (
      <ServiceManagementContainer>
        <LoadingSpinner>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="6"/>
            <line x1="12" y1="18" x2="12" y2="22"/>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
            <line x1="2" y1="12" x2="6" y2="12"/>
            <line x1="18" y1="12" x2="22" y2="12"/>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
          </svg>
          Loading services...
        </LoadingSpinner>
      </ServiceManagementContainer>
    );
  }

  if (error) {
    return (
      <ServiceManagementContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </ServiceManagementContainer>
    );
  }

  return (
    <ServiceManagementContainer>
      <h2>Service Management</h2>
      
      <ServiceForm onSubmit={handleSubmit}>
        <FormGroup>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Long Description</label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={(e) => handleInputChange(e)}
          />
        </FormGroup>

        <FormGroup>
          <label>Process</label>
          <textarea
            name="process"
            value={formData.process}
            onChange={(e) => handleInputChange(e)}
          />
        </FormGroup>

        <FormGroup>
          <label>Main Features</label>
          {formData.features.map((feature, index) => (
            <FeatureItem key={index}>
              <input
                type="text"
                value={feature}
                onChange={(e) => handleInputChange(e, null, index)}
                placeholder="Enter feature"
              />
            </FeatureItem>
          ))}
          <Button type="button" onClick={() => addFeature('main')}>
            Add Feature
          </Button>
        </FormGroup>

        <h3>Sub Services</h3>
        {formData.subServices.map((subService, index) => (
          <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <FormGroup>
              <label>Sub Service Title</label>
              <input
                type="text"
                name="subServiceTitle"
                value={subService.title}
                onChange={(e) => handleInputChange(e, null, index)}
                placeholder="Enter sub service title"
              />
            </FormGroup>

            <FormGroup>
              <label>Sub Service Description</label>
              <textarea
                name="subServiceDescription"
                value={subService.description}
                onChange={(e) => handleInputChange(e, null, index)}
                placeholder="Enter sub service description"
              />
            </FormGroup>

            <FormGroup>
              <label>Sub Service Features</label>
              {subService.features.map((feature, subIndex) => (
                <FeatureItem key={subIndex}>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleInputChange(e, null, index, subIndex)}
                    placeholder="Enter feature"
                  />
                </FeatureItem>
              ))}
              <Button type="button" onClick={() => addFeature('sub', index)}>
                Add Feature
              </Button>
            </FormGroup>
          </div>
        ))}

        <Button type="button" onClick={addSubService}>
          Add Sub Service
        </Button>

        <div style={{ marginTop: '20px' }}>
          <Button type="submit">
            {editingService ? 'Update Service' : 'Add Service'}
          </Button>
          {editingService && (
            <Button type="button" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </ServiceForm>

      <ServiceGrid>
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div style={{ marginTop: '15px' }}>
              <Button onClick={() => editService(service)}>Edit</Button>
              <Button className="delete" onClick={() => handleDelete(service._id)}>
                Delete
              </Button>
            </div>
          </ServiceCard>
        ))}
      </ServiceGrid>
    </ServiceManagementContainer>
  );
};

export default ServiceManagement; 