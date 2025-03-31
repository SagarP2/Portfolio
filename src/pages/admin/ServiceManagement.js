import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ServiceForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem 1rem;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem 1rem;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ServiceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  .icon {
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
  }

  .title {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;
  }

  .description {
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
    font-size: 0.9rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: auto;
  }
`;

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      toast.error('Error fetching services');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await axios.put(`/api/services/${editingId}`, formData);
        toast.success('Service updated successfully');
      } else {
        await axios.post('/api/services', formData);
        toast.success('Service created successfully');
      }

      setFormData({ title: '', description: '', icon: '' });
      setEditingId(null);
      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving service');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon
    });
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      await axios.delete(`/api/services/${id}`);
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      toast.error('Error deleting service');
    }
  };

  return (
    <Container>
      <ServiceForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Service Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <TextArea
          placeholder="Service Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Icon (SVG path or class name)"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          required
        />
        <Button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {editingId ? 'Update Service' : 'Add Service'}
        </Button>
      </ServiceForm>

      <ServiceList>
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="icon" dangerouslySetInnerHTML={{ __html: service.icon }} />
            <h3 className="title">{service.title}</h3>
            <p className="description">{service.description}</p>
            <div className="actions">
              <Button
                onClick={() => handleEdit(service)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(service._id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ background: '#dc2626' }}
              >
                Delete
              </Button>
            </div>
          </ServiceCard>
        ))}
      </ServiceList>
    </Container>
  );
};

export default ServiceManagement; 