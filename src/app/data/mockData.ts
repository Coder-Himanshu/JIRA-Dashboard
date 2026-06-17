export type SprintHealth = 'On Track' | 'At Risk' | 'Delayed';
export type RiskStatus = 'New' | 'In Review' | 'Mitigation In Progress' | 'Resolved';
export type RiskImpact = 'Critical' | 'High' | 'Medium' | 'Low';
export type EpicStatus = 'Planned' | 'In Progress' | 'At Risk' | 'Blocked' | 'Completed';

export interface Team {
  id: string;
  name: string;
  color: string;
  avatar: string;
  sprintName: string;
  sprintStart: string;
  sprintEnd: string;
  sprintProgress: number;
  committed: number;
  completed: number;
  remaining: number;
  health: SprintHealth;
  blockers: number;
  velocity: number;
  members: number;
}

export interface Sprint {
  id: string;
  teamId: string;
  name: string;
  start: string;
  end: string;
  committed: number;
  completed: number;
  velocity: number;
}

export interface Epic {
  id: string;
  teamId: string;
  title: string;
  status: EpicStatus;
  startDate: string;
  endDate: string;
  progress: number;
  owner: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  status: EpicStatus;
  teamIds: string[];
  description: string;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  status: RiskStatus;
  impact: RiskImpact;
  owner: string;
  teamId: string;
  dueDate: string;
  dependsOn?: string;
}

export interface BacklogItem {
  id: string;
  teamId: string;
  title: string;
  type: 'Story' | 'Bug' | 'Task' | 'Epic';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Ready' | 'Unrefined' | 'Blocked' | 'In Progress' | 'Done';
  points: number;
  age: number;
  assignee: string;
}

export interface DoraMetric {
  week: string;
  deploymentFrequency: number;
  leadTime: number;
  changeFailureRate: number;
  mttr: number;
}

export const teams: Team[] = [
  {
    id: 'vb',
    name: 'VB Team',
    color: '#1e40af',
    avatar: 'VB',
    sprintName: 'VB Sprint 17',
    sprintStart: '2026-06-09',
    sprintEnd: '2026-06-20',
    sprintProgress: 72,
    committed: 84,
    completed: 61,
    remaining: 23,
    health: 'On Track',
    blockers: 1,
    velocity: 78,
    members: 7,
  },
  {
    id: 'infi',
    name: 'INFI Team',
    color: '#4f46e5',
    avatar: 'IN',
    sprintName: 'INFI Sprint 19',
    sprintStart: '2026-06-02',
    sprintEnd: '2026-06-13',
    sprintProgress: 45,
    committed: 96,
    completed: 43,
    remaining: 53,
    health: 'At Risk',
    blockers: 3,
    velocity: 65,
    members: 9,
  },
  {
    id: 'design',
    name: 'Design Team',
    color: '#0891b2',
    avatar: 'DS',
    sprintName: 'Design Sprint 50',
    sprintStart: '2026-06-09',
    sprintEnd: '2026-06-20',
    sprintProgress: 88,
    committed: 56,
    completed: 49,
    remaining: 7,
    health: 'On Track',
    blockers: 0,
    velocity: 52,
    members: 5,
  },
  {
    id: 'platform',
    name: 'Platform Team',
    color: '#16a34a',
    avatar: 'PL',
    sprintName: 'Platform Sprint 12',
    sprintStart: '2026-06-02',
    sprintEnd: '2026-06-20',
    sprintProgress: 34,
    committed: 112,
    completed: 38,
    remaining: 74,
    health: 'Delayed',
    blockers: 5,
    velocity: 89,
    members: 11,
  },
  {
    id: 'qa',
    name: 'QA Team',
    color: '#d97706',
    avatar: 'QA',
    sprintName: 'QA Sprint 08',
    sprintStart: '2026-06-09',
    sprintEnd: '2026-06-20',
    sprintProgress: 61,
    committed: 42,
    completed: 26,
    remaining: 16,
    health: 'On Track',
    blockers: 1,
    velocity: 39,
    members: 4,
  },
];

export const sprintHistory: Sprint[] = [
  // VB Team
  { id: 's1', teamId: 'vb', name: 'VB Sprint 12', start: '2026-04-07', end: '2026-04-18', committed: 80, completed: 74, velocity: 74 },
  { id: 's2', teamId: 'vb', name: 'VB Sprint 13', start: '2026-04-21', end: '2026-05-02', committed: 82, completed: 79, velocity: 79 },
  { id: 's3', teamId: 'vb', name: 'VB Sprint 14', start: '2026-05-05', end: '2026-05-16', committed: 85, completed: 71, velocity: 71 },
  { id: 's4', teamId: 'vb', name: 'VB Sprint 15', start: '2026-05-19', end: '2026-05-30', committed: 82, completed: 80, velocity: 80 },
  { id: 's5', teamId: 'vb', name: 'VB Sprint 16', start: '2026-06-02', end: '2026-06-06', committed: 84, completed: 78, velocity: 78 },
  // INFI Team
  { id: 's6', teamId: 'infi', name: 'INFI Sprint 14', start: '2026-04-07', end: '2026-04-18', committed: 90, completed: 62, velocity: 62 },
  { id: 's7', teamId: 'infi', name: 'INFI Sprint 15', start: '2026-04-21', end: '2026-05-02', committed: 95, completed: 70, velocity: 70 },
  { id: 's8', teamId: 'infi', name: 'INFI Sprint 16', start: '2026-05-05', end: '2026-05-16', committed: 100, completed: 65, velocity: 65 },
  { id: 's9', teamId: 'infi', name: 'INFI Sprint 17', start: '2026-05-19', end: '2026-05-30', committed: 92, completed: 58, velocity: 58 },
  { id: 's10', teamId: 'infi', name: 'INFI Sprint 18', start: '2026-06-02', end: '2026-06-13', committed: 88, completed: 63, velocity: 63 },
  // Design Team
  { id: 's11', teamId: 'design', name: 'Design Sprint 45', start: '2026-04-07', end: '2026-04-18', committed: 52, completed: 50, velocity: 50 },
  { id: 's12', teamId: 'design', name: 'Design Sprint 46', start: '2026-04-21', end: '2026-05-02', committed: 55, completed: 53, velocity: 53 },
  { id: 's13', teamId: 'design', name: 'Design Sprint 47', start: '2026-05-05', end: '2026-05-16', committed: 50, completed: 48, velocity: 48 },
  { id: 's14', teamId: 'design', name: 'Design Sprint 48', start: '2026-05-19', end: '2026-05-30', committed: 58, completed: 55, velocity: 55 },
  { id: 's15', teamId: 'design', name: 'Design Sprint 49', start: '2026-06-02', end: '2026-06-06', committed: 54, completed: 52, velocity: 52 },
  // Platform Team
  { id: 's16', teamId: 'platform', name: 'Platform Sprint 7', start: '2026-04-07', end: '2026-05-02', committed: 110, completed: 95, velocity: 95 },
  { id: 's17', teamId: 'platform', name: 'Platform Sprint 8', start: '2026-05-05', end: '2026-05-30', committed: 115, completed: 88, velocity: 88 },
  { id: 's18', teamId: 'platform', name: 'Platform Sprint 9', start: '2026-06-02', end: '2026-06-20', committed: 108, completed: 79, velocity: 79 },
  // QA Team
  { id: 's19', teamId: 'qa', name: 'QA Sprint 03', start: '2026-04-07', end: '2026-04-18', committed: 40, completed: 38, velocity: 38 },
  { id: 's20', teamId: 'qa', name: 'QA Sprint 04', start: '2026-04-21', end: '2026-05-02', committed: 42, completed: 39, velocity: 39 },
  { id: 's21', teamId: 'qa', name: 'QA Sprint 05', start: '2026-05-05', end: '2026-05-16', committed: 44, completed: 40, velocity: 40 },
  { id: 's22', teamId: 'qa', name: 'QA Sprint 06', start: '2026-05-19', end: '2026-05-30', committed: 41, completed: 38, velocity: 38 },
  { id: 's23', teamId: 'qa', name: 'QA Sprint 07', start: '2026-06-02', end: '2026-06-06', committed: 43, completed: 39, velocity: 39 },
];

export const burndownData = [
  { day: 'Day 1', ideal: 84, actual: 84 },
  { day: 'Day 2', ideal: 76, actual: 80 },
  { day: 'Day 3', ideal: 67, actual: 72 },
  { day: 'Day 4', ideal: 59, actual: 65 },
  { day: 'Day 5', ideal: 50, actual: 58 },
  { day: 'Day 6', ideal: 42, actual: 48 },
  { day: 'Day 7', ideal: 34, actual: 40 },
  { day: 'Day 8', ideal: 25, actual: 32 },
  { day: 'Day 9', ideal: 17, actual: 23 },
  { day: 'Day 10', ideal: 0, actual: null },
];

export const epics: Epic[] = [
  { id: 'e1', teamId: 'vb', title: 'Authentication v2 Overhaul', status: 'In Progress', startDate: '2026-05-01', endDate: '2026-06-30', progress: 65, owner: 'Sarah K.', priority: 'High' },
  { id: 'e2', teamId: 'vb', title: 'Payment Gateway Integration', status: 'At Risk', startDate: '2026-05-15', endDate: '2026-07-15', progress: 40, owner: 'Mark L.', priority: 'Critical' },
  { id: 'e3', teamId: 'infi', title: 'Infinity Data Pipeline', status: 'In Progress', startDate: '2026-04-01', endDate: '2026-07-31', progress: 55, owner: 'Priya N.', priority: 'High' },
  { id: 'e4', teamId: 'infi', title: 'API Rate Limiting', status: 'Blocked', startDate: '2026-05-20', endDate: '2026-06-20', progress: 20, owner: 'James T.', priority: 'Critical' },
  { id: 'e5', teamId: 'design', title: 'Design System 3.0', status: 'In Progress', startDate: '2026-03-01', endDate: '2026-06-30', progress: 82, owner: 'Lena M.', priority: 'High' },
  { id: 'e6', teamId: 'design', title: 'Mobile App Redesign', status: 'Planned', startDate: '2026-07-01', endDate: '2026-09-30', progress: 0, owner: 'Carlos R.', priority: 'Medium' },
  { id: 'e7', teamId: 'platform', title: 'Kubernetes Migration', status: 'In Progress', startDate: '2026-04-15', endDate: '2026-08-15', progress: 35, owner: 'Ana S.', priority: 'Critical' },
  { id: 'e8', teamId: 'platform', title: 'Observability Stack', status: 'At Risk', startDate: '2026-05-01', endDate: '2026-07-01', progress: 28, owner: 'David P.', priority: 'High' },
  { id: 'e9', teamId: 'qa', title: 'Automation Framework v3', status: 'In Progress', startDate: '2026-05-01', endDate: '2026-07-31', progress: 60, owner: 'Rachel H.', priority: 'High' },
  { id: 'e10', teamId: 'qa', title: 'Performance Testing Suite', status: 'Completed', startDate: '2026-03-01', endDate: '2026-05-31', progress: 100, owner: 'Tom W.', priority: 'Medium' },
];

export const milestones: Milestone[] = [
  { id: 'm1', title: 'Q2 Release v2.4', date: '2026-06-30', status: 'In Progress', teamIds: ['vb', 'infi', 'design', 'qa'], description: 'Major Q2 release including auth overhaul and UI refresh' },
  { id: 'm2', title: 'K8s Phase 1 Complete', date: '2026-07-15', status: 'At Risk', teamIds: ['platform'], description: 'First phase of Kubernetes migration for core services' },
  { id: 'm3', title: 'Design System Launch', date: '2026-06-27', status: 'In Progress', teamIds: ['design', 'vb', 'infi'], description: 'Design System 3.0 GA release and documentation' },
  { id: 'm4', title: 'Q3 Planning Complete', date: '2026-07-01', status: 'Planned', teamIds: ['vb', 'infi', 'design', 'platform', 'qa'], description: 'Quarterly planning and roadmap alignment across all teams' },
  { id: 'm5', title: 'Security Audit', date: '2026-06-20', status: 'Planned', teamIds: ['platform', 'vb'], description: 'Annual security audit and penetration testing' },
  { id: 'm6', title: 'API Rate Limiting GA', date: '2026-06-20', status: 'Blocked', teamIds: ['infi'], description: 'Rate limiting feature blocked by infrastructure dependency' },
];

export const risks: Risk[] = [
  { id: 'r1', title: 'Platform dependency blocking INFI API work', description: 'INFI rate limiting epic cannot proceed without K8s networking configs from Platform team', status: 'In Review', impact: 'Critical', owner: 'James T.', teamId: 'infi', dueDate: '2026-06-20', dependsOn: 'platform' },
  { id: 'r2', title: 'Design handoff delays for VB Sprint 18', description: 'Mobile screens from Design Sprint 50 must be delivered before VB Sprint 18 kickoff', status: 'Mitigation In Progress', impact: 'High', owner: 'Sarah K.', teamId: 'vb', dueDate: '2026-06-21', dependsOn: 'design' },
  { id: 'r3', title: 'QA bandwidth risk for Q2 release', description: 'QA team has limited capacity given automation work; regression coverage may slip', status: 'New', impact: 'High', owner: 'Rachel H.', teamId: 'qa', dueDate: '2026-06-28' },
  { id: 'r4', title: 'K8s rollback plan missing', description: 'Platform migration lacks documented rollback procedure for Phase 1 services', status: 'In Review', impact: 'Critical', owner: 'Ana S.', teamId: 'platform', dueDate: '2026-06-25' },
  { id: 'r5', title: 'Payment gateway vendor SLA', description: 'Third-party payment provider has not confirmed SLA for sandbox environment', status: 'New', impact: 'Medium', owner: 'Mark L.', teamId: 'vb', dueDate: '2026-06-30' },
  { id: 'r6', title: 'Stale auth token vulnerability', description: 'Auth v2 migration identified legacy token issue; patching required before Q2 release', status: 'Mitigation In Progress', impact: 'Critical', owner: 'Sarah K.', teamId: 'vb', dueDate: '2026-06-18' },
  { id: 'r7', title: 'Observability stack cost overrun', description: 'Current Datadog usage is 40% over projected budget for Q2', status: 'Resolved', impact: 'Medium', owner: 'David P.', teamId: 'platform', dueDate: '2026-06-15' },
  { id: 'r8', title: 'Missing API versioning strategy', description: 'INFI pipeline lacks formal API versioning; breaking changes risk downstream consumers', status: 'New', impact: 'High', owner: 'Priya N.', teamId: 'infi', dueDate: '2026-07-01' },
];

export const backlogItems: BacklogItem[] = [
  { id: 'b1', teamId: 'vb', title: 'Implement OAuth 2.0 PKCE flow', type: 'Story', priority: 'Critical', status: 'In Progress', points: 8, age: 5, assignee: 'Sarah K.' },
  { id: 'b2', teamId: 'vb', title: 'Payment webhook handler', type: 'Story', priority: 'High', status: 'Ready', points: 5, age: 3, assignee: 'Mark L.' },
  { id: 'b3', teamId: 'vb', title: 'Fix session expiry edge case', type: 'Bug', priority: 'High', status: 'In Progress', points: 3, age: 8, assignee: 'Anna R.' },
  { id: 'b4', teamId: 'vb', title: 'Token refresh retry logic', type: 'Task', priority: 'Medium', status: 'Ready', points: 2, age: 2, assignee: 'Unassigned' },
  { id: 'b5', teamId: 'vb', title: 'Stripe integration docs', type: 'Task', priority: 'Low', status: 'Unrefined', points: 1, age: 15, assignee: 'Unassigned' },
  { id: 'b6', teamId: 'vb', title: 'Legacy auth token cleanup', type: 'Story', priority: 'Critical', status: 'Blocked', points: 13, age: 12, assignee: 'Sarah K.' },
  { id: 'b7', teamId: 'infi', title: 'Kafka consumer group scaling', type: 'Story', priority: 'High', status: 'In Progress', points: 8, age: 7, assignee: 'Priya N.' },
  { id: 'b8', teamId: 'infi', title: 'Rate limiter middleware', type: 'Story', priority: 'Critical', status: 'Blocked', points: 13, age: 10, assignee: 'James T.' },
  { id: 'b9', teamId: 'infi', title: 'Dead letter queue handling', type: 'Task', priority: 'Medium', status: 'Ready', points: 5, age: 4, assignee: 'Unassigned' },
  { id: 'b10', teamId: 'infi', title: 'Schema registry setup', type: 'Story', priority: 'High', status: 'Unrefined', points: 8, age: 18, assignee: 'Unassigned' },
  { id: 'b11', teamId: 'design', title: 'Button component variants', type: 'Story', priority: 'High', status: 'Done', points: 3, age: 0, assignee: 'Lena M.' },
  { id: 'b12', teamId: 'design', title: 'Dark mode token audit', type: 'Task', priority: 'Medium', status: 'In Progress', points: 5, age: 3, assignee: 'Carlos R.' },
  { id: 'b13', teamId: 'design', title: 'Figma component documentation', type: 'Task', priority: 'Low', status: 'Unrefined', points: 3, age: 22, assignee: 'Unassigned' },
  { id: 'b14', teamId: 'platform', title: 'K8s namespace isolation', type: 'Story', priority: 'Critical', status: 'In Progress', points: 13, age: 9, assignee: 'Ana S.' },
  { id: 'b15', teamId: 'platform', title: 'Prometheus alert rules', type: 'Task', priority: 'High', status: 'Ready', points: 5, age: 5, assignee: 'David P.' },
  { id: 'b16', teamId: 'platform', title: 'Rollback runbook', type: 'Task', priority: 'Critical', status: 'Blocked', points: 3, age: 14, assignee: 'Ana S.' },
  { id: 'b17', teamId: 'platform', title: 'Cost optimization analysis', type: 'Story', priority: 'Medium', status: 'Unrefined', points: 5, age: 20, assignee: 'Unassigned' },
  { id: 'b18', teamId: 'qa', title: 'E2E auth flow tests', type: 'Story', priority: 'High', status: 'In Progress', points: 8, age: 4, assignee: 'Rachel H.' },
  { id: 'b19', teamId: 'qa', title: 'Load test for payment API', type: 'Task', priority: 'High', status: 'Ready', points: 5, age: 2, assignee: 'Tom W.' },
  { id: 'b20', teamId: 'qa', title: 'Flaky test remediation', type: 'Bug', priority: 'Medium', status: 'In Progress', points: 3, age: 6, assignee: 'Rachel H.' },
];

export const doraData: DoraMetric[] = [
  { week: 'May W1', deploymentFrequency: 3.2, leadTime: 2.1, changeFailureRate: 4.2, mttr: 1.5 },
  { week: 'May W2', deploymentFrequency: 4.1, leadTime: 1.9, changeFailureRate: 3.8, mttr: 1.2 },
  { week: 'May W3', deploymentFrequency: 3.8, leadTime: 2.3, changeFailureRate: 5.1, mttr: 2.0 },
  { week: 'May W4', deploymentFrequency: 5.0, leadTime: 1.7, changeFailureRate: 2.9, mttr: 0.9 },
  { week: 'Jun W1', deploymentFrequency: 4.5, leadTime: 1.6, changeFailureRate: 3.2, mttr: 1.1 },
  { week: 'Jun W2', deploymentFrequency: 5.2, leadTime: 1.4, changeFailureRate: 2.5, mttr: 0.8 },
];

export const velocityChartData = teams.map(t => {
  const history = sprintHistory.filter(s => s.teamId === t.id).slice(-5);
  return history.map(s => ({ sprint: s.name.split(' ').slice(-2).join(' '), committed: s.committed, completed: s.completed, team: t.name }));
}).flat();

export const orgSummary = {
  totalTeams: 5,
  activeSprints: 5,
  totalCommitted: teams.reduce((a, t) => a + t.committed, 0),
  totalCompleted: teams.reduce((a, t) => a + t.completed, 0),
  completionPct: Math.round(teams.reduce((a, t) => a + t.completed, 0) / teams.reduce((a, t) => a + t.committed, 0) * 100),
  openBlockers: teams.reduce((a, t) => a + t.blockers, 0),
  delayedMilestones: milestones.filter(m => m.status === 'At Risk' || m.status === 'Blocked').length,
  avgVelocity: Math.round(teams.reduce((a, t) => a + t.velocity, 0) / teams.length),
  deploymentFrequency: 5.2,
  leadTime: 1.4,
  changeFailureRate: 2.5,
  mttr: 0.8,
};
