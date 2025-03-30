import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/Toast';
import styled from 'styled-components';

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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const BlogCard = styled.div`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 1rem;
`;

const BlogTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const BlogExcerpt = styled.p`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: ${props => props.theme.colors.tagBg};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: ${props => props.theme.colors.tagText};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.bg};
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.inputBg};
  color: ${props => props.theme.colors.text};
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.inputBg};
  color: ${props => props.theme.colors.text};
  min-height: 150px;
  resize: vertical;
`;

const BlogManagement = () => {
  const { blogs, createBlog, updateBlog, deleteBlog, loading, error } = useBlog();
  const { token } = useAuth();
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    author: '',
    tags: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await updateBlog(editingBlog._id, formData, token);
        addToast('Blog updated successfully!', 'success');
      } else {
        await createBlog(formData, token);
        addToast('Blog created successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingBlog(null);
      setFormData({
        title: '',
        content: '',
        image: '',
        author: '',
        tags: ''
      });
    } catch (error) {
      addToast(error.message || 'Failed to save blog', 'error');
      console.error('Error saving blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      tags: blog.tags.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(id, token);
        addToast('Blog deleted successfully!', 'success');
      } catch (error) {
        addToast(error.message || 'Failed to delete blog', 'error');
        console.error('Error deleting blog:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    addToast(error, 'error');
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Header>
        <h2>Blog Management</h2>
        <Button
          onClick={() => {
            setEditingBlog(null);
            setFormData({
              title: '',
              content: '',
              image: '',
              author: '',
              tags: ''
            });
            setIsModalOpen(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add New Blog
        </Button>
      </Header>

      <BlogGrid>
        {blogs.map((blog, index) => (
          <BlogCard
            key={blog._id}
            as={Link}
            to={`/blog/${blog._id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogImage src={blog.image} alt={blog.title} />
            <BlogContent>
              <BlogTitle>{blog.title}</BlogTitle>
              <BlogExcerpt>
                {blog.content.substring(0, 150)}...
              </BlogExcerpt>
              <BlogMeta>
                <span>{new Date(blog.date).toLocaleDateString()}</span>
                <span>{blog.author}</span>
              </BlogMeta>
              <TagContainer>
                {blog.tags.map((tag, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              </TagContainer>
              <ActionButtons>
                <EditButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(blog);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Edit
                </EditButton>
                <DeleteButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(blog._id);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete
                </DeleteButton>
              </ActionButtons>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>

      {isModalOpen && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <TextArea
                placeholder="Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Image URL or Base64"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <Button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {editingBlog ? 'Update Blog' : 'Create Blog'}
              </Button>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default BlogManagement; 