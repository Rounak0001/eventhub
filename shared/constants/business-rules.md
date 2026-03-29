# Business Rules

- Availability conflict exists when `requested_start < existing_end && requested_end > existing_start`.
- Registration closes when booked seats reach seat capacity.
- Registration also closes 24 hours before event start.
- Private events require an access code or invite flow.
- Paid events in MVP use internal demo payments instead of a real payment gateway.
- Notification delivery uses Brevo transactional email API.
