import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HomeIcon, HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { to: "/", label: "Home", icon: <HomeIcon className="w-5 h-5" /> },
    { to: "/topics", label: "Medical Topics" },
    { to: "/quiz", label: "Quiz" },
    { to: "/resources", label: "Study Resources" },
    { to: "/results", label: "Results" },
    { to: "/profile", label: "Profile" }
  ];

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      x: '100%',
      transition: { 
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (custom: number) => ({
      opacity: 1, 
      x: 0,
      transition: { 
        delay: custom * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <header 
      className="
        fixed top-0 left-0 right-0 z-50 
        bg-white/90 shadow-md backdrop-blur-md
        h-16
      "
    >
      <div className="container mx-auto px-4 h-full flex justify-between items-center relative">
        <Link 
          to="/" 
          className="text-2xl font-bold text-blue-600 flex items-center gap-2"
        >
          <HomeIcon className="w-6 h-6" />
          Medical Viva
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <motion.button 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            whileTap={{ scale: 0.9 }}
            className="focus:outline-none"
          >
            {isMenuOpen ? (
              <Cross1Icon className="w-6 h-6 text-gray-800" />
            ) : (
              <HamburgerMenuIcon className="w-6 h-6 text-gray-800" />
            )}
          </motion.button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map(({ to, label, icon }) => (
            <Link 
              key={to}
              to={to} 
              className={`
                flex items-center gap-2
                transition-colors duration-300 
                text-base
                ${location.pathname === to 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'}
              `}
            >
              {icon}
              {label}
            </Link>
          ))}
          <Button 
            variant="default" 
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Start Free Trial
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              className="
                fixed inset-0 bg-white z-40 
                md:hidden overflow-y-auto 
                pt-20 px-6
              "
            >
              <motion.div 
                className="flex flex-col space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { 
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  }
                }}
              >
                {navItems.map(({ to, label, icon }, index) => (
                  <motion.div
                    key={to}
                    custom={index}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to={to} 
                      className={`
                        flex items-center gap-4 text-xl font-semibold py-3 px-4 rounded-lg
                        transition-colors duration-300
                        ${location.pathname === to 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'text-gray-800 hover:bg-gray-100'}
                      `}
                      onClick={toggleMenu}
                    >
                      {icon}
                      {label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  variants={menuItemVariants}
                  custom={navItems.length}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="mt-6"
                >
                  <Button 
                    variant="default" 
                    className="
                      w-full bg-blue-600 text-white 
                      hover:bg-blue-700 py-3 text-lg
                    "
                  >
                    Start Free Trial
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
