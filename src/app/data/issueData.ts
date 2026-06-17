export type IssueType = 'Story' | 'Bug' | 'Task' | 'Sub-task' | 'Epic';
export type IssuePriority = 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
export type BoardColumn = 'To Do' | 'In Progress' | 'In Review' | 'QA' | 'Done';

export interface Issue {
  id: string;
  key: string;
  title: string;
  type: IssueType;
  priority: IssuePriority;
  points: number;
  assignee: string;
  assigneeInitials: string;
  epic: string;
  epicColor: string;
  status: BoardColumn;
  teamId: string;
}

export const boardIssues: Issue[] = [
  // VB Team
  { id: 'i1', key: 'VB-1241', title: 'Implement PKCE OAuth 2.0 flow', type: 'Story', priority: 'Highest', points: 8, assignee: 'Sarah K.', assigneeInitials: 'SK', epic: 'Auth v2', epicColor: '#0052CC', status: 'In Progress', teamId: 'vb' },
  { id: 'i2', key: 'VB-1242', title: 'Token refresh retry logic', type: 'Task', priority: 'High', points: 3, assignee: 'Mark L.', assigneeInitials: 'ML', epic: 'Auth v2', epicColor: '#0052CC', status: 'In Review', teamId: 'vb' },
  { id: 'i3', key: 'VB-1243', title: 'Fix session expiry edge case', type: 'Bug', priority: 'High', points: 2, assignee: 'Anna R.', assigneeInitials: 'AR', epic: 'Auth v2', epicColor: '#0052CC', status: 'QA', teamId: 'vb' },
  { id: 'i4', key: 'VB-1244', title: 'Stripe webhook handler', type: 'Story', priority: 'High', points: 5, assignee: 'Mark L.', assigneeInitials: 'ML', epic: 'Payments', epicColor: '#36B37E', status: 'To Do', teamId: 'vb' },
  { id: 'i5', key: 'VB-1245', title: 'Payment confirmation email', type: 'Task', priority: 'Medium', points: 2, assignee: 'Anna R.', assigneeInitials: 'AR', epic: 'Payments', epicColor: '#36B37E', status: 'To Do', teamId: 'vb' },
  { id: 'i6', key: 'VB-1246', title: 'JWT signing key rotation', type: 'Story', priority: 'Highest', points: 5, assignee: 'Sarah K.', assigneeInitials: 'SK', epic: 'Auth v2', epicColor: '#0052CC', status: 'In Progress', teamId: 'vb' },
  { id: 'i7', key: 'VB-1247', title: 'Legacy session cleanup script', type: 'Task', priority: 'Medium', points: 3, assignee: 'Dan C.', assigneeInitials: 'DC', epic: 'Auth v2', epicColor: '#0052CC', status: 'Done', teamId: 'vb' },
  { id: 'i8', key: 'VB-1248', title: 'Auth unit tests', type: 'Task', priority: 'Low', points: 2, assignee: 'Sarah K.', assigneeInitials: 'SK', epic: 'Auth v2', epicColor: '#0052CC', status: 'Done', teamId: 'vb' },

  // INFI Team
  { id: 'i9', key: 'INF-2041', title: 'Kafka consumer group scaling config', type: 'Story', priority: 'High', points: 8, assignee: 'Priya N.', assigneeInitials: 'PN', epic: 'Data Pipeline', epicColor: '#6554C0', status: 'In Progress', teamId: 'infi' },
  { id: 'i10', key: 'INF-2042', title: 'Rate limiter middleware blocked by K8s', type: 'Story', priority: 'Highest', points: 13, assignee: 'James T.', assigneeInitials: 'JT', epic: 'API Platform', epicColor: '#00B8D9', status: 'To Do', teamId: 'infi' },
  { id: 'i11', key: 'INF-2043', title: 'Dead letter queue handler', type: 'Task', priority: 'Medium', points: 3, assignee: 'Ravi K.', assigneeInitials: 'RK', epic: 'Data Pipeline', epicColor: '#6554C0', status: 'In Review', teamId: 'infi' },
  { id: 'i12', key: 'INF-2044', title: 'Schema registry integration tests', type: 'Task', priority: 'Medium', points: 5, assignee: 'Priya N.', assigneeInitials: 'PN', epic: 'Data Pipeline', epicColor: '#6554C0', status: 'QA', teamId: 'infi' },
  { id: 'i13', key: 'INF-2045', title: 'API versioning strategy doc', type: 'Task', priority: 'Low', points: 2, assignee: 'James T.', assigneeInitials: 'JT', epic: 'API Platform', epicColor: '#00B8D9', status: 'To Do', teamId: 'infi' },
  { id: 'i14', key: 'INF-2046', title: 'Consumer lag alerting dashboard', type: 'Story', priority: 'High', points: 5, assignee: 'Ravi K.', assigneeInitials: 'RK', epic: 'Data Pipeline', epicColor: '#6554C0', status: 'Done', teamId: 'infi' },

  // Design Team
  { id: 'i15', key: 'DS-3021', title: 'Button variants — all sizes', type: 'Story', priority: 'High', points: 3, assignee: 'Lena M.', assigneeInitials: 'LM', epic: 'DS 3.0', epicColor: '#FF5630', status: 'Done', teamId: 'design' },
  { id: 'i16', key: 'DS-3022', title: 'Dark mode token audit', type: 'Task', priority: 'Medium', points: 5, assignee: 'Carlos R.', assigneeInitials: 'CR', epic: 'DS 3.0', epicColor: '#FF5630', status: 'In Progress', teamId: 'design' },
  { id: 'i17', key: 'DS-3023', title: 'Component storybook update', type: 'Task', priority: 'Low', points: 3, assignee: 'Lena M.', assigneeInitials: 'LM', epic: 'DS 3.0', epicColor: '#FF5630', status: 'In Review', teamId: 'design' },
  { id: 'i18', key: 'DS-3024', title: 'Navigation redesign specs', type: 'Story', priority: 'High', points: 5, assignee: 'Mia S.', assigneeInitials: 'MS', epic: 'Mobile App', epicColor: '#FFAB00', status: 'To Do', teamId: 'design' },
  { id: 'i19', key: 'DS-3025', title: 'Accessibility color contrast fixes', type: 'Bug', priority: 'Highest', points: 2, assignee: 'Carlos R.', assigneeInitials: 'CR', epic: 'DS 3.0', epicColor: '#FF5630', status: 'QA', teamId: 'design' },

  // Platform Team
  { id: 'i20', key: 'PL-4011', title: 'K8s namespace isolation config', type: 'Story', priority: 'Highest', points: 13, assignee: 'Ana S.', assigneeInitials: 'AS', epic: 'K8s Migration', epicColor: '#36B37E', status: 'In Progress', teamId: 'platform' },
  { id: 'i21', key: 'PL-4012', title: 'Prometheus alert rules setup', type: 'Task', priority: 'High', points: 5, assignee: 'David P.', assigneeInitials: 'DP', epic: 'Observability', epicColor: '#00B8D9', status: 'To Do', teamId: 'platform' },
  { id: 'i22', key: 'PL-4013', title: 'Rollback runbook — Phase 1', type: 'Task', priority: 'Highest', points: 3, assignee: 'Ana S.', assigneeInitials: 'AS', epic: 'K8s Migration', epicColor: '#36B37E', status: 'To Do', teamId: 'platform' },
  { id: 'i23', key: 'PL-4014', title: 'Cost optimization — Datadog', type: 'Story', priority: 'Medium', points: 5, assignee: 'David P.', assigneeInitials: 'DP', epic: 'Observability', epicColor: '#00B8D9', status: 'In Review', teamId: 'platform' },
  { id: 'i24', key: 'PL-4015', title: 'Service mesh config validation', type: 'Task', priority: 'High', points: 8, assignee: 'Kai L.', assigneeInitials: 'KL', epic: 'K8s Migration', epicColor: '#36B37E', status: 'Done', teamId: 'platform' },

  // QA Team
  { id: 'i25', key: 'QA-5001', title: 'E2E auth flow test suite', type: 'Story', priority: 'High', points: 8, assignee: 'Rachel H.', assigneeInitials: 'RH', epic: 'Automation v3', epicColor: '#FFAB00', status: 'In Progress', teamId: 'qa' },
  { id: 'i26', key: 'QA-5002', title: 'Load test — payment API', type: 'Task', priority: 'High', points: 5, assignee: 'Tom W.', assigneeInitials: 'TW', epic: 'Performance', epicColor: '#6554C0', status: 'To Do', teamId: 'qa' },
  { id: 'i27', key: 'QA-5003', title: 'Flaky test remediation', type: 'Bug', priority: 'Medium', points: 3, assignee: 'Rachel H.', assigneeInitials: 'RH', epic: 'Automation v3', epicColor: '#FFAB00', status: 'In Progress', teamId: 'qa' },
  { id: 'i28', key: 'QA-5004', title: 'Regression suite for release 2.1', type: 'Story', priority: 'Highest', points: 5, assignee: 'Tom W.', assigneeInitials: 'TW', epic: 'Performance', epicColor: '#6554C0', status: 'In Review', teamId: 'qa' },
  { id: 'i29', key: 'QA-5005', title: 'Test data factory update', type: 'Task', priority: 'Low', points: 2, assignee: 'Rachel H.', assigneeInitials: 'RH', epic: 'Automation v3', epicColor: '#FFAB00', status: 'Done', teamId: 'qa' },
];

export const attentionItems = [
  {
    id: 'a1',
    title: 'K8s rollback plan missing before Phase 1 go-live',
    impact: 'Release 2.1 may slip by 2 weeks if Platform migration fails with no rollback',
    owner: 'Ana S. (Platform Lead)',
    dueDate: '2026-06-20',
    linkedItem: 'PL-4013',
    action: 'Approve immediate allocation of 1 DevOps engineer to complete runbook',
    severity: 'critical' as const,
    type: 'Blocker',
  },
  {
    id: 'a2',
    title: 'QA bandwidth risk for Q2 release regression',
    impact: 'QA team has 40% capacity gap; full regression coverage may slip before release cutoff',
    owner: 'Rachel H. (QA Lead)',
    dueDate: '2026-06-28',
    linkedItem: 'QA-5004',
    action: 'Add 2 automation engineers to QA Sprint 09 or defer 3 low-priority stories',
    severity: 'high' as const,
    type: 'Capacity Risk',
  },
  {
    id: 'a3',
    title: 'INFI rate limiting blocked by Platform dependency',
    impact: 'API Rate Limiting epic cannot proceed — blocks downstream payment fraud prevention',
    owner: 'James T. (INFI)',
    dueDate: '2026-06-20',
    linkedItem: 'INF-2042',
    action: 'Schedule war room between INFI and Platform teams this week',
    severity: 'critical' as const,
    type: 'Cross-Team Dependency',
  },
  {
    id: 'a4',
    title: 'Design System 3.0 handoff may delay VB Sprint 18',
    impact: 'VB team cannot start mobile screens until DS handoff is complete',
    owner: 'Lena M. (Design Lead)',
    dueDate: '2026-06-21',
    linkedItem: 'DS-3022',
    action: 'Prioritize DS dark mode tokens this sprint to unblock VB team',
    severity: 'medium' as const,
    type: 'Milestone Risk',
  },
  {
    id: 'a5',
    title: 'Payment gateway vendor SLA not confirmed',
    impact: 'Q2 release includes Stripe GA; no SLA confirmation from vendor sandbox',
    owner: 'Mark L. (VB)',
    dueDate: '2026-06-25',
    linkedItem: 'VB-1244',
    action: 'Escalate to vendor account team; prepare PayPal fallback if not resolved',
    severity: 'high' as const,
    type: 'Release Risk',
  },
];
