export const EngineeringDiagram = () => (
  <svg viewBox="0 0 220 130" className="h-32 w-full rounded-lg bg-slate-900 p-2">
    <rect x="10" y="20" width="70" height="40" rx="6" fill="#0891b2" />
    <rect x="140" y="20" width="70" height="40" rx="6" fill="#7c3aed" />
    <rect x="75" y="80" width="70" height="35" rx="6" fill="#ea580c" />
    <line x1="80" y1="40" x2="140" y2="40" stroke="#e2e8f0" strokeWidth="3" />
    <line x1="45" y1="60" x2="110" y2="80" stroke="#e2e8f0" strokeWidth="3" />
    <line x1="175" y1="60" x2="110" y2="80" stroke="#e2e8f0" strokeWidth="3" />
    <text x="19" y="44" fill="white" fontSize="10">Input</text>
    <text x="145" y="44" fill="white" fontSize="10">Control</text>
    <text x="95" y="100" fill="white" fontSize="10">Output</text>
  </svg>
);
