const fs = require('fs');
let input = fs.readFileSync(0, 'utf-8');
let [a, b] = input.trim().split(' ').map(Number);
console.log(a + b);
