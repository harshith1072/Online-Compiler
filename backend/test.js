// test.js
const { generateFile } = require('./generateFile.js');


const filePath = generateFile('cpp', '#include <iostream>\nint main() { std::cout << "Hello, world!"; return 0; }');
console.log(filePath);
