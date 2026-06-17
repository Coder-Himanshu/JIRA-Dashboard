import { X, Flag, AlertTriangle, Calendar, User, Link2, CheckCircle } from 'lucide-react';
import type { Milestone } from '../data/mockData';
import { teams, epics } from '../data/mockData';
import { JiraLozenge, healthToVariant } from './JiraLozenge';

interface MilestoneDrawerProps {
  milestone: Milestone | null;
  onClose: () => void;
}

export function MilestoneDrawer({ milestone, onClose }: MilestoneDrawerProps) {
  if (!milestone) return null;

  const linkedTeams = teams.filter(t => milestone.teamIds.includes(t.id));
  const linkedEpics = epics.filter(e => milestone.teamIds.includes(e.teamId));

  return (
    <>
      <div className="fixed inset-0 z-40" style={{ background: 'rgba(9,30,66,0.4)' }} onClick={onClose} />
      <div
        className="fixed right-0 top-0 h-full z-50 flex flex-col overflow-y-auto"
        style={{ width: '500px', background: '#fff', boxShadow: '-4px 0 24px rgba(9,30,66,0.15)', borderLeft: '1px solid #DFE1E6' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #DFE1E6', background: '#FAFBFC' }}>
          <div className="flex items-center gap-2">
            <Flag size={14} color="#0052CC" />
            <span style={{ fontWeight: 700, fontSize: '13px', color: '#172B4D' }}>Milestone</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5E6C84' }}>
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 p-5">
          {/* Title + status */}
          <div className="mb-4">
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#172B4D', lineHeight: 1.4, marginBottom: '10px' }}>{milestone.title}</h2>
            <div className="flex items-center gap-2">
              <JiraLozenge label={milestone.status} variant={healthToVariant(milestone.status)} size="md" />
              <span style={{ fontSize: '12px', color: '#5E6C84' }}>Due: <strong>{milestone.date}</strong></span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-5 p-3 rounded" style={{ background: '#F4F5F7', border: '1px solid #DFE1E6' }}>
            <p style={{ fontSize: '13px', color: '#172B4D', lineHeight: 1.6 }}>{milestone.description}</p>
          </div>

          {/* Details */}
          <div className="rounded mb-5" style={{ border: '1px solid #DFE1E6', overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', background: '#F4F5F7', borderBottom: '1px solid #DFE1E6', fontSize: '11px', fontWeight: 700, color: '#5E6C84', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Details</div>
            {[
              { icon: <Calendar size={13} />, label: 'Target Date', value: milestone.date },
              { icon: <User size={13} />, label: 'Teams', value: linkedTeams.map(t => t.name).join(', ') },
              { icon: <AlertTriangle size={13} />, label: 'Risk Level', value: milestone.status === 'Blocked' ? 'Critical' : milestone.status === 'At Risk' ? 'High' : 'Low' },
              { icon: <Link2 size={13} />, label: 'Dependencies', value: `${linkedEpics.length} linked epics` },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid #F4F5F7' }}>
                <span style={{ color: '#5E6C84', display: 'flex', width: '16px' }}>{icon}</span>
                <span style={{ color: '#5E6C84', fontSize: '13px', minWidth: '110px' }}>{label}</span>
                <span style={{ color: '#172B4D', fontSize: '13px', fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Linked Epics */}
          <div className="mb-5">
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#5E6C84', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>Linked Epics</div>
            <div className="flex flex-col gap-2">
              {linkedEpics.slice(0, 4).map(epic => (
                <div key={epic.id} className="flex items-center gap-3 p-2.5 rounded" style={{ background: '#F4F5F7', border: '1px solid #DFE1E6' }}>
                  <div className="flex-1">
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#172B4D' }}>{epic.title}</div>
                    <div style={{ fontSize: '11px', color: '#5E6C84', marginTop: '2px' }}>{epic.owner} · {epic.progress}% complete</div>
                  </div>
                  <div className="w-16">
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#DFE1E6' }}>
                      <div className="h-full rounded-full" style={{ width: `${epic.progress}%`, background: '#0052CC' }} />
                    </div>
                  </div>
                  <JiraLozenge label={epic.status} variant={healthToVariant(epic.status)} />
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-5">
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#5E6C84', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>Overall Progress</div>
            {(() => {
              const avg = Math.round(linkedEpics.reduce((a, e) => a + e.progress, 0) / (linkedEpics.length || 1));
              return (
                <div>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: '12px', color: '#5E6C84' }}>Completion</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '13px', color: '#0052CC' }}>{avg}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: '#DFE1E6' }}>
                    <div className="h-full rounded-full" style={{ width: `${avg}%`, background: '#0052CC' }} />
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Leadership decision */}
          {(milestone.status === 'At Risk' || milestone.status === 'Blocked') && (
            <div className="p-3 rounded" style={{ background: '#FFEBE6', border: '1px solid #FF8F73' }}>
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} color="#FF5630" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '12px', color: '#BF2600', marginBottom: '3px' }}>Leadership Decision Required</div>
                  <div style={{ fontSize: '12px', color: '#BF2600', lineHeight: 1.5 }}>
                    This milestone is {milestone.status.toLowerCase()}. Review linked dependencies and approve mitigation plan to prevent release slip.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="mt-5">
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#5E6C84', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px' }}>Comments</div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: '#0052CC', fontSize: '8px', fontWeight: 700 }}>SM</div>
              <input
                placeholder="Add a comment..."
                style={{ flex: 1, border: '2px solid #DFE1E6', borderRadius: '3px', padding: '6px 10px', fontSize: '13px', color: '#172B4D', background: '#fff', fontFamily: 'inherit', outline: 'none' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#0052CC')}
                onBlur={e => (e.currentTarget.style.borderColor = '#DFE1E6')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
