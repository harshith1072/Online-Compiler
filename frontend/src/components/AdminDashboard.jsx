const BASE_URL = "https://codejudge-lfe8.onrender.com";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteCandidate, setDeleteCandidate] = useState(null);
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
                const response = await fetch(`${BASE_URL}/problems`);
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

    const confirmDelete = (id) => {
        setDeleteCandidate(id);
    };

    const cancelDelete = () => {
        setDeleteCandidate(null);
    };

    const handleDelete = async () => {
        const id = deleteCandidate;
        setDeleteCandidate(null); 
        try {
            const response = await fetch(`${BASE_URL}/problems/${id}`, {
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
        <div className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-8 font-sans">
            <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-6 rounded-t-xl shadow-lg border-b-2 border-purple-500">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-600 mb-4 sm:mb-0">
                    Admin Dashboard
                </h1>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    <Link to="/admin/create" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center">
                        <Plus size={20} className="mr-2" />
                        Create Problem
                    </Link>
                    <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center">
                        <LogOut size={20} className="mr-2" />
                        Logout
                    </button>
                </div>
            </header>
            <main className="bg-white p-8 rounded-b-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">Problem List</h2>
                {deleteCandidate && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this problem?</p>
                            <div className="flex justify-center space-x-4">
                                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg">Yes, Delete</button>
                                <button onClick={cancelDelete} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="space-y-4">
                    {problems.length > 0 ? (
                        problems.map((problem) => (
                            <div key={problem._id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 bg-gray-50 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:bg-gray-100">
                                <span className="text-lg sm:text-xl font-medium text-gray-700 mb-2 sm:mb-0">{problem.title}</span>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                                    <button onClick={() => confirmDelete(problem._id)} className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center">
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
