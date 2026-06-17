import { useState } from 'react';
import { risks, teams } from '../data/mockData';
import type { RiskStatus } from '../data/mockData';
import { FilterBar } from './FilterBar';
import { AlertTriangle, ArrowRight, User, Calendar } from 'lucide-react';
import { JiraLozenge } from './JiraLozenge';

const impactStyles: Record<string, { text: string; bg: string; border: string }> = {
  'Critical': { text: '#BF2600', bg: '#FFEBE6', border: '#FF8F73' },
  'High': { text: '#7A5900', bg: '#FFFAE6', border: '#FFE380' },
  'Medium': { text: '#0747A6', bg: '#DEEBFF', border: '#4C9AFF' },
  'Low': { text: '#5E6C84', bg: '#F4F5F7', border: '#DFE1E6' },
};

const columns: RiskStatus[] = ['New', 'In Review', 'Mitigation In Progress', 'Resolved'];

const colStyles: Record<RiskStatus, { header: string; bg: string; headerBg: string }> = {
  'New': { header: '#FF5630', bg: '#FFEBE6', headerBg: '#FF5630' },
  'In Review': { header: '#FFAB00', bg: '#FFFAE6', headerBg: '#FFAB00' },
  'Mitigation In Progress': { header: '#0052CC', bg: '#DEEBFF', headerBg: '#0052CC' },
  'Resolved': { header: '#36B37E', bg: '#E3FCEF', headerBg: '#36B37E' },
};

export function RiskPage() {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [riskStatuses, setRiskStatuses] = useState<Record<string, RiskStatus>>(
    Object.fromEntries(risks.map(r => [r.id, r.status]))
  );

  const filteredRisks = risks.filter(r => selectedTeam === 'all' || r.teamId === selectedTeam);

  const handleDrop = (col: RiskStatus) => {
    if (draggingId) setRiskStatuses(prev => ({ ...prev, [draggingId]: col }));
    setDraggingId(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div style={{ color: '#5E6C84', fontSize: '12px', marginBottom: '2px' }}><span style={{ color: '#0052CC' }}>Org Dashboard</span> / Risks & Dependencies</div>
        <h1 style={{ fontWeight: 700, fontSize: '20px', color: '#172B4D' }}>Risks & Dependencies</h1>
        <p style={{ color: '#5E6C84', fontSize: '13px', marginTop: '2px' }}>Cross-team blockers, risks, and dependency tracking — drag to update status</p>
      </div>

      {/* Column counts */}
      <div className="grid grid-cols-4 gap-3">
        {columns.map(col => {
          const count = filteredRisks.filter(r => riskStatuses[r.id] === col).length;
          const s = colStyles[col];
          return (
            <div key={col} className="rounded p-3 flex items-center gap-3" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
              <div className="w-2 h-8 rounded-full" style={{ background: s.header }} />
              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '20px', color: s.header }}>{count}</div>
                <div style={{ color: '#5E6C84', fontSize: '11px' }}>{col}</div>
              </div>
            </div>
          );
        })}
      </div>

      <FilterBar selectedTeam={selectedTeam} onTeamChange={setSelectedTeam} />

      {/* Kanban */}
      <div className="grid grid-cols-4 gap-3">
        {columns.map(col => {
          const colRisks = filteredRisks.filter(r => riskStatuses[r.id] === col);
          const s = colStyles[col];

          return (
            <div
              key={col}
              className="flex flex-col gap-2 rounded"
              style={{ background: '#F4F5F7', border: '1px solid #DFE1E6', overflow: 'hidden', minHeight: '400px' }}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(col)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between px-3 py-2" style={{ background: s.headerBg }}>
                <span style={{ fontWeight: 700, fontSize: '11px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col}</span>
                <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold" style={{ background: 'rgba(255,255,255,0.3)', color: '#fff', fontSize: '10px' }}>{colRisks.length}</span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2 p-2 flex-1">
                {colRisks.map(risk => {
                  const team = teams.find(t => t.id === risk.teamId);
                  const imp = impactStyles[risk.impact];
                  const isDrag = draggingId === risk.id;

                  return (
                    <div
                      key={risk.id}
                      draggable
                      onDragStart={() => setDraggingId(risk.id)}
                      onDragEnd={() => setDraggingId(null)}
                      className="rounded flex flex-col gap-2 cursor-grab active:cursor-grabbing"
                      style={{
                        background: '#fff',
                        border: '1px solid #DFE1E6',
                        padding: '10px 12px',
                        boxShadow: isDrag ? '0 8px 24px rgba(9,30,66,0.15)' : '0 1px 2px rgba(9,30,66,0.06)',
                        opacity: isDrag ? 0.7 : 1,
                        transform: isDrag ? 'rotate(2deg)' : 'none',
                        transition: 'box-shadow 0.12s',
                      }}
                    >
                      {/* Risk ID + Impact */}
                      <div className="flex items-center justify-between">
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#5E6C84' }}>RISK-{risk.id.replace('r', '')}</span>
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold" style={{ background: imp.bg, color: imp.text, border: `1px solid ${imp.border}` }}>
                          <AlertTriangle size={9} /> {risk.impact}
                        </span>
                      </div>

                      {/* Title */}
                      <div style={{ fontWeight: 600, fontSize: '12px', color: '#172B4D', lineHeight: 1.4 }}>{risk.title}</div>
                      <div style={{ color: '#5E6C84', fontSize: '11px', lineHeight: 1.4 }}>{risk.description}</div>

                      {/* Team badge */}
                      {team && (
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded flex items-center justify-center text-white" style={{ background: team.color, fontSize: '7px', fontWeight: 700 }}>{team.avatar}</div>
                          <span style={{ fontSize: '10px', color: '#5E6C84' }}>{team.name}</span>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-1" style={{ borderTop: '1px solid #F4F5F7' }}>
                        <div className="flex items-center gap-1">
                          <User size={9} color="#5E6C84" />
                          <span style={{ fontSize: '10px', color: '#5E6C84' }}>{risk.owner}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={9} color="#5E6C84" />
                          <span style={{ fontSize: '10px', color: '#5E6C84' }}>{risk.dueDate}</span>
                        </div>
                      </div>

                      {/* Cross-team dependency */}
                      {risk.dependsOn && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ background: '#DEEBFF', border: '1px solid #4C9AFF' }}>
                          <ArrowRight size={9} color="#0052CC" />
                          <span style={{ fontSize: '10px', color: '#0052CC', fontWeight: 600 }}>
                            Depends: {teams.find(t => t.id === risk.dependsOn)?.name}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {colRisks.length === 0 && (
                  <div className="flex items-center justify-center rounded flex-1" style={{ border: `2px dashed ${s.header}30`, minHeight: '80px' }}>
                    <span style={{ fontSize: '11px', color: `${s.header}60` }}>Drop here</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dependency map table */}
      <div className="rounded overflow-hidden" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
        <div style={{ padding: '10px 14px', background: '#F4F5F7', borderBottom: '1px solid #DFE1E6', fontWeight: 600, fontSize: '13px', color: '#172B4D' }}>Cross-Team Dependencies</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ background: '#FAFBFC', borderBottom: '1px solid #DFE1E6' }}>
              {['RISK ID', 'Title', 'Team', 'Depends On', 'Impact', 'Owner', 'Due Date', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#5E6C84', fontWeight: 500, fontSize: '11px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRisks.filter(r => r.dependsOn).map(risk => {
              const team = teams.find(t => t.id === risk.teamId);
              const depTeam = teams.find(t => t.id === risk.dependsOn);
              const imp = impactStyles[risk.impact];
              const status = riskStatuses[risk.id];
              const s = colStyles[status];

              return (
                <tr
                  key={risk.id}
                  style={{ borderBottom: '1px solid #F4F5F7' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F4F5F7')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '9px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#5E6C84' }}>RISK-{risk.id.replace('r', '')}</td>
                  <td style={{ padding: '9px 12px', fontWeight: 500, color: '#172B4D', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{risk.title}</td>
                  <td style={{ padding: '9px 12px' }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded flex items-center justify-center text-white" style={{ background: team?.color, fontSize: '7px', fontWeight: 700 }}>{team?.avatar}</div>
                      <span style={{ fontSize: '12px' }}>{team?.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '9px 12px' }}>
                    <div className="flex items-center gap-1">
                      <ArrowRight size={10} color="#0052CC" />
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded flex items-center justify-center text-white" style={{ background: depTeam?.color, fontSize: '7px', fontWeight: 700 }}>{depTeam?.avatar}</div>
                        <span style={{ fontSize: '12px' }}>{depTeam?.name}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '9px 12px' }}>
                    <span style={{ color: imp.text, fontWeight: 700, fontSize: '11px' }}>{risk.impact}</span>
                  </td>
                  <td style={{ padding: '9px 12px', color: '#5E6C84' }}>{risk.owner}</td>
                  <td style={{ padding: '9px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#5E6C84' }}>{risk.dueDate}</td>
                  <td style={{ padding: '9px 12px' }}>
                    <span className="rounded px-2 py-0.5 text-xs font-bold" style={{ background: `${s.header}15`, color: s.header }}>{status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
