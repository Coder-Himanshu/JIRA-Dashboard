import { useState } from 'react';
import { boardIssues, type Issue, type BoardColumn } from '../data/issueData';
import { teams } from '../data/mockData';
import { IssueCard } from './IssueCard';
import { IssueDrawer } from './IssueDrawer';
import { JiraLozenge, healthToVariant } from './JiraLozenge';

const COLUMNS: BoardColumn[] = ['To Do', 'In Progress', 'In Review', 'QA', 'Done'];

const columnConfig: Record<BoardColumn, { color: string; bg: string }> = {
  'To Do': { color: '#5E6C84', bg: '#F4F5F7' },
  'In Progress': { color: '#0052CC', bg: '#DEEBFF' },
  'In Review': { color: '#6554C0', bg: '#EAE6FF' },
  'QA': { color: '#FFAB00', bg: '#FFFAE6' },
  'Done': { color: '#36B37E', bg: '#E3FCEF' },
};

export function ActiveSprintsPage() {
  const [selectedTeam, setSelectedTeam] = useState('vb');
  const [issueStatuses, setIssueStatuses] = useState<Record<string, BoardColumn>>(
    Object.fromEntries(boardIssues.map(i => [i.id, i.status]))
  );
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<BoardColumn | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const team = teams.find(t => t.id === selectedTeam) || teams[0];
  const teamIssues = boardIssues.filter(i => i.teamId === selectedTeam);

  const handleDrop = (col: BoardColumn) => {
    if (draggingId) {
      setIssueStatuses(prev => ({ ...prev, [draggingId]: col }));
    }
    setDraggingId(null);
    setDragOverCol(null);
  };

  const getColIssues = (col: BoardColumn) =>
    teamIssues.filter(i => issueStatuses[i.id] === col);

  const totalPts = teamIssues.reduce((a, i) => a + i.points, 0);
  const donePts = teamIssues.filter(i => issueStatuses[i.id] === 'Done').reduce((a, i) => a + i.points, 0);

  const selectStyle = {
    border: '2px solid #DFE1E6',
    background: '#fff',
    color: '#172B4D',
    fontSize: '13px',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    outline: 'none',
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontWeight: 700, fontSize: '20px', color: '#172B4D' }}>Active Sprints</h1>
          <p style={{ color: '#5E6C84', fontSize: '13px', marginTop: '2px' }}>Jira-style sprint board — drag issues between columns</p>
        </div>
      </div>

      {/* Team tabs */}
      <div className="flex items-center gap-1 p-1 rounded" style={{ background: '#F4F5F7', border: '1px solid #DFE1E6', alignSelf: 'flex-start' }}>
        {teams.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTeam(t.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded transition-all"
            style={{
              background: selectedTeam === t.id ? '#fff' : 'transparent',
              boxShadow: selectedTeam === t.id ? '0 1px 3px rgba(9,30,66,0.1)' : 'none',
              border: 'none',
              cursor: 'pointer',
              color: selectedTeam === t.id ? '#172B4D' : '#5E6C84',
              fontSize: '13px',
              fontWeight: selectedTeam === t.id ? 500 : 400,
              fontFamily: 'inherit',
            }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
            {t.name}
          </button>
        ))}
      </div>

      {/* Sprint info bar */}
      <div className="flex items-center gap-4 px-4 py-2.5 rounded" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center text-white font-bold" style={{ background: team.color, fontSize: '9px' }}>{team.avatar}</div>
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#172B4D' }}>{team.sprintName}</span>
        </div>
        <span style={{ color: '#DFE1E6' }}>|</span>
        <span style={{ color: '#5E6C84', fontSize: '12px' }}>{team.sprintStart} → {team.sprintEnd}</span>
        <span style={{ color: '#DFE1E6' }}>|</span>
        <JiraLozenge label={team.health} variant={healthToVariant(team.health)} />
        <span style={{ color: '#DFE1E6' }}>|</span>
        <span style={{ color: '#5E6C84', fontSize: '12px' }}>
          <strong style={{ color: '#36B37E', fontFamily: 'JetBrains Mono, monospace' }}>{donePts}</strong>
          <span style={{ margin: '0 3px', color: '#5E6C84' }}>/</span>
          <strong style={{ color: '#172B4D', fontFamily: 'JetBrains Mono, monospace' }}>{totalPts}</strong>
          <span style={{ marginLeft: '4px' }}>SP completed</span>
        </span>
        <div className="flex-1 h-1.5 rounded-full overflow-hidden ml-2" style={{ background: '#DFE1E6' }}>
          <div className="h-full rounded-full" style={{ width: `${Math.round(donePts / totalPts * 100)}%`, background: '#36B37E' }} />
        </div>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '12px', color: '#0052CC' }}>{Math.round(donePts / totalPts * 100)}%</span>
      </div>

      {/* Board */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {COLUMNS.map(col => {
          const cfg = columnConfig[col];
          const colIssues = getColIssues(col);
          const colPts = colIssues.reduce((a, i) => a + i.points, 0);
          const isDragOver = dragOverCol === col;

          return (
            <div
              key={col}
              className="flex flex-col rounded shrink-0"
              style={{ width: '220px', minWidth: '220px' }}
              onDragOver={e => { e.preventDefault(); setDragOverCol(col); }}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={() => handleDrop(col)}
            >
              {/* Column header */}
              <div
                className="flex items-center justify-between px-3 py-2 rounded-t"
                style={{ background: isDragOver ? cfg.bg : '#F4F5F7', borderBottom: `2px solid ${cfg.color}`, border: `1px solid #DFE1E6`, borderBottomColor: cfg.color }}
              >
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '12px', fontWeight: 700, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{col}</span>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold" style={{ background: cfg.color, color: '#fff', fontSize: '10px' }}>{colIssues.length}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#5E6C84', fontFamily: 'JetBrains Mono, monospace' }}>{colPts} SP</span>
              </div>

              {/* Issues */}
              <div
                className="flex-1 flex flex-col gap-2 p-2 rounded-b overflow-y-auto"
                style={{
                  background: isDragOver ? `${cfg.bg}80` : '#F4F5F7',
                  border: `1px solid #DFE1E6`,
                  borderTop: 'none',
                  minHeight: '400px',
                  maxHeight: '60vh',
                  transition: 'background 0.1s',
                  outline: isDragOver ? `2px dashed ${cfg.color}` : 'none',
                  outlineOffset: '-2px',
                }}
              >
                {colIssues.map(issue => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onDragStart={setDraggingId}
                    onClick={setSelectedIssue}
                    isDragging={draggingId === issue.id}
                  />
                ))}
                {colIssues.length === 0 && (
                  <div className="flex-1 flex items-center justify-center rounded" style={{ border: `2px dashed ${cfg.color}40`, minHeight: '80px' }}>
                    <span style={{ fontSize: '12px', color: '#B3BAC5' }}>Drop here</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Issue drawer */}
      <IssueDrawer issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
    </div>
  );
}
