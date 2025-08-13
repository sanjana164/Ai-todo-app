import { getGeminiResponse } from '../gemini/gemini.js';

export async function processVoiceInput(req, res) {
  try {
    const { text, currentTasks = [] } = req.body;
    if (!text || !String(text).trim()) {
      return res.status(400).json({ success: false, error: 'No text provided' });
    }

    const prompt = `
You are an intelligent Todo assistant.
User may say commands to add, update, delete, or mark tasks as done.
Current tasks:
${currentTasks.length ? currentTasks.map((t,i)=>`${i+1}. ${t}`).join('\n') : 'None'}

Instructions:
1. Detect if the user wants to add, delete, update, or mark done a task.
2. Update the task list accordingly.
3. Reply with a short, friendly message suitable for speaking aloud.
4. Include the updated task list in numbered form at the end.

User command: "${text}"
`;

    const reply = await getGeminiResponse(prompt);

    return res.json({ success: true, reply });
  } catch (error) {
    console.error('processVoiceInput error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
}
