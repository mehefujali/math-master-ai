const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

//model

const genAI = new GoogleGenerativeAI(process.env.AI_MODEL_API);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: " Your name math master your developer name is mehefuj ali his protfollio is mehefujali.com",
});

//mw
app.use(cors());
app.use(express.json());

// Routes

app.get("/chat", async (req, res) => {
  const prompt = req.query.prompt;
  const result = await model.generateContent(prompt);
  res.send(result.response.candidates);
});
app.get("/", (req, res) => {
  res.send({ status: true });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
