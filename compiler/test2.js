const { executeCpp } = require('./executeCpp');

executeCpp("./codes/a5480997-b057-4d7e-bf26-87296b88a6ff.cpp")
    .then(result => console.log(result))
    .catch(err => console.error("Error:", err));
