import { BookOpenText, Cpu, Folder, LogOut, Settings, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const branches = [
  { code: 'EE', label: 'Electrical Eng.', icon: Zap },
  { code: 'Mechanical', label: 'Mechanical Eng.', icon: Settings },
  { code: 'CSE', label: 'Computer Science', icon: Cpu },
  { code: 'Civil', label: 'Civil Eng.', icon: BookOpenText },
];

const syllabusMap = {
  CSE: ['Data Structures', 'OSI Model', 'Syllabus'],
  EE: ['Power Systems', 'Electrical Machines', 'Control Systems'],
  Mechanical: ['Thermodynamics', 'SOM', 'Manufacturing'],
  Civil: ['Structural Analysis', 'Geotechnical', 'Transportation'],
};

export const BranchNavigator = () => {
  const { branch, setBranch } = useAppContext();

  return (
    <aside className="flex min-h-[84vh] flex-col rounded-2xl border border-[#1e3c5e] bg-[#071426] p-4 shadow-2xl shadow-black/30">
      <div className="mb-6 border-b border-[#1e3c5e] pb-4">
        <h1 className="text-2xl font-bold text-white">Engineer&apos;s Command Center</h1>
        <p className="text-sm text-slate-400">v2.4.0 · Student Edition</p>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#4b76a3]">Branches</p>
      <nav className="space-y-2">
        {branches.map(({ code, label, icon: Icon }) => {
          const active = branch === code;
          return (
            <button
              key={code}
              onClick={() => setBranch(code)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                active
                  ? 'border border-fuchsia-500/50 bg-[#1a2840] text-white'
                  : 'border border-transparent text-slate-300 hover:bg-[#13253b]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon size={16} className={active ? 'text-fuchsia-400' : 'text-blue-300'} />
                <span className="font-medium">{label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="mt-3 rounded-lg border border-[#2f4b6a] bg-[#0e2034] p-2">
        {(syllabusMap[branch] || []).map((topic, i) => (
          <div
            key={topic}
            className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm ${
              i === 1 ? 'bg-[#172e49] text-white' : 'text-slate-300'
            }`}
          >
            <Folder size={14} className={i === 1 ? 'text-fuchsia-400' : 'text-blue-300'} />
            {topic}
          </div>
        ))}
      </div>

      <button className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-[#21384f] py-2 text-sm font-semibold text-white hover:bg-[#2c4b69]">
        <LogOut size={14} />
        Logout
      </button>
    </aside>
  );
};
