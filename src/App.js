import React, { useEffect, useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalStyles } from './styles/GlobalStyles';
import theme from './styles/theme';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import SessionManager from './components/SessionManager';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ProjectsList from './pages/ProjectsList';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Services from './pages/Services';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NewContent from './pages/admin/NewContent';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// ScrollToTop component for better scroll management
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }, [pathname]);
  
  return null;
};

// AnimatePresence needs access to the Router's location
const AnimationWrapper = () => {
  const location = useLocation();
  
  return (
    <Routes location={location} key={location.pathname}>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<ProjectsList />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      
      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* New content route */}
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const AppContent = () => {
  // Initializing with true to show loading screen on first render
  const [isLoading, setIsLoading] = useState(true);
  const [cursorActive, setCursorActive] = useState(false);
  const location = useLocation();
  
  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  useEffect(() => {
    // Simulate loading complete after 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    // Check if it's a mobile device
    const isMobileDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setCursorActive(!isMobileDevice);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col ${cursorActive ? 'custom-cursor' : ''}`}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: {
                duration: 0.8,
                ease: "easeInOut"
              }
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-primary-500 font-heading"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ 
                scale: 0.8,
                opacity: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeInOut"
                }
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              TECHVEDA<span className="text-primary-600">.</span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      {cursorActive && <CustomCursor />}
      
      {/* Only show Navbar for non-admin routes */}
      {!isAdminRoute && <Navbar />}
      
      <main className={`flex-1 ${!isAdminRoute ? 'pt-16' : ''}`}>
        <ScrollToTop />
        <AnimationWrapper />
      </main>
      
      {/* Only show Footer for non-admin routes */}
      {!isAdminRoute && <Footer />}
      
      {/* Global session management */}
      <SessionManager />
    </div>
  );
};

function App() {
  // Set dark theme on app load
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <ToastProvider>
          <Router>
            <AppContent />
          </Router>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 