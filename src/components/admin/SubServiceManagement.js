import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const SubServiceContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const ServiceSelector = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  h3 {
    color: var(--color-text);
    margin-bottom: 1rem;
  }

  select {
    width: 100%;
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
  }
`;

const SubServiceForm = styled.form`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }

  input, textarea {
    width: 100%;
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
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary-dark);
  }

  &.delete {
    background: var(--color-error);
    margin-left: 1rem;

    &:hover {
      background: var(--color-error-dark);
    }
  }
`;

const SubServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SubServiceCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  transition: all 0.3s ease;

  h3 {
    color: var(--color-text);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    color: var(--color-text-secondary);
    margin-bottom: 1rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const PriceTag = styled.span`
  background: var(--color-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const PopularBadge = styled.span`
  background: var(--color-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const SubServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [subServices, setSubServices] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    features: [''],
    deliverables: [''],
    icon: '',
    coverImage: '',
    isPopular: false
  });
  const [editingSubService, setEditingSubService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedService) {
      fetchSubServices();
    }
  }, [selectedService]);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      setError('Failed to fetch services');
    }
  };

  const fetchSubServices = async () => {
    try {
      const response = await axios.get(`/api/services/${selectedService}/subservices`);
      setSubServices(response.data);
    } catch (error) {
      setError('Failed to fetch sub-services');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.title.trim()) throw new Error('Title is required');
      if (!formData.description.trim()) throw new Error('Description is required');
      if (!formData.price.trim()) throw new Error('Price is required');
      if (!formData.duration.trim()) throw new Error('Duration is required');

      if (editingSubService) {
        await axios.put(`/api/services/${selectedService}/subservices/${editingSubService._id}`, formData);
        setSuccess('Sub-service updated successfully');
      } else {
        await axios.post(`/api/services/${selectedService}/subservices`, formData);
        setSuccess('Sub-service created successfully');
      }

      fetchSubServices();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sub-service?')) {
      setLoading(true);
      try {
        await axios.delete(`/api/services/${selectedService}/subservices/${id}`);
        setSuccess('Sub-service deleted successfully');
        fetchSubServices();
      } catch (error) {
        setError(error.response?.data?.message || error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  const editSubService = (subService) => {
    setEditingSubService(subService);
    setFormData({
      title: subService.title,
      description: subService.description,
      price: subService.price,
      duration: subService.duration,
      features: subService.features,
      deliverables: subService.deliverables,
      icon: subService.icon,
      coverImage: subService.coverImage,
      isPopular: subService.isPopular
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      features: [''],
      deliverables: [''],
      icon: '',
      coverImage: '',
      isPopular: false
    });
    setEditingSubService(null);
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const addDeliverable = () => {
    setFormData({
      ...formData,
      deliverables: [...formData.deliverables, '']
    });
  };

  const removeDeliverable = (index) => {
    const newDeliverables = formData.deliverables.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      deliverables: newDeliverables
    });
  };

  const updateDeliverable = (index, value) => {
    const newDeliverables = [...formData.deliverables];
    newDeliverables[index] = value;
    setFormData({
      ...formData,
      deliverables: newDeliverables
    });
  };

  return (
    <SubServiceContainer>
      <h2>Sub-Service Management</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <ServiceSelector>
        <h3>Select Main Service</h3>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          required
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.title}
            </option>
          ))}
        </select>
      </ServiceSelector>

      {selectedService && (
        <>
          <SubServiceForm onSubmit={handleSubmit}>
            <FormGroup>
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Price</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    required
                  />
                  <Button type="button" onClick={() => removeFeature(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addFeature}>
                Add Feature
              </Button>
            </FormGroup>

            <FormGroup>
              <label>Deliverables</label>
              {formData.deliverables.map((deliverable, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={deliverable}
                    onChange={(e) => updateDeliverable(index, e.target.value)}
                    required
                  />
                  <Button type="button" onClick={() => removeDeliverable(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addDeliverable}>
                Add Deliverable
              </Button>
            </FormGroup>

            <FormGroup>
              <label>Icon URL</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <label>Cover Image URL</label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <label>
                <input
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                />
                Mark as Popular
              </label>
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="submit" disabled={loading}>
                {editingSubService ? 'Update' : 'Create'} Sub-Service
              </Button>
              {editingSubService && (
                <Button type="button" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </SubServiceForm>

          <SubServiceGrid>
            {subServices.map((subService) => (
              <SubServiceCard
                key={subService._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>
                  {subService.title}
                  {subService.isPopular && <PopularBadge>Popular</PopularBadge>}
                </h3>
                <PriceTag>${subService.price}</PriceTag>
                <p>{subService.description}</p>
                <p><strong>Duration:</strong> {subService.duration}</p>
                <div className="actions">
                  <Button onClick={() => editSubService(subService)}>Edit</Button>
                  <Button className="delete" onClick={() => handleDelete(subService._id)}>
                    Delete
                  </Button>
                </div>
              </SubServiceCard>
            ))}
          </SubServiceGrid>
        </>
      )}
    </SubServiceContainer>
  );
};

export default SubServiceManagement; 