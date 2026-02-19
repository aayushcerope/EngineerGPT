import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { api } from '../services/api';
import { useAppContext } from '../context/AppContext';

const badgeClasses = {
  concept: 'bg-cyan-500/20 text-cyan-300',
  numerical: 'bg-orange-500/20 text-orange-300',
  exam_answer: 'bg-fuchsia-500/20 text-fuchsia-300',
};

export const ChatInterface = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { branch, depth, setDepth } = useAppContext();

  const onAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const data = await api('/chat/ask', {
        method: 'POST',
        body: JSON.stringify({ prompt, branchCode: branch, depth }),
      });
      setMessages((prev) => [...prev, data]);
      setPrompt('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="rounded-2xl bg-panel p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Intelligent Chat</h2>
        <select
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          className="rounded bg-slate-800 px-2 py-1 text-sm"
        >
          <option value="simple">Simple</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="scrollbar-thin mb-3 h-[52vh] space-y-3 overflow-y-auto rounded-xl bg-slate-900/80 p-3">
        {messages.map((msg) => (
          <article key={msg._id} className="rounded-lg border border-slate-700 p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className={`rounded px-2 py-1 text-xs ${badgeClasses[msg.messageType]}`}>
                {msg.messageType}
              </span>
              <span className="text-xs text-slate-400">intent: {msg.intent}</span>
            </div>
            <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
              {msg.response}
            </ReactMarkdown>
          </article>
        ))}
        {loading && <div className="animate-pulse rounded-lg bg-slate-800 p-4">Generating answer...</div>}
      </div>

      <div className="flex gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask concept, numerical, viva, or revision question..."
          className="h-20 flex-1 rounded-lg bg-slate-800 p-2"
        />
        <button onClick={onAsk} className="rounded-lg bg-cyan-600 px-4 py-2 font-medium hover:bg-cyan-500">
          Send
        </button>
      </div>
    </main>
  );
};
