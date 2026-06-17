import { useState } from 'react';
import { epics, milestones, teams } from '../data/mockData';
import { FilterBar } from './FilterBar';
import { JiraLozenge, healthToVariant } from './JiraLozenge';
import { MilestoneDrawer } from './MilestoneDrawer';
import { ChevronDown, ChevronRight } from 'lucide-react';

const statusColors: Record<string, { text: string; bg: string; border: string }> = {
  'Planned': { text: '#5E6C84', bg: '#F4F5F7', border: '#DFE1E6' },
  'In Progress': { text: '#0052CC', bg: '#DEEBFF', border: '#4C9AFF' },
  'At Risk': { text: '#7A5900', bg: '#FFFAE6', border: '#FFE380' },
  'Blocked': { text: '#BF2600', bg: '#FFEBE6', border: '#FF8F73' },
  'Completed': { text: '#006644', bg: '#E3FCEF', border: '#79F2C0' },
};

const timelineStart = new Date('2026-05-01').getTime();
const timelineEnd = new Date('2026-08-31').getTime();
const totalMs = timelineEnd - timelineStart;
const months = ['May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026'];

function pct(dateStr: string) {
  return Math.min(100, Math.max(0, ((new Date(dateStr).getTime() - timelineStart) / totalMs) * 100));
}
function barWidth(s: string, e: string) {
  return Math.max(0.5, Math.min(100, pct(e)) - Math.max(0, pct(s)));
}

export function RoadmapPage() {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedMilestone, setSelectedMilestone] = useState<typeof milestones[0] | null>(null);
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set(teams.map(t => t.id)));

  const filteredTeams = selectedTeam === 'all' ? teams : teams.filter(t => t.id === selectedTeam);

  const toggle = (id: string) => setExpandedTeams(prev => {
    const s = new Set(prev);
    s.has(id) ? s.delete(id) : s.add(id);
    return s;
  });

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div style={{ color: '#5E6C84', fontSize: '12px', marginBottom: '2px' }}><span style={{ color: '#0052CC' }}>Org Dashboard</span> / Roadmap</div>
        <h1 style={{ fontWeight: 700, fontSize: '20px', color: '#172B4D' }}>Roadmap</h1>
        <p style={{ color: '#5E6C84', fontSize: '13px', marginTop: '2px' }}>Jira Advanced Roadmaps-style timeline — click milestones to open detail drawer</p>
      </div>

      {/* Milestones */}
      <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
        <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '10px' }}>Milestones</div>
        <div className="flex flex-wrap gap-2">
          {milestones.map(m => {
            const cfg = statusColors[m.status];
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMilestone(selectedMilestone?.id === m.id ? null : m)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded transition-all"
                style={{
                  background: cfg.bg,
                  border: `2px solid ${selectedMilestone?.id === m.id ? cfg.text : cfg.border}`,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <span style={{ fontSize: '10px', color: cfg.text }}>◆</span>
                <span style={{ color: cfg.text, fontSize: '12px', fontWeight: 500 }}>{m.title}</span>
                <span style={{ color: cfg.text, fontSize: '10px', opacity: 0.7, fontFamily: 'JetBrains Mono, monospace' }}>{m.date}</span>
              </button>
            );
          })}
        </div>
      </div>

      <FilterBar selectedTeam={selectedTeam} onTeamChange={setSelectedTeam} />

      {/* Timeline grid */}
      <div className="rounded overflow-hidden" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
        {/* Month header */}
        <div className="flex" style={{ borderBottom: '2px solid #DFE1E6' }}>
          <div style={{ width: '230px', minWidth: '230px', padding: '8px 14px', background: '#F4F5F7', borderRight: '1px solid #DFE1E6', fontSize: '11px', fontWeight: 700, color: '#5E6C84', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Team / Epic</div>
          <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${months.length}, 1fr)` }}>
            {months.map(m => (
              <div key={m} style={{ padding: '8px 12px', borderRight: '1px solid #DFE1E6', fontSize: '11px', fontWeight: 700, color: '#5E6C84', background: '#F4F5F7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m}</div>
            ))}
          </div>
        </div>

        {/* Milestone marker row */}
        <div className="flex" style={{ borderBottom: '1px solid #DFE1E6', background: '#FAFBFC' }}>
          <div style={{ width: '230px', minWidth: '230px', padding: '6px 14px', borderRight: '1px solid #DFE1E6', fontSize: '11px', color: '#5E6C84' }}>Milestones</div>
          <div className="flex-1 relative" style={{ height: '28px' }}>
            {milestones.map(m => {
              const left = pct(m.date);
              const cfg = statusColors[m.status];
              return (
                <div
                  key={m.id}
                  className="absolute cursor-pointer"
                  style={{ left: `${left}%`, top: '8px', transform: 'translateX(-50%)' }}
                  onClick={() => setSelectedMilestone(selectedMilestone?.id === m.id ? null : m)}
                  title={m.title}
                >
                  <div style={{ width: '10px', height: '10px', background: cfg.text, transform: 'rotate(45deg)', borderRadius: '1px' }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Team + epic rows */}
        {filteredTeams.map(team => {
          const teamEpics = epics.filter(e => e.teamId === team.id);
          const expanded = expandedTeams.has(team.id);

          return (
            <div key={team.id}>
              {/* Team row */}
              <div
                className="flex cursor-pointer transition-colors"
                style={{ borderBottom: '1px solid #DFE1E6' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F4F5F7')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                onClick={() => toggle(team.id)}
              >
                <div className="flex items-center gap-2" style={{ width: '230px', minWidth: '230px', padding: '7px 14px', borderRight: '1px solid #DFE1E6' }}>
                  {expanded ? <ChevronDown size={12} color="#5E6C84" /> : <ChevronRight size={12} color="#5E6C84" />}
                  <div className="w-5 h-5 rounded flex items-center justify-center text-white" style={{ background: team.color, fontSize: '8px', fontWeight: 700, flexShrink: 0 }}>{team.avatar}</div>
                  <span style={{ fontWeight: 600, fontSize: '12px', color: '#172B4D' }}>{team.name}</span>
                  <JiraLozenge label={team.health} variant={healthToVariant(team.health)} />
                </div>
                <div className="flex-1 relative" style={{ height: '34px' }}>
                  <div className="absolute rounded overflow-hidden" style={{
                    left: `${pct(team.sprintStart)}%`,
                    width: `${barWidth(team.sprintStart, team.sprintEnd)}%`,
                    top: '8px', height: '18px',
                    background: `${team.color}15`,
                    border: `1px solid ${team.color}40`,
                  }}>
                    <div style={{ height: '100%', width: `${team.sprintProgress}%`, background: `${team.color}45` }} />
                  </div>
                </div>
              </div>

              {/* Epic rows */}
              {expanded && teamEpics.map(epic => {
                const cfg = statusColors[epic.status];
                const l = pct(epic.startDate);
                const w = barWidth(epic.startDate, epic.endDate);
                return (
                  <div key={epic.id} className="flex" style={{ borderBottom: '1px solid #F4F5F7' }}>
                    <div style={{ width: '230px', minWidth: '230px', padding: '5px 14px 5px 38px', borderRight: '1px solid #DFE1E6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '11px', color: '#172B4D', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{epic.title}</span>
                    </div>
                    <div className="flex-1 relative" style={{ height: '30px' }}>
                      <div
                        className="absolute rounded overflow-hidden flex items-center"
                        style={{
                          left: `${l}%`,
                          width: `${w}%`,
                          top: '5px', height: '20px',
                          background: cfg.bg,
                          border: `1px solid ${cfg.border}`,
                          minWidth: '30px',
                          cursor: 'default',
                          paddingLeft: '4px',
                        }}
                        title={`${epic.title} · ${epic.status} · ${epic.progress}%`}
                      >
                        <div className="absolute inset-0 rounded" style={{ width: `${epic.progress}%`, background: `${cfg.text}20` }} />
                        <span style={{ fontSize: '10px', fontWeight: 500, color: cfg.text, position: 'relative', zIndex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {epic.title}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Status legend */}
      <div className="flex items-center gap-3 flex-wrap">
        {Object.entries(statusColors).map(([s, cfg]) => (
          <div key={s} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }} />
            <span style={{ fontSize: '11px', color: '#5E6C84' }}>{s}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div style={{ width: '9px', height: '9px', background: '#5E6C84', transform: 'rotate(45deg)', borderRadius: '1px' }} />
          <span style={{ fontSize: '11px', color: '#5E6C84' }}>Milestone</span>
        </div>
      </div>

      <MilestoneDrawer milestone={selectedMilestone} onClose={() => setSelectedMilestone(null)} />
    </div>
  );
}
