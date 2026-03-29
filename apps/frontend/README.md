# EventHub Frontend

Updated frontend baseline derived from the uploaded design ZIP and reshaped for the actual product scope:

- landing page
- auth shell
- dashboard
- create event wizard
- public events list
- event details
- participant registration
- demo payment page
- admin console

## Key updates

- domain model now matches the event-management app
- event types reduced to Wedding / Party / Concert
- tiers aligned to Standard / Premium / Plus
- create-event flow now includes:
  - date and time window
  - seat capacity
  - public/private visibility
  - free/paid ticketing
  - vendor selection
- payment page is now demo-payment oriented
- API service paths are adjusted toward the backend contract we will build next
- original premium invitation-style visual language is preserved

## Current state

This is still a frontend-first baseline.
Backend integration is the next phase.
