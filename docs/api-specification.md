# ElderCare AI API Specification

## Status

This document defines the planned Fastify server boundary. The existing
Express backend is currently scaffolded with typed module contracts only; no
API endpoint is available yet. Phase 1 will introduce Fastify and a
non-sensitive health endpoint only.

## API rules

- All protected endpoints require a verified Supabase access token.
- Public endpoints are limited to health/readiness and explicitly documented
  capability metadata.
- Authorization is enforced by Supabase RLS and repeated in server modules.
- Request and response schemas must be validated before implementation is
  considered complete.
- Errors use typed categories and never expose provider secrets or personal
  conversation content.
- AI and speech capabilities must report unsupported languages explicitly.
- SOS responses must distinguish requested, provider-confirmed, failed, and
  unavailable states.

## Planned endpoint groups

| Group | Planned endpoints | Required authorization |
| --- | --- | --- |
| Users | `GET /v1/users/me`, `PATCH /v1/users/me` | Current user |
| Companion | `POST /v1/companion/messages` | Conversation owner |
| Speech | `GET /v1/speech/capabilities` | Authenticated user |
| Family | `GET /v1/family`, `GET /v1/family/moments` | Senior-approved membership |
| Reminders | `GET /v1/reminders`, `POST /v1/reminders` | Senior owner or approved caregiver |
| Notifications | `GET /v1/notifications` | Current user |
| Safety | `GET /v1/safety/contacts`, `POST /v1/safety/sos` | Senior owner |

These are contracts to implement in later feature milestones, not live routes.

## Phase 1 endpoint

`GET /health`

Returns only service status, API version, and a non-sensitive timestamp. It
must not query or expose secrets. Readiness checks for Supabase are separate
from liveness and must not leak connection details.

## Planned response envelope

```json
{
  "data": {},
  "requestId": "server-generated-id"
}
```

Errors must use a separate shape:

```json
{
  "error": {
    "code": "authorization",
    "message": "You are not allowed to access this resource.",
    "retryable": false
  },
  "requestId": "server-generated-id"
}
```

## Sensitive flows

### Companion

The server validates language capability, applies safety policy, calls only
server-held provider credentials, and persists only approved metadata and
retention-controlled content.

### SOS

The server must authorize the senior, require an idempotency key, record a
pending event, call a verified delivery provider, and return confirmed status
only after the provider confirms delivery.
