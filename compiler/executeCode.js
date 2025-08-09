// const { exec } = require("child_process");
// const fs = require("fs");
// const path = require("path");
// const { v4: uuid } = require("uuid");

// const outputPath = path.join(__dirname, "outputs");

// if (!fs.existsSync(outputPath)) {
//   fs.mkdirSync(outputPath, { recursive: true });
// }

// const executeCode = async (language, filePath, inputFilePath = null) => {
//   const jobID = uuid();
//   const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
//   let outFile;
//   let compileCmd = null;
//   let runCmd;

//   switch (language) {
//     case "cpp":
//       outFile = path.join(outputPath, `${fileNameWithoutExt}.exe`);
//       compileCmd = `g++ "${filePath}" -o "${outFile}"`;
//       runCmd = inputFilePath
//         ? `"${outFile}" < "${inputFilePath}"`
//         : `"${outFile}"`;
//       break;

//     case "c":
//       outFile = path.join(outputPath, `${fileNameWithoutExt}.exe`);
//       compileCmd = `gcc "${filePath}" -o "${outFile}"`;
//       runCmd = inputFilePath
//         ? `"${outFile}" < "${inputFilePath}"`
//         : `"${outFile}"`;
//       break;
 
//  case "js":
//       outFile = path.join(outputPath, `${fileNameWithoutExt}-${jobID}.js`);
//       fs.copyFileSync(filePath, outFile);
//       runCmd = inputFilePath
//         ? `node "${outFile}" < "${inputFilePath}"`
//         : `node "${outFile}"`;
//       break;

//     case "py":
//       outFile = path.join(outputPath, `${fileNameWithoutExt}-${jobID}.py`);
//       fs.copyFileSync(filePath, outFile);
//       runCmd = inputFilePath
//         ? `python3 "${outFile}" < "${inputFilePath}"`
//         : `python3 "${outFile}"`;
//       break;

//     case "java": {
//       const dirPath = path.dirname(filePath);
//       const tempFilePath = path.join(dirPath, "Main.java");

//       fs.renameSync(filePath, tempFilePath);

//       compileCmd = `javac "${tempFilePath}"`;
//       runCmd = inputFilePath
//         ? `java -cp "${dirPath}" Main < "${inputFilePath}"`
//         : `java -cp "${dirPath}" Main`;
//       break;
//     }

//     default:
//       throw new Error(`Unsupported language: ${language}`);
//   }

//   return new Promise((resolve, reject) => {
//     const execute = () => {
//       exec(runCmd, (err, stdout, stderr) => {
//         if (err) {
//           return reject(stderr || err.message || "Execution error occurred.");
//         }
//         if (stderr) {
//           return reject(stderr);
//         }
//         resolve(stdout);
//       });
//     };

//     if (compileCmd) {
//       exec(compileCmd, (err, stdout, stderr) => {
//         if (err) {
//           return reject(stderr || err.message || "Compilation error occurred.");
//         }
//         execute();
//       });
//     } else {
//       execute();
//     }
//   });
// };

// module.exports = { executeCode };
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const outputPath = path.join(__dirname, "../outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCode = async (language, filePath, inputFilePath = null) => {
  const jobID = uuid();
  const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
  let outFile;
  let compileCmd = null;
  let runCmd;

  switch (language.toLowerCase()) {
    case "cpp":
      outFile = path.join(outputPath, `${fileNameWithoutExt}-${jobID}.exe`);
      compileCmd = `g++ "${filePath}" -o "${outFile}"`;
      runCmd = inputFilePath
        ? `"${outFile}" < "${inputFilePath}"`
        : `"${outFile}"`;
      break;

    case "c":
      outFile = path.join(outputPath, `${fileNameWithoutExt}-${jobID}.exe`);
      compileCmd = `gcc "${filePath}" -o "${outFile}"`;
      runCmd = inputFilePath
        ? `"${outFile}" < "${inputFilePath}"`
        : `"${outFile}"`;
      break;

    case "java": {
      const dirPath = path.dirname(filePath);
      const tempFilePath = path.join(dirPath, "Main.java");
      fs.renameSync(filePath, tempFilePath);
      compileCmd = `javac "${tempFilePath}"`;
      runCmd = inputFilePath
        ? `java -cp "${dirPath}" Main < "${inputFilePath}"`
        : `java -cp "${dirPath}" Main`;
      break;
    }

    case "python":
      outFile = path.join(outputPath, `${fileNameWithoutExt}-${jobID}.py`);
      fs.copyFileSync(filePath, outFile);
      runCmd = inputFilePath
        ? `python "${outFile}" < "${inputFilePath}"`
        : `python "${outFile}"`;
      break;

    case "js":
    case "javascript":
      outFile = path.join(outputPath, `${fileNameWithoutExt}-${jobID}.js`);
      fs.copyFileSync(filePath, outFile);
      runCmd = inputFilePath
        ? `node "${outFile}" < "${inputFilePath}"`
        : `node "${outFile}"`;
      break;

    default:
      throw new Error(`Unsupported language: ${language}`);
  }

  return new Promise((resolve, reject) => {
    const execute = () => {
      exec(runCmd, (err, stdout, stderr) => {
        if (err) return reject(stderr || err.message || "Execution error occurred.");
        if (stderr) return reject(stderr);
        resolve(stdout);
      });
    };

    if (compileCmd) {
      exec(compileCmd, (err, stdout, stderr) => {
        if (err) return reject(stderr || err.message || "Compilation error occurred.");
        execute();
      });
    } else {
      execute();
    }
  });
};

module.exports = { executeCode };
