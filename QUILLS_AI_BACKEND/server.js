require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post("/api/ask", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    });
    res.json({ result: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "OpenAI error", details: err.message });
  }
});

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.CSE_ID,
        q: query
      }
    });
    res.json({ result: response.data.items });
  } catch (err) {
    res.status(500).json({ error: "Google Search error", details: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
