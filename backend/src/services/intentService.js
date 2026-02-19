const intentRules = [
  { intent: 'numerical', match: /(solve|calculate|numerical|derivation|find)/i },
  { intent: 'viva', match: /(viva|interview|oral)/i },
  { intent: 'revision', match: /(quick revision|short note|recap|last minute)/i },
  { intent: 'explanation', match: /(what is|explain|concept|theory)/i },
];

export const detectIntent = (prompt) => {
  const found = intentRules.find((rule) => rule.match.test(prompt));
  return found?.intent || 'explanation';
};

export const resolveMessageType = (intent) => {
  if (intent === 'numerical') return 'numerical';
  if (intent === 'revision' || intent === 'viva') return 'exam_answer';
  return 'concept';
};
