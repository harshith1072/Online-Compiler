import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error("Code cannot be empty!");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:8000/run", {
        language,
        code,
        input,
      });

      if (data.output) {
        setOutput(data.output);
      } else {
        toast.error("No output returned.");
      }
    } catch (error) {
      toast.error("Error while executing code.");
      console.error("Execution error:", error);
    }
  };

  return (
    <div className="container">
      <Toaster />
      <h1>Online Compiler</h1>

      <div className="language-select">
        <label>Select Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">cpp</option>
          <option value="c">c</option>
          <option value="java">java</option>
          <option value="py">py</option>
          <option value="js">js</option>
        </select>
      </div>

      <div className="editor">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) =>
            highlight(code, languages[language] || languages.cpp)
          }
          padding={10}
          className="code-editor"
        />
      </div>

      <div>
        <textarea
          placeholder="Input (optional)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
        />
      </div>

      <button onClick={handleSubmit}>Run Code</button>

      <div className="output-section">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default App;
