import { AlertCircle, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';
import { Team } from '../data/mockData';
import { useNavigate } from 'react-router';
import { JiraLozenge, healthToVariant } from './JiraLozenge';

interface SprintCardProps {
  team: Team;
}

export function SprintCard({ team }: SprintCardProps) {
  const navigate = useNavigate();
  const pct = team.sprintProgress;

  return (
    <div
      className="rounded flex flex-col gap-3 cursor-pointer transition-all"
      style={{ background: '#fff', border: '1px solid #DFE1E6', padding: '14px', boxShadow: '0 1px 2px rgba(9,30,66,0.06)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#0052CC')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#DFE1E6')}
      onClick={() => navigate(`/teams/${team.id}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-white" style={{ background: team.color }}>
            {team.avatar}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D' }}>{team.name}</div>
            <div style={{ color: '#5E6C84', fontSize: '11px' }}>{team.sprintName}</div>
          </div>
        </div>
        <JiraLozenge label={team.health} variant={healthToVariant(team.health)} />
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between mb-1.5">
          <span style={{ color: '#5E6C84', fontSize: '11px' }}>Sprint Progress</span>
          <span style={{ fontWeight: 700, fontSize: '12px', color: '#0052CC', fontFamily: 'JetBrains Mono, monospace' }}>{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#DFE1E6' }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: team.color }} />
        </div>
      </div>

      {/* Story points */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Committed', value: team.committed, color: '#172B4D' },
          { label: 'Completed', value: team.completed, color: '#36B37E' },
          { label: 'Remaining', value: team.remaining, color: '#FFAB00' },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center rounded py-2" style={{ background: '#F4F5F7' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '16px', color }}>{value}</div>
            <div style={{ color: '#5E6C84', fontSize: '10px', marginTop: '1px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between pt-1" style={{ borderTop: '1px solid #F4F5F7' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Users size={11} color="#5E6C84" />
            <span style={{ color: '#5E6C84', fontSize: '11px' }}>{team.members}</span>
          </div>
          {team.blockers > 0 && (
            <div className="flex items-center gap-1">
              <AlertCircle size={11} color="#FF5630" />
              <span style={{ color: '#FF5630', fontSize: '11px', fontWeight: 600 }}>{team.blockers} blockers</span>
            </div>
          )}
        </div>
        <button
          className="flex items-center gap-1 transition-colors hover:opacity-80"
          style={{ color: '#0052CC', fontSize: '11px', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={e => { e.stopPropagation(); navigate(`/teams/${team.id}`); }}
        >
          View Details <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}
