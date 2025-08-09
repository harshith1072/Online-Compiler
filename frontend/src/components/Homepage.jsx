// Homepage.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Footer from './Footer'; 
// import Navbar from './Navbar';
// const Homepage = () => {
//   return (

//     <div className="flex flex-col min-h-screen bg-white text-gray-800">
//     <Navbar/>
//       <main className="flex flex-col items-center justify-center flex-grow py-20 px-4 text-center">
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
//           Welcome to <span className="text-blue-600">Online Judge</span>
//         </h1>
//         <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl">
//           Sharpen your coding skills, conquer challenging problems, and compete with a global community of developers.
//         </p>
//         <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
//           <Link
//             to="/login"
//             className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white text-white px-8 py-4 rounded-lg shadow-xl text-lg font-semibold transform hover:scale-105 transition-all duration-300"
//           >
//             Login to Compete
//           </Link>
//           <Link
//             to="/signup"
//             className="bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white text-white px-8 py-4 rounded-lg shadow-xl text-lg font-semibold transform hover:scale-105 transition-all duration-300"
//           >
//             Join Our Community
//           </Link>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Homepage;


























// import React, { useState, useEffect, useRef } from 'react';
// import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import Footer from './Footer';
// import { Link } from 'react-router-dom';
// // Lucide-react icons for a clean, modern look
// import { Terminal, Code, Cpu, ShieldCheck, Stars, Menu, X } from 'lucide-react';

// // Main App component to render the homepage
// const Homepage = () => {
//     // State for mobile menu visibility
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     // Placeholder for Firebase instances. Using useRef to prevent re-initialization
//     const db = useRef(null);
//     const auth = useRef(null);

//     // Initialize Firebase and handle authentication
//     useEffect(() => {
//         const initializeFirebase = async () => {
//             // Retrieve Firebase config and app ID from the global scope
//             const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
//             const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
//             const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

//             if (Object.keys(firebaseConfig).length > 0) {
//                 try {
//                     const app = initializeApp(firebaseConfig);
//                     auth.current = getAuth(app);
//                     db.current = getFirestore(app);

//                     // Sign in with the provided custom token or anonymously
//                     if (initialAuthToken) {
//                         await signInWithCustomToken(auth.current, initialAuthToken);
//                         console.log("Signed in with custom token.");
//                     } else {
//                         await signInAnonymously(auth.current);
//                         console.log("Signed in anonymously.");
//                     }
//                 } catch (error) {
//                     console.error("Error initializing Firebase or signing in:", error);
//                 }
//             } else {
//                 console.error("Firebase config is not available.");
//             }
//         };

//         initializeFirebase();
//     }, []);

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     return (
//         <div className="bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900 font-sans antialiased min-h-screen">
//             {/* Navbar */}
//             <header className="sticky top-0 z-50 bg-white shadow-lg">
//                 <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//                     <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
//                         <Terminal size={32} />
//                         <span>CodeJudge</span>
//                     </a>

//                     {/* Desktop Navigation */}
//                     <div className="hidden md:flex space-x-6 items-center">
//                         <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Problems</a>
//                         <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Compiler</a>
//                         <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-all duration-300">Login</a>
//                         <a href="#" className="border border-blue-600 text-blue-600 font-medium py-2 px-5 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">Register</a>
//                     </div>

//                     {/* Mobile Menu Button */}
//                     <div className="md:hidden flex items-center">
//                         <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
//                             {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//                         </button>
//                     </div>
//                 </nav>

//                 {/* Mobile Menu */}
//                 <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white p-4 transition-all duration-300 ease-in-out`}>
//                     <div className="flex flex-col space-y-4 text-center">
//                         <a href="#" className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">Problems</a>
//                         <a href="#" className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">Compiler</a>
//                         <a href="#" className="block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-all duration-300">Login</a>
//                         <a href="#" className="block border border-blue-600 text-blue-600 font-medium py-2 px-5 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">Register</a>
//                     </div>
//                 </div>
//             </header>

//             <main>
//                 {/* Hero Section */}
//                 <section className="relative overflow-hidden py-24 sm:py-32 bg-transparent">
//                     <div className="absolute inset-0 z-0 opacity-20">
//                         <svg className="absolute inset-0 h-full w-full stroke-blue-500 [mask-image:radial-gradient(100%_100%_at_top,white,transparent)]" aria-hidden="true">
//                             <defs>
//                                 <pattern id="hero-pattern-light" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
//                                     <path d="M.5 200V.5H200" fill="none"></path>
//                                 </pattern>
//                             </defs>
//                             <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-pattern-light)"></rect>
//                         </svg>
//                     </div>
//                     <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
//                         <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
//                             Your Journey to Code Mastery <br className="hidden sm:inline" />
//                             <span className="text-blue-600">Starts Here.</span>
//                         </h1>
//                         <p className="text-xl text-gray-600 mt-4 mb-8 max-w-2xl mx-auto">
//                             Practice with a custom compiler, get instant feedback, and refine your logic with our AI review. Your journey to mastery begins here.
//                         </p>
//                         <div className="flex justify-center space-x-4">
//                             <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
//                                 Start Your Journey
//                             </button>
//                             <button className="border border-gray-300 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
//                                 Explore Problems
//                             </button>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Features Section */}
//                 <section className="bg-white py-20 sm:py-32">
//                     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="text-center">
//                             <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Features Built for You</h2>
//                             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                                 Our platform is designed to give you everything you need to succeed in competitive programming and technical interviews.
//                             </p>
//                         </div>
//                         <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                             <div className="bg-gray-100 p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
//                                 <div className="p-4 bg-blue-600 rounded-full inline-block">
//                                     <Code size={36} className="text-white" />
//                                 </div>
//                                 <h3 className="mt-6 text-xl font-semibold text-gray-900">Custom Compiler</h3>
//                                 <p className="mt-2 text-gray-600">
//                                     Run your code in a custom-built, secure environment for quick and accurate results.
//                                 </p>
//                             </div>
//                             <div className="bg-gray-100 p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
//                                 <div className="p-4 bg-blue-600 rounded-full inline-block">
//                                     <ShieldCheck size={36} className="text-white" />
//                                 </div>
//                                 <h3 className="mt-6 text-xl font-semibold text-gray-900">Test Case Verification</h3>
//                                 <p className="mt-2 text-gray-600">
//                                     Our system rigorously checks your solution against a wide range of custom test cases.
//                                 </p>
//                             </div>
//                             <div className="bg-gray-100 p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
//                                 <div className="p-4 bg-blue-600 rounded-full inline-block">
//                                     <Cpu size={36} className="text-white" />
//                                 </div>
//                                 <h3 className="mt-6 text-xl font-semibold text-gray-900">Multiple Languages</h3>
//                                 <p className="mt-2 text-gray-600">
//                                     Support for C++, Java, JavaScript, Python, and more, so you can practice in your favorite language.
//                                 </p>
//                             </div>
//                             <div className="bg-gray-100 p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
//                                 <div className="p-4 bg-blue-600 rounded-full inline-block">
//                                     <Stars size={36} className="text-white" />
//                                 </div>
//                                 <h3 className="mt-6 text-xl font-semibold text-gray-900">AI Code Review</h3>
//                                 <p className="mt-2 text-gray-600">
//                                     Get intelligent feedback and suggestions from our AI to improve your code quality and efficiency.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>

//            <Footer />
//             {/* <footer className="bg-white py-12">
//                 <div className="container mx-auto px-4 text-center">
//                     <p className="text-gray-500 text-sm">&copy; 2024 CodeJudge. All rights reserved.</p>
//                 </div>
//             </footer> */}
//         </div>
//     );
// };

// export default Homepage;


import React, { useState, useEffect, useRef } from 'react';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Footer from './Footer';
import { Link } from 'react-router-dom';
// Lucide-react icons for a clean, modern look
import { Terminal, Code, Cpu, ShieldCheck, Stars, Menu, X } from 'lucide-react';
 
const  Homepage = () => {
    // State for mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Placeholder for Firebase instances. Using useRef to prevent re-initialization
    const db = useRef(null);
    const auth = useRef(null);

    // Initialize Firebase and handle authentication
    useEffect(() => {
        const initializeFirebase = async () => {
            // Retrieve Firebase config and app ID from the global scope
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

            if (Object.keys(firebaseConfig).length > 0) {
                try {
                    const app = initializeApp(firebaseConfig);
                    auth.current = getAuth(app);
                    db.current = getFirestore(app);

                    // Sign in with the provided custom token or anonymously
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth.current, initialAuthToken);
                        console.log("Signed in with custom token.");
                    } else {
                        await signInAnonymously(auth.current);
                        console.log("Signed in anonymously.");
                    }
                } catch (error) {
                    console.error("Error initializing Firebase or signing in:", error);
                }
            } else {
                console.error("Firebase config is not available.");
            }
        };

        initializeFirebase();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900 font-sans antialiased min-h-screen">
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-white shadow-lg">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
                        <Terminal size={32} />
                        <span>CodeJudge</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/signup" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Problems</Link>
                        <Link to="/codeEditor" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Compiler</Link>
                        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-all duration-300">Login</Link>
                        <Link to="/signup" className="border border-blue-600 text-blue-600 font-medium py-2 px-5 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">Register</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white p-4 transition-all duration-300 ease-in-out`}>
                    <div className="flex flex-col space-y-4 text-center">
                        <Link to="/problems" className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">Problems</Link>
                        <Link to="/compiler" className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">Compiler</Link>
                        <Link to="/login" className="block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-all duration-300">Login</Link>
                        <Link to="/register" className="block border border-blue-600 text-blue-600 font-medium py-2 px-5 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">Register</Link>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden py-24 sm:py-32 bg-transparent">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <svg className="absolute inset-0 h-full w-full stroke-blue-500 [mask-image:radial-gradient(100%_100%_at_top,white,transparent)]" aria-hidden="true">
                            <defs>
                                <pattern id="hero-pattern-light" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                                    <path d="M.5 200V.5H200" fill="none"></path>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-pattern-light)"></rect>
                        </svg>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
                            Your Journey to Code Mastery <br className="hidden sm:inline" />
                            <span className="text-blue-600">Starts Here.</span>
                        </h1>
                        <p className="text-xl text-gray-600 mt-4 mb-8 max-w-2xl mx-auto">
                            Practice with a custom compiler, get instant feedback, and refine your logic with our AI review. Your journey to mastery begins here.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                                Start Your Journey
                            </Link>
                            <Link to="/signup" className="border border-gray-300 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                                Explore Problems
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-white py-20 sm:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Features Built for You</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Our platform is designed to give you everything you need to succeed in competitive programming and technical interviews.
                            </p>
                        </div>
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-gray-100 p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <div className="p-4 bg-blue-600 rounded-full inline-block">
                                    <Code size={36} className="text-white" />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">Custom Compiler</h3>
                                <p className="mt-2 text-gray-600">
                                    Run your code in a custom-built, secure environment for quick and accurate results.
                                </p>
                            </div>
                            <div className="bg-gray-100 p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <div className="p-4 bg-blue-600 rounded-full inline-block">
                                    <ShieldCheck size={36} className="text-white" />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">Test Case Verification</h3>
                                <p className="mt-2 text-gray-600">
                                    Our system rigorously checks your solution against a wide range of custom test cases.
                                </p>
                            </div>
                            <div className="bg-gray-100 p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <div className="p-4 bg-blue-600 rounded-full inline-block">
                                    <Cpu size={36} className="text-white" />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">Multiple Languages</h3>
                                <p className="mt-2 text-gray-600">
                                    Support for C++, Java, JavaScript, Python, and more, so you can practice in your favorite language.
                                </p>
                            </div>
                            <div className="bg-gray-100 p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <div className="p-4 bg-blue-600 rounded-full inline-block">
                                    <Stars size={36} className="text-white" />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">AI Code Review</h3>
                                <p className="mt-2 text-gray-600">
                                    Get intelligent feedback and suggestions from our AI to improve your code quality and efficiency.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

    <Footer />
          
        </div>
    );
};

export default Homepage;
