 
import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import "../Styles/Editor.css";
import TestCaseForm from "./TestCaseForm";
import config from "./config";
import { useParams, Link } from "react-router-dom";  
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Editor = () => {
    const COMPILER_URL = config.COMPILER_URL;
    const navigate = useNavigate();

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

    useEffect(() => {
        localStorage.setItem("savedCode", code);
    }, [code]);

    const [output, setOutput] = useState("  click on Run  Button");
    const [output1, setOutput1] = useState(" click on Run  Button");
    const [input, setInput] = useState("NIL");
 
    const [aiReviewResult, setAIReviewResult] = useState('Click on AI Review for code analysis');

    const { id } = useParams();


    const handleAIReview = async (e) => {
        e.preventDefault();

        const payload = {
            code: code,  
        };

        try {
            const { data } = await axios.post(`${COMPILER_URL}/ai-review`, payload);
            setAIReviewResult(data.review); 
        } catch (error) {
            console.error(error);
            setAIReviewResult("Error occurred while fetching AI review.");
        }
    };

    const handleRun = async () => {
        const payload = {
            language: selectedLanguage,
            code: code,
            input: input,
            problemId: parseInt(id, 10) + 1,
            isRun: true,
        };
        try {
            const { data } = await axios.post(`${COMPILER_URL}/run`, payload);
            console.log(data);
            setOutput(data.output);

        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        console.log(id);

        const payload = {
            language: selectedLanguage,
            code: code,
            input: input,
            problemId: parseInt(id, 10) + 1,
        };

        try {
            // Step 1: Run code
            const { data } = await axios.post(`${COMPILER_URL}/run`, payload);
          
            //   console.log(data);

            setOutput(data.output);
 
            const submissionPayload = {
                problem_id: parseInt(id, 10) + 1,
                submission_code: code,
                language: selectedLanguage,
                status:
                    data.output?.trim() === "Accepted ✅ All test cases passed"
                        ? "accepted"
                        : "rejected",
                result: data.output,
            };


            // Step 3: Send submission to backend
            // await axios.post(
            //     "http://localhost:9000/submissions",
            //     submissionPayload,
            //     { withCredentials: true }
            // );
            await axios.post(
  "https://codejudge-lfe8.onrender.com/submissions",
  submissionPayload,
  { withCredentials: true }
);

            console.log("Submission saved successfully");
        } catch (error) {
            console.error("Error during submission:", error);
            setOutput("Error during submission", error);
        }
    };


    const handleEditorial = () => {
        navigate(`/editorial/${id}`);
    };

    const [customInput, setCustomInput] = useState("");
    const [customOutput, setCustomOutput] = useState("");



    const handleCustomTestCase = async (e) => {
        e.preventDefault();
        const payload = {
            language: selectedLanguage,
            code: code,
            input: customInput,
            problemId: parseInt(id, 10) + 1,
        };
        try {
            const { data } = await axios.post(
                `${COMPILER_URL}/custom`,
                payload
            );
            console.log(data);
            setOutput1(data.output);
            if (customOutput === data.output.trim()) {
                setVerdict("pass");
            } else {
                setVerdict("fail");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="Editor">
                <div className="header">
                    <div className="language-select">
                        <label htmlFor="language-select">Select Language:</label>
                        <select
                            id="language-select"
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                        >
                            {languageOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="reset-btn" onClick={resetCode}>
                        Reset
                    </button>


                </div>
                <div>
                    <MonacoEditor
                        className="monaco-editor"
                        language={selectedLanguage}
                        theme="vs-dark"
                        value={code}
                        options={editorOptions}
                        onChange={(value) => {
                            setCode(value);
                            console.log(value);
                        }}
                        editorDidMount={(editor) => {
                            console.log("editorDidMount", editor);
                        }}
                    />
                    <div className="action-buttons-container">
                        <div className="left-buttons">
                            <button className="run-btn" onClick={handleRun}>
                                Run
                            </button>
                            <button className="submit-btn" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                        <Link to={`/solutions/${id}`} className="view-solution-btn">
                            View Solution
                        </Link>
                    </div>
                </div>
            </div>

            <div className="output-container">
                <div>
                    <p className="output-title">Result</p>
                    {output === "--no stdouts--" ? (
                        <p>"--no stdouts--"</p>
                    ) : (
                        <div>{output}</div>
                    )}
                    <br />
                </div>




            </div>
            <h2>Check Against Custom Testcases:</h2>



            <form className="test-case-form" onSubmit={handleCustomTestCase}>
                <div>
                    <label htmlFor="input">Input:</label>
                    <textarea
                        id="input"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="output">Expected Output:</label>
                    <textarea
                        id="output"
                        value={customOutput}
                        onChange={(e) => setCustomOutput(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Actual Output:</label>
                    <textarea
                        value={output1}
                        readOnly
                        placeholder="Output will appear here"
                    />
                </div>

                <button type="submit">Run</button>
            </form>




            <form onSubmit={handleAIReview} className="ai-review-form">
                <div className="w-full h-auto min-h-40 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
                    <ReactMarkdown>{aiReviewResult}</ReactMarkdown>
                </div>
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    AI Review
                </button>
            </form>





        </>
    );
};

export default Editor;