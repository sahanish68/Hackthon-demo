# ElderCare AI Security Model

## Threat model

The application handles identity, family relationships, reminders,
conversation content, trusted contacts, and potentially location. Primary
threats are account takeover, unauthorized family access, exposed provider
secrets, malicious deep links, notification leakage, impersonation/scams, and
false emergency-delivery claims.

## Controls

### Identity and sessions

- Use Supabase Auth with verified session state.
- Store sensitive session material through SecureStore-backed persistence.
- Clear feature state and cached private data on sign-out.
- Avoid logging access tokens, refresh tokens, authorization headers, or
  personal data.

### Authorization

- Enable RLS on every user-data table.
- Use explicit senior ownership and approved membership relationships.
- Enforce access again in Edge Functions for privileged operations.
- Never rely on hidden UI or client-side role checks as authorization.
- Test senior, family, trusted-contact, unauthenticated, and revoked-access
  cases.

### Secrets and providers

- Client configuration may contain only public, non-secret Supabase values.
- AI, service-role, signing, and provider credentials remain server-side.
- Validate provider responses and time out safely.
- Rate-limit AI and emergency-related operations.

### Permissions and sensitive actions

- Explain microphone, camera, location, and notification use in context.
- Request platform permission only after the user understands the purpose.
- Require deliberate SOS confirmation, deduplicate requests, and show actual
  delivery status from the service.
- Do not silently track location or record audio.

### Privacy

- Collect minimal profile and relationship data.
- Use retention rules for conversations, location, logs, and SOS events.
- Give users controls to review, delete, or disable non-required data where
  supported.
- Exclude private conversation content and location from analytics by default.

### Input and output safety

- Validate all client and server inputs with shared schemas where practical.
- Treat deep-link parameters, notification payloads, and provider output as
  untrusted.
- Redact secrets and personal data from errors.
- The AI must not present itself as human family, a doctor, or an emergency
  responder.

## Security verification gates

Each feature must include:

1. Authorization tests for every data access path.
2. Input validation and malformed payload tests.
3. Permission-denied and provider-timeout tests.
4. Secret/log review.
5. Dependency and configuration review.
6. Manual accessibility and privacy review on a physical Android device.

Before release, run dependency audit, RLS policy tests, deep-link tests,
notification redaction checks, and an Android/iOS production-config review.

The current backend scaffold must not be treated as deployed security
controls. Phase 1 may make the service runnable only after environment
validation, Fastify error handling, CORS, rate limiting, and the non-sensitive
health endpoint are implemented and tested. Protected feature routes remain
blocked until Supabase authentication and authorization are implemented.
