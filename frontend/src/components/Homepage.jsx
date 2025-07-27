// Homepage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'; // Assuming you're using the simpler footer now
import Navbar from './Navbar';
const Homepage = () => {
  return (

    <div className="flex flex-col min-h-screen bg-white text-gray-800">
    <Navbar/>
      <main className="flex flex-col items-center justify-center flex-grow py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          Welcome to <span className="text-blue-600">Online Judge</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl">
          Sharpen your coding skills, conquer challenging problems, and compete with a global community of developers.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white text-white px-8 py-4 rounded-lg shadow-xl text-lg font-semibold transform hover:scale-105 transition-all duration-300"
          >
            Login to Compete
          </Link>
          <Link
            to="/signup"
            className="bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white text-white px-8 py-4 rounded-lg shadow-xl text-lg font-semibold transform hover:scale-105 transition-all duration-300"
          >
            Join Our Community
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;