// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
          Online Judge
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 text-lg font-medium transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-md text-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;