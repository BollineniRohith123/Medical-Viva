import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HomeIcon } from '@radix-ui/react-icons';

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
          className="text-2xl font-bold text-blue-600"
        >
          Medical Viva Assistant
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className={`
              hamburger hamburger--spin 
              ${isMenuOpen ? 'is-active' : ''}
              focus:outline-none
            `}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner bg-gray-800"></span>
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav 
          className={`
            fixed md:static 
            top-16 right-0 bottom-0 left-0 
            bg-white/90 md:bg-transparent 
            md:flex md:space-x-6 
            items-center 
            ${isMenuOpen ? 'block' : 'hidden'}
            md:block
            pt-6 md:pt-0 
            px-6 md:px-0
          `}
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            {navItems.map(({ to, label, icon }) => (
              <Link 
                key={to}
                to={to} 
                className={`
                  flex items-center gap-2
                  transition-colors duration-300 
                  text-lg md:text-base
                  ${location.pathname === to 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:text-blue-600'}
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {icon}
                {label}
              </Link>
            ))}

            <Button 
              variant="default" 
              className="
                w-full md:w-auto 
                bg-blue-600 text-white 
                hover:bg-blue-700 
                transition-colors
              "
            >
              Start Free Trial
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
