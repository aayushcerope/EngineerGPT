import { Bell, Settings2, UserCircle2 } from 'lucide-react';
import { BranchNavigator } from '../components/BranchNavigator';
import { ChatInterface } from '../components/ChatInterface';
import { StudyToolsPanel } from '../components/StudyToolsPanel';

export const DashboardPage = () => (
  <div className="min-h-screen bg-[#070d1a] p-5 text-slate-100">
    <div className="mx-auto rounded-2xl border border-[#1a3551] bg-[#060f1d]">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px]">
        <BranchNavigator />
        <section className="border-x border-[#1a3551]">
          <div className="flex items-center justify-end gap-3 border-b border-[#1a3551] px-4 py-3 text-xs">
            <span className="text-slate-400">MODE</span>
            <button className="rounded-full border border-blue-500/60 bg-blue-500/20 px-4 py-1 font-semibold text-blue-300">STUDY</button>
            <Settings2 size={15} className="text-slate-400" />
            <Bell size={15} className="text-slate-400" />
            <UserCircle2 size={21} className="text-slate-300" />
          </div>
          <ChatInterface />
        </section>
        <StudyToolsPanel />
      </div>
    </div>
  </div>
);
