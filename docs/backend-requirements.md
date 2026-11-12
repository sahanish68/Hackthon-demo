# ElderCare AI Backend Requirements

## Status and scope

This specification defines the secure hybrid backend for the existing Expo
mobile application. The repository currently contains a structure-only
Express/TypeScript scaffold under `backend/`; Phase 1 will migrate that
boundary to Fastify without deleting the existing feature/module contracts.

The backend owns privileged provider access, authentication verification,
authorization, privacy controls, persistence orchestration, notification
delivery, and safety workflow state. The mobile app remains responsible for
presentation, platform permissions, and user-facing navigation.

## Functional requirements

### BR1. Authentication

- Verify Supabase access tokens on protected requests.
- Derive the authenticated user only from the verified token.
- Never trust a user ID, role, or ownership claim from request bodies.
- Return explicit authentication and authorization errors.
- Handle expired, revoked, malformed, and missing tokens.
- Support sign-out/session-expiration behavior through Supabase Auth and
  client session invalidation.

### BR2. User management

- Store profile, preferred language, accessibility preferences, and settings.
- Validate all profile updates with Zod schemas.
- Support an auditable account-deletion request workflow.
- Do not log profile values, access tokens, or sensitive preferences.

### BR3. AI companion

- Expose a protected conversation boundary.
- Route requests through a provider abstraction with server-held credentials.
- Enforce language capability checks, request limits, consent, and retention.
- Support configurable providers without exposing provider names or keys to the
  mobile client.
- Treat provider output as untrusted and apply safe error handling.
- Do not persist conversation history unless the user has appropriate consent.
- Identify unsupported capabilities honestly.

### BR4. Multilingual voice

- Define typed speech-to-text and text-to-speech provider interfaces.
- Represent capabilities for English, Hindi, Tamil, Telugu, Malayalam, Kannada,
  Bengali, and Marathi.
- Support code-mixed language only when the selected provider confirms it.
- Return capability metadata and explicit unavailable states.
- Never claim transcription or synthesis succeeded without provider
  confirmation.

### BR5. Family and consent

- Model trusted contacts and family relationships separately.
- Require explicit senior consent for every sharing scope.
- Limit family access to approved data categories.
- Support revocation and ensure revoked access is rejected by RLS and the API.
- Never infer family authorization from contact-list membership.

### BR6. Reminders

- Create, update, delete, and complete reminders.
- Support recurring reminders with validated recurrence rules.
- Store the user's IANA timezone and calculate occurrences server-side.
- Use idempotency for create/update operations where duplicate actions would
  be harmful.

### BR7. Notifications

- Register and revoke Expo push tokens.
- Associate tokens only with the authenticated user.
- Send only authorized, minimal payloads.
- Process provider receipts and invalid-token responses.
- Report confirmed delivery only when the provider confirms it.

### BR8. Safety

- Require deliberate SOS confirmation and an idempotency key.
- Record a state transition such as `requested`, `processing`, `confirmed`,
  `failed`, or `unavailable`.
- Notify only consented trusted contacts.
- Do not claim emergency services were contacted without verified provider
  confirmation.
- Avoid storing unnecessary location or conversation content.

## Non-functional requirements

- Fastify REST API with strict TypeScript and typed service boundaries.
- Zod request, response, environment, and provider payload validation.
- Supabase PostgreSQL with RLS enabled on all user data.
- CORS limited to explicitly approved origins.
- Bounded rate limits per user and per sensitive route.
- HTTPS termination in production and secure proxy configuration.
- Structured logs that exclude tokens, message content, exact location, PINs,
  OTPs, and banking credentials.
- Request IDs and safe error envelopes without internal stack traces.
- Health/readiness checks that do not reveal secrets or database credentials.
- Unit, integration, RLS, authorization, and provider-contract tests.

## User stories

1. As a signed-in senior, I can update my profile and preferences without
   another user accessing them.
2. As a senior, I can use the AI companion while knowing which language and
   provider capabilities are actually available.
3. As a senior, I can choose whether conversation history is retained.
4. As a senior, I can share selected information with a trusted family member
   and revoke that access later.
5. As a senior, I can create reminders in my local timezone.
6. As a senior, I can request an SOS and see its real delivery status.
7. As a family member, I can access only information explicitly shared with me.

## Acceptance criteria

- Requests without valid Supabase tokens cannot reach protected handlers.
- A token for user A cannot read or mutate user B's profile, reminders, family
  data, push tokens, or safety events.
- RLS denies direct unauthorized database access even if the API has a bug.
- Every mutable endpoint rejects malformed, oversized, and unknown-sensitive
  input fields.
- Unsupported languages produce a clear capability response.
- Provider timeout/failure states are distinguishable from confirmed success.
- A revoked family relationship stops access without relying on client cache.
- SOS duplicate requests with the same idempotency key do not create duplicate
  delivery workflows.

## Phase 1 exit criteria

- Existing Express scaffold migration plan is recorded and approved.
- Fastify, TypeScript, Zod, logging, CORS, and rate-limit dependencies are
  selected at Expo-independent backend versions.
- Environment validation rejects missing production configuration.
- A non-sensitive health endpoint responds successfully.
- Backend build and focused tests pass.
