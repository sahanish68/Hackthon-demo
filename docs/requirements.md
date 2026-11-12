# ElderCare AI Requirements

## Functional requirements

### R1. Onboarding and profile

The app must collect only the minimum profile data needed to personalize the
experience, support language and accessibility settings, register trusted
contacts, and record privacy consent. Consent records must include version and
timestamp.

### R2. Home and daily support

The home screen must present a personalized greeting, today's schedule,
medication reminders, important notifications, family shortcuts, AI entry
point, and SOS entry point. Every data-backed section needs loading, empty,
offline, and failure behavior.

### R3. AI companion

The app must support a text fallback and a capability-aware voice experience.
AI requests must be routed through a protected server boundary. The assistant
must use simple, respectful language; identify itself as AI; avoid medical
claims; and recommend trusted human help for urgent or high-risk situations.

### R4. Family connection

The app must show approved family profiles, call entry points, photos, and
events. Access must be senior-authorized and enforced by Supabase Row Level
Security, not only by client-side checks.

### R5. Routine and reminders

The app must support activities, exercise, brain games, hobbies, medication
reminders, and local/push notifications. Notification denial, scheduling
failure, timezone changes, and duplicate scheduling must be handled.

### R6. Safety

The safety center must show trusted contacts, permission status, emergency
guidance, and a deliberate SOS workflow. SOS requires confirmation and must
display pending, confirmed, failed, and unavailable delivery states. The app
must never claim successful delivery without a confirmed service response.

### R7. Digital assistance

The app must provide accessible smartphone tutorials, message explanations,
scam awareness, and guided learning. Explanations must not request or expose
passwords, one-time codes, payment details, or private keys.

### R8. Settings

Users must be able to change language, text size, voice preferences, theme,
accessibility settings, privacy controls, and notification preferences.

## Quality and accessibility requirements

- All interactive controls expose an accessibility label and state.
- Touch targets are at least 44 x 44 points unless a platform convention
  requires larger.
- Text scaling must not clip primary actions.
- Color is never the only indication of status.
- Focus/order and spoken labels must be tested with TalkBack and VoiceOver.
- Network loss must preserve safe read-only and cached flows where possible.

## Security requirements

- Supabase Auth manages identity; sessions use SecureStore-backed storage.
- Supabase tables use least-privilege Row Level Security policies.
- No AI, Supabase service-role, signing, or notification secrets ship in the
  client bundle.
- Microphone, camera, notification, and location access require contextual
  permission explanations and explicit platform permission handling.
- Inputs are validated at the client boundary and server boundary.
- Logs must avoid conversation text, contact details, location, and tokens.

## Test requirements

For each milestone, tests must cover:

1. Happy path and resumability.
2. Invalid input and denied permissions.
3. Offline, timeout, retry, and duplicate-action behavior.
4. Authorization boundaries between senior, family, and trusted contact.
5. Screen-reader labels, text scaling, and contrast-sensitive UI states.
6. Android device smoke behavior and iOS-compatible navigation/configuration.
