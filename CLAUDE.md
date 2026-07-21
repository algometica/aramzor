@AGENTS.md

Always reference DESIGN.md for all UI decisions.
Protocol timings: PROTOCOL_TIMINGS.md must match src/lib/protocol.ts. Dashboard minutes come from protocolDurationSec().
Mode id `performance` displays as **Steady**.
Next.js 16 - use proxy.ts not middleware.ts.
Package manager is pnpm. Never use npm or yarn.
Fonts: Sora (display, body, labels) - geometric sans with character, not system/Inter.
Primary accent: #2997ff. Primary CTA: white on black. Background: #000000. Text: #F5F5F7.
Never use em dashes anywhere in code, comments, or copy.
Use plain hyphens (-) instead.
Do not use Prisma. ORM is Drizzle only.
Do not use Supabase. Database is Neon only.
Payments are Lemon Squeezy only, never Stripe.
Optional test account: set DEV_ADMIN_EMAIL + DEV_ADMIN_PASSWORD for password login and unlimited access to all modes.
