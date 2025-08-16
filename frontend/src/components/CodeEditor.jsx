 
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Play, Bot, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

function App() {
    const boilerplates = {
        cpp: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}`,
        c: `#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d", a + b);
    return 0;
}`,
        java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        System.out.println(a + b);
        scanner.close();
    }
}`,
        py: `a, b = map(int, input().split())
print(a + b)`,
       javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);
const [a, b] = input;
console.log(a + b);`

    };

    const [code, setCode] = useState(boilerplates['cpp']);
    const [language, setLanguage] = useState('cpp');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [aiReview, setAiReview] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (boilerplates[language]) {
            setCode(boilerplates[language]);
        }
    }, [language]);

    const handleRun = async () => {
        if (!code.trim()) {
            toast.error("Code cannot be empty!");
            return;
        }

        setIsLoading(true);
        setOutput('Executing code...');
        setAiReview('');

        const payload = { language, code, input };

        try {
            // const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(payload)
            // });
            const response = await fetch("https://online-compiler-076b.onrender.com/run1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
});


            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setOutput(data.output || 'No output returned.');
            toast.success("Code executed successfully!");
        } catch (error) {
            setOutput('');
            toast.error("Error executing code.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAiReview = async () => {
        if (!code.trim()) {
            toast.error("Code cannot be empty!");
            return;
        }

        setIsLoading(true);
        setAiReview("Thinking...");

        try {
            const payload = { code };

            const response = await fetch(import.meta.env.VITE_GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setAiReview(data.review || 'No review returned.');
            toast.success("AI review complete!");
        } catch (error) {
            setAiReview('Error in AI review, error: ' + error.message);
            toast.error("Error in AI review.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen p-4 md:p-8">
            <Toaster />
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">CodeJudge Compiler</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column */}
                    <div className="lg:col-span-2 flex flex-col bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-700">
                        <div className="flex justify-between items-center bg-gray-950 p-3 shadow-md">
                            <div className="flex items-center space-x-2">
                                <Code size={20} className="text-blue-400" />
                                <h2 className="text-lg font-semibold text-gray-300">Code Editor</h2>
                            </div>
                            <select
                                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="cpp">C++</option>
                                <option value="c">C</option>
                                <option value="java">Java</option>
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                            </select>
                        </div>
                        <div className="flex-grow">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-[600px] p-4 text-sm font-mono border-none bg-gray-800 text-gray-200 resize-none focus:outline-none"
                                style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    lineHeight: '1.5',
                                    tabSize: 4
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleRun}
                                disabled={isLoading}
                                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
                            >
                                <Play size={20} />
                                <span>Run Code</span>
                            </button>
                            <button
                                onClick={handleAiReview}
                                disabled={isLoading}
                                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white shadow-md'}`}
                            >
                                <Bot size={20} />
                                <span>AI Review</span>
                            </button>
                        </div>

                        {/* Input */}
                        <div className="bg-white shadow-xl rounded-xl p-4 flex flex-col flex-grow border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">Custom Input</h2>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter input values here..."
                                className="w-full h-32 p-3 text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            />
                        </div>

                        {/* Output */}
                        <div className="bg-white shadow-xl rounded-xl p-4 flex flex-col flex-grow border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">Output</h2>
                            <div className="w-full h-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-800 overflow-y-auto font-mono whitespace-pre-wrap">
                                {isLoading && output === 'Executing code...' ? (
                                    <div className="text-center text-blue-600">Loading...</div>
                                ) : (
                                    output || 'Your output will appear here.'
                                )}
                            </div>
                        </div>

                        {/* AI Review */}
                        <div className="bg-white shadow-xl rounded-xl p-4 flex flex-col flex-grow border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">AI Review</h2>
                            <div className="prose prose-sm w-full h-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-800 overflow-y-auto">
                                {aiReview === 'Thinking...' ? (
                                    <div className="text-center text-green-600">Thinking...</div>
                                ) : (
                                    <ReactMarkdown>{aiReview || 'AI review will be displayed here.'}</ReactMarkdown>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
