import { useEffect, useState } from 'react';
import { EngineeringDiagram } from './EngineeringDiagram';
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
    <aside className="rounded-2xl bg-panel p-4 shadow-lg">
      <h2 className="mb-3 text-lg font-semibold">Study Tools</h2>
      <EngineeringDiagram />

      <div className="mt-4 space-y-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full rounded bg-slate-800 p-2"
        />
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Write quick revision notes"
          className="h-24 w-full rounded bg-slate-800 p-2"
        />
        <button onClick={saveNote} className="w-full rounded bg-emerald-600 py-2 hover:bg-emerald-500">
          Save Note
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-semibold text-slate-300">Recent Notes</h3>
        {[...notes, ...offlineNotes].slice(0, 5).map((note) => (
          <div key={note._id || note.offlineId} className="rounded bg-slate-800 p-2 text-sm">
            <div className="font-medium">{note.title}</div>
            <div className="truncate text-slate-400">{note.markdown}</div>
          </div>
        ))}
      </div>
    </aside>
  );
};
