# ElderCare AI Architecture

## Technology baseline

- Expo SDK 58 with React Native and TypeScript.
- Expo Router for file-based navigation.
- React Native `StyleSheet` and native primitives for UI.
- Supabase Auth, Postgres, Storage, Realtime, and Edge Functions where needed.
- `expo-secure-store` for sensitive local session material.
- `expo-notifications` for local and push notification orchestration.
- A server-side AI gateway for text, speech, language detection, and safety
  policy enforcement.

The server boundary is scaffolded under `backend/` as an Express/TypeScript
service, but the approved target architecture is Fastify. Phase 1 must
migrate the HTTP boundary deliberately while preserving the typed module and
provider contracts; it must not silently overwrite existing files.

The Expo Router entry point and initial feature routes are implemented under
`src/app/`. Provider integrations and persistent data flows remain separate
follow-up milestones.

## Proposed source layout

```text
app/
  _layout.tsx
  (auth)/
  (senior)/
  companion/
  family/
  routine/
  safety/
  assistance/
  settings/
src/
  components/
  design/
  features/
  hooks/
  i18n/
  lib/
  services/
  state/
  types/
  validation/
supabase/
  migrations/
  functions/
docs/
backend/
  src/config/
  src/plugins/
  src/middleware/
  src/modules/
  src/services/
  src/utils/
```

Routes remain thin. Screens compose feature modules, while services own
network, permissions, notifications, speech, and persistence.

## Layering

1. **Presentation:** route screens, accessible components, design tokens.
2. **Feature/application:** use cases such as onboarding completion, send
   companion message, schedule reminder, and request SOS.
3. **Domain:** typed entities, capability contracts, policy decisions, and
   validation.
4. **Infrastructure:** Supabase client, notification adapter, speech adapters,
   connectivity monitor, and AI gateway client. Backend infrastructure uses
   Fastify plugins and server-only Supabase clients; the mobile app uses
   SecureStore for its session material.

No screen should call Supabase or an AI provider directly.

## Navigation

- `(auth)` contains onboarding and authentication flows.
- `(senior)` contains the authenticated senior shell.
- Modal routes are reserved for confirmation, permission explanation, and
  deliberate SOS confirmation.
- Deep links must validate the destination and current authorization before
  rendering data.

## State and data flow

- Server state is fetched through typed service functions and cached with
  explicit stale/offline behavior.
- Local preferences and non-sensitive drafts use a small persistence adapter.
- Tokens and sensitive session values use SecureStore only.
- Feature state is scoped to the current authenticated user and cleared on
  sign-out.
- Every mutation returns an explicit result or typed error; success-shaped
  fallbacks are not permitted.

## AI and speech boundaries

The mobile app sends a minimal, validated request to an authenticated server
gateway. The gateway applies policy, provider routing, language capability
checks, redaction, rate limits, and audit-safe metadata. Providers are never
called with client-held secrets.

Speech is represented by adapters:

- `SpeechToTextProvider`
- `TextToSpeechProvider`
- `LanguageDetectionProvider`
- `CompanionProvider`

Each adapter reports supported languages and explicit unavailable/error states.

## Supabase data model direction

Initial tables are expected to include `profiles`, `trusted_contacts`,
`family_memberships`, `consents`, `routines`, `reminders`, `conversations`,
`conversation_messages`, `notifications`, and `sos_events`. Each row includes
ownership or membership fields needed by RLS. Schema details and migrations
must be approved with the feature specification that introduces them.

## Backend module boundaries

```text
backend/src/
  config/       environment schema and runtime configuration
  plugins/      Fastify, Supabase, CORS, logging, and rate-limit plugins
  middleware/   authentication and request context hooks
  modules/      users, companion, family, reminders, notifications, safety
  services/     AI, speech, push, and provider adapters
  utils/        errors, request IDs, redaction, and shared validation
  app.ts        Fastify application composition
  server.ts     validated startup and graceful shutdown
```

Routes remain thin. Each module owns schemas, authorization checks, service
calls, and focused tests. Ordinary user requests must use the authenticated
Supabase context rather than a service-role client.

## Observability and resilience

- Typed error categories distinguish validation, authentication,
  authorization, connectivity, provider, and unknown failures.
- User-facing errors are calm, actionable, and never leak internals.
- Crash and performance telemetry must be privacy-minimal and consent-aware.
- Retry policies use bounded backoff and idempotency keys for sensitive
  actions, especially SOS and reminder creation.
