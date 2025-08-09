import React, { useState } from "react";

const TestCaseForm = ({ addTestCase }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTestCase(input, output);
    setInput("");
    setOutput("");
  };

  return (
    <form className="test-case-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="input">Input:</label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="output">Expected Output:</label>
        <textarea
          id="output"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Test Case</button>
    </form>
  );
};

export default TestCaseForm;
