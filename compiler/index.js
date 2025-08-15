const express = require("express");
const app = express();
const { generateFile } = require("./generateFile");
const cors = require("cors");
const { generateInputFile } = require("./generateInputFile.js");
const { executeCode } = require("./executeCode");
const {aiCodeReview}=require("./aiCodeReview")
const { verdict } = require("./verdict");
 
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ online: "compiler" });
});
 
 

app.post("/run", async (req, res) => {
  const { language, code, input, problemId, isRun } = req.body;

  if (!code) {
    return res.status(200).json({ success: false, error: "Empty code!" });
  }

 

try {
  const filePath = await generateFile(language, code);
  const inputFilePath = await generateInputFile(input);
  const rawOutput = await executeCode(language, filePath, inputFilePath);

  const resultLog = await verdict(problemId, async (input) => {
    const testFilePath = await generateFile(language, code);
    const customInputPath = await generateInputFile(input);
    return await executeCode(language, testFilePath, customInputPath);
  }, isRun); 

  return res.json({ 
    output: resultLog,           
    verdict: "click on submit"   
  });
} catch (error) {
  console.log(error);
  res.status(500).json({ error: error.message });
}



});

app.post("/custom", async (req, res) => {
  const { language, code, input } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Code is empty!" });
  }

  try {
    const filePath = await generateFile(language, code);
    const inputFilePath = await generateInputFile(input);
    const output = await executeCode(language, filePath, inputFilePath);

    return res.json({ success: true, output });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});


app.post("/run1", async (req, res) => {
  const { language, code, input } = req.body;

  if (!code) {
    return res.status(200).json({ success: false, error: "Empty code!" });
  }

  try {
    const filePath = await generateFile(language, code);
    
    const inputFilePath = await generateInputFile(input);
    const output = await executeCode(language, filePath, inputFilePath);
    res.json({ filePath, inputFilePath, output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/ai-review", async (req, res) => {
    const { code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
       const review = await aiCodeReview(code);

        res.json({ "review": review });
    } catch (error) {
        res.status(500).json({ error: "Error in AI review, error: " + error.message });
    }
});



app.listen(8000, () => {
  console.log("Server is listening on port 8000!");
});
