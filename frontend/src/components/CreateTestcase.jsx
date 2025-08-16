 


const BASE_URL = "http://localhost:9000";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';

const CreateTestcase = () => {
    // We no longer get the problem_id from params, so we initialize it as an empty string
    const navigate = useNavigate();
    const [testcases, setTestcases] = useState([{
        problem_id: '',
        input: '',
        expected_output: '',
    }]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdminLoggedIn');
        if (!isAdmin) {
            navigate('/admin-login');
        }
    }, [navigate]);

    const handleTestCaseChange = (index, e) => {
        const { name, value } = e.target;
        const newTestcases = [...testcases];
        // Ensure problem_id is converted to a number if the name matches
        newTestcases[index][name] = name === 'problem_id' ? Number(value) : value;
        setTestcases(newTestcases);
    };

    const addTestCase = () => {
        setTestcases(prev => [...prev, {
            problem_id: '',
            input: '',
            expected_output: '',
        }]);
    };

    const removeTestCase = (index) => {
        const newTestcases = testcases.filter((_, i) => i !== index);
        setTestcases(newTestcases);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        // Client-side validation check before submitting
        const isValid = testcases.every(tc => tc.input.trim() !== '' && tc.expected_output.trim() !== '' && tc.problem_id !== '');
        if (!isValid) {
            setMessage('Please fill in all test case fields.');
            return;
        }

        try {
            // Send each test case as a separate request
            const results = await Promise.all(testcases.map(async (testcase) => {
                const response = await fetch('${BASE_URL}/testcases', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(testcase),
                });
                return response;
            }));

            const allResponsesOk = results.every(response => response.ok);

            if (allResponsesOk) {
                setMessage('All test cases created successfully!');
                setTestcases([{ problem_id: '', input: '', expected_output: '' }]); // Clear form
            } else {
                setMessage('Failed to create one or more test cases. Please check the console for details.');
            }
        } catch (err) {
            console.error('Error creating test case(s):', err);
            setMessage('Network error. Please try again.');
        }
    };
    
    const handleCancel = () => {
        navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-800">
            <header className="flex items-center bg-white p-6 rounded-t-xl shadow-lg border-b-2 border-purple-500">
                <button onClick={handleCancel} className="p-2 mr-3 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-extrabold text-purple-600">
                    Add Test Cases
                </h1>
            </header>
            <main className="bg-white p-8 rounded-b-xl shadow-lg">
                {message && (
                    <div className={`p-4 mb-6 rounded-lg text-sm text-center ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {testcases.map((testcase, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50 relative">
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Test Case {index + 1}</h3>
                            {testcases.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeTestCase(index)}
                                    className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                             <div>
                                <label htmlFor={`problem_id-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Problem ID</label>
                                <input
                                    type="number"
                                    id={`problem_id-${index}`}
                                    name="problem_id"
                                    value={testcase.problem_id}
                                    onChange={(e) => handleTestCaseChange(index, e)}
                                    required
                                    className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor={`input-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Input</label>
                                <textarea
                                    id={`input-${index}`}
                                    name="input"
                                    value={testcase.input}
                                    onChange={(e) => handleTestCaseChange(index, e)}
                                    rows="3"
                                    required
                                    className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor={`expected_output-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Expected Output</label>
                                <textarea
                                    id={`expected_output-${index}`}
                                    name="expected_output"
                                    value={testcase.expected_output}
                                    onChange={(e) => handleTestCaseChange(index, e)}
                                    rows="3"
                                    required
                                    className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addTestCase}
                        className="mt-6 flex items-center justify-center w-full py-3 px-6 border border-purple-500 rounded-lg text-purple-600 font-semibold hover:bg-purple-50 transition-colors duration-200"
                    >
                        <PlusCircle size={20} className="mr-2" />
                        Add Another Test Case
                    </button>
                    
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
                            Save All Test Cases
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default CreateTestcase;
