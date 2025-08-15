// server/gemini/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

// Fail fast if key missing
if (!process.env.GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in .env');
  process.exit(1);
}

// Initialize
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// use flash model
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

/**
 * Get text reply from Gemini
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function getGeminiResponse(prompt) {
  try {
    // simple call — pass prompt directly
    const result = await model.generateContent(prompt);

    // Try standard SDK text extraction
    if (result?.response?.text) {
      return (await result.response.text()).trim();
    }

    // Fallback structure
    if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return String(result.candidates[0].content.parts[0].text).trim();
    }

    return "Sorry, I couldn't generate a response.";
  } catch (err) {
    console.error('Gemini API Error:', err);
    // bubble up a friendly message
    return 'An error occurred while processing your request.';
  }
}
