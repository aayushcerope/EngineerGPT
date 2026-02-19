import ChatHistory from '../models/ChatHistory.js';
import Subject from '../models/Subject.js';
import { generateAcademicResponse } from '../services/aiService.js';
import { detectIntent, resolveMessageType } from '../services/intentService.js';

export const askChatbot = async (req, res) => {
  const { prompt, branchCode, subjectId, depth = 'intermediate' } = req.body;
  const subject = subjectId ? await Subject.findById(subjectId) : null;
  const intent = detectIntent(prompt);
  const messageType = resolveMessageType(intent);

  const response = await generateAcademicResponse({
    prompt,
    branchCode,
    subjectName: subject?.name,
    intent,
    depth,
  });

  const entry = await ChatHistory.create({
    userId: req.user.id,
    branchCode,
    subjectId: subjectId || null,
    intent,
    depth,
    prompt,
    response,
    messageType,
  });

  res.json(entry);
};
