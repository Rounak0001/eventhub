# EventZen Architecture

## Target shape

Frontend -> API Gateway -> Spring Boot services -> shared MySQL

## Services

- auth-service: register, login, token validation
- user-service: profile setup and account data
- catalog-service: cities, event types, venues, decoration vendors, food vendors, availability lookups
- event-service: create/update/cancel/reschedule events, pricing, booking resources
- registration-service: attendee registration, seat control, private access validation
- payment-service: internal demo orders, transaction records, refund simulation
- notification-service: Brevo email dispatch and templates
- admin-service: metrics, reports, admin operations

## MVP reality

Shared database is the pragmatic move. Keep service boundaries in code, not infra complexity.

## Hard business rules

1. Resource unavailable when requested_start < existing_end AND requested_end > existing_start.
2. Registration blocks at sold-out or event_start - 24h.
3. Private events require access code.
4. Admin cancel/reschedule must notify impacted participants.
5. Seat updates must be transactional.
6. Demo payment preserves the paid-event workflow without external gateway risk.

## Brevo integration

Brevo's REST API uses the `https://api.brevo.com/v3/` base path and requires the `api-key` and `content-type: application/json` headers. Transactional email sending is done through `POST /v3/smtp/email`.
