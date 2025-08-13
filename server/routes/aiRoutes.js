// server/routes/aiRoutes.js
import express from 'express';
import { processVoiceInput } from '../controllers/aiController.js';

const router = express.Router();

// POST /api/ai/voice
router.post('/voice', processVoiceInput);

export default router;
