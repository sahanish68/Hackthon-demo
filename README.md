# ElderCare AI

ElderCare AI is a senior-friendly, multilingual React Native mobile
application built with Expo, Expo Router, TypeScript, and Supabase.

## Repository layout

- `src/app/` - Expo Router mobile screens
- `src/components/` - reusable accessible React Native components
- `src/design/` - mobile design tokens
- `backend/` - Express/TypeScript server boundary
- `supabase/migrations/` - database migrations
- `docs/` - requirements, architecture, security, and API contracts

## Mobile development

```bash
npm install
npm start
npm run lint
npx tsc --noEmit
```

## Backend status

The `backend/` directory currently contains a structure-only scaffold. Its
typed boundaries do not expose endpoints, open a port, authenticate requests,
or call AI, speech, push, or Supabase providers yet.

When backend implementation begins:

```bash
cd backend
npm install
npm run build
npm run dev
```

Do not commit `.env` files or provider credentials. Use
[backend/.env.example](./backend/.env.example) as the starting point for
local configuration.

## Safety and privacy

The AI is not a family member or medical professional. Emergency delivery,
speech support, notification delivery, and provider capabilities must never be
represented as successful without explicit confirmation.
