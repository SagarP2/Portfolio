import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

// SVG Icons as components instead of importing from react-icons/fi
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const ContactSection = styled(motion.section)`
  padding: 8rem 2rem;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ContactTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1.5rem;
`;

const ContactSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 3rem;
  color: var(--color-text-light);
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  svg {
    font-size: 1.5rem;
    margin-right: 1rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const InfoText = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 1rem;
    color: var(--color-text-light);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  transition: all 0.3s ease;
  
  svg {
    font-size: 1.2rem;
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormTitle = styled(motion.h3)`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
`;

const FormControl = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-light);
`;

const FormInput = styled(motion.input)`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const FormTextarea = styled(motion.textarea)`
  width: 100%;
  padding: 0.75rem 1rem;
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
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 0.75rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1.2rem;
  }
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  width: 60vh;
  height: 60vh;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(37, 99, 235, 0.15) 0%,
    rgba(37, 99, 235, 0) 70%
  );
  z-index: -1;
  bottom: -20vh;
  right: -20vh;
  filter: blur(70px);
`;

const MessageStatus = styled(motion.div)`
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  background-color: ${props => props.success ? "rgba(46, 213, 115, 0.15)" : `rgba(${props.theme.colors.primary.replace('#', '')}, 0.15)`};
  color: ${props => props.success ? "#2ed573" : props.theme.colors.primary};
  border: 1px solid ${props => props.success ? "rgba(46, 213, 115, 0.3)" : `rgba(${props.theme.colors.primary.replace('#', '')}, 0.3)`};
`;

// Animation variants - enhanced with improved timing and physics
const sectionVariants = {
  initial: { 
    opacity: 0,
    y: 50
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: 30,
    transition: { 
      duration: 0.4, 
      ease: [0.43, 0.13, 0.23, 0.96] 
    } 
  }
};

const contactInfoVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring",
      mass: 0.8,
      damping: 20,
      stiffness: 100
    }
  }
};

const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.23, 1, 0.32, 1], 
      delay: 0.2 
    }
  }
};

const infoItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: (custom) => ({
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring",
      mass: 0.6,
      damping: 15,
      stiffness: 100,
      delay: 0.3 + (custom * 0.1) 
    }
  }),
  hover: { 
    x: 5,
    transition: { 
      duration: 0.2, 
      ease: "easeOut" 
    }
  }
};

const socialVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.23, 1, 0.32, 1], 
      delay: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const socialLinkVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  },
  hover: { 
    scale: 1.1, 
    backgroundColor: "var(--color-primary)",
    transition: { 
      duration: 0.2, 
      ease: "easeOut" 
    }
  },
  tap: { scale: 0.9 }
};

const formVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      mass: 0.8,
      damping: 20,
      stiffness: 100,
      delay: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const formTitleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

const formControlVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (custom) => ({
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      mass: 0.6,
      damping: 15,
      stiffness: 100,
      delay: 0.1 + (custom * 0.1) 
    }
  })
};

const inputVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.23, 1, 0.32, 1]
    }
  },
  focus: { 
    boxShadow: "0 0 0 3px rgba(var(--color-primary-rgb), 0.3)",
    borderColor: "var(--color-primary)",
    transition: { 
      duration: 0.2, 
      ease: "easeOut" 
    }
  }
};

const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.23, 1, 0.32, 1], 
      delay: 0.5 
    }
  },
  hover: { 
    scale: 1.05, 
    backgroundColor: "var(--color-secondary)",
    transition: { 
      duration: 0.2, 
      ease: "easeOut" 
    }
  },
  tap: { scale: 0.95 }
};

const statusVariants = {
  initial: { opacity: 0, y: -20, height: 0, padding: 0 },
  animate: { 
    opacity: 1, 
    y: 0, 
    height: "auto", 
    padding: "1rem",
    transition: { 
      duration: 0.4, 
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    height: 0, 
    padding: 0,
    transition: { 
      duration: 0.3, 
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  
  // Use reduced motion for accessibility
  const prefersReducedMotion = useReducedMotion();
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.5]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  
  // Smooth spring animation for scrollYProgress
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1500);
  };
  
  return (
    <ContactSection
      variants={prefersReducedMotion ? {} : sectionVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.25 }}
      exit="exit"
      id="contact"
    >
      <BackgroundShape 
        style={prefersReducedMotion ? {} : {
          opacity: backgroundOpacity,
          scale: backgroundScale
        }}
        animate={prefersReducedMotion ? {} : {
          rotate: 360,
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity
        }}
      />
      
      <Container>
        <ContactGrid>
          <ContactInfo 
            variants={prefersReducedMotion ? {} : contactInfoVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ContactTitle 
              variants={prefersReducedMotion ? {} : titleVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              Get In Touch
            </ContactTitle>
            
            <ContactSubtitle 
              variants={prefersReducedMotion ? {} : textVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              Have a project in mind? Looking to partner or work with us? We'd love to hear from you. Reach out and let's create something amazing together.
            </ContactSubtitle>
            
            <InfoItem 
              variants={prefersReducedMotion ? {} : infoItemVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true }}
              custom={0}
            >
              <MailIcon />
              <InfoText>
                <h4>Email</h4>
                <p>info@techveda.com</p>
              </InfoText>
            </InfoItem>
            
            <InfoItem 
              variants={prefersReducedMotion ? {} : infoItemVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true }}
              custom={1}
            >
              <PhoneIcon />
              <InfoText>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </InfoText>
            </InfoItem>
            
            <InfoItem 
              variants={prefersReducedMotion ? {} : infoItemVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true }}
              custom={2}
            >
              <MapPinIcon />
              <InfoText>
                <h4>Location</h4>
                <p>Surat, Gujarat, India</p>
              </InfoText>
            </InfoItem>
            
            <SocialLinks 
              variants={prefersReducedMotion ? {} : socialVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <SocialLink 
                href="https://github.com/techveda" 
                target="_blank"
                rel="noopener noreferrer"
                variants={prefersReducedMotion ? {} : socialLinkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <GithubIcon />
              </SocialLink>
              
              <SocialLink 
                href="https://linkedin.com/company/techveda" 
                target="_blank"
                rel="noopener noreferrer"
                variants={prefersReducedMotion ? {} : socialLinkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <LinkedinIcon />
              </SocialLink>
              
              <SocialLink 
                href="https://twitter.com/techveda" 
                target="_blank"
                rel="noopener noreferrer"
                variants={prefersReducedMotion ? {} : socialLinkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <TwitterIcon />
              </SocialLink>
              
              <SocialLink 
                href="https://instagram.com/techveda" 
                target="_blank"
                rel="noopener noreferrer"
                variants={prefersReducedMotion ? {} : socialLinkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <InstagramIcon />
              </SocialLink>
            </SocialLinks>
          </ContactInfo>
          
          <ContactForm 
            onSubmit={handleSubmit}
            variants={prefersReducedMotion ? {} : formVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FormTitle 
              variants={prefersReducedMotion ? {} : formTitleVariants}
              initial="initial"
              animate="animate"
            >
              Send us a message
            </FormTitle>
            
            <AnimatePresence mode="wait">
              {status.submitted && (
                <MessageStatus 
                  success={status.success}
                  variants={prefersReducedMotion ? {} : statusVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  {status.message}
                </MessageStatus>
              )}
            </AnimatePresence>
            
            <FormRow>
              <FormControl 
                variants={prefersReducedMotion ? {} : formControlVariants}
                initial="initial"
                animate="animate"
                custom={0}
              >
                <FormLabel>Your Name</FormLabel>
                <FormInput 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variants={prefersReducedMotion ? {} : inputVariants}
                  initial="initial"
                  animate="animate"
                  whileFocus="focus"
                />
              </FormControl>
              
              <FormControl 
                variants={prefersReducedMotion ? {} : formControlVariants}
                initial="initial"
                animate="animate"
                custom={1}
              >
                <FormLabel>Your Email</FormLabel>
                <FormInput 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variants={prefersReducedMotion ? {} : inputVariants}
                  initial="initial"
                  animate="animate"
                  whileFocus="focus"
                />
              </FormControl>
            </FormRow>
            
            <FormControl 
              variants={prefersReducedMotion ? {} : formControlVariants}
              initial="initial"
              animate="animate"
              custom={2}
            >
              <FormLabel>Subject</FormLabel>
              <FormInput 
                type="text" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required
                variants={prefersReducedMotion ? {} : inputVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              />
            </FormControl>
            
            <FormControl 
              variants={prefersReducedMotion ? {} : formControlVariants}
              initial="initial"
              animate="animate"
              custom={3}
            >
              <FormLabel>Your Message</FormLabel>
              <FormTextarea 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required
                variants={prefersReducedMotion ? {} : inputVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              />
            </FormControl>
            
            <SubmitButton 
              type="submit" 
              disabled={loading}
              variants={prefersReducedMotion ? {} : buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? 'Sending...' : 'Send Message'}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                viewBox="0 0 16 16"
                initial={{ x: 0 }}
                animate={loading ? { rotate: 360 } : { x: 0 }}
                transition={loading ? { 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "linear" 
                } : {}}
                whileHover={{ x: 5 }}
              >
                {loading ? (
                  <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                ) : (
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                )}
              </motion.svg>
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact; 