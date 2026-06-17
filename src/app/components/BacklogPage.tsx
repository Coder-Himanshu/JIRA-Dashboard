import { useState } from 'react';
import { backlogItems, teams } from '../data/mockData';
import { FilterBar } from './FilterBar';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

const statusColors: Record<string, string> = { 'In Progress': '#0052CC', 'Ready': '#36B37E', 'Blocked': '#FF5630', 'Unrefined': '#FFAB00', 'Done': '#5E6C84' };
const typeColors: Record<string, string> = { 'Story': '#0052CC', 'Bug': '#FF5630', 'Task': '#36B37E', 'Epic': '#6554C0' };
const priorityColors: Record<string, string> = { 'Critical': '#FF5630', 'High': '#FFAB00', 'Medium': '#0052CC', 'Low': '#5E6C84' };

const tooltip = { background: '#fff', border: '1px solid #DFE1E6', borderRadius: '3px', fontSize: '12px', color: '#172B4D' };

export function BacklogPage() {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = backlogItems.filter(b => {
    if (selectedTeam !== 'all' && b.teamId !== selectedTeam) return false;
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (typeFilter !== 'all' && b.type !== typeFilter) return false;
    return true;
  });

  const readyCount = backlogItems.filter(b => b.status === 'Ready').length;
  const unrefinedCount = backlogItems.filter(b => b.status === 'Unrefined').length;
  const blockedCount = backlogItems.filter(b => b.status === 'Blocked').length;
  const agingCount = backlogItems.filter(b => b.age > 14).length;

  const statusDist = Object.entries(statusColors).map(([s, c]) => ({ name: s, value: backlogItems.filter(b => b.status === s).length, color: c }));
  const typeDist = Object.entries(typeColors).map(([t, c]) => ({ name: t, value: backlogItems.filter(b => b.type === t).length, color: c }));
  const teamBacklog = teams.map(t => ({
    name: t.name,
    total: backlogItems.filter(b => b.teamId === t.id).length,
    blocked: backlogItems.filter(b => b.teamId === t.id && b.status === 'Blocked').length,
  }));

  const selectStyle = { border: '2px solid #DFE1E6', background: '#fff', color: '#172B4D', fontSize: '12px', padding: '4px 8px', borderRadius: '3px', outline: 'none', cursor: 'pointer', fontFamily: 'inherit' };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div style={{ color: '#5E6C84', fontSize: '12px', marginBottom: '2px' }}><span style={{ color: '#0052CC' }}>Org Dashboard</span> / Backlog</div>
        <h1 style={{ fontWeight: 700, fontSize: '20px', color: '#172B4D' }}>Backlog Health</h1>
        <p style={{ color: '#5E6C84', fontSize: '13px', marginTop: '2px' }}>Product and sprint backlog quality across all teams</p>
      </div>

      {/* Leadership insights */}
      <div className="rounded p-3 flex flex-wrap gap-3" style={{ background: '#FFFAE6', border: '1px solid #FFE380' }}>
        <span style={{ fontWeight: 700, fontSize: '12px', color: '#7A5900' }}>Leadership Insights:</span>
        <span style={{ fontSize: '12px', color: '#7A5900' }}>Design team has 42% unrefined backlog ·</span>
        <span style={{ fontSize: '12px', color: '#7A5900' }}>Platform has 4 critical items blocked ·</span>
        <span style={{ fontSize: '12px', color: '#7A5900' }}>5 tickets aging &gt;14 days across org</span>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Ready Stories', value: readyCount, color: '#36B37E', bg: '#E3FCEF', icon: <CheckCircle2 size={14} color="#36B37E" /> },
          { label: 'Unrefined', value: unrefinedCount, color: '#FFAB00', bg: '#FFFAE6', icon: <Clock size={14} color="#FFAB00" /> },
          { label: 'Blocked', value: blockedCount, color: '#FF5630', bg: '#FFEBE6', icon: <AlertTriangle size={14} color="#FF5630" /> },
          { label: 'Aging (>14d)', value: agingCount, color: '#6554C0', bg: '#EAE6FF', icon: <Clock size={14} color="#6554C0" /> },
        ].map(({ label, value, color, bg, icon }) => (
          <div key={label} className="rounded p-3 flex items-center gap-3" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
            <div className="w-9 h-9 rounded flex items-center justify-center" style={{ background: bg }}>{icon}</div>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '22px', color }}>{value}</div>
              <div style={{ color: '#5E6C84', fontSize: '11px' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '10px' }}>Status Distribution</div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={statusDist} cx="50%" cy="50%" outerRadius={55} dataKey="value" paddingAngle={2}>
                {statusDist.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '10px' }}>Bugs vs Stories vs Tasks</div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={typeDist} cx="50%" cy="50%" outerRadius={55} dataKey="value" paddingAngle={2}>
                {typeDist.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '10px' }}>Backlog by Team</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={teamBacklog} layout="vertical" barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 9, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: '#5E6C84' }} axisLine={false} tickLine={false} width={52} />
              <Tooltip contentStyle={tooltip} />
              <Bar dataKey="total" fill="#0052CC" radius={[0, 2, 2, 0]} name="Total" />
              <Bar dataKey="blocked" fill="#FF5630" radius={[0, 2, 2, 0]} name="Blocked" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Backlog table */}
      <div className="rounded overflow-hidden" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
        <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid #DFE1E6', background: '#F4F5F7' }}>
          <span style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D' }}>Backlog Items</span>
          <div className="ml-auto flex items-center gap-2">
            <FilterBar selectedTeam={selectedTeam} onTeamChange={setSelectedTeam} />
            <select style={selectStyle} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">All Statuses</option>
              {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select style={selectStyle} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="all">All Types</option>
              {Object.keys(typeColors).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#FAFBFC', borderBottom: '1px solid #DFE1E6' }}>
                {['Title', 'Team', 'Type', 'Priority', 'Status', 'Points', 'Age', 'Assignee'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#5E6C84', fontWeight: 500, fontSize: '11px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const team = teams.find(t => t.id === item.teamId);
                return (
                  <tr
                    key={item.id}
                    style={{ borderBottom: '1px solid #F4F5F7' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F4F5F7')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '9px 12px', fontWeight: 500, color: '#172B4D', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</td>
                    <td style={{ padding: '9px 12px' }}>
                      <span className="rounded px-1.5 py-0.5 text-xs font-semibold" style={{ background: `${team?.color}15`, color: team?.color }}>{team?.avatar}</span>
                    </td>
                    <td style={{ padding: '9px 12px' }}>
                      <span className="rounded px-1.5 py-0.5 text-xs" style={{ background: `${typeColors[item.type]}15`, color: typeColors[item.type], fontWeight: 600 }}>{item.type}</span>
                    </td>
                    <td style={{ padding: '9px 12px', color: priorityColors[item.priority], fontWeight: 700, fontSize: '11px' }}>{item.priority}</td>
                    <td style={{ padding: '9px 12px' }}>
                      <span className="rounded px-2 py-0.5 text-xs font-bold" style={{ background: `${statusColors[item.status]}15`, color: statusColors[item.status] }}>{item.status}</span>
                    </td>
                    <td style={{ padding: '9px 12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>{item.points}</td>
                    <td style={{ padding: '9px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: item.age > 14 ? '#FF5630' : item.age > 7 ? '#FFAB00' : '#5E6C84' }}>
                      {item.age}d {item.age > 14 && '⚠'}
                    </td>
                    <td style={{ padding: '9px 12px', color: '#5E6C84' }}>{item.assignee}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-10" style={{ color: '#5E6C84', fontSize: '13px' }}>No items match filters</div>}
        </div>
      </div>
    </div>
  );
}
