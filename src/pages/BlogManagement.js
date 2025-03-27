import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const PageTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0;
`;

const AddButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 16px;
    height: 16px;
  }
  
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  }
  
  &:hover {
    color: ${props => !props.active && props.theme.colors.text};
  }
`;

const BlogTable = styled.div`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const TableHeaderCell = styled.div`
  padding: 0 0.5rem;
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const TableCell = styled.div`
  padding: 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BlogTitle = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    object-fit: cover;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 50px;
  background: ${props => 
    props.status === 'published' 
      ? 'rgba(16, 185, 129, 0.2)' 
      : props.status === 'draft' 
        ? 'rgba(245, 158, 11, 0.2)' 
        : 'rgba(239, 68, 68, 0.2)'
  };
  color: ${props => 
    props.status === 'published' 
      ? 'rgb(16, 185, 129)' 
      : props.status === 'draft' 
        ? 'rgb(245, 158, 11)' 
        : 'rgb(239, 68, 68)'
  };
`;

const ActionsCell = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray};
  padding: 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${props => props.delete ? 'rgb(239, 68, 68)' : props.theme.colors.primary};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  
  svg {
    width: 48px;
    height: 48px;
    color: ${props => props.theme.colors.gray};
    margin-bottom: 1rem;
  }
  
  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  p {
    color: ${props => props.theme.colors.gray};
    margin-bottom: 1.5rem;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  padding: 2rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalTitle = styled.h3`
  font-size: 1.4rem;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.colors.text};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.secondary};
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: ${props => props.theme.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.05);
  }
`;

// Sample blog data for the admin panel
const sampleAdminBlogs = [
  {
    id: 1,
    title: 'The Future of Web Development in 2023',
    excerpt: 'Explore the emerging trends and technologies shaping the future of web development, from AI integration to new frameworks.',
    content: 'Full blog content would go here...',
    image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?auto=format&fit=crop&w=800&q=80',
    date: '2023-06-15',
    category: 'Technology',
    author: 'Alex Johnson',
    status: 'published'
  },
  {
    id: 2,
    title: 'Designing for Accessibility: Best Practices',
    excerpt: 'Learn how to create websites that are accessible to all users, regardless of abilities or disabilities.',
    content: 'Full blog content would go here...',
    image: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=800&q=80',
    date: '2023-05-28',
    category: 'Design',
    author: 'Mia Williams',
    status: 'published'
  },
  {
    id: 3,
    title: 'Optimizing React Performance in Large Applications',
    excerpt: 'Tips and techniques for maintaining high performance in complex React applications with numerous components.',
    content: 'Full blog content would go here...',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80',
    date: '2023-04-10',
    category: 'Development',
    author: 'David Chen',
    status: 'draft'
  },
  {
    id: 4,
    title: 'The Rise of Serverless Architecture',
    excerpt: 'How serverless computing is changing the way we build and deploy applications in the modern web landscape.',
    content: 'Full blog content would go here...',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    date: '2023-03-22',
    category: 'Cloud',
    author: 'Sarah Miller',
    status: 'archived'
  }
];

const BlogManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'draft',
    image: ''
  });

  useEffect(() => {
    // Simulate API call
    const fetchBlogs = async () => {
      setLoading(true);
      // In a real app, you would fetch from an API
      // const response = await fetch('/api/admin/blogs');
      // const data = await response.json();
      
      // Using sample data for now
      setTimeout(() => {
        setBlogs(sampleAdminBlogs);
        setFilteredBlogs(sampleAdminBlogs);
        setLoading(false);
      }, 800);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter(blog => blog.status === activeTab));
    }
  }, [activeTab, blogs]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setCurrentBlog(blog);
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        status: blog.status,
        image: blog.image
      });
    } else {
      setCurrentBlog(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        status: 'draft',
        image: ''
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentBlog(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send a request to your API
    // For now, we'll just update the local state
    
    if (currentBlog) {
      // Update existing blog
      const updatedBlogs = blogs.map(blog => 
        blog.id === currentBlog.id 
          ? { ...blog, ...formData, date: new Date().toISOString().split('T')[0] }
          : blog
      );
      setBlogs(updatedBlogs);
    } else {
      // Create new blog
      const newBlog = {
        id: blogs.length + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0],
        author: 'Admin User' // In a real app, this would be the current user
      };
      setBlogs([newBlog, ...blogs]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id) => {
    // In a real app, you would send a delete request to your API
    // For now, we'll just update the local state
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <PageHeader>
        
        <AddButton 
          onClick={() => handleOpenModal()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Post
        </AddButton>
      </PageHeader>

      <ContentCard
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <TabContainer>
          <Tab 
            active={activeTab === 'all'} 
            onClick={() => handleTabChange('all')}
          >
            All
          </Tab>
          <Tab 
            active={activeTab === 'published'} 
            onClick={() => handleTabChange('published')}
          >
            Published
          </Tab>
          <Tab 
            active={activeTab === 'draft'} 
            onClick={() => handleTabChange('draft')}
          >
            Drafts
          </Tab>
          <Tab 
            active={activeTab === 'archived'} 
            onClick={() => handleTabChange('archived')}
          >
            Archived
          </Tab>
        </TabContainer>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: '0 auto' }}
            >
              <motion.path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            <p style={{ marginTop: '1rem' }}>Loading blog posts...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <EmptyState>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v10a2 2 0 002 2h5z" />
            </svg>
            <h3>No blog posts found</h3>
            <p>Create your first blog post to get started</p>
            <PrimaryButton 
              onClick={() => handleOpenModal()}
              style={{ display: 'inline-block' }}
            >
              Create New Post
            </PrimaryButton>
          </EmptyState>
        ) : (
          <BlogTable>
            <TableHeader>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableHeader>
            
            {filteredBlogs.map(blog => (
              <TableRow 
                key={blog.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <TableCell>
                  <BlogTitle>
                    <img src={blog.image} alt={blog.title} />
                    <span>{blog.title}</span>
                  </BlogTitle>
                </TableCell>
                <TableCell>{formatDate(blog.date)}</TableCell>
                <TableCell>
                  <StatusBadge status={blog.status}>
                    {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ActionsCell>
                    <ActionButton onClick={() => handleOpenModal(blog)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </ActionButton>
                    <ActionButton delete onClick={() => handleDelete(blog.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m6-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </ActionButton>
                  </ActionsCell>
                </TableCell>
              </TableRow>
            ))}
          </BlogTable>
        )}
      </ContentCard>

      {/* Blog Post Form Modal */}
      {modalOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <ModalHeader>
              <ModalTitle>{currentBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</ModalTitle>
              <CloseButton onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </CloseButton>
            </ModalHeader>
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="image">Featured Image URL</Label>
                <Input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Enter a brief summary"
                  required
                  rows="3"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Enter blog content (HTML supported)"
                  required
                  rows="10"
                />
              </FormGroup>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="E.g. Technology, Design"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </Select>
                </FormGroup>
              </div>
              
              <ButtonGroup>
                <SecondaryButton type="button" onClick={handleCloseModal}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton type="submit">
                  {currentBlog ? 'Update Post' : 'Create Post'}
                </PrimaryButton>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default BlogManagement; 