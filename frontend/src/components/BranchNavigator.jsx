import { branchThemes } from '../lib/themes';
import { useAppContext } from '../context/AppContext';

const syllabusMap = {
  CSE: ['Data Structures', 'DBMS', 'Operating Systems', 'Computer Networks'],
  ECE: ['Signals & Systems', 'Digital Electronics', 'Microprocessors', 'Communication'],
  EE: ['Power Systems', 'Electrical Machines', 'Control Systems', 'Power Electronics'],
  Mechanical: ['Thermodynamics', 'SOM', 'Manufacturing', 'Fluid Mechanics'],
  Civil: ['Structural Analysis', 'Geotechnical', 'Transportation', 'Environmental'],
  Instrumentation: ['Sensors', 'Process Control', 'Industrial Instrumentation', 'PLC & SCADA'],
};

export const BranchNavigator = () => {
  const { branch, setBranch } = useAppContext();

  return (
    <aside className="rounded-2xl bg-panel p-4 shadow-lg">
      <h2 className="mb-4 text-lg font-semibold">Branch Navigator</h2>
      <div className="space-y-2">
        {Object.keys(branchThemes).map((code) => (
          <button
            key={code}
            onClick={() => setBranch(code)}
            className={`w-full rounded-xl bg-gradient-to-r p-2 text-left text-sm ${branchThemes[code]} ${
              branch === code ? 'ring-2 ring-white' : 'opacity-80'
            }`}
          >
            {code}
          </button>
        ))}
      </div>
      <div className="mt-5 space-y-2 text-sm text-slate-300">
        {(syllabusMap[branch] || []).map((topic) => (
          <div key={topic} className="rounded-lg bg-panelLight p-2">
            {topic}
          </div>
        ))}
      </div>
    </aside>
  );
};
