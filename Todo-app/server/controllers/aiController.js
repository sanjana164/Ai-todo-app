// server/controllers/aiController.js
import { getGeminiResponse } from '../gemini/gemini.js';

export async function processVoiceInput(req, res) {
  try {
    const { text } = req.body;
    if (!text || !String(text).trim()) {
      return res.status(400).json({ success: false, error: 'No text provided' });
    }

    // call Gemini
    const reply = await getGeminiResponse(String(text));

    return res.json({ success: true, reply });
  } catch (error) {
    console.error('processVoiceInput error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
}
