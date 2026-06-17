import { teams } from '../data/mockData';

interface FilterBarProps {
  selectedTeam: string;
  onTeamChange: (v: string) => void;
  title?: string;
}

const selectStyle = {
  border: '2px solid #DFE1E6',
  background: '#fff',
  color: '#172B4D',
  fontSize: '12px',
  padding: '4px 8px',
  borderRadius: '3px',
  outline: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

export function FilterBar({ selectedTeam, onTeamChange, title }: FilterBarProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      {title && <h2 style={{ fontWeight: 600, fontSize: '14px', color: '#172B4D' }}>{title}</h2>}
      <div className="flex items-center gap-2 ml-auto">
        <select style={selectStyle} value={selectedTeam} onChange={e => onTeamChange(e.target.value)}>
          <option value="all">All Teams</option>
          {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
    </div>
  );
}
