# EventHub Starter Monorepo

Production-oriented MVP scaffold for a full-stack event management platform.

## Stack
- Frontend: React + Vite + TypeScript + Tailwind
- API Gateway: Node.js + Express + TypeScript
- Backend services: Spring Boot 3
- Database: MySQL 8 via Docker Compose
- Email delivery: Brevo transactional email API
- Payments: internal demo-payment flow for fast MVP delivery

## What is included
- Monorepo structure
- Docker Compose for MySQL
- Seeded catalog data for Kolkata, Mumbai, Bangalore
- Shared database schema SQL
- API gateway starter with auth-aware proxy shell
- Spring Boot service skeletons for all services
- Concrete payment-service starter for demo orders
- Concrete notification-service starter for Brevo integration
- Frontend app shell with route map and event creation + demo payment UI
- Docs for architecture and execution pipeline

## What is intentionally thin
This is a vertical-slice scaffold, not a finished production system. Core business rules and contracts are wired into docs and starter code so implementation can proceed fast without redesign churn.

## Quick start
1. Copy `.env.example` values where needed.
2. Start infra:
   ```bash
   docker compose -f infra/docker/docker-compose.yml up -d
   ```
3. Run gateway:
   ```bash
   cd apps/api-gateway && npm install && npm run dev
   ```
4. Run frontend:
   ```bash
   cd apps/web && npm install && npm run dev
   ```
5. Configure Brevo sender email and API key before using notification-service.

## Core MVP rules
- Registration closes when capacity is full or event start time is within 24 hours.
- Venue + decoration vendor + food vendor must all be available for selected date/time window.
- Public events are searchable. Private events require access code or invite flow.
- Admin can cancel/reschedule and trigger notifications.
- Paid registration uses internal demo-payment states: `PENDING`, `SUCCESS`, `FAILED`, `REFUNDED`.

## Current implementation focus
1. Auth + profile setup
2. Catalog read APIs with availability filters
3. Event creation transaction flow
4. Registration capacity enforcement with DB locking
5. Demo payment state machine
6. Brevo-backed email notifications
7. Admin analytics and event operations
