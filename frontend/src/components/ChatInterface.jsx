import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { BookMarked, RefreshCcw, SendHorizontal, Sigma, WandSparkles } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { api } from '../services/api';
import { useAppContext } from '../context/AppContext';

const badgeClasses = {
  concept: 'bg-cyan-500/20 text-cyan-300',
  numerical: 'bg-orange-500/20 text-orange-300',
  exam_answer: 'bg-fuchsia-500/20 text-fuchsia-300',
};

const depthTabs = [
  { id: 'simple', label: '[Simple]' },
  { id: 'intermediate', label: '[Exam Ready]' },
  { id: 'advanced', label: '[Deep Theory]' },
];

const starterResponse = {
  title: '1. Definition (2 Marks)',
  text: 'The **OSI (Open Systems Interconnection) Model** is a conceptual framework used to describe the functions of a networking system. It organizes computing functions into a universal set of rules and requirements to support interoperability between products and software.',
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
    <main className="flex min-h-[84vh] flex-col overflow-hidden rounded-2xl border border-[#23405f] bg-[#071426] shadow-2xl shadow-black/30">
      <header className="flex items-center justify-between border-b border-[#1e3752] px-5 py-4">
        <div>
          <p className="text-lg font-semibold text-slate-100">Smart Chat: OSI Model</p>
          <p className="inline-block rounded bg-fuchsia-600/20 px-2 py-0.5 text-xs text-fuchsia-300">10 Marks Weightage</p>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <RefreshCcw size={16} />
          <BookMarked size={16} />
        </div>
      </header>

      <section className="scrollbar-thin flex-1 space-y-4 overflow-y-auto bg-[#050f1d] p-5">
        <div className="ml-auto flex max-w-xl items-center gap-3">
          <div className="rounded-2xl bg-[#1a3654] px-5 py-3 text-sm text-slate-100">
            Explain OSI Model for 10 marks. I need a clear breakdown for an exam.
          </div>
          <span className="rounded-full bg-[#2a4768] px-2 py-1 text-[10px] font-semibold text-slate-200">YO</span>
        </div>

        <article className="rounded-xl border border-[#1f3b58] bg-[#071829]">
          <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-200">
            <span className="rounded-full bg-fuchsia-600/90 p-1">
              <WandSparkles size={12} />
            </span>
            Engineer AI <span className="text-xs text-slate-400">· Just now</span>
          </div>

          <div className="flex gap-3 border-b border-[#1f3b58] px-4 pb-3 text-xs">
            {depthTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDepth(tab.id)}
                className={`rounded border px-2 py-1 ${
                  depth === tab.id ? 'border-fuchsia-500 text-fuchsia-300' : 'border-[#2b4867] text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3 px-4 py-4">
            <h3 className="text-2xl font-semibold text-fuchsia-400">{starterResponse.title}</h3>
            <div className="rounded-lg border border-fuchsia-500/50 bg-[#0b1e31] p-3 text-sm leading-7 text-slate-100">
              <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
                {starterResponse.text}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        {messages.map((msg) => (
          <article key={msg._id} className="rounded-lg border border-[#2c4663] bg-[#0b1f33] p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className={`rounded px-2 py-1 text-xs ${badgeClasses[msg.messageType]}`}>{msg.messageType}</span>
              <span className="text-xs text-slate-400">intent: {msg.intent}</span>
            </div>
            <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
              {msg.response}
            </ReactMarkdown>
          </article>
        ))}
        {loading && <div className="animate-pulse rounded-lg bg-slate-800 p-4">Generating answer...</div>}
      </section>

      <footer className="border-t border-[#1e3752] bg-[#09192b] p-3">
        <div className="rounded-xl border border-[#335575] bg-[#172b40] p-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a follow-up question..."
            className="h-16 w-full resize-none bg-transparent px-2 text-sm text-slate-200 outline-none placeholder:text-slate-400"
          />
          <div className="mt-1 flex items-center justify-between px-2 pb-1 text-slate-400">
            <div className="flex gap-3">
              <Sigma size={16} />
            </div>
            <button onClick={onAsk} className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-400">
              <SendHorizontal size={16} />
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
};
