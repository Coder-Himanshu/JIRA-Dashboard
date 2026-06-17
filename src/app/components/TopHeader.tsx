import { useState } from 'react';
import { Search, Bell, HelpCircle, RefreshCw, Download, Share2, ChevronDown } from 'lucide-react';
import { teams } from '../data/mockData';

export function TopHeader() {
  const [teamFilter, setTeamFilter] = useState('all');

  const selectStyle = {
    background: '#fff',
    border: '2px solid #DFE1E6',
    borderRadius: '3px',
    color: '#172B4D',
    fontSize: '13px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    outline: 'none',
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
  };

  return (
    <header
      className="flex items-center gap-3 px-4 shrink-0"
      style={{
        height: '52px',
        background: '#fff',
        borderBottom: '1px solid #DFE1E6',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Org name + subtitle */}
      <div className="shrink-0 mr-2">
        <div style={{ fontWeight: 700, fontSize: '13px', color: '#172B4D', lineHeight: 1.2 }}>Org Agile Delivery Dashboard</div>
        <div style={{ color: '#5E6C84', fontSize: '10px', lineHeight: 1.2 }}>5 teams · Multiple sprint cadences</div>
      </div>

      {/* Divider */}
      <div className="w-px h-6 shrink-0" style={{ background: '#DFE1E6' }} />

      {/* Filters */}
      <div className="flex items-center gap-2 flex-1 flex-wrap">
        <div className="relative">
          <select style={selectStyle} value={teamFilter} onChange={e => setTeamFilter(e.target.value)}>
            <option value="all">All Teams</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <ChevronDown size={11} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#5E6C84', pointerEvents: 'none' }} />
        </div>

        <div className="relative">
          <select style={selectStyle}>
            <option>All Sprints</option>
            <option>VB Sprint 17</option>
            <option>INFI Sprint 19</option>
            <option>Design Sprint 50</option>
            <option>Platform Sprint 12</option>
            <option>QA Sprint 08</option>
          </select>
          <ChevronDown size={11} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#5E6C84', pointerEvents: 'none' }} />
        </div>

        <div className="relative">
          <select style={selectStyle}>
            <option>Q2 2026</option>
            <option>Last 30 days</option>
            <option>Last 14 days</option>
            <option>This sprint</option>
          </select>
          <ChevronDown size={11} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#5E6C84', pointerEvents: 'none' }} />
        </div>

        <div className="relative">
          <select style={selectStyle}>
            <option>All Risks</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
          </select>
          <ChevronDown size={11} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#5E6C84', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-1.5 shrink-0 ml-auto">
        {/* Last sync */}
        <span style={{ color: '#5E6C84', fontSize: '11px', marginRight: '4px' }}>Synced: 2 min ago</span>

        {/* Search */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded" style={{ background: '#F4F5F7', border: '2px solid #DFE1E6' }}>
          <Search size={13} color="#5E6C84" />
          <input
            placeholder="Search issues..."
            style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '12px', color: '#172B4D', width: '120px', fontFamily: 'inherit' }}
          />
        </div>

        {/* Action buttons */}
        {[
          { icon: <RefreshCw size={14} />, label: 'Refresh' },
          { icon: <Download size={14} />, label: 'Export PDF' },
          { icon: <Share2 size={14} />, label: 'Share' },
        ].map(({ icon, label }) => (
          <button
            key={label}
            title={label}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-colors hover:bg-[#F4F5F7]"
            style={{ background: 'none', border: '2px solid #DFE1E6', cursor: 'pointer', color: '#172B4D', fontSize: '12px', fontFamily: 'inherit' }}
          >
            {icon}
          </button>
        ))}

        {/* Notification */}
        <button
          className="relative w-8 h-8 rounded flex items-center justify-center transition-colors hover:bg-[#F4F5F7]"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#172B4D' }}
        >
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#FF5630' }} />
        </button>

        {/* Help */}
        <button
          className="w-8 h-8 rounded flex items-center justify-center transition-colors hover:bg-[#F4F5F7]"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5E6C84' }}
        >
          <HelpCircle size={16} />
        </button>

        {/* Avatar */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
          style={{ background: '#0052CC', color: '#fff', userSelect: 'none' }}
          title="Scrum Master"
        >
          SM
        </div>
      </div>
    </header>
  );
}
