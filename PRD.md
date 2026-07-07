# Vimars v2 - Product Requirements Document (PRD)

## Version

**v2.0**

---

# 1. Overview

## Product Name

**Vimars**

## Product Type

Mobile-first Web Application

## Vision

Vimars is a modern productivity platform that helps users build consistent habits, manage personal notes and tasks, and visualize their daily progress through a clean, intuitive interface.

The primary goal of this project is educational. It is designed to teach modern full-stack web development by building a production-quality application from the ground up while understanding every architectural decision.

---

# 2. Objectives

## Product Objectives

* Help users build and maintain habits.
* Provide a simple space for personal notes.
* Offer lightweight task management.
* Present meaningful daily progress through a dashboard.
* Create a fast, responsive experience optimized for mobile devices.

## Learning Objectives

By the completion of Vimars, the developer should understand:

* Next.js App Router
* React architecture
* Server vs Client Components
* Authentication and Authorization
* PostgreSQL database design
* Prisma ORM
* RESTful API design using Route Handlers
* Form validation
* File uploads
* Deployment
* Performance optimization
* Responsive UI development

---

# 3. Target Users

### Primary Users

* Students
* Developers
* Professionals
* Anyone interested in habit tracking and personal productivity

---

# 4. Platform

## Initial Release

* Mobile-first Web Application

## Supported Devices

* Mobile browsers (Primary)
* Desktop browsers
* Tablets

## Future Possibilities

* Progressive Web App (PWA)
* Push Notifications
* Native mobile applications

---

# 5. Technology Stack

## Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* HeroUI
* Animate UI Icons

## Backend

* Next.js Route Handlers

## Database

* PostgreSQL
* Prisma ORM

## Authentication

* Auth.js

## Validation

* Zod

## Forms

* React Hook Form

## Deployment

* Vercel

## File Storage

* Supabase Storage

---

# 6. Core Features

## Authentication

Users can:

* Register
* Login
* Logout
* Maintain authenticated sessions
* Manage account information

---

## Dashboard

Displays:

* Today's habits
* Habit completion summary
* Active tasks
* Recent notes
* Productivity overview

---

## Habits

Users can:

* Create habits
* Edit habits
* Delete habits
* Mark daily completion
* Track streaks
* View completion history

---

## Notes

Users can:

* Create notes
* Edit notes
* Delete notes
* Search notes
* Organize notes

---

## Temporary Tasks

Users can:

* Create quick tasks
* Mark tasks complete
* Delete tasks
* View pending tasks

---

## User Profile

Users can:

* Update profile information
* Upload profile image
* View personal statistics

---

## Settings

Users can configure:

* Theme
* Privacy settings
* Notification preferences
* Account settings

---

# 7. Future Features (Not Included in Version 1)

* Social feed
* Friends / Following
* Shared habits
* AI assistant
* Rich text editor
* Calendar integration
* Offline support
* Real-time synchronization
* Push notifications
* Team workspaces

---

# 8. Non-Goals

The first version of Vimars will intentionally avoid:

* Chat systems
* Complex permissions
* Enterprise features
* Native mobile applications
* AI-generated recommendations
* Real-time collaboration

---

# 9. User Experience Principles

The application should prioritize:

* Mobile-first design
* Fast interactions
* Minimal visual clutter
* Consistent UI components
* Accessible interfaces
* Smooth, purposeful animations
* Clear navigation
* Responsive layouts

---

# 10. Design Philosophy

Vimars should feel:

* Clean
* Modern
* Calm
* Responsive
* Professional

Animations should enhance usability rather than distract from it.

---

# 11. Development Philosophy

Every feature will be developed using the following workflow:

1. Understand the problem.
2. Design the user experience.
3. Design the database.
4. Design the API.
5. Implement the backend.
6. Implement the frontend.
7. Test thoroughly.
8. Refactor for readability.
9. Reflect on the concepts learned.

---

# 12. Development Roadmap

## Phase 0

Foundation

Deliverables:

* Project setup
* Folder structure
* Development environment
* Git repository
* Initial architecture

---

## Phase 1

Authentication

Deliverable:

Complete user authentication flow.

---

## Phase 2

Database

Deliverable:

Production-ready database schema and migrations.

---

## Phase 3

Habits

Deliverable:

Complete habit management system.

---

## Phase 4

Dashboard

Deliverable:

Daily productivity dashboard with statistics.

---

## Phase 5

Notes

Deliverable:

Personal note management system.

---

## Phase 6

Temporary Tasks

Deliverable:

Quick task management.

---

## Phase 7

Profile & Settings

Deliverable:

User profile management and application settings.

---

## Phase 8

Polish

Deliverable:

Performance improvements, animations, responsive refinements, accessibility enhancements, and deployment.

---

# 13. Definition of Success

The project will be considered successful when:

* All core features are functional.
* The application is deployed publicly.
* The codebase is clean and maintainable.
* The developer can confidently explain every major architectural decision.
* Vimars is portfolio-ready and demonstrates professional full-stack development skills.
