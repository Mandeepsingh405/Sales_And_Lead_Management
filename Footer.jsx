import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const linkHover = {
    scale: 1.05,
    color: "#ffffff",
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <motion.footer 
      className="bg-gray-900 text-white p-8 mt-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company Info */}
          <motion.div 
            className="flex flex-col items-start mb-6 md:mb-0"
            variants={childVariants}
          >
            <motion.p 
              className="font-semibold text-xl mb-2"
              whileHover={{ x: 5 }}
            >
              Company Name
            </motion.p>
            <motion.p 
              className="text-gray-400 text-sm"
              whileHover={{ x: 5 }}
            >
              © Copyright your company. All Rights Reserved
            </motion.p>
          </motion.div>

          {/* Links */}
          <motion.div 
            className="flex space-x-6"
            variants={containerVariants}
          >
            {['Terms', 'Privacy', 'Disclaimer'].map((link) => (
              <motion.a
                key={link}
                href="#"
                className="text-gray-400 hover:text-white text-sm"
                variants={childVariants}
                whileHover={linkHover}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Optional: Animated Divider */}
        <motion.div 
          className="border-t border-gray-800 my-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

        {/* Optional: Social Icons */}
        <motion.div 
          className="flex justify-center space-x-6"
          variants={containerVariants}
        >
          {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
            <motion.a
              key={social}
              href="#"
              className="text-gray-400 hover:text-white"
              variants={childVariants}
              whileHover={{
                y: -3,
                color: "#3b82f6",
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              {social === 'Twitter' ? '🐦' : 
               social === 'LinkedIn' ? '🔗' : '💻'} {social}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;