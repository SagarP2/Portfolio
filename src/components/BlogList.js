import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Pagination,
  Stack
} from '@mui/material';
import blogApi from '../api/blogApi';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      console.log('Starting to fetch blogs...');
      
      const response = await blogApi.getAllBlogs({ page, limit: 9 });
      console.log('Received response:', response);
      
      // Ensure we have valid data
      if (!response) {
        throw new Error('No response received from server');
      }

      // Handle different response formats
      let blogsData = [];
      let totalCount = 0;
      let totalPagesCount = 1;

      if (Array.isArray(response)) {
        // If response is directly an array
        blogsData = response;
        totalCount = response.length;
        totalPagesCount = 1;
      } else if (response.blogs && Array.isArray(response.blogs)) {
        // If response has blogs array
        blogsData = response.blogs;
        totalCount = response.total || response.blogs.length;
        totalPagesCount = response.pages || 1;
      } else if (response.data && Array.isArray(response.data)) {
        // If response has data array
        blogsData = response.data;
        totalCount = response.total || response.data.length;
        totalPagesCount = response.pages || 1;
      } else {
        console.error('Unexpected response format:', response);
        throw new Error('Invalid response format from server');
      }

      console.log('Processed blog data:', {
        blogsData,
        totalCount,
        totalPagesCount
      });

      setBlogs(blogsData);
      setTotalPages(totalPagesCount);
      setTotalBlogs(totalCount);
      setError(null);
    } catch (error) {
      console.error('Error in fetchBlogs:', error);
      setError(error.message || 'Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Blog
      </Typography>
      
      {!Array.isArray(blogs) || blogs.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No blog posts found.
        </Alert>
      ) : (
        <>
          <Grid container spacing={4}>
            {blogs.map((blog) => (
              <Grid item xs={12} md={6} lg={4} key={blog._id || blog.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={blog.image || ''}
                    alt={blog.title || 'Blog post image'}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {blog.title || 'Untitled'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      By {blog.author || 'Anonymous'} • {new Date(blog.date || Date.now()).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {blog.excerpt || (blog.content ? blog.content.substring(0, 150) + '...' : 'No content available')}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {Array.isArray(blog.tags) && blog.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {blog.views || 0} views • {blog.likes || 0} likes
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Stack>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default BlogList; 