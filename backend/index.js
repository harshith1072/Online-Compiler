const express = require("express");
const app = express();
const { generateFile } = require("./generateFile");
const cors = require("cors");
const { generateInputFile } = require("./generateInputFile.js");
const { executeCode } = require("./executeCode");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ online: "compiler" });
});

app.post("/run", async (req, res) => {
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

app.listen(8000, () => {
  console.log("Server is listening on port 8000!");
});
