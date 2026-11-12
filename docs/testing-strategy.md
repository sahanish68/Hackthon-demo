# ElderCare AI Backend Testing Strategy

## Test layers

### Unit tests

Test pure validation, authorization decisions, capability matching, timezone
calculation, recurrence rules, idempotency decisions, and safe error mapping.
Unit tests must not use production credentials or real provider calls.

### Fastify integration tests

Use an in-memory Fastify instance and inject requests without opening a
network port. Cover health, malformed JSON, validation failures, CORS,
authentication failures, rate limits, and error envelopes.

### Authentication and authorization tests

Test missing, expired, malformed, and valid Supabase tokens. Test senior,
family, trusted-contact, revoked-access, and cross-user access attempts.
Identity must always come from verified token claims.

### Database and RLS tests

Run migrations against an isolated Supabase/Postgres test project or local
equivalent. Verify RLS for profiles, preferences, contacts, relationships,
consents, routines, reminders, push tokens, and future safety records.

### Provider contract tests

Mock AI, speech, and Expo push providers behind typed interfaces. Verify
timeouts, unsupported languages, malformed provider payloads, invalid tokens,
receipt failures, and confirmed-delivery semantics.

### Mobile integration checks

Verify the existing React Native client can call the API with a public base
URL, receives safe error envelopes, handles expired sessions, and does not
receive service-role or provider secrets.

## Required focused cases

| Area | Cases |
| --- | --- |
| Environment | Missing secret, malformed URL, production unsafe configuration |
| Auth | Missing, expired, revoked, malformed, valid token |
| Authorization | Cross-user profile, reminder, family, token, and safety access |
| Validation | Oversized body, unknown fields, invalid language, invalid timezone |
| AI | Consent denied, unsupported language, timeout, provider refusal |
| Speech | STT/TTS unavailable, code-mix unsupported, provider confirmation |
| Family | Grant, limited scope, revoke, revoked access |
| Reminders | Timezone, recurrence, duplicate idempotency, completion |
| Push | Token registration, invalid token, receipt failure, confirmed receipt |
| SOS | No confirmation, duplicate key, provider failure, confirmed delivery |
| Privacy | Log redaction, retention behavior, deletion workflow |

## Quality gates per phase

1. `npm run build` in `backend/`.
2. `npm test` with focused tests for the changed module.
3. `npm audit` for the backend dependency tree.
4. RLS policy tests for database changes.
5. Root mobile TypeScript and lint checks when shared contracts/configuration
   change.
6. Manual review of error messages and logs for personal-data leakage.
