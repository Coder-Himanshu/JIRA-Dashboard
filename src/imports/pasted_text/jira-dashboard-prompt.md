rephrae as prompt for figma and break down frontend backend and styles

As a Scrummaster create a Sample dashboard with metrics in Jira .this is an org level board that has around 5 teams with their sprints tracked on it with different cadences .So we have say VB sprint 17 ,infi sprint 19 design sprint 50 etc ..with each one has there own prodct backlog and sprint back logSo suggest consolidated metrices and dashboard that can be viewed by my mangement /manager with all working lik poc include drag and drop on click view milestone roadmaps Story points velocity burdown charts any Dora metrics  ..create like a proper Big picture in Jira with gantts etc kind of a dashboard 



Thought for a couple of seconds

Here is a clean Figma prompt with frontend, backend, and style breakdown:

Figma Prompt

Create a modern Org-Level Scrum Master Dashboard for Jira Metrics.

This dashboard should represent a large organization-level board where around 5 different teams are tracked together. Each team has its own sprint cadence, product backlog, sprint backlog, milestones, and delivery roadmap.

Example teams and sprint names:

VB Sprint 17
INFI Sprint 19
Design Sprint 50
Platform Sprint 12
QA Sprint 08

The goal is to create a management-level consolidated dashboard that helps managers, Scrum Masters, Product Owners, and leadership view overall delivery health, sprint progress, team performance, milestones, risks, and engineering metrics in one place.

The dashboard should feel like a Big Picture / Advanced Jira Portfolio dashboard with roadmap, Gantt view, sprint analytics, and team-level drill-downs.

Main Dashboard Features

Create a dashboard with the following sections:

1. Executive Summary Cards

Show top-level metrics such as:

Total Active Teams
Active Sprints
Total Story Points Committed
Story Points Completed
Sprint Completion Percentage
Open Risks / Blockers
Delayed Milestones
Average Team Velocity
Deployment Frequency
Lead Time for Changes
Change Failure Rate
MTTR

Each card should have small icons, trend indicators, and percentage changes.

2. Team Sprint Overview

Create a consolidated table or card grid for all teams.

Each team card should show:

Team Name
Current Sprint Name
Sprint Start Date
Sprint End Date
Sprint Progress
Committed Story Points
Completed Story Points
Remaining Story Points
Sprint Health: On Track / At Risk / Delayed
Number of Blockers
Team Velocity

Each card should have a View Details button.

3. Interactive Roadmap / Milestone View

Create a roadmap section similar to Jira Advanced Roadmaps or Big Picture.

It should include:

Timeline view
Milestones
Epics
Features
Dependencies
Team ownership
Delivery status
Drag-and-drop functionality for milestones and epics
Click action to open milestone details
Color-coded status indicators

Example statuses:

Planned
In Progress
At Risk
Blocked
Completed
4. Gantt Chart View

Design a proper Gantt-style section showing:

Teams on the left side
Epics / Features / Milestones as rows
Timeline across weeks or months
Dependencies between items
Drag-and-drop bars
Resize timeline bars
Critical path highlight
Delayed items highlighted clearly
5. Sprint Analytics

Include charts such as:

Sprint Burndown Chart
Velocity Chart
Burnup Chart
Story Points Committed vs Completed
Sprint Predictability
Carry Forward Work
Scope Change During Sprint

The user should be able to filter charts by:

Team
Sprint
Date Range
Project
Epic
6. DORA Metrics Section

Create a dedicated engineering performance section with:

Deployment Frequency
Lead Time for Changes
Change Failure Rate
Mean Time to Recovery
Release Success Rate
Incident Trend

Use clean charts and KPI cards to make these metrics management-friendly.

7. Backlog Health

Create sections for:

Product Backlog Size
Sprint Backlog Size
Ready Stories
Unrefined Stories
Blocked Stories
Aging Tickets
Priority Distribution
Bugs vs Stories vs Tasks

Show both team-level and consolidated views.

8. Risk and Dependency Board

Create a visual risk board showing:

Cross-team dependencies
Blockers
Risks
Owners
Due dates
Impact level
Status

Use a kanban-style layout:

New
In Review
Mitigation In Progress
Resolved
Frontend Breakdown

Build the frontend as a modern web dashboard.

Pages
Org Dashboard
Executive metrics
Team sprint overview
Sprint health summary
DORA metrics summary
Team Details Page
Current sprint details
Backlog view
Burndown chart
Velocity chart
Sprint risks
Roadmap Page
Timeline roadmap
Milestones
Epics
Dependencies
Drag-and-drop planning
Gantt View Page
Big Picture-style planning
Timeline bars
Dependencies
Milestone tracking
Backlog Health Page
Product backlog
Sprint backlog
Aging tickets
Priority and status breakdown
DORA Metrics Page
Engineering delivery metrics
Deployment trends
Failure rate
Recovery time
Frontend Components

Create reusable components such as:

Metric Cards
Sprint Health Cards
Team Overview Table
Roadmap Timeline
Gantt Chart
Burndown Chart
Velocity Chart
Burnup Chart
DORA Metric Cards
Risk Kanban Board
Filter Bar
Date Range Picker
Team Selector
Sprint Selector
Milestone Detail Drawer
Backlog Table
Dependency Map
Backend Breakdown

The backend should collect and process Jira and engineering data.

Core Backend Modules
Jira Integration
Fetch projects
Fetch boards
Fetch sprints
Fetch issues
Fetch epics
Fetch story points
Fetch backlog items
Fetch sprint reports
Metrics Engine
Calculate velocity
Calculate sprint completion rate
Calculate burndown data
Calculate burnup data
Calculate carry-forward work
Calculate sprint predictability
Calculate backlog health
DORA Metrics Engine
Deployment frequency
Lead time for changes
Change failure rate
Mean time to recovery
Incident recovery tracking
Roadmap and Milestone Service
Manage milestones
Manage epics
Manage dependencies
Store roadmap changes
Support drag-and-drop updates
Risk and Dependency Service
Track risks
Track blockers
Track owners
Track due dates
Track mitigation status
Suggested Backend APIs
GET /api/dashboard/summary
GET /api/teams
GET /api/teams/:teamId/sprints
GET /api/teams/:teamId/backlog
GET /api/teams/:teamId/velocity
GET /api/teams/:teamId/burndown
GET /api/roadmap
POST /api/roadmap/milestone
PUT /api/roadmap/milestone/:id
GET /api/gantt
GET /api/dora/summary
GET /api/risks
POST /api/risks
PUT /api/risks/:id
GET /api/dependencies
POST /api/dependencies
Database Entities

Use entities such as:

Team
Sprint
Project
Issue
Epic
Milestone
RoadmapItem
Dependency
Risk
DoraMetric
BacklogItem
Release
Incident
Style Direction

Create a premium enterprise SaaS look.

Visual Style
Modern Jira-inspired dashboard
Clean enterprise UI
Light mode by default
Optional dark mode
Soft shadows
Rounded cards
Glass-style panels
Professional charts
Clear status colors
Spacious layout
Minimal clutter
Suggested Colors
Primary: Deep Blue
Secondary: Indigo
Success: Green
Warning: Amber
Danger: Red
Info: Cyan
Background: Light Gray / Off White
Cards: White
Text: Dark Slate
UI Feel

The design should feel like a mix of:

Jira Dashboard
Jira Advanced Roadmaps
Big Picture Plugin
Linear-style clean UI
Modern project management SaaS
Final Output Expected in Figma

Create a complete clickable dashboard prototype with:

Org-level dashboard screen
Team drill-down screen
Roadmap screen
Gantt chart screen
Backlog health screen
DORA metrics screen
Risk and dependency screen
Interactive filters
Clickable milestone detail drawer
Drag-and-drop visual state for roadmap and Gantt items

The final design should clearly show how leadership can monitor delivery status across multiple teams, different sprint cadences, product backlogs, sprint backlogs, milestones, risks, dependencies, velocity, burndown, and DORA metrics from one consolidated dashboard.

i want to exact jira spefic look and feel 
Thought for a couple of seconds

Use this updated prompt for Figma:

Figma Prompt: Jira-Specific Org-Level Scrum Master Dashboard

Create a Jira-style Org-Level Scrum Master Dashboard with a look and feel very close to Jira / Atlassian dashboards.

The UI should feel like it belongs inside Jira, using Jira-style navigation, cards, tables, filters, issue layouts, sprint boards, roadmap, and reporting widgets.

Design a dashboard for an organization-level Agile board where around 5 teams are tracked together. Each team has its own sprint cadence, product backlog, sprint backlog, roadmap items, milestones, and delivery health.

Example teams:

VB Sprint 17
INFI Sprint 19
Design Sprint 50
Platform Sprint 12
QA Sprint 08

The dashboard should help Scrum Masters, managers, delivery heads, and leadership see consolidated Agile delivery metrics across all teams.

Overall Jira Look and Feel

The design should follow a Jira / Atlassian-style interface:

Left sidebar navigation similar to Jira
Top header with project selector, search, notifications, profile avatar
Jira-style breadcrumbs
Jira-style issue cards
Jira-style sprint boards
Jira-style filters and dropdowns
Jira-style status pills
Jira-style tabs
Jira-style tables
Jira-style reporting widgets
Jira-style roadmap and timeline
Jira Advanced Roadmaps / BigPicture-inspired Gantt layout

Use a professional enterprise SaaS layout, not a generic dashboard.

Main Layout
Left Sidebar Navigation

Create a Jira-like sidebar with:

Dashboard
Teams
Active Sprints
Backlog
Roadmap
Gantt View
Reports
DORA Metrics
Risks & Dependencies
Settings

Sidebar should look similar to Jira Cloud navigation with icons, active state, and compact spacing.

Top Header

Create a Jira-style top bar with:

Organization name
Board selector
Sprint selector
Team filter
Date range filter
Search bar
Notification icon
Help icon
User avatar

Example title:

Org Agile Delivery Dashboard

Subtitle:

Consolidated Jira metrics across 5 teams and multiple sprint cadences

Dashboard Screen
1. Jira-Style Summary Cards

Create compact Jira-style KPI cards showing:

Active Teams
Active Sprints
Total Issues
Story Points Committed
Story Points Completed
Sprint Completion %
Open Blockers
Delayed Milestones
Average Velocity
Carry Forward Work

Cards should look like Jira dashboard gadgets.

Each card should include:

Metric name
Big number
Small trend indicator
Jira-style icon
Status indicator
2. Team Sprint Overview

Create a Jira-style table or card grid showing all teams.

Columns:

Team
Current Sprint
Sprint Dates
Cadence
Committed SP
Completed SP
Remaining SP
Open Issues
Blockers
Velocity
Sprint Health
Action

Sprint Health should use Jira-style status pills:

On Track
At Risk
Blocked
Delayed
Completed

Each row should have a View Sprint button.

3. Sprint Board Preview

Create a mini Jira sprint board with columns:

To Do
In Progress
In Review
QA
Done

Show Jira-style issue cards inside each column.

Each issue card should include:

Issue key, example: VB-1245
Issue type icon
Priority icon
Story points
Assignee avatar
Status
Epic label

Add drag-and-drop visual behavior for moving issues between columns.

4. Backlog Health Widget

Create Jira-style backlog summary showing:

Product Backlog Items
Sprint Backlog Items
Ready for Sprint
Unrefined Stories
Blocked Issues
Aging Tickets
Bugs vs Stories vs Tasks

Use Jira-like issue type colors and status badges.

5. Roadmap View

Create a Jira Advanced Roadmaps-style section.

Show:

Epics
Features
Milestones
Releases
Dependencies
Owners
Start date
Target date
Status

The roadmap should include:

Timeline across weeks/months
Drag-and-drop roadmap items
Clickable milestone cards
Dependency lines
Team swimlanes
Status indicators

On milestone click, open a right-side Jira-style drawer showing:

Milestone name
Linked epics
Linked issues
Owner
Due date
Risk level
Dependencies
Progress
Comments
Activity history
6. BigPicture / Gantt View

Create a Jira BigPicture-style Gantt dashboard.

Include:

Left-side hierarchy:
Initiative
Epic
Story
Task
Right-side timeline
Colored timeline bars
Milestone diamonds
Dependency arrows
Critical path highlight
Delayed items
Drag-and-drop timeline bars
Resize bars
Collapse / expand hierarchy

Example rows:

VB Platform Modernization
INFI Data Pipeline
Design System Upgrade
QA Automation Milestone
Platform Release 2.1
7. Reports Section

Create Jira-style report gadgets for:

Burndown Chart
Burnup Chart
Velocity Chart
Sprint Report
Cumulative Flow Diagram
Created vs Resolved Issues
Control Chart
Scope Change During Sprint
Committed vs Completed Story Points

Use tabs like Jira reports:

Overview
Sprint Reports
Velocity
Burndown
Flow
Predictability
8. DORA Metrics Section

Create a Jira / DevOps-style engineering metrics area showing:

Deployment Frequency
Lead Time for Changes
Change Failure Rate
MTTR
Release Success Rate
Incident Trend

Use compact cards and charts. Keep it enterprise and management-friendly.

9. Risk and Dependency Board

Create a Jira-style risk board with kanban columns:

New
In Review
Mitigation In Progress
Resolved

Each risk card should show:

Risk ID
Title
Impact
Owner
Due date
Linked team
Linked issue / epic
Status

Also create a dependency map showing cross-team dependencies between VB, INFI, Design, Platform, and QA.

Frontend Breakdown
Pages
Dashboard
Executive summary
Team sprint overview
Jira-style report gadgets
Sprint health
Active Sprints
Jira board view
To Do / In Progress / In Review / QA / Done columns
Drag-and-drop issue cards
Backlog
Product backlog
Sprint backlog
Issue priority
Story points
Assignee
Epic links
Roadmap
Jira Advanced Roadmaps-style planning
Epics, milestones, releases, dependencies
Gantt View
BigPicture-style Gantt layout
Timeline bars
Dependency arrows
Milestones
Reports
Burndown
Burnup
Velocity
Sprint predictability
Created vs Resolved
DORA Metrics
Deployment metrics
Lead time
Failure rate
MTTR
Risks & Dependencies
Risk kanban board
Dependency map
Blocker tracking
Backend Breakdown
Backend Services
Jira Integration Service
Fetch Jira projects
Fetch boards
Fetch sprints
Fetch issues
Fetch epics
Fetch backlog
Fetch sprint reports
Fetch story points
Fetch issue status changes
Sprint Metrics Service
Calculate velocity
Calculate sprint completion
Calculate committed vs completed story points
Calculate carry-forward work
Calculate sprint predictability
Calculate scope change
Roadmap Service
Manage initiatives
Manage epics
Manage milestones
Manage releases
Manage dependencies
Save drag-and-drop roadmap changes
Gantt Service
Store Gantt timeline data
Manage dependency arrows
Track delayed items
Track critical path
DORA Metrics Service
Deployment frequency
Lead time for changes
Change failure rate
MTTR
Incident trends
Risk Service
Track blockers
Track risks
Track dependencies
Track mitigation plans
Track owners and due dates
Suggested API Endpoints
GET /api/dashboard/summary
GET /api/teams
GET /api/teams/:teamId/sprints
GET /api/teams/:teamId/issues
GET /api/teams/:teamId/backlog
GET /api/teams/:teamId/velocity
GET /api/teams/:teamId/burndown
GET /api/reports/sprint-summary
GET /api/reports/created-vs-resolved
GET /api/roadmap
POST /api/roadmap/items
PUT /api/roadmap/items/:id
GET /api/gantt
PUT /api/gantt/items/:id
GET /api/dora/summary
GET /api/risks
POST /api/risks
PUT /api/risks/:id
GET /api/dependencies
POST /api/dependencies
Style Guide
Jira-Specific Styling

Use a Jira / Atlassian-style visual system:

Colors
Primary Blue: #0052CC
Hover Blue: #0065FF
Background: #F4F5F7
Card Background: #FFFFFF
Border: #DFE1E6
Text Primary: #172B4D
Text Secondary: #5E6C84
Success: #36B37E
Warning: #FFAB00
Danger: #FF5630
Purple: #6554C0
Typography

Use an Atlassian-like clean sans-serif font style:

Headings: medium weight
Body: regular weight
Labels: small, uppercase or semi-bold
Tables: compact and readable
Components

Use Jira-like components:

Rounded cards, 3–6px radius
Light gray page background
Thin borders
Compact spacing
Blue primary buttons
Gray secondary buttons
Status lozenges
Avatar groups
Issue type icons
Priority icons
Jira-style tabs
Jira-style dropdown filters
Jira-style right-side drawer
Interaction Requirements

Add prototype interactions:

Click View Sprint to open team sprint detail
Click issue card to open Jira-style issue drawer
Drag issue cards across sprint board columns
Click milestone to open milestone drawer
Drag roadmap items across timeline
Resize Gantt bars
Click dependency line to view dependency details
Filter dashboard by team, sprint, project, and date range
Final Output Expected

Create a clickable Figma prototype with a Jira-specific look and feel, including:

Jira-style org dashboard
Jira-style sprint board
Jira-style backlog view
Jira Advanced Roadmaps-style roadmap
BigPicture-style Gantt view
Jira reports-style charts
DORA metrics dashboard
Risk and dependency board
Right-side issue and milestone detail drawers

The final design should look like a real Jira enterprise dashboard for management, not a generic analytics dashboard.

make it a leadership ready review dashboard
Thought for a couple of seconds

Use this updated prompt for Figma:

Figma Prompt: Jira-Style Leadership Review Dashboard

Create a leadership-ready Jira-style Agile Delivery Review Dashboard for senior management, delivery heads, Scrum Masters, Product Owners, and program managers.

The dashboard should look and feel like a real Jira / Atlassian enterprise dashboard, not a generic analytics UI.

This dashboard is for an organization-level Agile board where around 5 teams are tracked together. Each team has its own sprint cadence, product backlog, sprint backlog, milestones, roadmap, dependencies, and delivery risks.

Example teams:

VB Sprint 17
INFI Sprint 19
Design Sprint 50
Platform Sprint 12
QA Sprint 08

The purpose of this dashboard is to help leadership quickly understand:

Are teams on track?
Which milestones are at risk?
Which teams are overloaded?
What is the committed vs completed delivery?
Where are blockers and dependencies?
What is the overall sprint health?
What is the release confidence?
What requires management attention?
Dashboard Goal

Design a management review dashboard similar to Jira dashboards, Jira Advanced Roadmaps, and BigPicture-style planning views.

The dashboard should provide a complete view of:

Sprint progress
Team health
Delivery confidence
Roadmap progress
Milestone tracking
Gantt planning
Risks and blockers
Dependencies
Velocity trends
Burndown and burnup
DORA metrics
Executive summary insights

The layout should be suitable for a weekly leadership review meeting.

Jira-Specific Look and Feel

Use a UI style very close to Jira Cloud / Atlassian:

Jira-style left sidebar
Jira-style top navigation
Jira-style dashboard gadgets
Jira-style filters
Jira-style tables
Jira-style issue cards
Jira-style status lozenges
Jira-style sprint board
Jira-style backlog view
Jira Advanced Roadmaps-style timeline
BigPicture-style Gantt chart
Jira-style right-side issue drawer

Avoid a colorful generic BI dashboard. Keep it professional, compact, clean, and enterprise-ready.

Main Leadership Dashboard Screen
1. Executive Summary Header

At the top, show:

Org Agile Delivery Review

Subtitle:

Leadership view of sprint health, delivery progress, roadmap confidence, and cross-team risks

Add filters:

Program / Portfolio
Team
Sprint
Release
Date Range
Status
Risk Level

Also include:

Last Jira Sync Time
Export PDF button
Share Dashboard button
Refresh button
2. Leadership KPI Cards

Create compact Jira-style KPI cards showing:

Overall Delivery Health
Active Teams
Active Sprints
Total Committed Story Points
Completed Story Points
Completion %
Average Velocity
Carry Forward %
Open Blockers
Critical Risks
Delayed Milestones
Release Confidence
Deployment Frequency
Lead Time for Changes
Change Failure Rate
MTTR

Each card should show:

Metric name
Main value
Trend vs previous sprint
Status indicator
Small insight text

Example:

Release Confidence
78%
At Risk - 2 critical dependencies open

3. Management Attention Panel

Create a dedicated section named:

Needs Leadership Attention

This should highlight the most important items leadership must act on.

Show cards for:

Critical blocker
Delayed milestone
Cross-team dependency
Sprint scope increase
Team capacity risk
Release risk
High-priority unresolved bug

Each card should include:

Title
Impact
Owner
Due date
Linked Jira issue / Epic
Recommended action
Status

Example:

QA Automation Milestone Delayed
Impact: Release 2.1 may slip by 1 week
Owner: QA Lead
Action: Add 2 automation engineers this sprint

4. Team Delivery Health Table

Create a Jira-style leadership table with these columns:

Team
Current Sprint
Sprint Cadence
Sprint Progress
Committed SP
Completed SP
Remaining SP
Velocity Trend
Scope Change
Blockers
Risks
Delivery Health
Release Confidence
Action

Use Jira-style lozenges:

Healthy
Watch
At Risk
Blocked
Delayed

Each row should have:

View Sprint
View Risks
View Roadmap
5. Sprint Progress Overview

Create a consolidated sprint progress section showing:

Committed vs Completed story points
Sprint progress by team
Carry-forward work
Scope added after sprint start
Blocked work
Done vs not done

Use Jira-style reporting gadgets:

Burndown Chart
Burnup Chart
Velocity Chart
Sprint Predictability Chart
Created vs Resolved Issues
6. Roadmap and Milestone Confidence

Create a Jira Advanced Roadmaps-style leadership roadmap.

Show:

Initiatives
Epics
Features
Releases
Milestones
Target dates
Owners
Status
Confidence level
Dependencies

Use timeline view with team swimlanes.

Milestone statuses:

On Track
At Risk
Blocked
Delayed
Completed

Each milestone should be clickable and open a right-side drawer showing:

Milestone details
Linked epics
Linked stories
Dependency status
Risk level
Owner
Due date
Progress
Comments
Activity history
Leadership decision required
7. BigPicture-Style Gantt View

Create a Gantt section similar to Jira BigPicture.

Include:

Initiative / Epic / Story hierarchy
Timeline by week or month
Milestone diamonds
Dependency arrows
Critical path
Delayed items
Baseline vs current plan
Drag-and-drop planning
Resize timeline bars
Expand / collapse rows

Leadership should be able to quickly see:

Which roadmap items are slipping
Which dependencies are blocking delivery
Which milestones are on the critical path
Which teams are overloaded
8. Risk and Dependency Review

Create a Jira-style risk and dependency section.

Show two views:

Risk Board

Kanban columns:

New
Under Review
Mitigation In Progress
Escalated
Resolved

Each risk card should show:

Risk ID
Risk title
Impact
Probability
Owner
Due date
Linked team
Linked Jira issue
Mitigation plan
Dependency Map

Show cross-team dependencies between:

VB
INFI
Design
Platform
QA

Highlight:

Blocked dependencies
Overdue dependencies
Critical release dependencies
Dependencies requiring leadership escalation
9. DORA Metrics Leadership View

Create an engineering delivery section showing:

Deployment Frequency
Lead Time for Changes
Change Failure Rate
MTTR
Release Success Rate
Incident Trend
Failed Deployment Trend

Make this section simple and leadership-friendly.

Each metric should include:

Current value
Trend
Health status
Short interpretation

Example:

Lead Time for Changes
3.4 days
Improved by 12% from last sprint

10. Backlog Health Summary

Create a Jira-style backlog health section showing:

Product Backlog Size
Sprint Backlog Size
Ready Stories
Unrefined Stories
Aging Tickets
Blocked Stories
High-priority bugs
Bugs vs Stories vs Tasks
Backlog readiness %

Leadership insight examples:

“Design team has 42% unrefined backlog”
“QA has 11 aging tickets older than 30 days”
“Platform team has 4 critical bugs open”
Frontend Breakdown
Pages
Leadership Dashboard
Executive summary
Delivery health
Leadership attention panel
Team health
Risk and milestone summary
Team Drill-Down
Sprint details
Team velocity
Burndown
Sprint backlog
Risks
Capacity
Roadmap
Advanced roadmap
Milestones
Releases
Dependencies
Confidence levels
Gantt View
BigPicture-style timeline
Dependencies
Critical path
Baseline vs current progress
Reports
Burndown
Burnup
Velocity
Sprint report
Created vs resolved
Predictability
DORA Metrics
Engineering performance
Deployment and incident metrics
Risks & Dependencies
Risk board
Dependency map
Escalation view
Backend Breakdown
Backend Services
Jira Integration Service
Fetch Jira projects
Fetch boards
Fetch sprints
Fetch epics
Fetch issues
Fetch backlog
Fetch sprint reports
Fetch story points
Fetch issue changelog
Fetch blockers and dependencies
Leadership Metrics Engine
Overall delivery health
Release confidence
Milestone confidence
Team health score
Sprint predictability
Carry-forward percentage
Scope change percentage
Risk severity score
Sprint Metrics Service
Velocity
Burndown
Burnup
Committed vs completed
Blocked work
Sprint completion rate
Roadmap Service
Initiatives
Epics
Milestones
Releases
Dependencies
Roadmap confidence
Drag-and-drop roadmap updates
Gantt Service
Timeline planning
Baseline vs current plan
Critical path
Dependency arrows
Delayed items
DORA Metrics Service
Deployment frequency
Lead time for changes
Change failure rate
MTTR
Incident trend
Risk and Dependency Service
Risks
Blockers
Owners
Mitigation plans
Escalation status
Linked Jira issues
Suggested API Endpoints
GET /api/leadership/summary
GET /api/leadership/attention-items
GET /api/leadership/team-health
GET /api/leadership/release-confidence
GET /api/teams
GET /api/teams/:teamId/sprints
GET /api/teams/:teamId/issues
GET /api/teams/:teamId/backlog
GET /api/reports/burndown
GET /api/reports/burnup
GET /api/reports/velocity
GET /api/reports/predictability
GET /api/roadmap
PUT /api/roadmap/items/:id
GET /api/gantt
PUT /api/gantt/items/:id
GET /api/risks
POST /api/risks
PUT /api/risks/:id
GET /api/dependencies
GET /api/dora/summary
Jira-Specific Style Guide

Use Atlassian/Jira-like styling.

Colors
Primary Blue: #0052CC
Hover Blue: #0065FF
Background: #F4F5F7
Card Background: #FFFFFF
Border: #DFE1E6
Primary Text: #172B4D
Secondary Text: #5E6C84
Success: #36B37E
Warning: #FFAB00
Danger: #FF5630
Purple: #6554C0
Components

Use:

Jira-style dashboard gadgets
Jira-style issue cards
Jira-style status lozenges
Compact tables
Filter chips
Avatar groups
Issue type icons
Priority icons
Breadcrumbs
Tabs
Right-side drawers
Advanced Roadmaps-style timeline
BigPicture-style Gantt chart
Prototype Interactions

Add clickable interactions:

Click KPI card to open metric details
Click team row to open team drill-down
Click View Sprint to open sprint report
Click issue card to open Jira issue drawer
Drag issue cards between sprint board columns
Click milestone to open milestone drawer
Drag roadmap items on timeline
Resize Gantt bars
Click dependency arrow to view dependency details
Click risk card to open escalation details
Use filters for team, sprint, release, date range, and risk level
Final Expected Output

Create a clickable Figma prototype that feels like a real Jira leadership review dashboard.

The final design should include:

Leadership dashboard
Team drill-down
Sprint progress view
Roadmap view
BigPicture-style Gantt view
Reports section
DORA metrics view
Risk and dependency board
Jira-style issue drawer
Milestone detail drawer
Leadership attention panel

The dashboard should be suitable for a weekly or monthly leadership review meeting and should clearly show delivery health, milestone confidence, sprint progress, blockers, dependencies, team performance, and action items requiring management attention.