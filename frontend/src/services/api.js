const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-1.5-flash';
const NOTES_STORAGE_KEY = 'egpt_notes';

const depthGuides = {
  simple: 'Use simple language and concise exam-friendly points.',
  intermediate: 'Explain with moderate depth, include examples where relevant.',
  advanced: 'Provide deep theory with assumptions, derivations, and edge cases.',
};

const badgeByIntent = {
  numerical: 'numerical',
  exam_answer: 'exam_answer',
};

const detectIntent = (prompt = '') => {
  const text = prompt.toLowerCase();
  if (/(solve|calculate|numerical|find|compute|equation)/.test(text)) return 'numerical';
  if (/(exam|marks|answer|define|explain)/.test(text)) return 'exam_answer';
  return 'concept';
};

const getStoredNotes = () => {
  try {
    return JSON.parse(localStorage.getItem(NOTES_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const setStoredNotes = (notes) => {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
};

const askGemini = async ({ prompt, branchCode, depth = 'intermediate' }) => {
  const intent = detectIntent(prompt);
  const messageType = badgeByIntent[intent] || 'concept';

  if (!GEMINI_API_KEY) {
    return {
      _id: crypto.randomUUID(),
      intent,
      messageType,
      response: `[Demo mode] Add VITE_GEMINI_API_KEY in frontend .env to get live responses.\n\nBranch: ${branchCode}\nDepth: ${depth}\n\nQuestion: ${prompt}`,
    };
  }

  const instruction = [
    'You are an exam-focused engineering tutor.',
    `Branch: ${branchCode || 'General Engineering'}`,
    `Depth: ${depth}`,
    `Style guide: ${depthGuides[depth] || depthGuides.intermediate}`,
    intent === 'numerical'
      ? 'If numerical, give formula, substitution, and final answer with units.'
      : 'Use clear headings and points suitable for university exams.',
  ].join('\n');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${instruction}\n\nStudent question: ${prompt}` }] }],
      }),
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Gemini request failed');
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part?.text || '').join('\n').trim();

  return {
    _id: crypto.randomUUID(),
    intent,
    messageType,
    response: text || 'No response generated.',
  };
};

export const api = async (path, options = {}) => {
  if (path === '/chat/ask' && options.method === 'POST') {
    const payload = JSON.parse(options.body || '{}');
    return askGemini(payload);
  }

  if (path === '/notes' && (!options.method || options.method === 'GET')) {
    return getStoredNotes();
  }

  if (path === '/notes' && options.method === 'POST') {
    const payload = JSON.parse(options.body || '{}');
    const notes = getStoredNotes();
    const saved = { ...payload, _id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    setStoredNotes([saved, ...notes]);
    return saved;
  }

  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }

  if (response.status === 204) return null;
  return response.json();
};
