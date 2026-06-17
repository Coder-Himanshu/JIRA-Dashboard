import { useState } from 'react';
import {
  Users, Activity, Target, CheckCircle2, AlertTriangle, TrendingUp, Zap, Clock, BarChart2, ShieldAlert, ArrowRight, Flag,
} from 'lucide-react';
import { teams, orgSummary, doraData, burndownData, milestones } from '../data/mockData';
import { attentionItems } from '../data/issueData';
import { JiraLozenge, healthToVariant } from './JiraLozenge';
import { MilestoneDrawer } from './MilestoneDrawer';
import { useNavigate } from 'react-router';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const TEAM_COLORS: Record<string, string> = {
  VB: '#0052CC', INFI: '#6554C0', Design: '#00B8D9', Platform: '#36B37E', QA: '#FFAB00',
};

const velocityData = [
  { sprint: 'S13', VB: 79, INFI: 70, Design: 53, Platform: 88, QA: 39 },
  { sprint: 'S14', VB: 71, INFI: 65, Design: 48, Platform: 79, QA: 40 },
  { sprint: 'S15', VB: 80, INFI: 58, Design: 55, Platform: 89, QA: 38 },
  { sprint: 'S16', VB: 78, INFI: 63, Design: 52, Platform: 85, QA: 39 },
  { sprint: 'Current', VB: 61, INFI: 43, Design: 49, Platform: 38, QA: 26 },
];

const tooltipStyle = { background: '#fff', border: '1px solid #DFE1E6', borderRadius: '3px', fontSize: '12px', color: '#172B4D' };

const severityConfig = {
  critical: { bg: '#FFEBE6', border: '#FF8F73', text: '#BF2600', dot: '#FF5630', label: 'CRITICAL' },
  high: { bg: '#FFFAE6', border: '#FFE380', text: '#7A5900', dot: '#FFAB00', label: 'HIGH' },
  medium: { bg: '#DEEBFF', border: '#4C9AFF', text: '#0747A6', dot: '#0052CC', label: 'MEDIUM' },
};

export function OrgDashboard() {
  const navigate = useNavigate();
  const [selectedMilestone, setSelectedMilestone] = useState<typeof milestones[0] | null>(null);

  const s = orgSummary;
  const releaseConfidence = 78;

  const kpiCards = [
    { title: 'Delivery Health', value: s.completionPct + '%', sub: 'Overall completion rate', color: s.completionPct >= 70 ? '#36B37E' : '#FF5630', icon: <Activity size={14} color={s.completionPct >= 70 ? '#36B37E' : '#FF5630'} />, iconBg: '#E3FCEF', trend: '-4% vs last sprint' },
    { title: 'Active Teams', value: s.totalTeams, sub: '5 teams tracked', color: '#0052CC', icon: <Users size={14} color="#0052CC" />, iconBg: '#DEEBFF', trend: '—' },
    { title: 'Active Sprints', value: s.activeSprints, sub: 'Different cadences', color: '#0052CC', icon: <Activity size={14} color="#0052CC" />, iconBg: '#DEEBFF', trend: '—' },
    { title: 'SP Committed', value: s.totalCommitted, sub: 'Across all teams', color: '#172B4D', icon: <Target size={14} color="#6554C0" />, iconBg: '#EAE6FF', trend: '+5% vs last sprint' },
    { title: 'SP Completed', value: s.totalCompleted, sub: 'Story points done', color: '#36B37E', icon: <CheckCircle2 size={14} color="#36B37E" />, iconBg: '#E3FCEF', trend: '+3% vs last sprint' },
    { title: 'Avg Velocity', value: s.avgVelocity, sub: 'SP per sprint avg', color: '#172B4D', icon: <TrendingUp size={14} color="#0052CC" />, iconBg: '#DEEBFF', trend: '+2% improving' },
    { title: 'Carry Forward', value: '12%', sub: 'Work rolled to next sprint', color: '#FFAB00', icon: <Clock size={14} color="#FFAB00" />, iconBg: '#FFFAE6', trend: '-3% improved' },
    { title: 'Open Blockers', value: s.openBlockers, sub: 'Across all teams', color: '#FF5630', icon: <ShieldAlert size={14} color="#FF5630" />, iconBg: '#FFEBE6', trend: '+2 new this sprint' },
    { title: 'Critical Risks', value: 2, sub: 'Require escalation', color: '#FF5630', icon: <AlertTriangle size={14} color="#FF5630" />, iconBg: '#FFEBE6', trend: 'Unchanged' },
    { title: 'Delayed Milestones', value: s.delayedMilestones, sub: 'At risk / blocked', color: '#FF5630', icon: <Flag size={14} color="#FF5630" />, iconBg: '#FFEBE6', trend: '—' },
    { title: 'Release Confidence', value: releaseConfidence + '%', sub: '2 critical deps open', color: releaseConfidence >= 85 ? '#36B37E' : '#FFAB00', icon: <Zap size={14} color="#FFAB00" />, iconBg: '#FFFAE6', trend: 'At Risk' },
    { title: 'Deploy Frequency', value: s.deploymentFrequency + '/d', sub: 'Elite performer', color: '#36B37E', icon: <Zap size={14} color="#36B37E" />, iconBg: '#E3FCEF', trend: '+15% improved' },
    { title: 'Lead Time', value: s.leadTime + 'd', sub: 'Commit to production', color: '#36B37E', icon: <Clock size={14} color="#36B37E" />, iconBg: '#E3FCEF', trend: '↓ 12% improved' },
    { title: 'Change Failure', value: s.changeFailureRate + '%', sub: 'Deploy failure rate', color: '#36B37E', icon: <BarChart2 size={14} color="#36B37E" />, iconBg: '#E3FCEF', trend: '↓ 8% improved' },
    { title: 'MTTR', value: s.mttr + 'h', sub: 'Mean time to recovery', color: '#36B37E', icon: <Activity size={14} color="#36B37E" />, iconBg: '#E3FCEF', trend: '↓ 20% improved' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div>
        <div style={{ color: '#5E6C84', fontSize: '12px', marginBottom: '2px' }}>
          <span style={{ cursor: 'pointer', color: '#0052CC' }}>All Projects</span> / Org Agile Dashboard
        </div>
        <h1 style={{ fontWeight: 700, fontSize: '20px', color: '#172B4D', marginBottom: '2px' }}>Org Agile Delivery Review</h1>
        <p style={{ color: '#5E6C84', fontSize: '13px' }}>Leadership view of sprint health, delivery progress, roadmap confidence, and cross-team risks · Jun 16, 2026</p>
      </div>

      {/* KPI cards */}
      <section>
        <div style={{ color: '#5E6C84', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Leadership KPIs</div>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}>
          {kpiCards.map(card => (
            <div key={card.title} className="rounded p-3" style={{ background: '#fff', border: '1px solid #DFE1E6', boxShadow: '0 1px 2px rgba(9,30,66,0.06)' }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: '11px', color: '#5E6C84', fontWeight: 500 }}>{card.title}</span>
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: card.iconBg }}>{card.icon}</div>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '22px', color: card.color, lineHeight: 1 }}>{card.value}</div>
              <div style={{ color: '#5E6C84', fontSize: '10px', marginTop: '3px' }}>{card.sub}</div>
              <div style={{ color: '#5E6C84', fontSize: '10px', marginTop: '4px', borderTop: '1px solid #F4F5F7', paddingTop: '4px' }}>{card.trend}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Attention Panel */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#172B4D' }}>⚠ Needs Leadership Attention</div>
            <div style={{ color: '#5E6C84', fontSize: '12px' }}>{attentionItems.length} items require management action</div>
          </div>
          <button onClick={() => navigate('/risks')} className="flex items-center gap-1 px-3 py-1.5 rounded transition-colors hover:opacity-80" style={{ background: '#0052CC', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit', fontWeight: 500 }}>
            View All Risks <ArrowRight size={12} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {attentionItems.map(item => {
            const cfg = severityConfig[item.severity];
            return (
              <div key={item.id} className="rounded p-4" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: cfg.dot }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span style={{ fontWeight: 700, fontSize: '13px', color: cfg.text }}>{item.title}</span>
                      <span className="px-1.5 py-0.5 rounded text-xs font-bold" style={{ background: `${cfg.dot}20`, color: cfg.text }}>{cfg.label}</span>
                      <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: '#fff', color: '#5E6C84', border: '1px solid #DFE1E6' }}>{item.type}</span>
                    </div>
                    <div style={{ color: cfg.text, fontSize: '12px', marginBottom: '8px', opacity: 0.85 }}>{item.impact}</div>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span style={{ fontSize: '11px', color: cfg.text, opacity: 0.8 }}>
                        <strong>Owner:</strong> {item.owner}
                      </span>
                      <span style={{ fontSize: '11px', color: cfg.text, opacity: 0.8 }}>
                        <strong>Due:</strong> {item.dueDate}
                      </span>
                      <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#0052CC', cursor: 'pointer' }} onClick={() => navigate('/sprints')}>
                        🔗 {item.linkedItem}
                      </span>
                    </div>
                    <div className="mt-2 px-3 py-2 rounded" style={{ background: 'rgba(255,255,255,0.6)', fontSize: '12px', color: cfg.text }}>
                      <strong>Recommended Action:</strong> {item.action}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team delivery health table */}
      <section>
        <div style={{ fontWeight: 700, fontSize: '14px', color: '#172B4D', marginBottom: '10px' }}>Team Delivery Health</div>
        <div className="rounded overflow-hidden" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F4F5F7', borderBottom: '1px solid #DFE1E6' }}>
                {['Team', 'Sprint', 'Progress', 'Committed', 'Completed', 'Remaining', 'Velocity', 'Blockers', 'Health', 'Release Conf.', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#5E6C84', fontWeight: 500, fontSize: '11px', whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => {
                const conf = [78, 62, 90, 55, 85][idx];
                return (
                  <tr
                    key={team.id}
                    style={{ borderBottom: '1px solid #F4F5F7', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F4F5F7')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    onClick={() => navigate(`/teams/${team.id}`)}
                  >
                    <td style={{ padding: '10px 12px' }}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded flex items-center justify-center text-white" style={{ background: team.color, fontSize: '9px', fontWeight: 700, flexShrink: 0 }}>{team.avatar}</div>
                        <span style={{ fontWeight: 500, color: '#0052CC' }}>{team.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#172B4D', fontSize: '12px', whiteSpace: 'nowrap' }}>{team.sprintName}</td>
                    <td style={{ padding: '10px 12px', minWidth: '100px' }}>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#DFE1E6', minWidth: '60px' }}>
                          <div className="h-full rounded-full" style={{ width: `${team.sprintProgress}%`, background: team.color }} />
                        </div>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '11px', color: team.color, whiteSpace: 'nowrap' }}>{team.sprintProgress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{team.committed}</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: '#36B37E' }}>{team.completed}</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: '#FFAB00' }}>{team.remaining}</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'JetBrains Mono, monospace' }}>{team.velocity}</td>
                    <td style={{ padding: '10px 12px' }}>
                      {team.blockers > 0
                        ? <span style={{ fontWeight: 700, color: '#FF5630', fontFamily: 'JetBrains Mono, monospace' }}>{team.blockers}</span>
                        : <span style={{ color: '#36B37E', fontWeight: 700 }}>—</span>}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <JiraLozenge label={team.health} variant={healthToVariant(team.health)} />
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: conf >= 80 ? '#36B37E' : conf >= 65 ? '#FFAB00' : '#FF5630' }}>{conf}%</span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <div className="flex items-center gap-1">
                        <button onClick={e => { e.stopPropagation(); navigate(`/teams/${team.id}`); }} style={{ background: '#DEEBFF', border: 'none', color: '#0052CC', fontSize: '11px', fontWeight: 600, padding: '2px 6px', borderRadius: '3px', cursor: 'pointer', fontFamily: 'inherit' }}>Sprint</button>
                        <button onClick={e => { e.stopPropagation(); navigate('/risks'); }} style={{ background: '#F4F5F7', border: 'none', color: '#5E6C84', fontSize: '11px', fontWeight: 600, padding: '2px 6px', borderRadius: '3px', cursor: 'pointer', fontFamily: 'inherit' }}>Risks</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6', boxShadow: '0 1px 2px rgba(9,30,66,0.06)' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '2px' }}>Team Velocity</div>
          <div style={{ color: '#5E6C84', fontSize: '11px', marginBottom: '12px' }}>Story points completed per sprint</div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={velocityData} barSize={8} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="sprint" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              {Object.entries(TEAM_COLORS).map(([name, color]) => (
                <Bar key={name} dataKey={name} fill={color} radius={[2, 2, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6', boxShadow: '0 1px 2px rgba(9,30,66,0.06)' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '2px' }}>Burndown — VB Sprint 17</div>
          <div style={{ color: '#5E6C84', fontSize: '11px', marginBottom: '12px' }}>Remaining story points over sprint</div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={burndownData}>
              <defs>
                <linearGradient id="bdOrgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0052CC" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0052CC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Area type="monotone" dataKey="ideal" stroke="#B3BAC5" strokeDasharray="5 3" fill="none" name="Ideal" dot={false} strokeWidth={1.5} />
              <Area type="monotone" dataKey="actual" stroke="#0052CC" strokeWidth={2} fill="url(#bdOrgGrad)" name="Actual" dot={{ r: 3 }} connectNulls={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Milestones */}
      <section>
        <div style={{ fontWeight: 700, fontSize: '14px', color: '#172B4D', marginBottom: '10px' }}>Roadmap & Milestone Confidence</div>
        <div className="grid grid-cols-3 gap-3">
          {milestones.map(m => {
            const cfg = {
              'In Progress': { bg: '#DEEBFF', border: '#4C9AFF', text: '#0052CC', dot: '#0052CC' },
              'At Risk': { bg: '#FFFAE6', border: '#FFE380', text: '#7A5900', dot: '#FFAB00' },
              'Blocked': { bg: '#FFEBE6', border: '#FF8F73', text: '#BF2600', dot: '#FF5630' },
              'Planned': { bg: '#F4F5F7', border: '#DFE1E6', text: '#5E6C84', dot: '#B3BAC5' },
              'Completed': { bg: '#E3FCEF', border: '#79F2C0', text: '#006644', dot: '#36B37E' },
            }[m.status] || { bg: '#F4F5F7', border: '#DFE1E6', text: '#5E6C84', dot: '#B3BAC5' };

            return (
              <div
                key={m.id}
                className="rounded p-3 cursor-pointer transition-all hover:shadow-sm"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                onClick={() => setSelectedMilestone(m)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Flag size={11} color={cfg.dot} />
                  <span style={{ fontWeight: 600, fontSize: '12px', color: cfg.text }}>{m.title}</span>
                </div>
                <div style={{ fontSize: '11px', color: cfg.text, opacity: 0.8, marginBottom: '6px' }}>{m.description}</div>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: cfg.text, opacity: 0.7 }}>{m.date}</span>
                  <JiraLozenge label={m.status} variant={healthToVariant(m.status)} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DORA summary */}
      <section className="rounded p-4" style={{ background: '#fff', border: '1px solid #DFE1E6' }}>
        <div style={{ fontWeight: 600, fontSize: '13px', color: '#172B4D', marginBottom: '12px' }}>DORA Metrics — 6-Week Trend</div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={doraData}>
            <defs>
              <linearGradient id="doraGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0052CC" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#0052CC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#5E6C84' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Area type="monotone" dataKey="deploymentFrequency" stroke="#0052CC" strokeWidth={2} fill="url(#doraGrad)" name="Deploy Freq" dot={false} />
            <Area type="monotone" dataKey="leadTime" stroke="#6554C0" strokeWidth={2} fill="none" name="Lead Time (d)" dot={false} />
            <Area type="monotone" dataKey="changeFailureRate" stroke="#FF5630" strokeWidth={1.5} fill="none" name="Failure Rate %" dot={false} strokeDasharray="4 2" />
            <Area type="monotone" dataKey="mttr" stroke="#36B37E" strokeWidth={1.5} fill="none" name="MTTR (h)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      <MilestoneDrawer milestone={selectedMilestone} onClose={() => setSelectedMilestone(null)} />
    </div>
  );
}
