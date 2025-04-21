import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import herosection from "../../assets/herosection.png";
import logo from "../../assets/logoelnfra.webp";

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, color: "#2563eb" }
  };

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const heroChildVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      transition: { staggerChildren: 0.1 }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const mobileItemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e) => {
    const target = e.target.getAttribute("href");
    const element = document.querySelector(target);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
    e.preventDefault();
  };

  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = "64px";
    return () => {
      document.documentElement.style.scrollPaddingTop = "0";
    };
  }, []);

  return (
    <>
      <motion.nav 
        className="bg-white shadow-md fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo with animation */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <a href="/" className="flex items-center">
                <img src={logo} alt="Company Logo" className="h-12 w-auto object-contain" />
              </a>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              {['#home', '#about', '#metrics', '#features'].map((link) => (
                <motion.a
                  key={link}
                  href={link}
                  onClick={handleNavClick}
                  className="text-gray-800 hover:text-blue-600 font-medium"
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  {link === '#home' ? 'Home' : 
                   link === '#about' ? 'About Us' :
                   link === '#metrics' ? 'Key Metrics' : 'Features'}
                </motion.a>
              ))}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex space-x-4">
              <motion.button 
                onClick={() => navigate("/login")} 
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md"
                whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.button 
                onClick={() => navigate("/register")} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#1d4ed8",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.div 
              className="md:hidden"
              whileTap={{ scale: 0.95 }}
            >
              <button onClick={toggleMenu} className="text-gray-900 focus:outline-none">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu with animations */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {['#home', '#about', '#metrics', '#features'].map((link) => (
                    <motion.a
                      key={link}
                      href={link}
                      onClick={handleNavClick}
                      className="block px-3 py-2 text-gray-800 hover:text-blue-600 font-medium"
                      variants={mobileItemVariants}
                    >
                      {link === '#home' ? 'Home' : 
                       link === '#about' ? 'About Us' :
                       link === '#metrics' ? 'Key Metrics' : 'Features'}
                    </motion.a>
                  ))}
                  <div className="flex flex-col space-y-2 mt-4">
                    <motion.button 
                      onClick={() => navigate("/login")} 
                      className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md w-full"
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      Sign In
                    </motion.button>
                    <motion.button 
                      onClick={() => navigate("/register")} 
                      className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.02, backgroundColor: "#1d4ed8" }}
                    >
                      Sign Up
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="pt-16">
        <motion.div 
          id="home" 
          className="bg-gradient-to-br from-blue-100 to-blue-200 py-8 md:py-16"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                className="text-center md:text-left"
                variants={heroChildVariants}
              >
                <motion.h1 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4"
                  whileHover={{ x: 5 }}
                >
                  Optimize for productivity reducing time spent
                </motion.h1>
                <motion.p 
                  className="text-base md:text-lg text-gray-600 mb-6"
                  whileHover={{ x: 5 }}
                >
                  Streamline your workflow, analyze performance, and increase team collaboration.
                </motion.p>
                <motion.button 
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                  onClick={() => navigate("/register")}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#1a1a1a",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
              <motion.div 
                className="flex justify-center mt-8 md:mt-0"
                variants={heroChildVariants}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={herosection} 
                  alt="Lead Management" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HeroSection;