
const BASE_URL = "http://localhost:9000";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Save } from 'lucide-react';

const EditProblem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState({
        title: '',
        statement: '',
        difficulty: 'Easy',
        testCases: [{ input: '', output: '' }],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdminLoggedIn');
        if (!isAdmin) {
            navigate('/admin-login');
            return;
        }

        const fetchProblem = async () => {
            try {
                const response = await fetch(`${BASE_URL}/${id}`);
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Failed to fetch problem data. Server responded with: ${text}`);
                }
                const data = await response.json();

                setProblem({
                    title: data.title || '',
                    statement: data.statement || '',
                    difficulty: data.difficulty || 'Easy',
                    testCases: Array.isArray(data.testCases) && data.testCases.length > 0
                        ? data.testCases
                        : [{ input: '', output: '' }],
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProblem(prev => ({ ...prev, [name]: value }));
    };

    const handleTestCaseChange = (index, e) => {
        const { name, value } = e.target;
        const newTestCases = [...problem.testCases];
        newTestCases[index][name] = value;
        setProblem(prev => ({ ...prev, testCases: newTestCases }));
    };

    const addTestCase = () => {
        setProblem(prev => ({
            ...prev,
            testCases: [...prev.testCases, { input: '', output: '' }],
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9000/problems/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(problem),
            });

            if (!response.ok) throw new Error('Failed to update problem');

            alert('Problem updated successfully!');
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Error updating problem:', err);
            setError('Failed to update problem.');
        }
    };

    const handleCancel = () => {
        navigate('/admin/dashboard');
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-800">
            <header className="flex justify-between items-center bg-white p-6 rounded-t-xl shadow-lg border-b-2 border-purple-500">
                <h1 className="text-3xl font-extrabold text-purple-600 flex items-center">
                    <button onClick={() => navigate('/admin/dashboard')} className="p-2 mr-3 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700">
                        <ArrowLeft size={24} />
                    </button>
                    Edit Problem
                </h1>
            </header>
            <main className="bg-white p-8 rounded-b-xl shadow-lg">
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Problem Name</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={problem.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                        />
                    </div>
                    <div>
                        <label htmlFor="statement" className="block text-sm font-medium text-gray-700 mb-1">Problem Statement</label>
                        <textarea
                            id="statement"
                            name="statement"
                            value={problem.statement}
                            onChange={handleChange}
                            rows="5"
                            required
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                        />
                    </div>
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                        <select
                            id="difficulty"
                            name="difficulty"
                            value={problem.difficulty}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Test Cases</h3>
                        <div className="space-y-4">
                            {(problem.testCases || []).map((testCase, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
                                    <div>
                                        <label htmlFor={`input-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Input {index + 1}</label>
                                        <textarea
                                            id={`input-${index}`}
                                            name="input"
                                            value={testCase.input}
                                            onChange={(e) => handleTestCaseChange(index, e)}
                                            rows="2"
                                            required
                                            className="w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`output-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Output {index + 1}</label>
                                        <textarea
                                            id={`output-${index}`}
                                            name="output"
                                            value={testCase.output}
                                            onChange={(e) => handleTestCaseChange(index, e)}
                                            rows="2"
                                            required
                                            className="w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addTestCase}
                            className="mt-6 flex items-center justify-center w-full py-3 px-6 border border-purple-500 rounded-lg text-purple-600 font-semibold hover:bg-purple-50 transition-colors duration-200"
                        >
                            <PlusCircle size={20} className="mr-2" />
                            Add Test Case
                        </button>
                    </div>
                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="py-3 px-8 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-3 px-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 flex items-center"
                        >
                            <Save size={20} className="mr-2" />
                            Update
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default EditProblem;
