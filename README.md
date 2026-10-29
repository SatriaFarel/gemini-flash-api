# Express.js Gemini API Service

A clean, production-ready REST API wrapper built with Express.js and the official Google GenAI SDK (`@google/genai`). This service provides endpoints for text generation, vision analysis, document processing, and audio transcription/summarization using Gemini model capabilities.

---

## 🚀 Features

- **Text Generation**: General-purpose AI text generation.
- **Multimodal Vision**: Image processing with custom prompt context.
- **Document Analysis**: Summarization and Q&A for PDF and text documents.
- **Audio Processing**: Audio transcription and content extraction.

---

## 🛠️ Requirements & Tech Stack

- **Node.js**: v18+
- **Framework**: Express.js
- **SDK**: `@google/genai`
- **File Parsing**: `multer`
- **Environment**: `dotenv`

---

## ⚙️ Quick Start

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Running the Server
```bash
node index.js
```
The server will start at `http://localhost:3000`.

---

## 🔌 API Documentation

### 1. Text Generation
Generate text responses from a JSON prompt.

- **URL:** `POST /generate-text`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "prompt": "Jelaskan konsep asynchronous di JavaScript"
  }
  ```

---

### 2. Image Analysis
Analyze images with text prompts.

- **URL:** `POST /generate-from-image`
- **Headers:** `Content-Type: multipart/form-data`
- **Body Parameters:**
  - `image` *(File, Required)*: Image file (`image/jpeg`, `image/png`, etc.)
  - `prompt` *(Text, Optional)*: Instruction or question about the image.

---

### 3. Document Processing
Summarize or extract insights from document files.

- **URL:** `POST /generate-from-document`
- **Headers:** `Content-Type: multipart/form-data`
- **Body Parameters:**
  - `document` *(File, Required)*: Document file (`application/pdf`, `text/plain`, etc.)
  - `prompt` *(Text, Optional)*: Defaults to *"Tolong buatkan ringkasan dari dokumen tersebut?"*.

---

### 4. Audio Processing
Transcribe or summarize audio files.

- **URL:** `POST /generate-from-audio`
- **Headers:** `Content-Type: multipart/form-data`
- **Body Parameters:**
  - `audio` *(File, Required)*: Audio file (`audio/mp3`, `audio/wav`, etc.)
  - `prompt` *(Text, Optional)*: Defaults to *"Tolong buatkan ringkasan dari audio tersebut?"*.

---

## 📋 Response Format

### Success Response (`200 OK`)
```json
{
  "result": "Generated response content from Gemini API..."
}
```

### Error Response (`400 Bad Request` / `500 Internal Server Error`)
```json
{
  "message": "Error details or validation message"
}
```

---

## 📄 License
MIT
