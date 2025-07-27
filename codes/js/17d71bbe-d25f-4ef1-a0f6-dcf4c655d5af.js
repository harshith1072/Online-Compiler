const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (num1) => {
  rl.question('', (num2) => {
    console.log(parseInt(num1) + parseInt(num2));
    rl.close();
  });
});
