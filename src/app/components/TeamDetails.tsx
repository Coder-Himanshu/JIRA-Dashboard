import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, TrendingUp, Clock } from 'lucide-react';
import { teams, sprintHistory, burndownData, backlogItems, epics } from '../data/mockData';
import { JiraLozenge, healthToVariant } from './JiraLozenge';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const statusColors: Record<string, string> = { 'In Progress': '#0052CC', 'Ready': '#36B37E', 'Blocked': '#FF5630', 'Unrefined': '#FFAB00', 'Done': '#5E6C84' };
const priorityColors: Record<string, string> = { 'Critical': '#FF5630', 'High': '#FFAB00', 'Medium': '#0052CC', 'Low': '#5E6C84' };
const epicStatusColors: Record<string, string> = { 'In Progress': '#0052CC', 'Planned': '#5E6C84', 'At Risk': '#FFAB00', 'Blocked': '#FF5630', 'Completed': '#36B37E' };

const tooltip = { background: '#fff', border: '1px solid #DFE1E6', borderRadius: '3px', fontSize: '12px', color: '#172B4D' };

export function TeamDetails() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const team = teams.find(t => t.id === teamId) || teams[0];

  const teamSprints = sprintHistory.filter(s => s.teamId === team.id).slice(-5);
  const velocityData = teamSprints.map(s => ({
    sprint: s.name.split(' ').slice(-2).join(' '),
    committed: s.committed,
    completed: s.completed,
  }));

  const teamBacklog = backlogItems.filter(b => b.teamId === team.id);
  const teamEpics = epics.filter(e => e.teamId === team.id);

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb + back */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 mb-2 transition-opacity hover:opacity-70"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5E6C84', fontSize: '12px' }}
        >
          <ArrowLeft size={13} /> Back
        </button>
        <div style={{ color: '#5E6C84', fontSize: '12px', marginBottom: '4px' }}>
          <span style={{ color: '#0052CC', cursor: 'pointer' }} onClick={() => navigate('/')}>Org Dashboard</span> / <span style={{ color: '#0052CC', cursor: 'pointer' }} onClick={() => navigate('/teams')}>Teams</span> / {team.name}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded flex items-center justify-center text-white font-bold" style={{ background: team.color, fontSize: '13px' }}>{team.avatar}</div>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: '20px', color: '#172B4D' }}>{team.name}</h1>
            <p style={{ color: '#5E6C84', fontSize: '12px' }}>{team.sprintName} · {team.members} members · {team.sprintStart} → {team.sprintEnd}</p>
          </div>
          <JiraLozenge label={team.health} variant={healthToVariant(team.health)} size="md" />
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Committed', value: team.committed, color: '#172B4D', icon: <TrendingUp size={13} color="#0052CC" />, bg: '#DEEBFF' },
          { label: 'Completed', value: team.completed, color: '#36B37E', icon: <TrendingUp size={13} color="#36B37E" />, bg: '#E3FCEF' },
          { label: 'Remaining', value: team.remaining, color: '#FFAB00', icon: <Clock size={13} color="#FFAB00" />, bg: '#FFFAE6' },
          { label: 'Velocity', value: team.velocity, color: '#172B4D', icon: <TrendingUp size={13} color="#6554C0" />, bg: '#EAE6FF' },
        ].map(({ label, value, color, icon, bg }) => (
          <div key={label} className="rounded p-3 flex items-center gap-3" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: bg }}>{icon}</div>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '22px', color }}>{value}</div>
              <div style={{ color: '#5E6C84', fontSize: '11px' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sprint progress */}
      <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D' }}>Sprint Progress — {team.sprintName}</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '13px', color: '#0052CC' }}>{team.sprintProgress}%</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#DFE1E6' }}>
          <div className="h-full rounded-full" style={{ width: `${team.sprintProgress}%`, background: team.color }} />
        </div>
        <div className="flex justify-between mt-1.5" style={{ fontSize: '11px', color: '#5E6C84' }}>
          <span>Start: {team.sprintStart}</span>
          <span>End: {team.sprintEnd}</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '12px' }}>Velocity — Last 5 Sprints</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={velocityData} barSize={14} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="sprint" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="committed" fill="#DEEBFF" name="Committed" radius={[2, 2, 0, 0]} />
              <Bar dataKey="completed" fill={team.color} name="Completed" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '12px' }}>Burndown — {team.sprintName}</div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={burndownData}>
              <defs>
                <linearGradient id={`td${team.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={team.color} stopOpacity={0.1} />
                  <stop offset="95%" stopColor={team.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="ideal" stroke="#B3BAC5" strokeDasharray="5 3" fill="none" name="Ideal" dot={false} />
              <Area type="monotone" dataKey="actual" stroke={team.color} strokeWidth={2} fill={`url(#td${team.id})`} name="Actual" dot={{ r: 3 }} connectNulls={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Epics */}
      <div className="rounded overflow-hidden" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
        <div style={{ padding: '10px 14px', background: '#F4F5F7', borderBottom: '1px solid #DFE1E6', fontWeight: 600, fontSize: '13px', color: '#172B4D' }}>Epics</div>
        <div className="flex flex-col">
          {teamEpics.map((epic, i) => (
            <div key={epic.id} className="flex items-center gap-4 px-4 py-3 transition-colors" style={{ borderBottom: i < teamEpics.length - 1 ? '1px solid #F4F5F7' : 'none' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F4F5F7')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div className="flex-1 min-w-0">
                <div style={{ fontWeight: 500, fontSize: '13px', color: '#172B4D' }}>{epic.title}</div>
                <div style={{ color: '#5E6C84', fontSize: '11px', marginTop: '2px' }}>{epic.owner} · {epic.startDate} → {epic.endDate}</div>
              </div>
              <div className="w-28">
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: '10px', color: '#5E6C84' }}>Progress</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: '#0052CC' }}>{epic.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#DFE1E6' }}>
                  <div className="h-full rounded-full" style={{ width: `${epic.progress}%`, background: epicStatusColors[epic.status] || '#0052CC' }} />
                </div>
              </div>
              <JiraLozenge label={epic.status} variant={
                epic.status === 'Completed' ? 'success' : epic.status === 'In Progress' ? 'inprogress' : epic.status === 'At Risk' ? 'warning' : epic.status === 'Blocked' ? 'danger' : 'default'
              } />
              <span style={{ color: priorityColors[epic.priority], fontWeight: 700, fontSize: '11px', minWidth: '50px' }}>{epic.priority}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sprint backlog table */}
      <div className="rounded overflow-hidden" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
        <div style={{ padding: '10px 14px', background: '#F4F5F7', borderBottom: '1px solid #DFE1E6', fontWeight: 600, fontSize: '13px', color: '#172B4D' }}>Sprint Backlog</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#FAFBFC', borderBottom: '1px solid #DFE1E6' }}>
                {['Key', 'Title', 'Type', 'Priority', 'Status', 'SP', 'Age', 'Assignee'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '7px 12px', color: '#5E6C84', fontWeight: 500, fontSize: '11px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teamBacklog.map((item, i) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: '1px solid #F4F5F7' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F4F5F7')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#0052CC' }}>{team.avatar.toUpperCase()}-{1000 + i}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 500, color: '#172B4D', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</td>
                  <td style={{ padding: '8px 12px' }}><span className="rounded px-1.5 py-0.5 text-xs" style={{ background: '#F4F5F7', color: '#5E6C84' }}>{item.type}</span></td>
                  <td style={{ padding: '8px 12px', color: priorityColors[item.priority], fontWeight: 700, fontSize: '11px' }}>{item.priority}</td>
                  <td style={{ padding: '8px 12px' }}><span className="rounded px-2 py-0.5 text-xs font-bold" style={{ background: `${statusColors[item.status]}15`, color: statusColors[item.status] }}>{item.status}</span></td>
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>{item.points}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: item.age > 14 ? '#FF5630' : '#5E6C84' }}>{item.age}d</td>
                  <td style={{ padding: '8px 12px', color: '#5E6C84' }}>{item.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
