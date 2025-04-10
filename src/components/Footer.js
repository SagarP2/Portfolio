import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-gray-300">
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white font-heading hoverable">
              TECHVEDA<span className="text-primary-500">.</span>
            </Link>
            <p className="mt-4 text-sm font-body">
              Building innovative web applications and digital solutions that transform ideas into reality.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors hoverable"
                aria-label="GitHub"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.7 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors hoverable"
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.002 10.002 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors hoverable"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.996 0A4.004 4.004 0 0 1 24 4.004v15.992A4.004 4.004 0 0 1 19.996 24H4.004A4.004 4.004 0 0 1 0 19.996V4.004A4.004 4.004 0 0 1 4.004 0h15.992zM8.5 8.5H5.9v9.6h2.6V8.5zm.15-2.6A1.45 1.45 0 0 0 7.2 7.4c0 .8.65 1.45 1.45 1.45.8 0 1.45-.65 1.45-1.45 0-.8-.65-1.45-1.45-1.45zm10.35 5.7c0-2.25-1.75-3.8-3.85-3.8-1.2 0-2.55.55-3.15 1.55v-1.4h-2.6v9.6h2.6v-5.1c0-1.1.55-2.2 1.95-2.2 1.2 0 1.65 1.1 1.65 2.25v5.05h2.6V11.6h.8z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors hoverable"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2c-2.714 0-3.055.013-4.123.06-1.064.05-1.791.218-2.428.465a4.896 4.896 0 00-1.77 1.153A4.902 4.902 0 002.525 5.45c-.247.637-.416 1.363-.465 2.428C2.013 8.945 2 9.286 2 12c0 2.714.013 3.055.06 4.123.05 1.064.218 1.791.465 2.428a4.91 4.91 0 001.153 1.77c.5.5 1.038.908 1.77 1.153.637.247 1.363.416 2.428.465 1.068.047 1.41.06 4.123.06 2.714 0 3.055-.013 4.123-.06 1.064-.05 1.791-.218 2.428-.465a4.895 4.895 0 001.77-1.153 4.902 4.902 0 001.153-1.77c.247-.637.416-1.363.465-2.428.047-1.068.06-1.41.06-4.123 0-2.714-.013-3.055-.06-4.123-.05-1.064-.218-1.791-.465-2.428a4.91 4.91 0 00-1.153-1.77c-.5-.5-1.038-.908-1.77-1.153-.637-.247-1.363-.416-2.428-.465C15.055 2.013 14.714 2 12 2zm0 1.8c2.67 0 2.985.01 4.04.057.975.045 1.505.208 1.858.344.467.182.8.399 1.15.748.35.35.566.683.748 1.15.136.353.3.883.344 1.857.047 1.056.057 1.371.057 4.041 0 2.67-.01 2.985-.057 4.04-.045.975-.208 1.505-.344 1.858-.182.467-.399.8-.748 1.15-.35.35-.683.566-1.15.748-.353.136-.883.3-1.857.344-1.056.047-1.371.057-4.041.057-2.67 0-2.985-.01-4.04-.057-.975-.045-1.505-.208-1.858-.344-.467-.182-.8-.399-1.15-.748-.35-.35-.566-.683-.748-1.15-.136-.353-.3-.883-.344-1.857-.047-1.056-.057-1.371-.057-4.041 0-2.67.01-2.985.057-4.04.045-.975.208-1.505.344-1.858.182-.467.399-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.136.883-.3 1.857-.344 1.056-.047 1.371-.057 4.041-.057zm0 3.064a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.47a3.334 3.334 0 110-6.668 3.334 3.334 0 010 6.667zm6.538-8.674a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors hoverable">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors hoverable">About</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-400 transition-colors hoverable">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-primary-400 transition-colors hoverable">Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors hoverable">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 font-heading">Services</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-400 transition-colors hoverable">Web Development</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-400 transition-colors hoverable">UI/UX Design</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-400 transition-colors hoverable">Mobile Development</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-400 transition-colors hoverable">E-commerce</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-400 transition-colors hoverable">Digital Marketing</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 font-heading">Contact Us</h3>
            <ul className="space-y-3 font-body">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Bardoli, Gujarat, India</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@techveda.com</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-3 pb-3 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 font-body">&copy; {currentYear} TECHVEDA. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="text-xs text-gray-500 hover:text-primary-400 transition-colors font-body hoverable">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-primary-400 transition-colors font-body hoverable">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 hover:text-primary-400 transition-colors font-body hoverable">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 