import { useState } from 'react';
import { teams, sprintHistory, burndownData } from '../data/mockData';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from 'recharts';

type Tab = 'Overview' | 'Burndown' | 'Burnup' | 'Velocity' | 'Flow' | 'Predictability';
const TABS: Tab[] = ['Overview', 'Burndown', 'Burnup', 'Velocity', 'Flow', 'Predictability'];

const velocityData = [
  { sprint: 'S12', VB: 74, INFI: 62, Design: 50, Platform: 95, QA: 38 },
  { sprint: 'S13', VB: 79, INFI: 70, Design: 53, Platform: 88, QA: 39 },
  { sprint: 'S14', VB: 71, INFI: 65, Design: 48, Platform: 79, QA: 40 },
  { sprint: 'S15', VB: 80, INFI: 58, Design: 55, Platform: 89, QA: 38 },
  { sprint: 'S16', VB: 78, INFI: 63, Design: 52, Platform: 85, QA: 39 },
  { sprint: 'Current', VB: 61, INFI: 43, Design: 49, Platform: 38, QA: 26 },
];

const burnupData = [
  { sprint: 'S12', target: 390, actual: 319 },
  { sprint: 'S13', target: 400, actual: 402 },
  { sprint: 'S14', target: 408, actual: 383 },
  { sprint: 'S15', target: 415, actual: 410 },
  { sprint: 'S16', target: 420, actual: 413 },
  { sprint: 'Current', target: 430, actual: 217 },
];

const cfdData = [
  { date: 'Jun 9', done: 40, qa: 15, review: 20, inProgress: 25, todo: 100 },
  { date: 'Jun 10', done: 55, qa: 18, review: 22, inProgress: 30, todo: 90 },
  { date: 'Jun 11', done: 70, qa: 20, review: 18, inProgress: 28, todo: 80 },
  { date: 'Jun 12', done: 90, qa: 22, review: 20, inProgress: 25, todo: 65 },
  { date: 'Jun 13', done: 110, qa: 25, review: 18, inProgress: 22, todo: 50 },
  { date: 'Jun 16', done: 130, qa: 20, review: 15, inProgress: 20, todo: 45 },
];

const predictabilityData = [
  { sprint: 'S12', committed: 80, completed: 74, predictability: 92 },
  { sprint: 'S13', committed: 82, completed: 79, predictability: 96 },
  { sprint: 'S14', committed: 85, completed: 71, predictability: 84 },
  { sprint: 'S15', committed: 82, completed: 80, predictability: 98 },
  { sprint: 'S16', committed: 84, completed: 78, predictability: 93 },
];

const createdVsResolvedData = [
  { week: 'May W1', created: 28, resolved: 22 },
  { week: 'May W2', created: 22, resolved: 30 },
  { week: 'May W3', created: 35, resolved: 28 },
  { week: 'May W4', created: 18, resolved: 25 },
  { week: 'Jun W1', created: 25, resolved: 32 },
  { week: 'Jun W2', created: 20, resolved: 28 },
];

const TEAM_COLORS: Record<string, string> = {
  VB: '#0052CC', INFI: '#6554C0', Design: '#00B8D9', Platform: '#36B37E', QA: '#FFAB00',
};

const tooltipStyle = { background: '#fff', border: '1px solid #DFE1E6', borderRadius: '3px', fontSize: '12px', color: '#172B4D' };

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [selectedTeam, setSelectedTeam] = useState('all');

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div>
        <h1 style={{ fontWeight: 700, fontSize: '20px', color: '#172B4D' }}>Reports</h1>
        <p style={{ color: '#5E6C84', fontSize: '13px', marginTop: '2px' }}>Sprint analytics, velocity, burndown, and delivery flow</p>
      </div>

      {/* Jira-style tab bar */}
      <div style={{ borderBottom: '2px solid #DFE1E6' }}>
        <div className="flex">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? '#0052CC' : '#5E6C84',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #0052CC' : '2px solid transparent',
                marginBottom: '-2px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'color 0.12s',
              }}
            >
              {tab}
            </button>
          ))}

          {/* Team filter */}
          <div className="ml-auto flex items-end pb-2">
            <select
              style={{ border: '2px solid #DFE1E6', background: '#fff', color: '#172B4D', fontSize: '12px', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer', fontFamily: 'inherit', outline: 'none' }}
              value={selectedTeam}
              onChange={e => setSelectedTeam(e.target.value)}
            >
              <option value="all">All Teams</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-2 gap-4">
          <ChartCard title="Velocity by Team (Last 6 Sprints)" subtitle="Story points completed per sprint">
            <BarChart data={velocityData} barSize={7} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="sprint" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              {Object.entries(TEAM_COLORS).map(([name, color]) => (
                <Bar key={name} dataKey={name} fill={color} radius={[2, 2, 0, 0]} />
              ))}
            </BarChart>
          </ChartCard>

          <ChartCard title="Org Burndown — VB Sprint 17" subtitle="Remaining story points over sprint">
            <AreaChart data={burndownData}>
              <defs>
                <linearGradient id="bd2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0052CC" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0052CC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="ideal" stroke="#B3BAC5" strokeDasharray="5 3" fill="none" name="Ideal" dot={false} />
              <Area type="monotone" dataKey="actual" stroke="#0052CC" strokeWidth={2} fill="url(#bd2)" name="Actual" dot={{ r: 3 }} connectNulls={false} />
            </AreaChart>
          </ChartCard>

          <ChartCard title="Created vs Resolved Issues" subtitle="Weekly issue creation and resolution rates">
            <BarChart data={createdVsResolvedData} barSize={14} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="created" fill="#FF5630" name="Created" radius={[2, 2, 0, 0]} />
              <Bar dataKey="resolved" fill="#36B37E" name="Resolved" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartCard>

          <ChartCard title="Sprint Predictability" subtitle="% of committed SP actually delivered">
            <ComposedChart data={predictabilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="sprint" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[60, 100]} tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="committed" fill="#DEEBFF" name="Committed SP" radius={[2, 2, 0, 0]} barSize={16} />
              <Bar yAxisId="left" dataKey="completed" fill="#0052CC" name="Completed SP" radius={[2, 2, 0, 0]} barSize={16} />
              <Line yAxisId="right" type="monotone" dataKey="predictability" stroke="#FFAB00" strokeWidth={2} dot={{ r: 4 }} name="Predictability %" />
              <ReferenceLine yAxisId="right" y={90} stroke="#36B37E" strokeDasharray="4 2" label={{ value: '90% target', fontSize: 9, fill: '#36B37E' }} />
            </ComposedChart>
          </ChartCard>
        </div>
      )}

      {activeTab === 'Burndown' && (
        <ChartCard title="Sprint Burndown Chart" subtitle="Remaining story points day by day" height={380}>
          <AreaChart data={burndownData}>
            <defs>
              <linearGradient id="bdFull" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0052CC" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#0052CC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#5E6C84' }} axisLine={false} tickLine={false} label={{ value: 'Story Points', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#5E6C84', dx: -5 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="ideal" stroke="#B3BAC5" strokeDasharray="6 3" fill="none" name="Ideal Burndown" dot={false} strokeWidth={1.5} />
            <Area type="monotone" dataKey="actual" stroke="#0052CC" strokeWidth={2.5} fill="url(#bdFull)" name="Actual Remaining" dot={{ r: 4, fill: '#0052CC' }} connectNulls={false} />
          </AreaChart>
        </ChartCard>
      )}

      {activeTab === 'Burnup' && (
        <ChartCard title="Sprint Burnup Chart" subtitle="Cumulative story points completed vs target" height={380}>
          <AreaChart data={burnupData}>
            <defs>
              <linearGradient id="buGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#36B37E" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#36B37E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
            <XAxis dataKey="sprint" tick={{ fontSize: 11, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="target" stroke="#DFE1E6" strokeDasharray="5 3" fill="none" name="Target Scope" dot={false} strokeWidth={2} />
            <Area type="monotone" dataKey="actual" stroke="#36B37E" strokeWidth={2.5} fill="url(#buGrad)" name="Completed Work" dot={{ r: 4, fill: '#36B37E' }} />
          </AreaChart>
        </ChartCard>
      )}

      {activeTab === 'Velocity' && (
        <div className="flex flex-col gap-4">
          <ChartCard title="Team Velocity — Last 6 Sprints" subtitle="Story points completed per sprint cadence" height={340}>
            <BarChart data={velocityData} barSize={10} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="sprint" tick={{ fontSize: 11, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              {Object.entries(TEAM_COLORS).map(([name, color]) => (
                <Bar key={name} dataKey={name} fill={color} radius={[2, 2, 0, 0]} />
              ))}
            </BarChart>
          </ChartCard>

          {/* Velocity summary table */}
          <div className="rounded" style={{ background: '#fff', border: '1px solid #DFE1E6', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: '#F4F5F7', borderBottom: '1px solid #DFE1E6', fontWeight: 600, fontSize: '13px', color: '#172B4D' }}>Velocity Summary</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #DFE1E6', background: '#FAFBFC' }}>
                  {['Team', 'Avg Velocity', 'Last Sprint', 'Trend', 'Predictability'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 14px', color: '#5E6C84', fontWeight: 500, fontSize: '12px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teams.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #F4F5F7' }}>
                    <td style={{ padding: '9px 14px' }}>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded flex items-center justify-center text-white" style={{ background: t.color, fontSize: '8px', fontWeight: 700 }}>{t.avatar}</div>
                        <span style={{ fontWeight: 500, color: '#172B4D' }}>{t.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '9px 14px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>{t.velocity}</td>
                    <td style={{ padding: '9px 14px', fontFamily: 'JetBrains Mono, monospace' }}>{t.completed}</td>
                    <td style={{ padding: '9px 14px', color: t.completed >= t.velocity ? '#36B37E' : '#FF5630', fontSize: '12px', fontWeight: 600 }}>
                      {t.completed >= t.velocity ? '↑ Improving' : '↓ Below avg'}
                    </td>
                    <td style={{ padding: '9px 14px' }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#0052CC', fontWeight: 600 }}>
                        {Math.round(t.completed / t.committed * 100)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Flow' && (
        <ChartCard title="Cumulative Flow Diagram" subtitle="Issue counts per status over sprint duration" height={380}>
          <AreaChart data={cfdData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="todo" stackId="a" stroke="#B3BAC5" fill="#F4F5F7" name="To Do" />
            <Area type="monotone" dataKey="inProgress" stackId="a" stroke="#0052CC" fill="#DEEBFF" name="In Progress" />
            <Area type="monotone" dataKey="review" stackId="a" stroke="#6554C0" fill="#EAE6FF" name="In Review" />
            <Area type="monotone" dataKey="qa" stackId="a" stroke="#FFAB00" fill="#FFFAE6" name="QA" />
            <Area type="monotone" dataKey="done" stackId="a" stroke="#36B37E" fill="#E3FCEF" name="Done" />
          </AreaChart>
        </ChartCard>
      )}

      {activeTab === 'Predictability' && (
        <div className="flex flex-col gap-4">
          <ChartCard title="Sprint Predictability — VB Team" subtitle="Committed SP vs Completed SP with predictability %" height={340}>
            <ComposedChart data={predictabilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="sprint" tick={{ fontSize: 11, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[60, 100]} tick={{ fontSize: 11, fill: '#5E6C84' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar yAxisId="left" dataKey="committed" fill="#DEEBFF" name="Committed SP" radius={[2, 2, 0, 0]} barSize={20} />
              <Bar yAxisId="left" dataKey="completed" fill="#0052CC" name="Completed SP" radius={[2, 2, 0, 0]} barSize={20} />
              <Line yAxisId="right" type="monotone" dataKey="predictability" stroke="#FFAB00" strokeWidth={2.5} dot={{ r: 5, fill: '#FFAB00' }} name="Predictability %" />
              <ReferenceLine yAxisId="right" y={90} stroke="#36B37E" strokeDasharray="4 2" />
            </ComposedChart>
          </ChartCard>

          <div className="grid grid-cols-3 gap-3">
            {teams.map(t => {
              const pct = Math.round(t.completed / t.committed * 100);
              return (
                <div key={t.id} className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded flex items-center justify-center text-white" style={{ background: t.color, fontSize: '8px', fontWeight: 700 }}>{t.avatar}</div>
                    <span style={{ fontWeight: 600, fontSize: '12px', color: '#172B4D' }}>{t.name}</span>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '28px', color: pct >= 90 ? '#36B37E' : pct >= 75 ? '#FFAB00' : '#FF5630' }}>{pct}%</div>
                  <div style={{ color: '#5E6C84', fontSize: '11px' }}>Predictability</div>
                  <div className="h-1.5 rounded-full overflow-hidden mt-2" style={{ background: '#DFE1E6' }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 90 ? '#36B37E' : pct >= 75 ? '#FFAB00' : '#FF5630' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, subtitle, children, height = 240 }: { title: string; subtitle?: string; children: React.ReactNode; height?: number }) {
  return (
    <div className="rounded" style={{ background: '#fff', border: '1px solid #DFE1E6', padding: '16px', boxShadow: '0 1px 2px rgba(9,30,66,0.06)' }}>
      <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '2px' }}>{title}</div>
      {subtitle && <div style={{ color: '#5E6C84', fontSize: '11px', marginBottom: '14px' }}>{subtitle}</div>}
      <ResponsiveContainer width="100%" height={height}>
        {children as any}
      </ResponsiveContainer>
    </div>
  );
}
