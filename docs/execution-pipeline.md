# Execution Pipeline

## Delivery order
1. MySQL schema + seed data
2. Auth and profile flows
3. Catalog APIs
4. Event creation flow
5. Registration locking logic
6. Demo payment flow
7. Brevo email notifications
8. Admin metrics and reports
9. Cancel/reschedule orchestration

## Demo payment pipeline
1. Create local order in payment-service
2. Show demo checkout modal in frontend
3. Simulate success or failure
4. Persist payment row with provider=`DEMO`
5. Confirm or block registration based on payment state
6. Surface transactions in admin analytics

## Notification pipeline
1. Event or payment domain action emits notification payload
2. notification-service builds Brevo request body
3. Brevo transactional email API sends the message
4. Message id is stored for audit/debug
5. Failure is logged and can be retried
