import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { OrgDashboard } from './components/OrgDashboard';
import { TeamsPage } from './components/TeamsPage';
import { TeamDetails } from './components/TeamDetails';
import { ActiveSprintsPage } from './components/ActiveSprintsPage';
import { RoadmapPage } from './components/RoadmapPage';
import { GanttPage } from './components/GanttPage';
import { BacklogPage } from './components/BacklogPage';
import { ReportsPage } from './components/ReportsPage';
import { DORAPage } from './components/DORAPage';
import { RiskPage } from './components/RiskPage';
import '../styles/fonts.css';

{/* MARKER-MAKE-KIT-INVOKED */}
{/* MARKER-MAKE-KIT-DISCOVERY-READ */}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden" style={{ background: '#F4F5F7' }}>
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopHeader />
          <main className="flex-1 overflow-y-auto">
            <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px 24px' }}>
              <Routes>
                <Route path="/" element={<OrgDashboard />} />
                <Route path="/teams" element={<TeamsPage />} />
                <Route path="/teams/:teamId" element={<TeamDetails />} />
                <Route path="/sprints" element={<ActiveSprintsPage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/gantt" element={<GanttPage />} />
                <Route path="/backlog" element={<BacklogPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/dora" element={<DORAPage />} />
                <Route path="/risks" element={<RiskPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
