import React from "react";
import { motion } from "framer-motion";
import KeyMetrics from '../../assets/KeyMetrics.jpg';

// Reusable animation variants
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

const statItemVariants = {
  hover: {
    y: -5,
    transition: { type: "spring", stiffness: 300 },
  },
};

const StatsSection = () => {
  return (
    <motion.section
      id="metrics"
      className="bg-gradient-to-br from-blue-50 to-blue-100 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Text Section */}
          <motion.div 
            className="w-full md:w-1/2 space-y-6"
            variants={containerVariants}
          >
            {/* Key Metrics Title */}
            <motion.div 
              className="mb-6"
              variants={childVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="inline-flex items-center px-6 py-3 bg-[#dff7f7] text-black font-bold text-xl rounded-xl shadow-lg">
                Key Metrics💰
              </div>
            </motion.div>

            <motion.div
              variants={childVariants}
              whileHover="hover"
              className="p-4 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                Total Leads <span className="text-2xl">💸</span>
              </h3>
              <motion.p 
                className="text-2xl font-bold"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                1,234
              </motion.p>
              <p className="text-gray-600">Track and manage all your leads in one place.</p>
            </motion.div>

            <motion.div
              variants={childVariants}
              whileHover="hover"
              className="p-4 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-red-600">Total Sales:👤</h3>
              <motion.p 
                className="text-2xl font-bold"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                $56,789
              </motion.p>
              <p className="text-gray-600">Monitor your sales performance in real-time.</p>
            </motion.div>

            <motion.div
              variants={childVariants}
              whileHover="hover"
              className="p-4 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-red-600">Conversion Rate:📈</h3>
              <motion.p 
                className="text-2xl font-bold"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                12%
              </motion.p>
              <p className="text-gray-600">Measure the success of your lead conversion efforts.</p>
            </motion.div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            variants={childVariants}
          >
            <motion.img 
              src={KeyMetrics} 
              alt="Status Overview"
              className="rounded-lg shadow-md w-full h-auto"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;