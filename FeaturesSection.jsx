import React from 'react';
import { motion } from 'framer-motion';
import features from '../../assets/features.jpg';

// Reuse these from your AboutUs component for consistency
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const FeaturesSection = () => {
  return (
    <motion.section
      id="features"
      className="bg-white py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
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
              src={features} 
              alt="Features Overview" 
              className="rounded-lg shadow-md w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=Features';
              }} 
            />
          </motion.div>

          {/* Animated Content */}
          <motion.div variants={containerVariants}>
            {/* Features Title */}
            <motion.div 
              className="mb-6"
              variants={childVariants}
              whileHover={hoverScale}
            >
              <div className="inline-flex items-center px-6 py-3 bg-[#dff7f7] text-black font-bold text-xl rounded-xl shadow-lg">
                Features🚀
              </div>
            </motion.div>

            {/* Animated Feature Cards */}
            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.div 
                className="p-4 rounded-lg hover:shadow-md transition-shadow"
                variants={childVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              >
                <h3 className="text-lg font-semibold text-red-600">Lead Management:</h3>
                <p className="text-gray-600">
                  Capture, assign, and track leads effortlessly. Convert more leads into customers with our powerful tools.
                  <a href="#" className="text-blue-500 hover:text-blue-700 ml-2 inline-block">[Learn More🎓]</a>
                </p>
              </motion.div>

              <motion.div 
                className="p-4 rounded-lg hover:shadow-md transition-shadow"
                variants={childVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              >
                <h3 className="text-lg font-semibold text-red-600">Sales Management:</h3>
                <p className="text-gray-600">
                  Record sales transactions, generate invoices, and track referrals seamlessly.
                  <a href="#" className="text-blue-500 hover:text-blue-700 ml-2 inline-block">[Learn More🎓]</a>
                </p>
              </motion.div>

              <motion.div 
                className="p-4 rounded-lg hover:shadow-md transition-shadow"
                variants={childVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              >
                <h3 className="text-lg font-semibold text-red-600">Customer Management:</h3>
                <p className="text-gray-600">
                  Store and manage customer information with ease. Keep nominee details up-to-date.
                  <a href="#" className="text-blue-500 hover:text-blue-700 ml-2 inline-block">[Learn More🎓]</a>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;