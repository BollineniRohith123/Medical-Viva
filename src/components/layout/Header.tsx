import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 z-50 transition-all duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600">🎙️ MedViva</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-gray-600 hover:text-gray-900">
            Features
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
            Log in
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
