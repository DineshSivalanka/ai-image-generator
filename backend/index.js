require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors(), express.json());

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
    const resp = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/imagegeneration:generateImage",
        { prompt: { text: prompt } },
        { headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY
        } }
    );
    res.json({ image: resp.data.candidates[0].image });
    } catch (err) {
    console.error((err.response && err.response.data) || err.message);
    res.status(500).json({ error: "Image generation failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Backend running on port ${PORT}'));
