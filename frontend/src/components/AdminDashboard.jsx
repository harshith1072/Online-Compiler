 
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Plus, Edit2, Trash2, LogOut } from 'lucide-react';

// const AdminDashboard = () => {
//     const [problems, setProblems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     // Check if user is an admin on component mount
//     useEffect(() => {
//         const isAdmin = sessionStorage.getItem('isAdminLoggedIn');
//         if (!isAdmin) {
//             navigate('/admin-login');
//         }
//     }, [navigate]);

//     // Fetch problems from the API
//     useEffect(() => {
//         const fetchProblems = async () => {
//             try {
//                 const response = await fetch('http://localhost:9000/problems');
//                 if (!response.ok) {
//                     const text = await response.text();
//                     throw new Error(`Failed to fetch problems. Server responded with: ${text}`);
//                 }
//                 const data = await response.json();
//                 setProblems(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProblems();
//     }, []);

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this problem?')) {
//             try {
//                 const response = await fetch(`http://localhost:9000/problems/${id}`, {
//                     method: 'DELETE',
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to delete problem');
//                 }
//                 setProblems(problems.filter(problem => problem._id !== id));
//             } catch (err) {
//                 console.error('Error deleting problem:', err);
//                 setError('Failed to delete problem.');
//             }
//         }
//     };
    
//     const handleLogout = () => {
//         sessionStorage.removeItem('isAdminLoggedIn');
//         navigate('/');
//     };

//     if (loading) {
//         return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">Loading...</div>;
//     }

//     if (error) {
//         return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500">Error: {error}</div>;
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 text-gray-800 p-8 font-sans">
//             <header className="flex justify-between items-center bg-white p-6 rounded-t-xl shadow-lg border-b-2 border-purple-500">
//                 <h1 className="text-3xl font-extrabold text-purple-600 flex items-center">
//                     Admin Dashboard
//                 </h1>
//                 <div className="flex items-center space-x-4">
//                     <Link to="/admin/create" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center">
//                         <Plus size={20} className="mr-2" />
//                         Create Problem
//                     </Link>
//                     <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center">
//                         <LogOut size={20} className="mr-2" />
//                         Logout
//                     </button>
//                 </div>
//             </header>
//             <main className="bg-white p-8 rounded-b-xl shadow-lg">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">Problem List</h2>
//                 <div className="space-y-4">
//                     {problems.length > 0 ? (
//                         problems.map((problem) => (
//                             <div key={problem._id} className="flex justify-between items-center p-5 bg-gray-50 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:bg-gray-100">
//                                 <span className="text-xl font-medium text-gray-700">{problem.title}</span>
//                                 <div className="flex space-x-3">
//                                     {/* <Link to={`/admin/edit/${problem._id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-5 rounded-lg shadow-sm transition-colors duration-200 flex items-center">
//                                         <Edit2 size={16} className="mr-2" />
//                                         Edit
//                                     </Link> */}
//                                     <button onClick={() => handleDelete(problem._id)} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-lg shadow-sm transition-colors duration-200 flex items-center">
//                                         <Trash2 size={16} className="mr-2" />
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500 text-center py-8">No problems found. Start by creating one!</p>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default AdminDashboard;

// const BASE_URL = "http://localhost:9000";
const BASE_URL = "https://codejudge-lfe8.onrender.com";


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdminLoggedIn');
        if (!isAdmin) {
            navigate('/admin-login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch(`https://codejudge-lfe8.onrender.com/problems`);
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Failed to fetch problems. Server responded with: ${text}`);
                }
                const data = await response.json();
                setProblems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProblems();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this problem?')) {
            try {
                const response = await fetch(`https://codejudge-lfe8.onrender.com/problems/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete problem');
                }
                setProblems(problems.filter(problem => problem._id !== id));
            } catch (err) {
                console.error('Error deleting problem:', err);
                setError('Failed to delete problem.');
            }
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        navigate('/');
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 p-8 font-sans">
            <header className="flex justify-between items-center bg-white p-6 rounded-t-xl shadow-lg border-b-2 border-purple-500">
                <h1 className="text-3xl font-extrabold text-purple-600 flex items-center">
                    Admin Dashboard
                </h1>
                <div className="flex items-center space-x-4">
                    <Link to="/admin/create" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center">
                        <Plus size={20} className="mr-2" />
                        Create Problem
                    </Link>
                    <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center">
                        <LogOut size={20} className="mr-2" />
                        Logout
                    </button>
                </div>
            </header>
            <main className="bg-white p-8 rounded-b-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">Problem List</h2>
                <div className="space-y-4">
                    {problems.length > 0 ? (
                        problems.map((problem) => (
                            <div key={problem._id} className="flex justify-between items-center p-5 bg-gray-50 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:bg-gray-100">
                                <span className="text-xl font-medium text-gray-700">{problem.title}</span>
                                <div className="flex space-x-3">
                                    <button onClick={() => handleDelete(problem._id)} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-lg shadow-sm transition-colors duration-200 flex items-center">
                                        <Trash2 size={16} className="mr-2" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">No problems found. Start by creating one!</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
