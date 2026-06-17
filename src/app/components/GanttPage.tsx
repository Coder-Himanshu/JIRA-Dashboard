import { useState } from 'react';
import { epics, milestones, teams } from '../data/mockData';
import { FilterBar } from './FilterBar';
import { MilestoneDrawer } from './MilestoneDrawer';

const timelineStart = new Date('2026-05-01').getTime();
const timelineEnd = new Date('2026-08-31').getTime();
const totalMs = timelineEnd - timelineStart;

function pct(dateStr: string) {
  return Math.min(100, Math.max(0, ((new Date(dateStr).getTime() - timelineStart) / totalMs) * 100));
}
function bw(s: string, e: string) {
  return Math.max(0.5, Math.min(100, pct(e)) - Math.max(0, pct(s)));
}

const statusColors: Record<string, string> = {
  'Planned': '#5E6C84', 'In Progress': '#0052CC', 'At Risk': '#FFAB00', 'Blocked': '#FF5630', 'Completed': '#36B37E',
};
const statusBg: Record<string, string> = {
  'Planned': '#F4F5F7', 'In Progress': '#DEEBFF', 'At Risk': '#FFFAE6', 'Blocked': '#FFEBE6', 'Completed': '#E3FCEF',
};

const weeks: string[] = [];
{
  let d = new Date('2026-05-04');
  while (d.getTime() < timelineEnd) {
    weeks.push(`${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`);
    d = new Date(d.getTime() + 7 * 86400000);
  }
}

const todayPct = pct(new Date().toISOString().split('T')[0]);
const ROW_H = 36;
const LEFT_W = 240;

export function GanttPage() {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<typeof milestones[0] | null>(null);

  const filteredTeams = selectedTeam === 'all' ? teams : teams.filter(t => t.id === selectedTeam);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div style={{ color: '#5E6C84', fontSize: '12px', marginBottom: '2px' }}><span style={{ color: '#0052CC' }}>Org Dashboard</span> / Gantt View</div>
        <h1 style={{ fontWeight: 700, fontSize: '20px', color: '#172B4D' }}>Gantt View</h1>
        <p style={{ color: '#5E6C84', fontSize: '13px', marginTop: '2px' }}>BigPicture-style Gantt — initiatives, epics, milestones, and dependencies</p>
      </div>

      <FilterBar selectedTeam={selectedTeam} onTeamChange={setSelectedTeam} />

      <div className="rounded overflow-auto" style={{ background: '#fff', border: '1px solid #DFE1E6', maxHeight: '72vh' }}>
        {/* Header */}
        <div className="flex sticky top-0 z-10" style={{ background: '#F4F5F7', borderBottom: '2px solid #DFE1E6' }}>
          <div style={{ width: LEFT_W, minWidth: LEFT_W, padding: '8px 14px', borderRight: '1px solid #DFE1E6', fontSize: '11px', fontWeight: 700, color: '#5E6C84', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Epic / Item</div>
          <div className="flex-1 flex">
            {weeks.map(w => (
              <div key={w} style={{ minWidth: '70px', flex: 1, padding: '8px 4px', fontSize: '9px', fontWeight: 600, color: '#5E6C84', borderRight: '1px solid #DFE1E6', textAlign: 'center', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{w}</div>
            ))}
          </div>
        </div>

        {/* Rows */}
        {filteredTeams.map(team => {
          const teamEpics = epics.filter(e => e.teamId === team.id);
          const teamMilestones = milestones.filter(m => m.teamIds.includes(team.id));

          return (
            <div key={team.id}>
              {/* Team header row */}
              <div className="flex" style={{ height: ROW_H, borderBottom: '1px solid #DFE1E6', background: '#F4F5F7' }}>
                <div className="flex items-center gap-2" style={{ width: LEFT_W, minWidth: LEFT_W, padding: '4px 14px', borderRight: '1px solid #DFE1E6' }}>
                  <div className="w-5 h-5 rounded flex items-center justify-center text-white" style={{ background: team.color, fontSize: '8px', fontWeight: 700 }}>{team.avatar}</div>
                  <span style={{ fontWeight: 700, fontSize: '12px', color: '#172B4D' }}>{team.name}</span>
                  <span style={{ fontSize: '10px', color: '#5E6C84' }}>{team.sprintName}</span>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute rounded" style={{
                    left: `${pct(team.sprintStart)}%`, width: `${bw(team.sprintStart, team.sprintEnd)}%`,
                    top: '8px', height: '20px',
                    background: `${team.color}15`, border: `1px solid ${team.color}30`,
                  }}>
                    <div style={{ height: '100%', width: `${team.sprintProgress}%`, background: `${team.color}40`, borderRadius: '3px' }} />
                  </div>
                  <div className="absolute top-0 bottom-0" style={{ left: `${todayPct}%`, width: '1px', background: '#FF5630', opacity: 0.5 }} />
                </div>
              </div>

              {/* Epic rows */}
              {teamEpics.map(epic => {
                const col = statusColors[epic.status] || '#5E6C84';
                const bg = statusBg[epic.status] || '#F4F5F7';
                const isHov = hoveredId === epic.id;

                return (
                  <div
                    key={epic.id}
                    className="flex transition-colors"
                    style={{ height: ROW_H, borderBottom: '1px solid #F4F5F7', background: isHov ? '#F4F5F7' : '#fff' }}
                    onMouseEnter={() => setHoveredId(epic.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div style={{ width: LEFT_W, minWidth: LEFT_W, padding: '4px 14px 4px 32px', borderRight: '1px solid #DFE1E6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: team.color }} />
                      <span style={{ fontSize: '11px', color: '#172B4D', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{epic.title}</span>
                    </div>
                    <div className="flex-1 relative">
                      <div
                        className="absolute rounded overflow-hidden cursor-pointer"
                        style={{
                          left: `${pct(epic.startDate)}%`, width: `${bw(epic.startDate, epic.endDate)}%`,
                          top: '7px', height: '22px',
                          background: bg, border: `1px solid ${col}40`,
                          minWidth: '24px',
                          ...(isHov ? { borderColor: col, boxShadow: `0 0 0 1px ${col}40` } : {}),
                        }}
                        title={`${epic.title} · ${epic.status} · ${epic.progress}%`}
                      >
                        <div style={{ height: '100%', width: `${epic.progress}%`, background: `${col}30` }} />
                        {isHov && (
                          <div className="absolute inset-0 flex items-center px-2">
                            <span style={{ fontSize: '9px', fontWeight: 700, color: col, whiteSpace: 'nowrap', overflow: 'hidden' }}>{epic.progress}% · {epic.status}</span>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-0 bottom-0" style={{ left: `${todayPct}%`, width: '1px', background: '#FF5630', opacity: 0.4 }} />
                    </div>
                  </div>
                );
              })}

              {/* Milestone rows */}
              {teamMilestones.map(m => {
                const col = statusColors[m.status] || '#5E6C84';
                return (
                  <div key={m.id} className="flex" style={{ height: ROW_H, borderBottom: '1px solid #F4F5F7', background: '#FAFBFC' }}>
                    <div style={{ width: LEFT_W, minWidth: LEFT_W, padding: '4px 14px 4px 32px', borderRight: '1px solid #DFE1E6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '10px', color: col }}>◆</span>
                      <span style={{ fontSize: '11px', color: '#172B4D', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title}</span>
                    </div>
                    <div className="flex-1 relative">
                      <div
                        className="absolute cursor-pointer"
                        style={{ left: `${pct(m.date)}%`, top: '11px', transform: 'translateX(-50%)' }}
                        title={m.title}
                        onClick={() => setSelectedMilestone(m)}
                      >
                        <div style={{ width: '12px', height: '12px', background: col, transform: 'rotate(45deg)', borderRadius: '2px' }} />
                      </div>
                      <div className="absolute top-0 bottom-0" style={{ left: `${todayPct}%`, width: '1px', background: '#FF5630', opacity: 0.4 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Today label */}
        <div className="relative" style={{ height: '20px', borderTop: '1px solid #DFE1E6' }}>
          <div className="absolute" style={{ left: `${todayPct}%`, transform: 'translateX(-50%)', top: '3px' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#FF5630', background: '#fff', padding: '1px 4px', borderRadius: '2px', border: '1px solid #FFEBE6', whiteSpace: 'nowrap' }}>TODAY</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        {Object.entries(statusColors).map(([s, c]) => (
          <div key={s} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: statusBg[s], border: `1px solid ${c}50` }} />
            <span style={{ fontSize: '11px', color: '#5E6C84' }}>{s}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div style={{ width: '1px', height: '12px', background: '#FF5630', opacity: 0.7 }} />
          <span style={{ fontSize: '11px', color: '#5E6C84' }}>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div style={{ width: '9px', height: '9px', background: '#5E6C84', transform: 'rotate(45deg)', borderRadius: '1px' }} />
          <span style={{ fontSize: '11px', color: '#5E6C84' }}>Milestone (click to open)</span>
        </div>
      </div>

      <MilestoneDrawer milestone={selectedMilestone} onClose={() => setSelectedMilestone(null)} />
    </div>
  );
}
