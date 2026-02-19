import { env } from '../config/env.js';

const depthGuides = {
  simple: 'Keep language simple and concise with exam-targeted bullet points.',
  intermediate: 'Explain with moderate depth, include key formulas and examples.',
  advanced: 'Give rigorous explanation with derivations, assumptions, and edge cases.',
};

export const generateAcademicResponse = async ({ prompt, branchCode, subjectName, intent, depth }) => {
  const style = depthGuides[depth] || depthGuides.intermediate;

  const base = [
    `Branch: ${branchCode}`,
    `Subject: ${subjectName || 'General Engineering'}`,
    `Intent: ${intent}`,
    `Depth: ${depth}`,
    '',
    'Exam-oriented answer:',
    style,
    intent === 'numerical'
      ? 'Provide step-by-step solution with formula, substitution, units, and final answer.'
      : 'Provide structured points suitable for university exams and viva.',
    '',
    `Student Query: ${prompt}`,
  ].join('\n');

  if (!env.geminiApiKey) {
    return `${base}\n\n[Demo mode] Set GEMINI_API_KEY for live AI responses.`;
  }

  return `${base}\n\n[Gemini integration placeholder] Use GEMINI_API_KEY in production connector.`;
};
