# API Contracts

Base path: `/api/v1`

## Auth
- POST `/auth/register`
- POST `/auth/login`
- GET `/auth/me`

## Catalog
- GET `/catalog/cities`
- GET `/catalog/event-types`
- GET `/catalog/event-options?cityId=&eventTypeId=&date=&startTime=&endTime=`

## Events
- POST `/events`
- GET `/events/public`
- GET `/events/:id`
- POST `/events/:id/cancel`
- POST `/events/:id/reschedule`

## Registrations
- POST `/events/:id/register`
- POST `/events/:id/register/private`

## Payments
- POST `/payments/demo/create-order`
- POST `/payments/demo/complete`
- POST `/payments/demo/fail`
- POST `/payments/demo/refund`
- GET `/payments/:id`
- GET `/payments/user/me`

### Example create-order payload
```json
{
  "eventId": 12,
  "registrationId": 45,
  "payerUserId": 7,
  "amount": 2500,
  "currency": "INR",
  "paymentType": "REGISTRATION"
}
```

### Example complete payload
```json
{
  "paymentId": 99,
  "demoTransactionId": "DEMO_TXN_20260329_001"
}
```

## Notifications
- POST `/notifications/send`
- POST `/notifications/event-created`
- POST `/notifications/event-cancelled`
- POST `/notifications/event-rescheduled`

Brevo uses the transactional email endpoint `POST /v3/smtp/email` with the `api-key` header and JSON body.

## Admin
- GET `/admin/dashboard/metrics`
- GET `/admin/transactions`
- POST `/admin/events/:id/cancel`
- POST `/admin/events/:id/reschedule`
