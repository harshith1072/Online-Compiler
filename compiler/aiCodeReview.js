const { GoogleGenAI } = require("@google/genai");
const dotenv = require('dotenv');

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const aiCodeReview = async (code) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Analyze the following code and provide  Time and space  complexity just give values in bold and give optimisation of this code to do better in very short and concise  bullet points of the code. " + code,
    });
    return response.text;
};

module.exports = {
    aiCodeReview,
};