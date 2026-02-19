import { useEffect, useState } from 'react';

const KEY = 'offline_notes_cache';

export const useOfflineNotes = () => {
  const [offlineNotes, setOfflineNotes] = useState(() => {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(offlineNotes));
  }, [offlineNotes]);

  return { offlineNotes, setOfflineNotes };
};
