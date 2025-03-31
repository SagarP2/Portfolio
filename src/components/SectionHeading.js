import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionHeading = styled(motion.h2)`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  display: inline-block;
  color: ${props => props.theme.colors.text};
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 80px;
    height: 4px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
    
    @media (max-width: 992px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export default SectionHeading; 