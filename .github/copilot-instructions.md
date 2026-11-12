# ElderCare AI Contribution Instructions

## Scope

ElderCare AI is a React Native mobile application built with Expo, Expo
Router, TypeScript, Supabase, SecureStore, and Expo Notifications. Do not
introduce HTML, web-only components, or browser-only assumptions into mobile
features.

## Development workflow

Before changing a feature:

1. Read the relevant requirement and architecture docs.
2. Write or update the feature specification, user stories, acceptance
   criteria, security requirements, and focused test cases.
3. Make the smallest modular change that satisfies the specification.
4. Run the narrowest applicable tests, type-check, and lint/build checks.
5. Document unsupported provider capabilities and known limitations.

## Engineering rules

- Use strict TypeScript and typed service boundaries.
- Keep route files thin; put business logic in feature modules and services.
- Reuse design tokens and accessible components.
- Use React Native primitives and `StyleSheet`.
- Provide loading, empty, offline, permission-denied, and error states.
- Never hardcode secrets or call privileged providers from the client.
- Treat client-side authorization as UX only; enforce authorization in Supabase
  RLS and server functions.
- Never claim an AI capability, speech language, notification, or SOS delivery
  succeeded without an explicit confirmed result.
- Do not represent the AI as a family member or medical professional.
- Avoid logging personal data, conversation content, tokens, or locations.

## Accessibility and safety

- Use large readable text and touch targets.
- Provide accessibility labels, roles, hints, and state updates.
- Ensure text scaling and light/dark themes remain usable.
- Require deliberate confirmation for consequential actions such as SOS.
- Encourage human family or professional assistance when appropriate.
