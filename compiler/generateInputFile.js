const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirInputs = path.join(__dirname, "inputs");

if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true });
}

//now we have to create file with unique name(with the help of uuid)
const generateInputFile = (input) => {
  const jobID = uuid(); //new id generated
  console.log(jobID);

  const input_filename = `${jobID}.txt`;
  const input_filePath = path.join(dirInputs, input_filename);

  fs.writeFileSync(input_filePath, input);

  return input_filePath;
};

module.exports = {
  generateInputFile,
};