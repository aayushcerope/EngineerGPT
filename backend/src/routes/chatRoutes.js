import { Router } from 'express';
import { askChatbot } from '../controllers/chatController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.post('/ask', requireAuth, askChatbot);

export default router;
