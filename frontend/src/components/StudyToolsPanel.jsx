import { useEffect, useState } from 'react';
import { AlarmClock, CalendarDays, Circle, RotateCw } from 'lucide-react';
import { useOfflineNotes } from '../hooks/useOfflineNotes';
import { api } from '../services/api';

export const StudyToolsPanel = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const { offlineNotes, setOfflineNotes } = useOfflineNotes();

  useEffect(() => {
    api('/notes')
      .then(setNotes)
      .catch(() => setNotes([]));
  }, []);

  const saveNote = async () => {
    const draft = { title, markdown, offlineId: crypto.randomUUID() };
    if (!title || !markdown) return;

    setOfflineNotes((prev) => [draft, ...prev]);

    try {
      const saved = await api('/notes', {
        method: 'POST',
        body: JSON.stringify(draft),
      });
      setNotes((prev) => [saved, ...prev]);
    } catch {
      // Offline fallback already handled.
    }

    setTitle('');
    setMarkdown('');
  };

  return (
    <aside className="flex min-h-[84vh] flex-col gap-4 rounded-2xl border border-[#1e3c5e] bg-[#071426] p-4 shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between border-b border-[#1e3c5e] pb-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">Cram Mode</p>
          <p className="text-xs text-slate-400">Optimizes AI for rapid-fire Q&A and hides deep theory tabs.</p>
        </div>
        <div className="h-6 w-11 rounded-full bg-slate-700 p-1">
          <div className="h-4 w-4 rounded-full bg-white" />
        </div>
      </div>

      <section className="rounded-xl border border-[#2f4b6a] bg-[#13253a] p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="flex items-center gap-2 font-semibold text-slate-100">
            <AlarmClock size={16} className="text-blue-400" /> Focus Timer
          </p>
          <span className="text-xs text-slate-400">Settings</span>
        </div>
        <p className="text-center text-5xl font-bold tracking-[0.2em] text-slate-100">24:59</p>
        <p className="mt-1 text-center text-xs font-semibold text-blue-300">DEEP WORK</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <button className="rounded bg-blue-500 py-1.5 font-semibold text-white">Start</button>
          <button className="rounded bg-[#2c4763] py-1.5 font-semibold text-slate-200">Reset</button>
        </div>
      </section>

      <section className="rounded-xl border border-[#2f4b6a] bg-[#13253a] p-4">
        <p className="mb-3 font-semibold text-slate-100">Syllabus Tracker</p>
        <div className="flex items-center gap-3">
          <div className="grid h-16 w-16 place-items-center rounded-full border-[6px] border-blue-500 border-r-[#29425f] text-sm font-bold text-white">
            65%
          </div>
          <div>
            <p className="text-xs text-slate-400">Current Module:</p>
            <p className="font-semibold text-slate-100">Computer Networks</p>
            <p className="text-xs text-emerald-400">+127 this week</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[#2f4b6a] bg-[#13253a] p-4">
        <p className="mb-3 flex items-center gap-2 font-semibold text-slate-100">
          <CalendarDays size={16} className="text-orange-400" /> Deadlines
        </p>
        <div className="space-y-2 text-sm">
          <div className="rounded-lg bg-[#1a2f47] p-2 text-slate-100">
            <p className="font-semibold">CN Lab Record</p>
            <p className="text-xs text-orange-300">Due in 2 days</p>
          </div>
          <div className="rounded-lg bg-[#1a2f47] p-2 text-slate-100">
            <p className="font-semibold">Internal Assessment</p>
            <p className="text-xs text-slate-400">Due in 6 days</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[#2f4b6a] bg-[#13253a] p-3">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-100">
          <RotateCw size={14} className="text-cyan-300" /> Quick Notes
        </p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="mb-2 w-full rounded bg-[#0e1e30] p-2 text-sm"
        />
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Write quick revision notes"
          className="h-20 w-full rounded bg-[#0e1e30] p-2 text-sm"
        />
        <button onClick={saveNote} className="mt-2 w-full rounded bg-emerald-600 py-1.5 text-sm font-semibold">
          Save Note
        </button>
        <div className="mt-2 space-y-1">
          {[...notes, ...offlineNotes].slice(0, 2).map((note) => (
            <div key={note._id || note.offlineId} className="rounded bg-[#0d1b2b] p-2 text-xs text-slate-300">
              <p className="font-semibold text-slate-100">{note.title}</p>
              <p className="truncate">{note.markdown}</p>
            </div>
          ))}
          {notes.length + offlineNotes.length === 0 && (
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <Circle size={8} /> No notes yet.
            </p>
          )}
        </div>
      </section>
    </aside>
  );
};
