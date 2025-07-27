const { generateInputFile } = require('./ generateInputFile.js');
const { executeCpp } = require('./executeCpp');

(async () => {
    const inputPath = await generateInputFile("5\n10\n"); // For example, for a sum program
    const output = await executeCpp("path/to/code.cpp", inputPath);
    console.log(output);
})();
