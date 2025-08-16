
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from "./Editor";
import '../styles/FetchSingleProblem.css';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

const FetchSingleProblem = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [testCases, setTestCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProblemData = async () => {
            try {
                // const problemResponse = await fetch(`http://localhost:9000/problems/${id}`);
                const problemResponse = await fetch(`https://codejudge-lfe8.onrender.com/problems/${id}`);

                if (!problemResponse.ok) {
                    const text = await problemResponse.text();
                    throw new Error(`Failed to fetch problem data. Server responded with: ${text}`);
                }
                const problemData = await problemResponse.json();
                setProblem(problemData);

                // const testCasesResponse = await fetch(`http://localhost:9000/byProblem/${id}`);
                const testCasesResponse = await fetch(`https://codejudge-lfe8.onrender.com/byProblem/${id}`);

                if (!testCasesResponse.ok) {
                    const text = await testCasesResponse.text();
                    throw new Error(`Failed to fetch test cases. Server responded with: ${text}`);
                }
                const testCasesData = await testCasesResponse.json();
                setTestCases(testCasesData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProblemData();
    }, [id]);

    if (loading) {
        return <div className="loading-state">Loading...</div>;
    }

    if (error) {
        return <div className="error-state">Error: {error}</div>;
    }

    if (!problem) {
        return <div className="error-state">Problem not found.</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 text-gray-800 font-sans p-4">
            <div className="question-section lg:w-1/2 p-6 bg-white rounded-xl shadow-lg m-2 border border-gray-200 overflow-y-auto">
                <div className="Question">
                    <h1 className="text-3xl font-extrabold text-blue-600 mb-4">{problem.title}</h1>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                        {/* Replace the original paragraph with ReactMarkdown */}
                        <ReactMarkdown>{problem.description}</ReactMarkdown>
                        
                        <div className="test-cases-section mt-8">
                            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Sample Test Cases</h2>
                            {testCases.length > 0 ? (
                                testCases.slice(0, 2).map((testCase, index) => (
                                    <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4 shadow-sm">
                                        <h4 className="font-semibold text-lg text-blue-700">Test Case {index + 1}</h4>
                                        <div className="test-case-input mt-2">
                                            <p className="font-medium text-gray-800">Input:</p>
                                            <pre className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 overflow-x-auto">{testCase.input}</pre>
                                        </div>
                                        <div className="test-case-output mt-2">
                                            <p className="font-medium text-gray-800">Expected Output:</p>
                                            <pre className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 overflow-x-auto">{testCase.expected_output}</pre>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No sample test cases available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="editor-section lg:w-1/2 p-6 m-2 bg-white rounded-xl shadow-lg border border-gray-200">
                <Editor />
            </div>
        </div>
    );
};

export default FetchSingleProblem;