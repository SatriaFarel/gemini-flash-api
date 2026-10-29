import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import express from "express";
import multer from "multer";
import fs from "fs/promises";

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GEMINI_MODEL = "gemini-3.1-flash-lite";

// 1. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Route
app.post("/generate-text", async (req, res) => {
    const { prompt } = req.body || {};

    if (!prompt) {
        return res
            .status(400)
            .json({ message: "Field 'prompt' tidak boleh kosong!" });
    }

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
        });

        res.status(200).json({ result: response.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

app.post("/generate-from-image", upload.single("image"), async (req, res) => {
    const { prompt } = req.body;
    const base64Image = req.file.buffer.toString("base64");
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                {
                    text: prompt,
                    type: "text",
                },
                {
                    inlineData: {
                        data: base64Image,
                        mimeType: req.file.mimetype,
                    },
                },
            ],
        });

        res.status(200).json({result: response.text});
    } catch (error) { 
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

app.post("/generate-from-document", upload.single("document"), async (req,res) => {
    const {prompt} = req.body;
    const base64Document = req.file.buffer.toString("base64");

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                {
                    text: prompt ?? "Tolong buatkan ringkasan dari dokumen tersebut?",
                    type: "text",
                },
                {
                    inlineData: {
                        data: base64Document,
                        mimeType: req.file.mimetype,
                    }
                }
            ]
        })
        res.status(200).json({result: response.text})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
})

app.post("/generate-from-audio", upload.single("audio"), async (req,res) => {
    const {prompt} = req.body;
    const base64Audio = req.file.buffer.toString("base64");

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                {
                    text: prompt ?? "Tolong buatkan ringkasan dari audio tersebut?",
                    type: "text",
                },
                {
                    inlineData: {
                        data: base64Audio,
                        mimeType: req.file.mimetype,
                    }
                }
            ]
        })
        res.status(200).json({result: response.text})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
})

// 3. Run server
app.listen(PORT, () => {
    console.log(`Server ready running at: http://localhost:${PORT}`);
});
