const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');


const dirCodes = path.join(__dirname, 'codes');
//Useful for making sure a folder exists before trying to write files into it, especially in code that generates or manages files automatically
if (!fs.existsSync(dirCodes)) {

    fs.mkdirSync(dirCodes, { recursive: true });

}



const generateFile = (format, content) => {
    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, content);
    return filePath;
};

module.exports = {
    generateFile
};