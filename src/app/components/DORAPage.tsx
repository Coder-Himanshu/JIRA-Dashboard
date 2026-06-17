import { doraData, teams } from '../data/mockData';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Zap, Clock, ShieldX, Activity } from 'lucide-react';

const tooltip = { background: '#fff', border: '1px solid #DFE1E6', borderRadius: '3px', fontSize: '12px', color: '#172B4D' };

const kpiCards = [
  { title: 'Deployment Frequency', value: '5.2', unit: '/day', prev: '4.5', dir: 'up', color: '#0052CC', bg: '#DEEBFF', icon: <Zap size={14} color="#0052CC" />, rating: 'Elite', ratingBg: '#E3FCEF', ratingColor: '#006644', desc: 'Deployments per day, avg across all teams' },
  { title: 'Lead Time for Changes', value: '1.4', unit: 'days', prev: '1.6', dir: 'down', color: '#6554C0', bg: '#EAE6FF', icon: <Clock size={14} color="#6554C0" />, rating: 'Elite', ratingBg: '#E3FCEF', ratingColor: '#006644', desc: 'Time from commit to production deploy' },
  { title: 'Change Failure Rate', value: '2.5', unit: '%', prev: '3.2', dir: 'down', color: '#FFAB00', bg: '#FFFAE6', icon: <ShieldX size={14} color="#FFAB00" />, rating: 'High', ratingBg: '#E3FCEF', ratingColor: '#006644', desc: 'Deployments causing production incidents' },
  { title: 'Mean Time to Recovery', value: '0.8', unit: 'h', prev: '1.1', dir: 'down', color: '#36B37E', bg: '#E3FCEF', icon: <Activity size={14} color="#36B37E" />, rating: 'Elite', ratingBg: '#E3FCEF', ratingColor: '#006644', desc: 'Time to restore service after incident' },
];

const incidentData = [
  { week: 'May W1', incidents: 4, resolved: 3, p1: 1 },
  { week: 'May W2', incidents: 3, resolved: 3, p1: 0 },
  { week: 'May W3', incidents: 5, resolved: 4, p1: 1 },
  { week: 'May W4', incidents: 2, resolved: 2, p1: 0 },
  { week: 'Jun W1', incidents: 3, resolved: 3, p1: 1 },
  { week: 'Jun W2', incidents: 1, resolved: 1, p1: 0 },
];

const releaseData = [
  { team: 'VB', success: 94, failure: 6 },
  { team: 'INFI', success: 88, failure: 12 },
  { team: 'Design', success: 97, failure: 3 },
  { team: 'Platform', success: 85, failure: 15 },
  { team: 'QA', success: 96, failure: 4 },
];

export function DORAPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div style={{ color: '#5E6C84', fontSize: '12px', marginBottom: '2px' }}><span style={{ color: '#0052CC' }}>Org Dashboard</span> / DORA Metrics</div>
        <h1 style={{ fontWeight: 700, fontSize: '20px', color: '#172B4D' }}>DORA Metrics</h1>
        <p style={{ color: '#5E6C84', fontSize: '13px', marginTop: '2px' }}>Engineering delivery performance — Jun 16, 2026</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-3">
        {kpiCards.map(card => (
          <div key={card.title} className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6', boxShadow: '0 1px 2px rgba(9,30,66,0.06)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: card.bg }}>{card.icon}</div>
              <span className="rounded px-2 py-0.5 text-xs font-bold" style={{ background: card.ratingBg, color: card.ratingColor }}>{card.rating}</span>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '28px', color: card.color, lineHeight: 1 }}>
              {card.value}<span style={{ fontSize: '14px', fontWeight: 400, color: '#5E6C84', marginLeft: '2px' }}>{card.unit}</span>
            </div>
            <div style={{ color: '#5E6C84', fontSize: '11px', marginTop: '4px', marginBottom: '6px' }}>{card.title}</div>
            <div style={{ color: '#5E6C84', fontSize: '11px' }}>
              <span style={{ color: '#36B37E', fontWeight: 600 }}>{card.dir === 'down' ? '↓' : '↑'} {card.prev}</span> prev period · improved
            </div>
            <div style={{ color: '#5E6C84', fontSize: '10px', marginTop: '4px' }}>{card.desc}</div>
          </div>
        ))}
      </div>

      {/* Trend charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '2px' }}>Deployment Frequency & Lead Time</div>
          <div style={{ color: '#5E6C84', fontSize: '11px', marginBottom: '12px' }}>6-week trend</div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={doraData}>
              <defs>
                <linearGradient id="df2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0052CC" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#0052CC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="deploymentFrequency" stroke="#0052CC" strokeWidth={2} fill="url(#df2)" name="Deploy Freq (/d)" dot={{ r: 3 }} />
              <Area type="monotone" dataKey="leadTime" stroke="#6554C0" strokeWidth={2} fill="none" name="Lead Time (d)" dot={{ r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '2px' }}>Change Failure Rate & MTTR</div>
          <div style={{ color: '#5E6C84', fontSize: '11px', marginBottom: '12px' }}>6-week trend</div>
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={doraData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="changeFailureRate" stroke="#FFAB00" strokeWidth={2} dot={{ r: 3 }} name="Failure Rate (%)" />
              <Line type="monotone" dataKey="mttr" stroke="#36B37E" strokeWidth={2} dot={{ r: 3 }} name="MTTR (h)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '12px' }}>Incident Trend</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={incidentData} barSize={14} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="incidents" fill="#FFEBE6" name="Total" radius={[2, 2, 0, 0]} />
              <Bar dataKey="resolved" fill="#E3FCEF" name="Resolved" radius={[2, 2, 0, 0]} />
              <Bar dataKey="p1" fill="#FF5630" name="P1" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '12px' }}>Release Success Rate by Team</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={releaseData} layout="vertical" barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} unit="%" />
              <YAxis type="category" dataKey="team" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} width={55} />
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="success" fill="#36B37E" name="Success %" radius={[0, 2, 2, 0]} stackId="a" />
              <Bar dataKey="failure" fill="#FFEBE6" name="Failure %" radius={[0, 2, 2, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DORA level reference */}
      <div className="rounded overflow-hidden" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
        <div style={{ padding: '10px 14px', background: '#F4F5F7', borderBottom: '1px solid #DFE1E6', fontWeight: 600, fontSize: '13px', color: '#172B4D' }}>DORA Performance Levels</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ background: '#FAFBFC', borderBottom: '1px solid #DFE1E6' }}>
              {['Metric', 'Elite', 'High', 'Medium', 'Low', 'Current', 'Level'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 14px', color: '#5E6C84', fontWeight: 500, fontSize: '11px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { metric: 'Deploy Frequency', elite: 'Multiple/day', high: 'Once/day-week', medium: 'Monthly', low: '<6 months', current: '5.2/day', level: 'Elite', levelColor: '#006644', levelBg: '#E3FCEF' },
              { metric: 'Lead Time', elite: '<1 hour', high: '1d–1 week', medium: '1 week–1 mo', low: '>6 months', current: '1.4 days', level: 'High', levelColor: '#006644', levelBg: '#E3FCEF' },
              { metric: 'Change Failure Rate', elite: '0–15%', high: '0–15%', medium: '0–15%', low: '46–60%', current: '2.5%', level: 'Elite', levelColor: '#006644', levelBg: '#E3FCEF' },
              { metric: 'MTTR', elite: '<1 hour', high: '<1 day', medium: '1d–1 week', low: '>6 months', current: '0.8 h', level: 'Elite', levelColor: '#006644', levelBg: '#E3FCEF' },
            ].map(row => (
              <tr key={row.metric} style={{ borderBottom: '1px solid #F4F5F7' }}>
                <td style={{ padding: '9px 14px', fontWeight: 500, color: '#172B4D' }}>{row.metric}</td>
                <td style={{ padding: '9px 14px', color: '#006644' }}>{row.elite}</td>
                <td style={{ padding: '9px 14px', color: '#00B8D9' }}>{row.high}</td>
                <td style={{ padding: '9px 14px', color: '#FFAB00' }}>{row.medium}</td>
                <td style={{ padding: '9px 14px', color: '#FF5630' }}>{row.low}</td>
                <td style={{ padding: '9px 14px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#172B4D' }}>{row.current}</td>
                <td style={{ padding: '9px 14px' }}>
                  <span className="rounded px-2 py-0.5 text-xs font-bold" style={{ background: row.levelBg, color: row.levelColor }}>{row.level}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
