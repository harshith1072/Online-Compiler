import React from "react";

const TestCaseList = ({ testCases }) => {
  return (
    <div className="test-case-list">
      {testCases.map((testCase) => (
        <div key={testCase.id} className="test-case-item">
          <h3>Test Case {testCase.id}</h3>
          {testCase.inputs.map((input, index) => (
            <div key={index}>
              <p>
                <strong>{input.name}:</strong>
              </p>
              <pre>
                {input.value.map((value, idx) => (
                  <span key={idx}>{value} </span>
                ))}
              </pre>
            </div>
          ))}
          <p>
            <strong>Expected Output:</strong>
          </p>
          <pre>
            {testCase.output.map((value, idx) => (
              <span key={idx}>{value} </span>
            ))}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default TestCaseList;
