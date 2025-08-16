 

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { PlusCircle, Save, ArrowLeft, Tags } from 'lucide-react';

// const CreateProblem = () => {
//     const [problem, setProblem] = useState({
//         _id: '',
//         title: '',
//         description: '',
//         difficulty: '',
//         tags: ['']
//     });
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const isAdmin = sessionStorage.getItem('isAdminLoggedIn');
//         if (!isAdmin) {
//             navigate('/admin-login');
//         }
//     }, [navigate]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProblem(prev => ({ ...prev, [name]: value }));
//     };

//     const handleTagChange = (index, e) => {
//         const newTags = [...problem.tags];
//         newTags[index] = e.target.value;
//         setProblem(prev => ({ ...prev, tags: newTags }));
//     };

//     const addTag = () => {
//         setProblem(prev => ({
//             ...prev,
//             tags: [...prev.tags, '']
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');

//         const problemWithCleanedTags = {
//             ...problem,
//             tags: problem.tags.filter(tag => tag.trim() !== '')
//         };
        
//         try {
//             const response = await fetch('http://localhost:9000/problems', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(problemWithCleanedTags),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setMessage('Problem created successfully!');
//                 setProblem({
//                     _id: '',
//                     title: '',
//                     description: '',
//                     difficulty: '',
//                     tags: [''],
//                 });
//             } else {
//                 setMessage(data.message || 'Failed to create problem.');
//             }
//         } catch (err) {
//             console.error('Error creating problem:', err);
//             setMessage('Network error. Please try again.');
//         }
//     };
    
//     const handleCancel = () => {
//         navigate('/admin/dashboard');
//     };

//     const handleAddTestCases = () => {
//         navigate(`/admin/create-testcase/${problem._id}`);
//     };
    
//     return (
//         <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-800">
//             <header className="flex items-center bg-white p-6 rounded-t-xl shadow-lg border-b-2 border-purple-500">
//                 <button onClick={handleCancel} className="p-2 mr-3 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700">
//                     <ArrowLeft size={24} />
//                 </button>
//                 <h1 className="text-3xl font-extrabold text-purple-600">
//                     Create New Problem
//                 </h1>
//             </header>
//             <main className="bg-white p-8 rounded-b-xl shadow-lg">
//                 {message && (
//                     <div className={`p-4 mb-6 rounded-lg text-sm text-center ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                         {message}
//                     </div>
//                 )}
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label htmlFor="_id" className="block text-sm font-medium text-gray-700 mb-1">Problem ID</label>
//                         <input
//                             type="text"
//                             id="_id"
//                             name="_id"
//                             value={problem._id}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Problem Name</label>
//                         <input
//                             type="text"
//                             id="title"
//                             name="title"
//                             value={problem.title}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Problem Statement</label>
//                         <textarea
//                             id="description"
//                             name="description"
//                             value={problem.description}
//                             onChange={handleChange}
//                             rows="5"
//                             required
//                             className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
//                         <select
//                             id="difficulty"
//                             name="difficulty"
//                             value={problem.difficulty}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
//                         >
//                             <option value="" disabled>Select Difficulty</option>
//                             <option value="easy">Easy</option>
//                             <option value="medium">Medium</option>
//                             <option value="hard">Hard</option>
//                         </select>
//                     </div>
//                     <div>
//                         <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Tags</h3>
//                         <div className="space-y-2">
//                             {problem.tags.map((tag, index) => (
//                                 <input
//                                     key={index}
//                                     type="text"
//                                     name="tags"
//                                     value={tag}
//                                     onChange={(e) => handleTagChange(index, e)}
//                                     className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
//                                     placeholder="Enter tag (e.g., Array, Dynamic Programming)"
//                                 />
//                             ))}
//                         </div>
//                         <button
//                             type="button"
//                             onClick={addTag}
//                             className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-200"
//                         >
//                             <Tags size={20} className="mr-2" />
//                             Add Another Tag
//                         </button>
//                     </div>
//                     <div className="flex justify-end space-x-4 mt-8">
//                         <button
//                             type="button"
//                             onClick={handleCancel}
//                             className="py-3 px-8 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-200"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="py-3 px-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 flex items-center"
//                         >
//                             <Save size={20} className="mr-2" />
//                             Save Problem
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleAddTestCases}
//                             className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 flex items-center"
//                         >
//                             <PlusCircle size={20} className="mr-2" />
//                             Add Test Cases
//                         </button>
//                     </div>
//                 </form>
//             </main>
//         </div>
//     );
// };

// export default CreateProblem;


const BASE_URL = "http://localhost:9000";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Save, ArrowLeft, Tags } from 'lucide-react';

const CreateProblem = () => {
    const [problem, setProblem] = useState({
        _id: '',
        title: '',
        description: '',
        difficulty: '',
        tags: ['']
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdminLoggedIn');
        if (!isAdmin) {
            navigate('/admin-login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProblem(prev => ({ ...prev, [name]: value }));
    };

    const handleTagChange = (index, e) => {
        const newTags = [...problem.tags];
        newTags[index] = e.target.value;
        setProblem(prev => ({ ...prev, tags: newTags }));
    };

    const addTag = () => {
        setProblem(prev => ({
            ...prev,
            tags: [...prev.tags, '']
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const problemWithCleanedTags = {
            ...problem,
            tags: problem.tags.filter(tag => tag.trim() !== '')
        };
        
        try {
            const response = await fetch(`${BASE_URL}/problems`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(problemWithCleanedTags),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Problem created successfully!');
                setProblem({
                    _id: '',
                    title: '',
                    description: '',
                    difficulty: '',
                    tags: [''],
                });
            } else {
                setMessage(data.message || 'Failed to create problem.');
            }
        } catch (err) {
            console.error('Error creating problem:', err);
            setMessage('Network error. Please try again.');
        }
    };
    
    const handleCancel = () => {
        navigate('/admin/dashboard');
    };

    const handleAddTestCases = () => {
        navigate(`/admin/create-testcase/${problem._id}`);
    };
    
    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-800">
            <header className="flex items-center bg-white p-6 rounded-t-xl shadow-lg border-b-2 border-purple-500">
                <button onClick={handleCancel} className="p-2 mr-3 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-extrabold text-purple-600">
                    Create New Problem
                </h1>
            </header>
            <main className="bg-white p-8 rounded-b-xl shadow-lg">
                {message && (
                    <div className={`p-4 mb-6 rounded-lg text-sm text-center ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="_id" className="block text-sm font-medium text-gray-700 mb-1">Problem ID</label>
                        <input
                            type="text"
                            id="_id"
                            name="_id"
                            value={problem._id}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                        />
                    </div>
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
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Problem Statement</label>
                        <textarea
                            id="description"
                            name="description"
                            value={problem.description}
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
                            required
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                        >
                            <option value="" disabled>Select Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Tags</h3>
                        <div className="space-y-2">
                            {problem.tags.map((tag, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    name="tags"
                                    value={tag}
                                    onChange={(e) => handleTagChange(index, e)}
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-gray-800"
                                    placeholder="Enter tag (e.g., Array, Dynamic Programming)"
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addTag}
                            className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-200"
                        >
                            <Tags size={20} className="mr-2" />
                            Add Another Tag
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
                            Save Problem
                        </button>
                        <button
                            type="button"
                            onClick={handleAddTestCases}
                            className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 flex items-center"
                        >
                            <PlusCircle size={20} className="mr-2" />
                            Add Test Cases
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default CreateProblem;
