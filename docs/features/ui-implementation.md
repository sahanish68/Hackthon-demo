# Figma UI Implementation Specification

## Scope

Implement the currently available Figma Make prototype as a native Expo
screen shell. This milestone covers onboarding, home, family, routine, AI
companion presentation, safety center, how-to guides, settings, and the More
menu. Local interactions are functional; provider-backed actions remain
explicit unavailable states until their services are integrated.

## Acceptance criteria

- Every identified Figma screen is reachable through Expo Router.
- Screens use React Native primitives and `StyleSheet`, not HTML or web-only
  components.
- Large text, clear hierarchy, accessible labels, and touch targets are used
  throughout.
- Bottom navigation and the More menu preserve the Figma information
  architecture.
- Call, video, SOS, microphone, and reminder actions never claim success
  without a real service response.
- Text type-checks under the repository's strict TypeScript configuration.

## Security requirements

- No secrets, provider tokens, or personal data are embedded in screen data.
- Safety copy must not imply emergency delivery until a confirmed service is
  available.
- The AI screen must identify the assistant as AI and avoid medical advice.
- Accessibility controls are local presentation preferences only until a
  persisted profile service is introduced.

## Focused test cases

1. Onboarding language selection changes the selected visual state and
   navigates to Home only through the explicit Get Started action.
2. Home, Family, Routine, and More navigation reach the correct route.
3. AI Companion exposes text/subtitle-oriented fallback copy and an honest
   voice capability state.
4. Safety Center presents deliberate SOS confirmation copy without sending an
   alert.
5. Settings controls update their local visual state and remain readable.
6. Every primary action has an accessibility label and a touch target of at
   least 44 points.

## Functional local flows

- Home notifications request permission and schedule a local notification.
- Routine items can be marked complete and update the progress count.
- Feel-good activities can be marked complete.
- AI Companion opens in a usable large-text chat mode with quick prompts,
  local conversation replies, pause/resume state, and language-selection
  feedback.
- Family members open a local conversation composer; messages remain visible
  in the current screen until secure messaging is connected.
- How-to guide steps, scam guidance, family moments, and settings language
  choices open usable local flows.
- Safety location sharing can be toggled locally.

Real phone/video calls, remote AI responses, push delivery, and SOS delivery
require configured providers and authenticated backend services. The client
does not claim those operations succeeded without confirmed service responses.
