# Vimars Journal — Session 01

Date: 2026-07-07

---

# Today Vimars Became Real.

Today was the first day where Vimars stopped feeling like another Next.js project and started feeling like software.

Until now, I had been building pages.

Today, I built architecture.

---

# What I Learned

## Next.js

Today I finally understood that layouts are more than wrappers.

Layouts define ownership.

Shared components belong inside layouts instead of individual pages.

I also understood why Route Groups exist.

Not because they're required, but because they help organize large applications.

---

## React

Today I finally understood why `children` exists.

Instead of memorizing it, I now understand that layouts receive whatever page they wrap.

That mental model clicked.

---

## HeroUI

I learned how to integrate a third-party UI library instead of blindly copying examples.

More importantly, I learned that documentation is a starting point, not the final product.

---

## Project Architecture

One of the biggest lessons today was learning to ask:

> Why does this file exist?

instead of

> How do I write this file?

That small change completely changes how I approach software.

---

# Backend

Today I installed Prisma and connected it to a real PostgreSQL database hosted on Supabase.

This was my first experience working with a production-grade database instead of local JSON or fake data.

I now understand the overall architecture:

Frontend

↓

Route Handler

↓

Prisma

↓

PostgreSQL

Instead of thinking:

"Database"

I now think about the complete request pipeline.

---

# ORM

Today I learned that Prisma is not the database.

Prisma is the translator between TypeScript and SQL.

That mental model will probably stay with me forever.

---

# Database Design

Instead of copying a schema from a tutorial, I designed one myself.

The V1 database currently contains:

- User
- Habit
- HabitLog
- Task
- Note
- Category
- UserSettings

I also designed several enums to make the data more consistent.

Examples:

- HabitType
- Frequency
- Priority
- AvatarType
- Theme

---

# Avatar System

Instead of immediately storing uploaded images, I designed an avatar abstraction.

Users begin with generated avatars using a provider.

The avatar is generated using the username (stored as avatarSeed).

Later, users can upload their own images.

The frontend simply decides how to render the avatar depending on AvatarType.

This was my first experience thinking about extensibility before implementation.

---

# Relationships

Today I learned why IDs alone are not enough.

Databases know about foreign keys.

Prisma also wants to know about relationships.

Those are different concepts.

Although I still need more practice, I now understand why relations exist.

---

# Biggest Mental Shift

Earlier I used to think:

"What technology should I use?"

Today I found myself asking:

"What information should this product store?"

That feels like a completely different way of thinking.

---

# Things I Grasped Quickly

Looking back, I noticed that I naturally understood:

- System architecture
- Product thinking
- Database design
- Entity relationships
- Route organization
- Layout ownership
- Component organization

Whenever discussions were about architecture or "why", I rarely got stuck.

Those concepts felt intuitive.

---

# Things I Struggled With

I noticed that I slow down when dealing with syntax.

Examples:

- Prisma syntax
- TypeScript type annotations
- JSX syntax rules
- React component signatures

Interestingly...

The concepts were usually clear.

The language used to express those concepts was what slowed me down.

That is actually encouraging.

Syntax can always be looked up.

Understanding cannot.

---

# Biggest Mistakes Today

I initially wrote Prisma models using:

- "string"
- "timestamp"
- "boolean"

instead of Prisma's own types.

This reminded me that every language has its own syntax.

The design was correct.

The implementation language was different.

---

# Debugging Lessons

Today Prisma 7 surprised me.

Database configuration no longer lives inside schema.prisma.

Instead it now lives inside prisma.config.ts.



I also encountered authentication issues while connecting Supabase.

Instead of panicking, I learned to narrow the problem.

By the end I understood the difference between:

- Connection problems
- Authentication problems
- Empty database problems

Those are three completely different situations.

---

# Database Migrations

Today I created my first migration.

I now understand the basic idea:

schema.prisma

↓

Migration

↓

PostgreSQL

I intentionally did not dive deeply into migrations yet.

I know we'll revisit them when the project naturally requires schema evolution.

---

# Things I'm Parking For Later

There were several interesting topics that came up today.

Instead of chasing every rabbit hole, I intentionally postponed them.

Future topics include:

- JWT
- Bearer Tokens
- Cookies
- Auth.js
- Session Management
- Database Migrations (advanced)
- UUID vs CUID
- Database Indexes
- Composite Indexes
- Query Optimization

These will be learned when Vimars naturally needs them.

---

# About Database Indexes

Today my mentor intentionally did not introduce indexes.

Not because they are unimportant.

Because right now I have no slow queries.

Indexes solve performance problems.

I should first build the application.

Later, when I start asking:

"Why is this query slow?"

that will be the correct time to learn:

- Indexes
- Composite indexes
- Query planning
- Performance optimization

Learning them today would only create memorization.

---

# What My Mentor Observed About Me

One observation surprised me.

I don't seem to struggle with software architecture.

Instead, I naturally think in systems.

When discussing products, databases, or application structure, I usually reason my way toward good designs.

However, I often pause on syntax.

This means my bottleneck is not engineering.

It is language.

That's a much easier problem to solve.

Another interesting observation:

Whenever the discussion became too theoretical, I asked to return to coding.

That feedback changed the pace of the mentoring.

Instead of long lectures, we adopted:

Code

↓

Small explanation

↓

More code

That rhythm felt much more natural for me.

---

# Personal Reflection

Today felt different.

For the first time, I wasn't trying to finish a tutorial.

I was building something that belongs to me.

Vimars is no longer just another side project.

It has an architecture.

It has a database.

It has a roadmap.

Most importantly...

I understand why it looks the way it does.

That feels far more valuable than simply having another project on GitHub.

---

# Session Summary

Completed:

✅ Next.js Architecture

✅ Application Layouts

✅ Route Groups

✅ HeroUI Integration

✅ Prisma Installation

✅ Supabase PostgreSQL

✅ Prisma Schema

✅ Database Design

✅ Relationships

✅ First Migration

✅ Prisma Studio

Current Status:

Vimars officially has a real backend.

Next Session:

- Prisma Client
- Seed Data
- Route Handlers
- First CRUD API
- Frontend fetching real database records

---

# API Route Handlers & Query Optimization

Today I wrote my first dynamic API routes in Next.js (`/api/habits/[id]/logs` and `streak`).

I learned a crucial Next.js App Router convention:
1. The first argument is ALWAYS the `Request` object.
2. The second argument is the `context`, containing the `params` Promise.

More importantly, I learned how to optimize database queries. 
Instead of querying a Habit and then making a completely separate query for its HabitLogs, I used Prisma's `include` property.
This performs a SQL `JOIN` under the hood, fetching everything in a single, highly optimized trip to the database.

I also learned how to reuse types (like `RouteParams`) to keep my API signatures clean and type-safe.

---

"Today I stopped asking what framework to learn.

I started asking how to build software."
