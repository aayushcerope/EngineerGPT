import { BranchNavigator } from '../components/BranchNavigator';
import { ChatInterface } from '../components/ChatInterface';
import { StudyToolsPanel } from '../components/StudyToolsPanel';

export const DashboardPage = () => (
  <div className="grid min-h-screen grid-cols-1 gap-4 bg-slate-950 p-4 lg:grid-cols-[280px_1fr_320px]">
    <BranchNavigator />
    <ChatInterface />
    <StudyToolsPanel />
  </div>
);
