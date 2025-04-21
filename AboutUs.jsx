import React from 'react';
import { motion } from 'framer-motion';
import AboutUs1 from '../../assets/AboutUs1.jpg';

// Reusable animation variants (define once, use everywhere)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between child animations
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const hoverScale = {
  scale: 1.03,
  transition: { type: "spring", stiffness: 300 },
};

const AboutUs = () => {
  return (
    <motion.section
      id="about"
      className="bg-white py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} // Animate when 50px into view
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Animated Image */}
          <motion.div 
            variants={childVariants}
            whileHover={hoverScale}
          >
            <img 
              src={AboutUs1} 
              alt="About Us" 
              className="rounded-lg shadow-md w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=About+Us';
              }}
            />
          </motion.div>

          {/* Animated Text Content */}
          <motion.div variants={containerVariants}>
            {/* About Us Title */}
            <motion.div 
              className="mb-6"
              variants={childVariants}
              whileHover={hoverScale}
            >
              <div className="inline-flex items-center px-6 py-3 bg-[#dff7f7] text-black font-bold text-xl rounded-xl shadow-lg">
                About Us👥
              </div>
            </motion.div>

            <motion.p className="text-gray-600 mb-4" variants={childVariants}>
              Welcome to [Company Name], the creators of the Web-Based ERP for Leads and Sales Management. Our
              mission is to simplify and streamline business processes, helping companies like yours achieve greater
              efficiency and success.
            </motion.p>

            <motion.h3 
              className="text-xl font-semibold text-red-600 mb-2" 
              variants={childVariants}
            >
              Our Mission:🎯
            </motion.h3>

            <motion.p className="text-gray-600 mb-2" variants={childVariants}>
              To empower businesses with innovative tools that enhance lead management, sales tracking, and customer
              engagement.
            </motion.p>

            <motion.h3 
              className="text-xl font-semibold text-red-600 mb-2" 
              variants={childVariants}
            >
              Our Vision:🔭
            </motion.h3>

            <motion.p className="text-gray-600" variants={childVariants}>
              To become the leading ERP solution for businesses seeking to optimize their operations and drive growth.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;