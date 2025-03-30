import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.darkBackground};
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: -50%;
  right: -10%;
  width: 80vw;
  height: 150vh;
  background: ${props => props.theme.gradients.primary};
  transform: rotate(-12deg);
  opacity: 0.05;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  z-index: 0;
`;

const BackgroundCircle = styled.div`
  position: absolute;
  bottom: -15%;
  left: -5%;
  width: 40vw;
  height: 40vw;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  opacity: 0.03;
  z-index: 0;
`;

const LoginCard = styled(motion.div)`
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 450px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const LoginHeader = styled.div`
  padding: 2.5rem 2.5rem 1.5rem;
  text-align: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const HeaderAccent = styled.div`
  width: 60px;
  height: 4px;
  background: ${props => props.theme.gradients.primary};
  margin: 0 auto;
  border-radius: 4px;
`;

const LoginForm = styled.form`
  padding: 1.5rem 2.5rem 2.5rem;
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 1.75rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  padding-left: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 39px;
  color: ${props => props.theme.colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.9rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  margin-top: 0.5rem;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.gray};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ErrorMessage = styled(motion.div)`
  color: ${props => props.theme.colors.error};
  margin-bottom: 1.5rem;
  text-align: center;
  padding: 0.75rem;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 8px;
  font-size: 0.9rem;
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const RememberMeLabel = styled.label`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  font-weight: 500;
`;

const RememberMeCheckbox = styled.input`
  margin-right: 0.5rem;
`;

const RememberMeText = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const BackToSiteLink = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: ${props => props.theme.colors.primary};
  }
  
  svg {
    margin-right: 0.5rem;
    width: 16px;
    height: 16px;
  }
`;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError('');
    
    try {
      console.log('Attempting login with:', { email, rememberMe });
      const response = await login(email, password, rememberMe);
      console.log('Login response:', response);
      
      if (response?.user?.role === 'admin') {
        navigate('/admin');
      } else {
        setLocalError('Access denied. Admin privileges required.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLocalError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <BackgroundGradient />
      <BackgroundCircle />
      
      <BackToSiteLink
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <StyledLink to="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Website
        </StyledLink>
      </BackToSiteLink>
      
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoginHeader>
          <Title>Admin Login</Title>
          <Subtitle>Sign in to access your dashboard</Subtitle>
          <HeaderAccent />
        </LoginHeader>
        
        <LoginForm onSubmit={handleSubmit}>
          {localError && (
            <ErrorMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {localError}
            </ErrorMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </InputIcon>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </InputIcon>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </FormGroup>
          
          <RememberMeContainer>
            <RememberMeLabel>
              <RememberMeCheckbox 
                type="checkbox" 
                id="rememberMe" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              <RememberMeText>Remember me for 30 days</RememberMeText>
            </RememberMeLabel>
          </RememberMeContainer>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin; 