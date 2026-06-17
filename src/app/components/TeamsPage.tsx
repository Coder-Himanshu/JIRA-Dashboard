import { teams } from '../data/mockData';
import { SprintCard } from './SprintCard';
import { FilterBar } from './FilterBar';
import { useState } from 'react';

export function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const filtered = selectedTeam === 'all' ? teams : teams.filter(t => t.id === selectedTeam);

  const onTrack = teams.filter(t => t.health === 'On Track').length;
  const atRisk = teams.filter(t => t.health === 'At Risk').length;
  const delayed = teams.filter(t => t.health === 'Delayed').length;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div style={{ color: '#5E6C84', fontSize: '12px', marginBottom: '2px' }}>
          <span style={{ color: '#0052CC' }}>Org Dashboard</span> / Teams
        </div>
        <h1 style={{ fontWeight: 700, fontSize: '20px', color: '#172B4D' }}>Teams</h1>
        <p style={{ color: '#5E6C84', fontSize: '13px', marginTop: '2px' }}>Click a card to drill into sprint details, backlog, and velocity</p>
      </div>

      {/* Health summary */}
      <div className="flex gap-2">
        {[
          { label: 'On Track', count: onTrack, variant: '#E3FCEF', text: '#006644', border: '#79F2C0' },
          { label: 'At Risk', count: atRisk, variant: '#FFFAE6', text: '#7A5900', border: '#FFE380' },
          { label: 'Delayed', count: delayed, variant: '#FFEBE6', text: '#BF2600', border: '#FF8F73' },
        ].map(({ label, count, variant, text, border }) => (
          <div key={label} className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: variant, border: `1px solid ${border}` }}>
            <span style={{ fontWeight: 700, color: text, fontFamily: 'JetBrains Mono, monospace' }}>{count}</span>
            <span style={{ color: text, fontSize: '12px', fontWeight: 600 }}>{label}</span>
          </div>
        ))}
      </div>

      <FilterBar selectedTeam={selectedTeam} onTeamChange={setSelectedTeam} />

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {filtered.map(team => <SprintCard key={team.id} team={team} />)}
      </div>
    </div>
  );
}
