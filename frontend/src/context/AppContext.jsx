import { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [branch, setBranch] = useState('CSE');
  const [depth, setDepth] = useState('intermediate');
  const value = useMemo(() => ({ branch, setBranch, depth, setDepth }), [branch, depth]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used in AppProvider');
  return ctx;
};
