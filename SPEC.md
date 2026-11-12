# ElderCare AI Specification

## 1. Product summary

ElderCare AI is a mobile-first, multilingual family companion for senior
citizens. It reduces social isolation, supports daily routines, explains
digital tasks, and provides deliberate safety workflows while encouraging
connection with real family members and trusted caregivers.

The application targets Android first for device testing and remains
compatible with iOS deployment through Expo. It is not a web application.

## 2. Product principles

- **Simple by default:** one clear primary action per surface, large controls,
  plain language, and predictable navigation.
- **Human-centered:** AI supports, but never replaces, family or professional
  care.
- **Trustworthy:** permissions, data use, AI limitations, and action status are
  explicit.
- **Accessible:** readable typography, high contrast, screen-reader labels,
  touch targets of at least 44 points, and light/dark themes.
- **Safe failure:** offline, denied-permission, timeout, and delivery-failure
  states are visible and actionable.

## 3. Personas and roles

### Senior

Uses the application for companionship, routines, family communication,
digital assistance, and safety actions.

### Trusted contact

Receives explicitly authorized safety alerts and selected updates. A trusted
contact is not automatically granted access to all senior data.

### Family member

Can access only the senior-approved family features and data.

### Care administrator

Reserved for a future, explicitly authorized workflow. No administrator
privileges are assumed in the mobile client.

## 4. Supported languages

The localization architecture must support:

| Code | Language | Initial status |
| --- | --- | --- |
| `en` | English | MVP |
| `hi` | Hindi | MVP |
| `ta` | Tamil | Planned provider validation |
| `te` | Telugu | Planned provider validation |
| `ml` | Malayalam | Planned provider validation |
| `kn` | Kannada | Planned provider validation |
| `bn` | Bengali | Planned provider validation |
| `mr` | Marathi | Planned provider validation |

The UI may expose a language only when its translation bundle is present.
Speech-to-text, text-to-speech, and AI support are capability-driven and must
show an honest unsupported state instead of claiming coverage.

## 5. User stories

1. As a senior, I can select my language and accessibility preferences during
   setup so the application is comfortable to use.
2. As a senior, I can see today's important tasks and reminders on one home
   screen.
3. As a senior, I can start a patient AI conversation by voice or text and
   change language when supported.
4. As a senior, I can reach family shortcuts, events, and approved
   communication actions quickly.
5. As a senior, I can deliberately activate SOS, confirm the action, and see
   whether delivery was confirmed.
6. As a senior, I can learn common smartphone tasks through guided tutorials.
7. As a senior, I can change text size, voice, language, privacy, and
   accessibility settings later.
8. As a trusted contact, I can receive only alerts and information explicitly
   authorized by the senior.

## 6. Feature acceptance criteria

### Onboarding

- Welcome, language, profile, accessibility, trusted contact, and privacy
  consent steps are resumable and have clear progress.
- Required consent is never preselected.
- Invalid or incomplete input is explained inline.
- A user can review and change choices before completion.

### Senior home

- Greeting, AI companion, schedule, family shortcuts, medication reminders,
  notifications, and SOS are visible without deep navigation.
- Loading, empty, offline, and error states are present.
- SOS remains deliberate and visually distinct from routine actions.

### AI companion

- Text chat is available when microphone access is denied or unavailable.
- Listening and speaking states are distinguishable.
- The assistant identifies itself as AI, does not claim to be family or a
  doctor, and encourages human help for urgent or sensitive matters.
- Conversation history is user-controlled and privacy-aware.

### Family, routine, assistance, and safety

- Family content is permission-scoped.
- Reminders display local time and support notification permission failure.
- Safety actions require confirmation and report service delivery status.
- Tutorials are usable without an account connection after they are cached.

## 7. Non-functional requirements

- Strict TypeScript with no unchecked boundary data.
- Android and iOS responsive layouts using React Native components and
  `StyleSheet`; no web-only UI.
- Secure session storage and server-side handling of AI provider secrets.
- Row Level Security for all Supabase user data.
- Meaningful error states, retry controls, and network-aware behavior.
- Unit, integration, accessibility, and device smoke tests for each milestone.
- Analytics, if added, must be consented, minimal, and free of sensitive
  conversation content by default.

## 8. Out of scope for the first implementation milestone

- Medical diagnosis, medication prescribing, or clinical triage.
- Automatic emergency dispatch or claims of contacting emergency services.
- Background location tracking without a separately approved workflow.
- Unvalidated speech support for any listed language.
- A caregiver/admin web dashboard.
- Replacing phone, video, messaging, or emergency-service providers.

## 9. Definition of done for a feature

Each feature requires a written specification, user stories, acceptance
criteria, security considerations, focused test cases, implementation,
validation on the smallest relevant test command, and documented known
limitations.

## 10. Backend implementation contract

The backend is a separate TypeScript service under `backend/` and must use
Fastify, Supabase Auth/PostgreSQL/Storage, Zod validation, provider
abstractions, and Expo Push Notifications. It must never expose service-role,
AI-provider, speech-provider, or push-provider secrets to the mobile bundle.

The current backend files are an Express structure-only scaffold. They are
not production implementation and must be migrated deliberately in Phase 1;
existing module responsibilities and security constraints must be preserved.

Backend phase acceptance requires the documents in
`docs/backend-requirements.md`, `docs/architecture.md`,
`docs/security.md`, `docs/api-specification.md`, and
`docs/testing-strategy.md` to agree with the code and migrations.
