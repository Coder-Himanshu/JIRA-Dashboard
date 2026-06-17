import { X, ExternalLink, AlertCircle, Clock, User, Tag, Link2 } from 'lucide-react';
import type { Issue } from '../data/issueData';
import { JiraLozenge } from './JiraLozenge';

const priorityColors: Record<string, string> = {
  'Highest': '#FF5630', 'High': '#FF5630', 'Medium': '#FFAB00', 'Low': '#0065FF', 'Lowest': '#0065FF',
};

interface IssueDrawerProps {
  issue: Issue | null;
  onClose: () => void;
}

export function IssueDrawer({ issue, onClose }: IssueDrawerProps) {
  if (!issue) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(9,30,66,0.4)' }}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full z-50 flex flex-col overflow-y-auto"
        style={{ width: '480px', background: '#fff', boxShadow: '-4px 0 24px rgba(9,30,66,0.15)', borderLeft: '1px solid #DFE1E6' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #DFE1E6', background: '#FAFBFC' }}>
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '13px', color: '#0052CC' }}>{issue.key}</span>
            <a href="#" style={{ color: '#5E6C84' }}><ExternalLink size={13} /></a>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5E6C84', padding: '4px' }}>
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 p-5">
          {/* Issue type + title */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: `${issue.epicColor}20`, color: issue.epicColor }}>{issue.type}</span>
              <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: `${priorityColors[issue.priority]}15`, color: priorityColors[issue.priority] }}>{issue.priority}</span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#172B4D', lineHeight: 1.4 }}>{issue.title}</h2>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 mb-5">
            <JiraLozenge label={issue.status} variant={issue.status === 'Done' ? 'success' : issue.status === 'In Progress' ? 'inprogress' : issue.status === 'QA' ? 'warning' : 'default'} size="md" />
            <span style={{ color: '#5E6C84', fontSize: '12px' }}>→ Move to</span>
            <select style={{ border: '2px solid #DFE1E6', borderRadius: '3px', fontSize: '12px', padding: '2px 8px', color: '#172B4D', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>
              <option>To Do</option>
              <option>In Progress</option>
              <option>In Review</option>
              <option>QA</option>
              <option>Done</option>
            </select>
          </div>

          {/* Details grid */}
          <div className="rounded" style={{ border: '1px solid #DFE1E6', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ padding: '10px 14px', background: '#F4F5F7', borderBottom: '1px solid #DFE1E6', fontSize: '11px', fontWeight: 700, color: '#5E6C84', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Details</div>
            {[
              { icon: <User size={13} />, label: 'Assignee', value: issue.assignee },
              { icon: <Tag size={13} />, label: 'Epic', value: issue.epic },
              { icon: <AlertCircle size={13} />, label: 'Priority', value: issue.priority },
              { icon: <Clock size={13} />, label: 'Story Points', value: `${issue.points} SP` },
              { icon: <Link2 size={13} />, label: 'Team', value: issue.teamId.toUpperCase() },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid #F4F5F7' }}>
                <span style={{ color: '#5E6C84', display: 'flex', alignItems: 'center', width: '16px' }}>{icon}</span>
                <span style={{ color: '#5E6C84', fontSize: '13px', minWidth: '100px' }}>{label}</span>
                <span style={{ color: '#172B4D', fontSize: '13px', fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-5">
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#5E6C84', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>Description</div>
            <div style={{ color: '#172B4D', fontSize: '13px', lineHeight: 1.6, background: '#F4F5F7', borderRadius: '3px', padding: '12px', border: '1px solid #DFE1E6' }}>
              This issue is part of the {issue.epic} initiative for the {issue.teamId.toUpperCase()} team. Currently {issue.status.toLowerCase()}. Acceptance criteria and technical notes would appear here from Jira.
            </div>
          </div>

          {/* Activity */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#5E6C84', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px' }}>Activity</div>
            {[
              { user: issue.assigneeInitials, action: `moved to ${issue.status}`, time: '2 hours ago' },
              { user: 'SM', action: 'added to sprint', time: '2 days ago' },
              { user: 'PO', action: 'created this issue', time: '4 days ago' },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-2 mb-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: '#0052CC', fontSize: '8px', fontWeight: 700, marginTop: '1px' }}>
                  {act.user}
                </div>
                <div>
                  <span style={{ fontWeight: 500, fontSize: '13px', color: '#172B4D' }}>{act.user}</span>
                  <span style={{ fontSize: '13px', color: '#5E6C84' }}> {act.action}</span>
                  <div style={{ fontSize: '11px', color: '#5E6C84' }}>{act.time}</div>
                </div>
              </div>
            ))}

            {/* Add comment */}
            <div className="flex gap-2 mt-4">
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
