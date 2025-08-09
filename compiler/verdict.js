// const axios = require("axios");

// const verdict = async (problemId, executeCode) => {
//   try {
//     // Fetch test case data from server
//     if (problemId === null || problemId === undefined) {
//       problemId = 0;
//     }
//     const response = await axios.get(
//       `http://localhost:9000/byProblem/${problemId}`
//       // `https://online-judge-eb8n.onrender.com/byProblem/${problemId}`
//     );
//     const testCases = response.data;  

//     // Iterate over each test case
//     for (let i = 0; i < testCases.length; i++) {
//       const { input, expected_output } = testCases[i];

//       // Ensure input is defined and execute code with it
//       if (!input) {
//         throw new Error("Input data is undefined or missing");
//       }
//       const actualOutput = await executeCode(input);

       
//       if (actualOutput.trim() !== expected_output.trim()) {
//         return `Test case ${
//           i + 1
//         } failed: for ${input}  Expected "${expected_output}", but got "${actualOutput}"`;
//       }
//     }

//     return "All test cases passed!";
//   } catch (error) {
//     console.error("Error in verdict function:", error);
//     return "Error in verifying test cases";
//   }
// };

// module.exports = { verdict };











// const axios = require("axios");

// // Helper to normalize outputs
// const normalize = (s) =>
//   s.trim().replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();

// const verdict = async (problemId, executeCode) => {
//   try {
//     if (problemId === null || problemId === undefined) {
//       problemId = 0;
//     }

//     const response = await axios.get(
//       `http://localhost:9000/byProblem/${problemId}`
//     );

//     const testCases = response.data;

//     for (let i = 0; i < testCases.length; i++) {
//       const { input, expected_output } = testCases[i];

//       if (!input) {
//         throw new Error("Input data is undefined or missing");
//       }

//       const actualOutput = await executeCode(input);

//       console.log(
//         `Test case ${i + 1}: \nInput: "${input}"\nExpected: "${expected_output}"\nGot: "${actualOutput}"`
//       );

//       if (normalize(actualOutput) !== normalize(expected_output)) {
//         return `Test case ${
//           i + 1
//         } failed: for input "${input}"  Expected "${expected_output}", but got "${actualOutput}"`;
//       }
//     }

//     return "All test cases passed!";
//   } catch (error) {
//     console.error("Error in verdict function:", error);
//     return "Error in verifying test cases";
//   }
// };

// module.exports = { verdict };


// const axios = require("axios");

// const normalize = (s) =>
//   s.trim().replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();

// const verdict = async (problemId, executeCode, isRun = false) => {
//   try {
//     if (problemId === null || problemId === undefined) {
//       problemId = 0;
//     }

//     const response = await axios.get(
//       `http://localhost:9000/byProblem/${problemId}`
//     );

//     let testCases = response.data;

//     if (isRun) {
//       testCases = testCases.slice(0, 2);
//     }

//     let resultLog = "";

//     for (let i = 0; i < testCases.length; i++) {
//       const { input, expected_output } = testCases[i];

//       const actualOutput = await executeCode(input);

      
//       console.log(
//         `Test case ${i + 1}: \nInput: "${input}"\nExpected: "${expected_output}"\nGot: "${actualOutput}"`
//       );

//       const expected = normalize(expected_output);
//       const actual = normalize(actualOutput);

//       if (expected === actual) {
//         resultLog += `Test case ${i + 1} passed\n`;
//       } else {
//         resultLog += `Test case ${i + 1} failed: Expected "${expected}", but got "${actual}"\n`;
//       }
//     }

//     return resultLog.trim();
//   } catch (error) {
//     console.error("Error in verdict function:", error);
//     return "Error in verifying test cases";
//   }
// };

// module.exports = { verdict };


// const axios = require("axios");

// const normalize = (s) =>
//   s.trim().replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();

// const verdict = async (problemId, executeCode, isRun = false) => {
//   try {
//     if (problemId === null || problemId === undefined) {
//       problemId = 0;
//     }

//     const response = await axios.get(
//       `http://localhost:9000/byProblem/${problemId}`
//     );

//     let testCases = response.data;

//     if (isRun) {
//       testCases = testCases.slice(0, 2); // Only first 2 test cases
//     }

//     let resultLog = "";

//     for (let i = 0; i < testCases.length; i++) {
//       const { input, expected_output } = testCases[i];
//       const actualOutput = await executeCode(input);

//       const expected = normalize(expected_output);
//       const actual = normalize(actualOutput);
//             console.log(
//         `Test case ${i + 1}: \nInput: "${input}"\nExpected: "${expected_output}"\nGot: "${actualOutput}"`
//       );


//       resultLog += `Test case ${i + 1}:\n`;
//       resultLog += `Input: ${input}\n`;
//       resultLog += `Expected: ${expected_output}\n`;
//       resultLog += `Got: ${actualOutput}\n`;

//       if (expected === actual) {
//         resultLog += `Result: ✅ Passed\n\n`;
//       } else {
//         resultLog += `Result: ❌ Failed\n\n`;
//       }

 


      
//     }

//     return resultLog.trim();
//   } catch (error) {
//     console.error("Error in verdict function:", error);
//     return "Error in verifying test cases";
//   }
// };

// module.exports = { verdict };


const axios = require("axios");

const normalize = (s) =>
  s.trim().replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();

const verdict = async (problemId, executeCode, isRun = false) => {
  try {
    if (problemId === null || problemId === undefined) {
      problemId = 0;
    }

    const response = await axios.get(
      `http://localhost:9000/byProblem/${problemId}`
    );

    let testCases = response.data;
    if (isRun) testCases = testCases.slice(0, 2);

    let resultLog = "";
    let allPassed = true;

    // for (let i = 0; i < testCases.length; i++) {
    //   const { input, expected_output } = testCases[i];
    //   const actualOutput = await executeCode(input);

    //   console.log(
    //     `Test case ${i + 1}: \nInput: "${input}"\nExpected: "${expected_output}"\nGot: "${actualOutput}"`
    //   );
    //   const expected = normalize(expected_output);
    //   const actual = normalize(actualOutput);

    //   if (isRun) {
    //     resultLog += `Test case ${i + 1}:\n`;
    //     resultLog += `Input: ${input}\n`;
    //     resultLog += `Expected: ${expected_output}\n`;
    //     resultLog += `Got: ${actualOutput}\n`;
    //     resultLog += `Result: ${expected === actual ? "✅ Passed" : "❌ Failed"}\n\n`;
    //   } else {
    //     if (expected !== actual) {
    //       return `Test case ${i + 1} failed: Expected "${expected_output}", but got "${actualOutput}"`;
    //     }
    //   }
    // }
    for (let i = 0; i < testCases.length; i++) {
  const { input, expected_output } = testCases[i];
  const actualOutput = await executeCode(input);

  console.log(
    `Test case ${i + 1}: Input: ${input} Expected: ${expected_output} Got: ${actualOutput}`
  );

  const expected = normalize(expected_output);
  const actual = normalize(actualOutput);

  if (isRun) {
    resultLog += `Test case ${i + 1}: Input: ${input} Expected: ${expected_output} Got: ${actualOutput} Result: ${expected === actual ? "✅ Passed" : "❌ Failed"}\n`;
  } else {
    if (expected !== actual) {
      return `Test case ${i + 1} failed: Expected "${expected_output}", but got "${actualOutput}"`;
    }
  }
}


    return isRun ? resultLog.trim() : "All test cases passed!";
  } catch (error) {
    console.error("Error in verdict function:", error);
    return "Error in verifying test cases";
  }
};

module.exports = { verdict };
