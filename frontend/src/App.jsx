import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ProblemList from "./components/ProblemList";
import FetchSingleProblem from "./components/FetchSingleProblem";
import CodeEditor from "./components/CodeEditor"; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/problems" element={<ProblemList />} />
      <Route path="/codeEditor" element={<CodeEditor />} />
      <Route path="/problems/:id" element={<FetchSingleProblem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;


 
// import React, { useState } from 'react';
// import Editor from 'react-simple-code-editor';
// import ReactMarkdown from 'react-markdown';
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-c';
// import 'prismjs/components/prism-cpp';
// import 'prismjs/components/prism-java';
// import 'prismjs/components/prism-python';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/themes/prism.css';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import './App.css';

// function App() {
//   const [code, setCode] = useState(`#include <iostream>
// using namespace std;

// int main() {
//     int a, b;
//     cin >> a >> b;
//     cout << a + b;
//     return 0;
// }`);
//   const [language, setLanguage] = useState('cpp');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const [aiReview, setAiReview] = useState('');

//   const handleRun = async () => {
//     if (!code.trim()) {
//       toast.error("Code cannot be empty!");
//       return;
//     }

//     const payload = {
//       language,
//       code,
//       input,
//     };

//     try {
//       const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL, payload);
//       setOutput(data.output || 'No output returned.');
//     } catch (error) {
//       setOutput('');
//       toast.error("Error executing code.");
//     }
//   };

//   const handleAiReview = async () => {
//     try {
//      const { data } = await axios.post(import.meta.env.VITE_GEMINI_API_URL, { code });

//       setAiReview(data.review);
//     } catch (error) {
//       setAiReview('Error in AI review, error: ' + error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <Toaster />
//       <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">AlgoU Online Code Compiler</h1>

//       {/* Language Selection */}
//       <div className="flex justify-center mb-4">
//         <select
//           className="px-4 py-2 rounded-md border border-gray-300 shadow-sm"
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//         >
//           <option value="cpp">C++</option>
//           <option value="c">C</option>
//           <option value="java">Java</option>
//           <option value="py">Python</option>
//           <option value="js">JavaScript</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Code Editor */}
//         <div className="bg-white shadow-lg rounded-lg p-4 h-full flex flex-col">
//           <h2 className="text-xl font-semibold text-gray-700 mb-3">Code Editor</h2>
//           <div className="bg-gray-100 rounded-lg overflow-y-auto flex-grow" style={{ height: '500px' }}>
//             <Editor
//               value={code}
//               onValueChange={setCode}
//               highlight={code => highlight(code, languages[language] || languages.cpp)}
//               padding={15}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 14,
//                 minHeight: '500px'
//               }}
//             />
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex flex-col gap-4">
//           {/* Input */}
//           <div className="bg-white shadow-lg rounded-lg p-4">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Input</h2>
//             <textarea
//               rows="4"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Enter input values..."
//               className="w-full p-3 text-sm border border-gray-300 rounded-md resize-none"
//             />
//           </div>

//           {/* Output */}
//           <div className="bg-white shadow-lg rounded-lg p-4 overflow-y-auto" style={{ height: '150px' }}>
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Output</h2>
//             <div className="text-sm font-mono whitespace-pre-wrap text-gray-800">{output}</div>
//           </div>

//           {/* AI Review */}
//           <div className="bg-white shadow-lg rounded-lg p-4">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">AI Review</h2>
//             <div className="prose prose-sm text-gray-800 overflow-y-auto" style={{ height: '150px' }}>
//               {aiReview === ''
//                 ? <div>🤖</div>
//                 : <ReactMarkdown>{aiReview}</ReactMarkdown>}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-2">
//             <button
//               onClick={handleRun}
//               className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
//             >
//               Run
//             </button>
//             <button
//               onClick={handleAiReview}
//               className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
//             >
//               AI Review
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;