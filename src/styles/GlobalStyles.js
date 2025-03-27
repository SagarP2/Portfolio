import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Colors */
    --color-text-primary: #ffffff;
    --color-text-secondary: #b3b3b3;
    --color-primary:hsl(217, 91.20%, 59.80%);
    --color-primary-rgb: 59, 130, 246;
    --color-primary-dark: #2563eb;
    --color-primary-light: #60a5fa;
    --color-heading: #f5f5f5;
    --color-border: #333333;
  }

  /* Font settings */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    color: var(--color-text-primary);
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    margin: 0;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-text-primary);
    
    /* Hide scrollbar but keep functionality */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar {
      display: none;  /* Chrome, Safari and Opera */
    }
  }

  /* Override cursor for all elements when our custom cursor is active */
  .custom-cursor,
  .custom-cursor * {
    cursor: none !important;
  }

  /* Custom styling for hoverable elements */
  .hoverable {
    transition: transform 0.2s ease;
    
    &:hover {
      /* Subtle indication even if custom cursor is not working */
      transform: translateY(-1px);
    }
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    color: var(--color-heading);
    margin-top: 0;
  }

  /* Tailwind-like utility classes */
  .container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Larger screens */
  @media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 768px;
    }
  }
  @media (min-width: 1024px) {
    .container {
      max-width: 1024px;
    }
  }
  @media (min-width: 1280px) {
    .container {
      max-width: 1280px;
    }
  }

  /* Reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Will-change optimizations */
  .optimize-gpu {
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .font-heading {
    font-family: 'Poppins', sans-serif;
  }
  
  .font-body {
    font-family: 'Inter', sans-serif;
  }
`; 