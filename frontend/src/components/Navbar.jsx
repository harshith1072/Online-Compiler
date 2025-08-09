// // Navbar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-sm py-4 px-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Brand/Logo */}
//         <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
//           Online Judge
//         </Link>

//         {/* Navigation Links */}
//         <div className="space-x-6">
//           <Link
//             to="/login"
//             className="text-gray-700 hover:text-blue-600 text-lg font-medium transition-colors duration-200"
//           >
//             Login
//           </Link>
//           <Link
//             to="/signup"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-md text-lg font-medium transition-all duration-300 transform hover:scale-105"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: '#ffffff',
        padding: '1.5rem 2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Brand/Logo aligned more to the left */}
        <div style={{ marginLeft: '0.5rem' }}>
          <Link
            to="/"
            style={{
              fontSize: '30px',
              fontWeight: '700',
              color: '#3f51b5',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
          >
            Online Judge
          </Link>
        </div>

        {/* Navigation Links aligned to the far right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginRight: '0.5rem' }}>
          <Link
            to="/login"
            style={{
              fontSize: '18px',
              color: '#333',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 12px',
              transition: 'color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.color = '#3f51b5')}
            onMouseOut={(e) => (e.target.style.color = '#333')}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={{
              backgroundColor: '#3f51b5',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#303f9f';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#3f51b5';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
