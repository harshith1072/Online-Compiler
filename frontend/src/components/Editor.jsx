import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import "../Styles/Editor.css";
import TestCaseForm from "./TestCaseForm";
import config from "./config";
import { useParams } from "react-router-dom";
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

  const [output, setOutput] = useState("  click on Run  Button");
  const [output1, setOutput1] = useState(" click on Run  Button");
  const [input, setInput] = useState("NIL");
  // const [verdict, setVerdict] = useState("click on submit");
 const [aiReviewResult, setAIReviewResult] = useState('Click on AI Review for code analysis');


  const { id } = useParams();


const handleAIReview = async (e) => {
  e.preventDefault();

  const payload = {
    code: code, // assuming `code` contains your editor code
  };

  try {
    const { data } = await axios.post(`${COMPILER_URL}/ai-review`, payload);
    setAIReviewResult(data.review); // display the review
  } catch (error) {
    console.error(error);
    setAIReviewResult("Error occurred while fetching AI review.");
  }
};






  // const handleRun = async () => {
  //   const payload = {
  //     language: selectedLanguage,
  //     code: code,
  //     input: input,
  //     problemId: parseInt(id, 10) + 1,
  //   };
  //   try {
  //     const { data } = await axios.post(`${COMPILER_URL}/run`, payload);
  //     console.log(data);
  //     setOutput(data.output);
  //     setVerdict("click on submit ");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };







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
    // setVerdict("click on submit ");
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
      const { data } = await axios.post(`${COMPILER_URL}/run`, payload);
      console.log(data);
      setOutput(data.output);
      setVerdict(data.verdict);
 
      console.log(verdict);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditorial = () => {
    navigate(`/editorial/${id}`);
  };

  const [customInput, setCustomInput] = useState("");
  const [customOutput, setCustomOutput] = useState("");

  // const handleCustomTestCase = async (e) => {
  //   e.preventDefault();
    
  //   const payload = {
  //     language: selectedLanguage,
  //     code: code,
  //     input: customInput,
  //     problemId: parseInt(id, 10) + 1,
  //   };
  //   try {
  //     const { data } = await axios.post(
  //       `${COMPILER_URL}/custom-testcase`,
  //       payload
  //     );
  //     console.log(data);
  //     setOutput(data.output);
  //     if (customOutput === output)
  //       setVerdict("Congratulations the output is as you expected!");
  //     else setVerdict("The output isn't as you expected!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
{/* 
   <button className="editorial-btn" onClick={handleEditorial}>
            Editorial
          </button> */}


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
          <div className="buttons">
            <button className="run-btn" onClick={handleRun}>
              Run
            </button>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
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

        {/* <div>
          <p className="output-title">Verdict:</p>
          {verdict === "Error in verifying test cases" ? (
            <>
              {verdict}
              <p>
                if you think this is a mistake, please email at
                harshithmateti2005@gmail.com to report
              </p>
            </>
          ) : (
            <p>{verdict}</p>
          )}
        </div> */}

       
      
      </div>
      <h2>Check Against Custom Testcases:</h2>

      {/* <form className="test-case-form" onSubmit={handleCustomTestCase}>
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
        
        <button type="submit">Verify</button>
      </form> */}

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



































// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Link, useNavigate, useParams } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { Play, Check, X, Code, Bot, Menu, Terminal } from "lucide-react";
// import ReactMarkdown from 'react-markdown';

// const App = () => {
//     // Boilerplate code for each language
//     const defaultCode = {
//         cpp: `#include <iostream>
// using namespace std;
// int main() {
//     cout << "Hello World";
//     return 0;
// }`,
//         java: `public class Main {
//     public static void main(String[] args) {
//         System.out.println("Hello World");
//     }
// }`,
//         python: `print("Hello World")`,
//         javascript: `console.log("Hello World");`,
//         ruby: `puts "Hey, Harshith!"`
//     };

//     const navigate = useNavigate();
//     const { id } = useParams();

//     const [selectedLanguage, setSelectedLanguage] = useState("cpp");
//     const [code, setCode] = useState(
//         localStorage.getItem("savedCode") || defaultCode[selectedLanguage]
//     );
//     const [output, setOutput] = useState("click on Run Button");
//     const [verdict, setVerdict] = useState("click on Submit");
//     const [aiReviewResult, setAIReviewResult] = useState('Click on AI Review for code analysis');
//     const [isLoading, setIsLoading] = useState(false);
//     const [isCustomTestLoading, setIsCustomTestLoading] = useState(false);
//     const [isAIReviewLoading, setIsAIReviewLoading] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const [customInput, setCustomInput] = useState("");
//     const [customOutput, setCustomOutput] = useState("");
//     const [actualCustomOutput, setActualCustomOutput] = useState("");
//     const [customVerdict, setCustomVerdict] = useState("");

//     // Retaining your URLs as requested
//     // The environment variables were causing a build error.
//     // I've replaced them with placeholder strings. You'll need to
//     // update these with your actual backend and API URLs.
//     const COMPILER_URL = 'YOUR_COMPILER_URL_HERE';
//     const GEMINI_API_URL = 'YOUR_GEMINI_API_URL_HERE';

//     // Sync code with localStorage on change
//     useEffect(() => {
//         localStorage.setItem("savedCode", code);
//     }, [code]);

//     // Update the code editor with boilerplate code when the language changes
//     const handleLanguageChange = (e) => {
//         const newLanguage = e.target.value;
//         setSelectedLanguage(newLanguage);
//         setCode(defaultCode[newLanguage]);
//         toast.success(`Language set to ${newLanguage.toUpperCase()}`);
//     };

//     const resetCode = () => {
//         setCode(defaultCode[selectedLanguage]);
//         localStorage.removeItem("savedCode");
//         toast.success("Code has been reset!");
//     };

//     const handleRun = async () => {
//         if (!code.trim()) {
//             toast.error("Code cannot be empty!");
//             return;
//         }

//         setIsLoading(true);
//         setOutput("Executing code...");
//         setVerdict("running...");

//         const payload = {
//             language: selectedLanguage,
//             code: code,
//             input: customInput,
//             problemId: parseInt(id, 10) + 1,
//             isRun: true,
//         };

//         try {
//             const response = await fetch(`${COMPILER_URL}/run`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload)
//             });

//             const data = await response.json();
//             setOutput(data.output || 'No output returned.');
//             setVerdict('Click on Submit to verify');
//             toast.success("Code run successfully!");
//         } catch (error) {
//             setOutput('Error executing code. Check your code or server status.');
//             toast.error("Error executing code.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSubmit = async () => {
//         if (!code.trim()) {
//             toast.error("Code cannot be empty!");
//             return;
//         }

//         setIsLoading(true);
//         setVerdict("Submitting...");
//         setOutput("");

//         const payload = {
//             language: selectedLanguage,
//             code: code,
//             problemId: parseInt(id, 10) + 1,
//         };

//         try {
//             const response = await fetch(`${COMPILER_URL}/run`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload)
//             });

//             const data = await response.json();
//             setVerdict(data.verdict || 'Unknown verdict');
//             toast.success("Submission complete!");
//         } catch (error) {
//             setVerdict('Error during submission.');
//             toast.error("Error during submission.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleAIReview = async (e) => {
//         e.preventDefault();
//         if (!code.trim()) {
//             toast.error("Code cannot be empty!");
//             return;
//         }

//         setIsAIReviewLoading(true);
//         setAIReviewResult("Thinking...");

//         try {
//             let chatHistory = [];
//             chatHistory.push({ role: "user", parts: [{ text: `Review the following code for correctness, efficiency, and best practices. Respond in markdown:\n\n\`\`\`${selectedLanguage}\n${code}\n\`\`\`` }] });
//             const payload = { contents: chatHistory };
//             const apiKey = "";
//             const apiUrl = `${GEMINI_API_URL}/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload)
//             });

//             const result = await response.json();

//             if (result.candidates && result.candidates.length > 0 &&
//                 result.candidates[0].content && result.candidates[0].content.parts &&
//                 result.candidates[0].content.parts.length > 0) {
//               const text = result.candidates[0].content.parts[0].text;
//               setAIReviewResult(text);
//               toast.success("AI review complete!");
//             } else {
//               setAIReviewResult('Error in AI review. Please try again.');
//               toast.error("Error in AI review.");
//             }
//         } catch (error) {
//             setAIReviewResult('Error in AI review. Please try again.');
//             toast.error("Error in AI review.");
//         } finally {
//             setIsAIReviewLoading(false);
//         }
//     };

//     const handleCustomTestCase = async (e) => {
//         e.preventDefault();
//         if (!code.trim()) {
//             toast.error("Code cannot be empty!");
//             return;
//         }
        
//         setIsCustomTestLoading(true);
//         setActualCustomOutput("Running custom test case...");
//         setCustomVerdict("");

//         const payload = {
//             language: selectedLanguage,
//             code: code,
//             input: customInput,
//             problemId: parseInt(id, 10) + 1,
//         };

//         try {
//             const response = await fetch(`${COMPILER_URL}/custom`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload)
//             });

//             const data = await response.json();
//             const actualOutputTrimmed = data.output.trim();
//             const expectedOutputTrimmed = customOutput.trim();
//             setActualCustomOutput(actualOutputTrimmed || 'No output returned.');

//             if (actualOutputTrimmed === expectedOutputTrimmed) {
//                 setCustomVerdict("pass");
//                 toast.success("Custom test case passed!");
//             } else {
//                 setCustomVerdict("fail");
//                 toast.error("Custom test case failed.");
//             }
//         } catch (error) {
//             setActualCustomOutput('Error running custom test case.');
//             setCustomVerdict("error");
//             toast.error("Error running custom test case.");
//         } finally {
//             setIsCustomTestLoading(false);
//         }
//     };

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     const getVerdictClass = (verdictStatus) => {
//         if (!verdictStatus) return '';
//         switch(verdictStatus.toLowerCase()) {
//             case 'pass':
//                 return 'text-green-500 bg-green-50 border-green-300';
//             case 'fail':
//                 return 'text-red-500 bg-red-50 border-red-300';
//             case 'submitting...':
//                 return 'text-yellow-500 bg-yellow-50 border-yellow-300';
//             case 'running...':
//                 return 'text-blue-500 bg-blue-50 border-blue-300';
//             default:
//                 return 'text-gray-500 bg-gray-50 border-gray-300';
//         }
//     };

//     const getGeneralVerdictClass = (verdictStatus) => {
//         if (!verdictStatus) return 'bg-gray-100 text-gray-500';
//         switch(verdictStatus.toLowerCase()) {
//             case 'accepted':
//                 return 'bg-green-500 text-white';
//             case 'wrong answer':
//                 return 'bg-red-500 text-white';
//             case 'submitting...':
//                 return 'bg-yellow-500 text-white animate-pulse';
//             case 'click on submit':
//                 return 'bg-gray-200 text-gray-700';
//             default:
//                 return 'bg-gray-200 text-gray-700';
//         }
//     };

//     return (
//         <div className="bg-gray-100 text-gray-900 font-sans antialiased min-h-screen flex flex-col">
//             <Toaster />
//             {/* Navbar */}
//             <header className="sticky top-0 z-50 bg-white shadow-lg">
//                 <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//                     <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
//                         <Terminal size={32} />
//                         <span>CodeJudge</span>
//                     </Link>
//                     <div className="hidden md:flex space-x-6 items-center">
//                         <Link to="/problems" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-bold">Problems</Link>
//                         <Link to="/compiler" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Compiler</Link>
//                         <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-all duration-300">Login</Link>
//                         <Link to="/register" className="border border-blue-600 text-blue-600 font-medium py-2 px-5 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">Register</Link>
//                     </div>
//                     <div className="md:hidden flex items-center">
//                         <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
//                             {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//                         </button>
//                     </div>
//                 </nav>
//                 <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white p-4 transition-all duration-300 ease-in-out`}>
//                     <div className="flex flex-col space-y-4 text-center">
//                         <Link to="/problems" className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-bold">Problems</Link>
//                         <Link to="/compiler" className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">Compiler</Link>
//                         <Link to="/login" className="block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-all duration-300">Login</Link>
//                         <Link to="/register" className="block border border-blue-600 text-blue-600 font-medium py-2 px-5 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">Register</Link>
//                     </div>
//                 </div>
//             </header>

//             <main className="flex-grow p-4 md:p-8">
//                 <div className="max-w-7xl mx-auto">
//                     <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Problem: {parseInt(id, 10) + 1}</h1>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                         {/* Left Column: Problem Description & Editorial */}
//                         <div className="flex flex-col gap-6">
//                              {/* Problem Description */}
//                             <div className="bg-white shadow-xl rounded-2xl p-6 flex-grow">
//                                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Problem Description</h2>
//                                 <p className="text-gray-600 leading-relaxed">
//                                     You are given two numbers, a and b. Your task is to write a program that reads these two numbers from the standard input and prints their sum to the standard output.
//                                 </p>
//                             </div>
//                             {/* Editorial Button */}
//                             <div className="bg-white shadow-xl rounded-2xl p-6">
//                                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Editorial</h2>
//                                 <button
//                                     onClick={() => navigate(`/editorial/${id}`)}
//                                     className="w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-md"
//                                 >
//                                     View Editorial
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Right Column: Code Editor & Controls */}
//                         <div className="flex flex-col gap-6">
//                              {/* Code Editor */}
//                             <div className="flex flex-col bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-700">
//                                 <div className="flex justify-between items-center bg-gray-950 p-3 shadow-md">
//                                     <div className="flex items-center space-x-2">
//                                         <Code size={20} className="text-blue-400" />
//                                         <h2 className="text-lg font-semibold text-gray-300">Code Editor</h2>
//                                     </div>
//                                     <select
//                                         className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//                                         value={selectedLanguage}
//                                         onChange={handleLanguageChange}
//                                     >
//                                         <option value="cpp">C++</option>
//                                         <option value="java">Java</option>
//                                         <option value="python">Python</option>
//                                         <option value="javascript">JavaScript</option>
//                                         <option value="ruby">Ruby</option>
//                                     </select>
//                                 </div>
//                                 <div className="flex-grow">
//                                     <textarea
//                                         value={code}
//                                         onChange={(e) => setCode(e.target.value)}
//                                         className="w-full h-[400px] p-4 text-sm font-mono border-none bg-gray-800 text-gray-200 resize-none focus:outline-none"
//                                         style={{
//                                             fontFamily: '"Fira code", "Fira Mono", monospace',
//                                             lineHeight: '1.5',
//                                             tabSize: 4
//                                         }}
//                                     />
//                                 </div>
//                             </div>

//                             {/* Controls */}
//                             <div className="flex flex-col gap-4">
//                                 <div className="flex gap-4">
//                                     <button
//                                         onClick={handleRun}
//                                         disabled={isLoading}
//                                         className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
//                                     >
//                                         <Play size={20} />
//                                         <span>Run</span>
//                                     </button>
//                                     <button
//                                         onClick={handleSubmit}
//                                         disabled={isLoading}
//                                         className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white shadow-md'}`}
//                                     >
//                                         <Check size={20} />
//                                         <span>Submit</span>
//                                     </button>
//                                 </div>
//                                 <div className="flex gap-4">
//                                     <button
//                                         onClick={resetCode}
//                                         className="flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-md"
//                                     >
//                                         Reset Code
//                                     </button>
//                                     <button
//                                         onClick={handleAIReview}
//                                         disabled={isAIReviewLoading}
//                                         className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${isAIReviewLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'}`}
//                                     >
//                                         <Bot size={20} className="mr-2" />
//                                         <span>AI Review</span>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Output and Verdicts */}
//                     <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//                         {/* Run Output */}
//                         <div className="bg-white shadow-xl rounded-2xl p-6">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Run Output</h2>
//                             <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap h-40 overflow-y-auto">
//                                 {isLoading ? <div className="text-center text-blue-600">Loading...</div> : (output || 'Your output will appear here.')}
//                             </div>
//                         </div>
//                         {/* Submission Verdict */}
//                         <div className="bg-white shadow-xl rounded-2xl p-6">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Submission Verdict</h2>
//                             <div className={`text-center py-4 rounded-lg font-bold text-lg transition-colors duration-300 ${getGeneralVerdictClass(verdict)}`}>
//                                 {verdict}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Custom Test Case Section */}
//                     <div className="mt-6 bg-white shadow-xl rounded-2xl p-6">
//                         <h2 className="text-2xl font-bold text-gray-800 mb-4">Custom Test Case</h2>
//                         <form onSubmit={handleCustomTestCase} className="flex flex-col md:grid md:grid-cols-2 gap-6">
//                             <div>
//                                 <label htmlFor="custom-input" className="block text-sm font-medium text-gray-700 mb-2">Input</label>
//                                 <textarea
//                                     id="custom-input"
//                                     value={customInput}
//                                     onChange={(e) => setCustomInput(e.target.value)}
//                                     placeholder="Enter custom input here..."
//                                     className="w-full h-32 p-3 text-sm border border-gray-300 rounded-lg bg-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="custom-expected-output" className="block text-sm font-medium text-gray-700 mb-2">Expected Output</label>
//                                 <textarea
//                                     id="custom-expected-output"
//                                     value={customOutput}
//                                     onChange={(e) => setCustomOutput(e.target.value)}
//                                     placeholder="Enter expected output here..."
//                                     className="w-full h-32 p-3 text-sm border border-gray-300 rounded-lg bg-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//                                     required
//                                 />
//                             </div>
//                             <div className="md:col-span-2">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Actual Output</label>
//                                 <textarea
//                                     value={isCustomTestLoading ? "Running test case..." : actualCustomOutput}
//                                     readOnly
//                                     placeholder="Output will appear here..."
//                                     className="w-full h-32 p-3 text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-800 resize-none focus:outline-none"
//                                 />
//                             </div>
//                             <div className="md:col-span-2 flex items-center justify-between">
//                                 <button
//                                     type="submit"
//                                     disabled={isCustomTestLoading}
//                                     className={`py-3 px-6 rounded-xl font-bold transition-all duration-300 ${isCustomTestLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
//                                 >
//                                     Run Custom Test
//                                 </button>
//                                 <div className={`px-4 py-2 rounded-full font-bold uppercase transition-colors duration-300 text-xs border ${getVerdictClass(customVerdict)}`}>
//                                     {customVerdict || 'Status'}
//                                 </div>
//                             </div>
//                         </form>
//                     </div>

//                     {/* AI Review Section */}
//                     <div className="mt-6 bg-white shadow-xl rounded-2xl p-6">
//                         <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Review</h2>
//                         <div className={`p-4 rounded-lg min-h-[150px] overflow-y-auto border border-gray-300 bg-gray-100 ${isAIReviewLoading ? 'text-center text-purple-600' : 'text-gray-800'}`}>
//                             {isAIReviewLoading ? (
//                                 "Thinking..."
//                             ) : (
//                                 <ReactMarkdown>{aiReviewResult}</ReactMarkdown>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </main>
            
//             {/* Footer */}
//             <footer className="bg-white py-12 shadow-inner">
//                 <div className="container mx-auto px-4 text-center">
//                     <p className="text-gray-500 text-sm">&copy; 2024 CodeJudge. All rights reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// const MainApp = () => {
//     return (
//         <Router>
//             <App />
//         </Router>
//     )
// }

// export default MainApp;
