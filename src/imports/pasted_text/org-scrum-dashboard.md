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