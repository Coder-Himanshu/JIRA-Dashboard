import { useState } from 'react';
import type { Issue } from '../data/issueData';

const priorityIcons: Record<string, { symbol: string; color: string }> = {
  'Highest': { symbol: '⬆⬆', color: '#FF5630' },
  'High': { symbol: '⬆', color: '#FF5630' },
  'Medium': { symbol: '▶', color: '#FFAB00' },
  'Low': { symbol: '⬇', color: '#0065FF' },
  'Lowest': { symbol: '⬇⬇', color: '#0065FF' },
};

const typeIcons: Record<string, { symbol: string; color: string }> = {
  'Story': { symbol: '▣', color: '#36B37E' },
  'Bug': { symbol: '⬟', color: '#FF5630' },
  'Task': { symbol: '✓', color: '#4C9AFF' },
  'Sub-task': { symbol: '◈', color: '#4C9AFF' },
  'Epic': { symbol: '⚡', color: '#6554C0' },
};

interface IssueCardProps {
  issue: Issue;
  onDragStart: (id: string) => void;
  onClick: (issue: Issue) => void;
  isDragging?: boolean;
}

export function IssueCard({ issue, onDragStart, onClick, isDragging }: IssueCardProps) {
  const [hover, setHover] = useState(false);
  const priority = priorityIcons[issue.priority] || priorityIcons['Medium'];
  const typeIcon = typeIcons[issue.type] || typeIcons['Task'];

  return (
    <div
      draggable
      onDragStart={() => onDragStart(issue.id)}
      onClick={() => onClick(issue)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="rounded cursor-pointer transition-all select-none"
      style={{
        background: '#fff',
        border: `2px solid ${hover ? '#0052CC' : '#DFE1E6'}`,
        padding: '10px 12px',
        boxShadow: hover ? '0 2px 8px rgba(0,82,204,0.12)' : '0 1px 2px rgba(0,0,0,0.06)',
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'rotate(2deg) scale(1.02)' : 'none',
        transition: 'border-color 0.12s, box-shadow 0.12s',
      }}
    >
      {/* Epic label */}
      <div className="mb-1.5">
        <span
          className="rounded px-1.5 py-0.5"
          style={{ background: `${issue.epicColor}20`, color: issue.epicColor, fontSize: '10px', fontWeight: 600 }}
        >
          {issue.epic}
        </span>
      </div>

      {/* Title */}
      <div style={{ fontSize: '13px', color: '#172B4D', lineHeight: 1.4, marginBottom: '8px', fontWeight: 400 }}>
        {issue.title}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {/* Type icon */}
          <span style={{ fontSize: '12px', color: typeIcon.color }} title={issue.type}>{typeIcon.symbol}</span>
          {/* Key */}
          <span style={{ fontSize: '11px', color: '#5E6C84', fontFamily: 'JetBrains Mono, monospace' }}>{issue.key}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Points */}
          <span
            className="rounded flex items-center justify-center font-mono"
            style={{ background: '#F4F5F7', color: '#5E6C84', fontSize: '10px', fontWeight: 700, width: '20px', height: '20px' }}
          >
            {issue.points}
          </span>
          {/* Priority */}
          <span style={{ fontSize: '11px', color: priority.color }} title={issue.priority}>{priority.symbol}</span>
          {/* Assignee avatar */}
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-white"
            style={{ background: '#0052CC', fontSize: '8px', fontWeight: 700, flexShrink: 0 }}
            title={issue.assignee}
          >
            {issue.assigneeInitials}
          </div>
        </div>
      </div>
    </div>
  );
}
