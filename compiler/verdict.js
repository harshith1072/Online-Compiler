 
// const axios = require("axios");

// const normalize = (s) =>
// s.trim().replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();


// const verdict = async (problemId, executeCode, isRun = false) => {
//   try {
//     if (problemId === null || problemId === undefined) {
//       problemId = 0;
//     }

//     const response = await axios.get(
//       `http://localhost:9000/byProblem/${problemId}`
//     );

//     let testCases = response.data;
//     if (isRun) testCases = testCases.slice(0, 2);

//     let resultLog = "";
//     let allPassed = true;

//     for (let i = 0; i < testCases.length; i++) {
//       const { input, expected_output } = testCases[i];
//       const actualOutput = await executeCode(input);

//       console.log(
//         `Test case ${i + 1}: Input: ${input} Expected: ${expected_output} Got: ${actualOutput}`
//       );

//       const expected = normalize(expected_output);
//       const actual = normalize(actualOutput);

//       if (isRun) {
//         resultLog += `Test case ${i + 1}: Input: ${input} Expected: ${expected_output} Got: ${actualOutput} Result: ${expected === actual ? "✅ Passed" : "❌ Failed"}\n`;
//       } else {
//         if (expected !== actual) {
//           return `Rejected ❌ Test case ${i + 1} failed: Expected "${expected_output}", but got "${actualOutput}"`;
//         }
//       }

//       if (expected !== actual) allPassed = false;
//     }

    
//     if (!isRun) {
//       return "Accepted ✅ All test cases passed";
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

<<<<<<< HEAD
    // Correct the URL to point to the deployed backend server's testcases endpoint
    // The '/byProblem' route is the correct one for fetching all test cases for a problem
    const response = await axios.get(
      `https://codejudge-lfe8.onrender.com/byProblem/${problemId}`
    );
=======
    const response = await axios.get(
      `http://localhost:9000/byProblem/${problemId-1}`
    );
>>>>>>> 472ed62

    let testCases = response.data;
    if (isRun) testCases = testCases.slice(0, 2);

    let resultLog = "";
    let allPassed = true;

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
          return `Rejected ❌ Test case ${i + 1} failed: Expected "${expected_output}", but got "${actualOutput}"`;
        }
      }

      if (expected !== actual) allPassed = false;
    }

    
    if (!isRun) {
      return "Accepted ✅ All test cases passed";
    }
 
    return resultLog.trim();
  } catch (error) {
    console.error("Error in verdict function:", error);
    return "Error in verifying test cases";
  }
};

module.exports = { verdict };
