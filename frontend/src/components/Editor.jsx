import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Editor = () => {
    const COMPILER_URL = "https://online-compiler-076b.onrender.com";
    const SERVER_URL = "https://codejudge-lfe8.onrender.com";
    const navigate = useNavigate();
    const { id } = useParams();

    const defaultCode = {
        cpp: `
// Boilerplate code for C++
#include <iostream>
using namespace std;
int main() { 
    cout << "Hello World"; 
    return 0; 
}`,
        java: `
// Boilerplate code for Java
public class Main {
   public static void main(String[] args) {
     System.out.println("Hello World");
   }
}`,
        python: `print("Hello World")`,
        javascript: `
// Boilerplate code for JavaScript
console.log("Hello World");`,
        ruby: `
# Boilerplatecode for Ruby
puts "Hey, Harshith!"
`,
    };

    const [selectedLanguage, setSelectedLanguage] = useState("cpp");
    const [code, setCode] = useState(
        localStorage.getItem("savedCode") || defaultCode[selectedLanguage]
    );
    const [output, setOutput] = useState("Click on Run button");
    const [customInput, setCustomInput] = useState("");
    const [customOutput, setCustomOutput] = useState("");
    const [actualCustomOutput, setActualCustomOutput] = useState("Click on Run button");
    const [aiReviewResult, setAIReviewResult] = useState(
        "Click on AI Review for code analysis"
    );
    const [loading, setLoading] = useState(false);
    const [verdict, setVerdict] = useState(null);

    useEffect(() => {
        localStorage.setItem("savedCode", code);
    }, [code]);

    const editorOptions = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: true,
    };

    const languageOptions = [
        { label: "JavaScript", value: "javascript" },
        { label: "Python", value: "python" },
        { label: "Java", value: "java" },
        { label: "C++", value: "cpp" },
    ];

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
        setCode(defaultCode[e.target.value]);
    };

    const resetCode = () => {
        setCode(defaultCode[selectedLanguage]);
        localStorage.removeItem("savedCode");
    };

    const handleAIReview = async (e) => {
        e.preventDefault();
        const payload = { code: code };
        try {
            const { data } = await axios.post(`${COMPILER_URL}/ai-review`, payload);
            setAIReviewResult(data.review);
        } catch (error) {
            console.error(error);
            setAIReviewResult("Error occurred while fetching AI review.");
        }
    };

    const handleRun = async () => {
        setLoading(true);
        const payload = {
            language: selectedLanguage,
            code: code,
            input: customInput,
            problemId: parseInt(id, 10) + 1,
            isRun: true,
        };
        try {
            const { data } = await axios.post(`${COMPILER_URL}/run`, payload);
            setOutput(data.output);
        } catch (error) {
            console.error(error);
            setOutput("Error running code. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        const payload = {
            language: selectedLanguage,
            code: code,
            input: customInput,
            problemId: parseInt(id, 10) + 1,
        };
        try {
            const { data } = await axios.post(`${COMPILER_URL}/run`, payload);
            setOutput(data.output);

            const submissionPayload = {
                problem_id: parseInt(id, 10) + 1,
                submission_code: code,
                language: selectedLanguage,
                status:
                    data.output?.trim() === "Accepted ✅ All test cases passed" ?
                    "accepted" :
                    "rejected",
                result: data.output,
            };

            await axios.post(`${SERVER_URL}/submissions`, submissionPayload, {
                withCredentials: true,
            });
            console.log("Submission saved successfully");
        } catch (error) {
            console.error("Error during submission:", error);
        }
    };

    const handleCustomTestCase = async (e) => {
        e.preventDefault();
        const payload = {
            language: selectedLanguage,
            code: code,
            input: customInput,
            problemId: parseInt(id, 10) + 1,
        };
        try {
            const { data } = await axios.post(`${COMPILER_URL}/custom`, payload);
            setActualCustomOutput(data.output);
            if (customOutput.trim() === data.output.trim()) {
                setVerdict("pass");
            } else {
                setVerdict("fail");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            {/* Top Section: Language Select and Reset Button */}
            <div className="bg-white rounded-t-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <label htmlFor="language-select" className="font-semibold text-gray-700">Select Language:</label>
                    <select
                        id="language-select"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        className="p-2 border rounded-md"
                    >
                        {languageOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={resetCode}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition-colors duration-200"
                >
                    Reset
                </button>
            </div>
            
            {/* Code Editor Section */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md h-[50vh] md:h-[60vh] border border-gray-200">
                <MonacoEditor
                    language={selectedLanguage}
                    theme="vs-dark"
                    value={code}
                    options={editorOptions}
                    onChange={(value) => setCode(value)}
                />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex space-x-4 w-full sm:w-auto">
                    <button
                        onClick={handleRun}
                        disabled={loading}
                        className="w-1/2 sm:w-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        {loading ? "Running..." : "Run"}
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-1/2 sm:w-auto bg-green-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-green-700 transition-colors duration-200"
                    >
                        Submit
                    </button>
                </div>
                <Link
                    to={`/solutions/${id}`}
                    className="w-full sm:w-auto text-center bg-gray-500 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-200"
                >
                    View Solution
                </Link>
            </div>
            
            {/* Output Container */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Result</h2>
                <div className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto min-h-[100px] whitespace-pre-wrap font-mono">
                    {loading ? (
                        <span>Running...</span>
                    ) : output === "--no stdouts--" ? (
                        <span>"--no stdouts--"</span>
                    ) : (
                        <span>{output}</span>
                    )}
                </div>
            </div>
            
            {/* Custom Test Case Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Check Against Custom Testcases</h2>
                <form onSubmit={handleCustomTestCase} className="space-y-4">
                    <div>
                        <label htmlFor="input" className="block font-semibold mb-1">Input:</label>
                        <textarea
                            id="input"
                            value={customInput}
                            onChange={(e) => setCustomInput(e.target.value)}
                            required
                            rows="4"
                            className="w-full p-2 border rounded-md font-mono"
                        />
                    </div>
                    <div>
                        <label htmlFor="output" className="block font-semibold mb-1">Expected Output:</label>
                        <textarea
                            id="output"
                            value={customOutput}
                            onChange={(e) => setCustomOutput(e.target.value)}
                            required
                            rows="4"
                            className="w-full p-2 border rounded-md font-mono"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Actual Output:</label>
                        <textarea
                            value={actualCustomOutput}
                            readOnly
                            rows="4"
                            placeholder="Output will appear here"
                            className="w-full p-2 border rounded-md font-mono bg-gray-100"
                        />
                    </div>
                    {verdict && (
                        <div className={`verdict p-2 rounded-md font-bold text-center ${verdict === "pass" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                            {verdict === "pass" ? "Custom Test Case Passed" : "Custom Test Case Failed"}
                        </div>
                    )}
                    <button type="submit" className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200">
                        Run Custom Test Case
                    </button>
                </form>
            </div>
            
            {/* AI Review Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">AI Code Review</h2>
                <form onSubmit={handleAIReview}>
                    <div className="w-full h-auto min-h-40 p-4 border rounded-md bg-gray-50 whitespace-pre-wrap overflow-y-auto">
                        <ReactMarkdown>{aiReviewResult}</ReactMarkdown>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Get AI Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Editor;
