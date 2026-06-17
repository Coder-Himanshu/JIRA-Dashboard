import { NavLink, useLocation } from 'react-router';
import {
  LayoutDashboard, Users, Layers, Package, Map, BarChart3, BarChart2, Zap, AlertTriangle, Settings, ChevronRight,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/teams', label: 'Teams', icon: Users },
  { path: '/sprints', label: 'Active Sprints', icon: Layers },
  { path: '/backlog', label: 'Backlog', icon: Package },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/gantt', label: 'Gantt View', icon: BarChart3 },
  { path: '/reports', label: 'Reports', icon: BarChart2 },
  { path: '/dora', label: 'DORA Metrics', icon: Zap },
  { path: '/risks', label: 'Risks & Dependencies', icon: AlertTriangle },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 shrink-0"
      style={{ width: '220px', background: 'var(--sidebar)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo / Product name */}
      <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
          {/* Jira-style logomark */}
          <div
            className="w-6 h-6 rounded flex items-center justify-center text-white font-bold"
            style={{ background: 'linear-gradient(135deg, #0052CC 0%, #4C9AFF 100%)', fontSize: '10px' }}
          >
            J
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '13px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>OrgAgile</div>
            <div style={{ color: '#5E7A91', fontSize: '10px', lineHeight: 1.2 }}>Delivery Dashboard</div>
          </div>
        </div>
      </div>

      {/* PROJECT label */}
      <div style={{ padding: '12px 16px 4px', color: '#5E7A91', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Navigation
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 overflow-y-auto" style={{ paddingBottom: '8px' }}>
        <ul className="space-y-0.5">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
            return (
              <li key={path}>
                <NavLink
                  to={path}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    className="flex items-center gap-2 rounded transition-all"
                    style={{
                      padding: '6px 10px',
                      background: active ? 'var(--sidebar-accent)' : 'transparent',
                      color: active ? '#FFFFFF' : '#8FA3B1',
                      fontSize: '13px',
                      fontWeight: active ? 500 : 400,
                      cursor: 'pointer',
                    }}
                  >
                    <Icon size={15} strokeWidth={active ? 2.2 : 1.8} style={{ flexShrink: 0 }} />
                    <span className="flex-1 truncate">{label}</span>
                    {active && <div className="w-1 h-1 rounded-full" style={{ background: '#4C9AFF' }} />}
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings */}
      <div style={{ padding: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          className="flex items-center gap-2 rounded transition-all"
          style={{ padding: '6px 10px', color: '#8FA3B1', fontSize: '13px', cursor: 'pointer' }}
        >
          <Settings size={15} strokeWidth={1.8} />
          <span>Settings</span>
        </div>
      </div>

      {/* User footer */}
      <div className="px-3 py-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: '#0052CC', color: '#fff' }}
          >
            SM
          </div>
          <div className="min-w-0">
            <div style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Scrum Master</div>
            <div style={{ color: '#5E7A91', fontSize: '10px' }}>Org Level</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
