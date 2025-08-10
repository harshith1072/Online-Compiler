 
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-8 px-4">
      <div className="container mx-auto flex flex-col items-center justify-between text-center md:flex-row">

       
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-blue-400 mb-1">CodeJudge</h3>
          <p className="text-sm">&copy; {new Date().getFullYear()}CodeJudge. All rights reserved.</p>
        </div>

   
        <div>
          <p className="text-sm">
            Crafted with &hearts; by{' '}
            <a
              href="https://github.com/harshith1072"  
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              Harshith Mateti
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;