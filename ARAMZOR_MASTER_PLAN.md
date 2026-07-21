# ARAMZOR - Complete Master Plan
# Copy this entire document into Claude Code at the start of any session.

> **Living sources of truth (prefer these over older numbers in this file):**
> - UI / brand: `DESIGN.md`
> - Protocol timings: `PROTOCOL_TIMINGS.md` and `src/lib/protocol.ts`
> - Agent constraints: `CLAUDE.md` / `AGENTS.md`
> - Mode display name for id `performance` is **Steady** (not "Performance")

---

## WHAT THIS APP IS

Aramzor is a breathwork web app built around one proprietary method - The Aramzor Method.
One method. Five modes. $8/month. Built solo.

The name comes from two ancient South Asian words:
- Aram = rest, peace, relief (Hindi/Urdu/Persian)
- Zor = force, power, strength (Hindi/Urdu/Persian)
The name IS the protocol: Zor goes in. Aram comes out.

Tagline: "Force in. Peace out."
Brand reference: Black Afgano by Nasomatto. Dark, resinous, doesn't explain itself.
Not Calm. Not Headspace. Doesn't apologise for the intensity.

---

## TECH STACK (LOCKED - NO SUBSTITUTIONS)

- Framework: Next.js 16 (App Router)
- Database: Neon (serverless Postgres)
- ORM: Drizzle only - never Prisma
- Auth: NextAuth / Auth.js v5 with DrizzleAdapter - magic link; optional DEV_ADMIN password login
- Payments: Lemon Squeezy only - never Stripe
- Hosting: Vercel
- Package manager: pnpm only - never npm or yarn
- Email: Resend
- Voice audio (v1.1): ElevenLabs pre-generated static files
- Ambient audio (v1): CC0 files from Freesound.org
- AI coding: Claude Code + Cursor

NEVER USE:
- Prisma (use Drizzle)
- Supabase (use Neon)
- Stripe (use Lemon Squeezy)
- npm or yarn (use pnpm)
- MongoDB
- middleware.ts (Next.js 16 uses proxy.ts)
- Em dashes anywhere in code, comments, or copy (use plain hyphens)

---

## ENVIRONMENT VARIABLES

Required in .env.local and Vercel:

```
DATABASE_URL=postgresql://neondb_owner:****@pooler.neon.tech/neondb?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://neondb_owner:****@neon.tech/neondb?sslmode=require
AUTH_SECRET=generated_with_npx_auth_secret
NEXTAUTH_URL=http://localhost:3000 (Vercel: https://aramzor.vercel.app)
AUTH_RESEND_KEY=re_xxxxxxxxxxxx
AUTH_RESEND_FROM=Aramzor <onboarding@resend.dev>
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_STORE_ID=
LEMONSQUEEZY_WEBHOOK_SECRET=
NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL=
```

---

## DATABASE SCHEMA (LOCKED)

File: src/db/schema.ts

```typescript
import { pgTable, text, uuid, boolean, integer, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const protocols = pgTable("protocols", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  mode: text("mode"),
  duration_min: integer("duration_min"),
  is_premium: boolean("is_premium").default(false),
})

export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").unique().notNull(),
  created_at: timestamp("created_at").default(sql`now()`),
})

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  user_id: uuid("user_id").references(() => users.id),
  ls_subscription_id: text("ls_subscription_id").unique(),
  status: text("status"),
  plan: text("plan"),
  current_period_end: timestamp("current_period_end"),
  created_at: timestamp("created_at").default(sql`now()`),
  updated_at: timestamp("updated_at").default(sql`now()`),
})

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  user_id: uuid("user_id").references(() => users.id),
  protocol_id: text("protocol_id").references(() => protocols.id),
  duration_sec: integer("duration_sec"),
  completed_at: timestamp("completed_at").default(sql`now()`),
})
```

Protocol seed data - insert these rows into protocols table:
```
id: 'calm',         name: 'Calm',         mode: 'calm',         duration_min: 7,  is_premium: false
id: 'sleep',        name: 'Sleep',        mode: 'sleep',        duration_min: 8,  is_premium: false
id: 'energy',       name: 'Energy',       mode: 'energy',       duration_min: 4,  is_premium: true
id: 'performance',  name: 'Steady',       mode: 'performance',  duration_min: 6,  is_premium: true
id: 'natural-high', name: 'Natural High', mode: 'natural-high', duration_min: 16, is_premium: true
```

`duration_min` is advisory / legacy. Dashboard display uses `protocolDurationSec()` from `src/lib/protocol.ts`.
Display name for `performance` is **Steady**.

---

## PAYWALL LOGIC

- Free tier: 3 lifetime sessions total (not per day)
- Free modes during trial: **Calm** and **Sleep** only (`FREE_MODE_IDS`)
- Premium modes always require subscription (or DEV_ADMIN unlimited access): Energy, Steady, Natural High
- After trial: Dashboard and Account stay open; new `/session/*` routes redirect to `/subscribe`
- Never trust client-side payment state - always read from DB

---

## ROUTE STRUCTURE

Public routes (no auth required):
- / (landing page)
- /login
- /login/verify
- /subscribe
- /about
- /science (attribution page)

Protected routes (auth + subscription check in proxy.ts):
- /dashboard (mode selection)
- /session/[mode] (active breathing session)
- /session/complete (post-session summary)
- /profile (session count, account)

API routes:
- /api/auth/[...nextauth] (Auth.js)
- /api/webhooks/lemonsqueezy (webhook handler)

---

## LEMON SQUEEZY WEBHOOK PATTERN

File: src/app/api/webhooks/lemonsqueezy/route.ts

Events to handle:
- subscription_created -> insert/update subscriptions table, status = 'active'
- subscription_updated -> update subscriptions table
- subscription_cancelled -> update status = 'cancelled'
- subscription_expired -> update status = 'expired'

Always verify webhook signature using LEMONSQUEEZY_WEBHOOK_SECRET.
Never trust unverified webhooks.

useSubscription hook: src/hooks/useSubscription.ts
- Reads from DB, never from LS API at runtime
- Returns { isActive, plan, expiresAt }

---

## THE ARAMZOR METHOD - PROTOCOL SPEC

One method. Four beats. Every session. Every mode.
**Exact seconds live in `src/lib/protocol.ts` and `PROTOCOL_TIMINGS.md`.** Summary below.

### The Four Beats

BEAT 1 - THE ZOR (Activation)
- Connected breaths; first 10 at reduced intensity, then full (Calm and similar)
- Inhale: nose or mouth (mode-specific)
- Exhale: passive - never forced
- Pace (current): Energy 1.25s / 1.25s; Calm, Sleep, Steady, Natural High 1.75s / 1.75s
- Mechanism: Controlled hypocapnia, CO2 drops, epinephrine releases,
  respiratory alkalosis, inner heat (Tummo mechanism)
- Effect: Breaks anxiety spiral, generates activation, clears fog

BEAT 2 - THE THRESHOLD (Retention)
- Hold on EMPTY lungs after last passive exhale
- Hold durations are predetermined in code (safety) - UI shows elapsed time
- Body scan during hold: feet -> calves -> knees -> thighs ->
  pelvis/pelvic floor (extended in Steady) ->
  lower abdomen -> solar plexus -> chest -> throat -> jaw -> crown
- Mechanism: CO2 rises, parasympathetic pivot begins,
  interoceptive scan displaces rumination
- Effect: Performance anxiety dissolves here, return to body from head

BEAT 3 - THE RETURN (Rescue breath)
- ONE full inhale, hold at top, release
- Hold at top: 15s (Calm / Steady / Energy), 10s (Sleep), 20s (Natural High)
- THIS BEAT IS NOT OPTIONAL - it bridges Threshold to Aram
- Session stepper keeps Return as one phase (inhale / hold / exhale are sub-actions)

BEAT 4 - THE ARAM (Landing)
- Extended exhale ratio, nasal both ways (Steady uses humming exhale)
- Sleep adds a bottom pause; Energy stays shorter so it does not fully sedate
- Effect: Lands you - calm, present, ready. Not sedated.

### The Five Modes (current)

MODE 1 - CALM (~6m 45s / shown 7 min)
Goal: Stop the spiral
- Zor: 40 breaths @ 1.75/1.75
- Threshold: 45s
- Return: 15s hold-full
- Aram: 15 cycles, 5s / 8s
- Position: seated or lying
- Free during trial

MODE 2 - SLEEP (~8m 09s / shown 8 min)
Goal: Quiet a racing mind
- Zor: 30 breaths @ 1.75/1.75
- Threshold: 40s
- Return: 10s hold-full
- Aram: 18 cycles, 5s / 10s + 3s bottom pause
- Position: lying down - lights off
- Free during trial

MODE 3 - ENERGY (~4m 05s / shown 4 min)
Goal: Wake up without caffeine
- Zor: 40 breaths @ 1.25/1.25, mouth inhale
- Threshold: 40s
- Return: 15s hold-full, mouth exhale
- Aram: 8 cycles, 4s / 6s
- Position: seated - spine straight
- Premium

MODE 4 - STEADY (id: `performance`, ~5m 34s / shown 6 min)
Goal: Stay steady when performance anxiety hits
Covers: performance anxiety including intimate contexts, speaking, sports, exams, social freeze
- Zor: 30 breaths @ 1.75/1.75
- Threshold: 60s (pelvic floor emphasis in guidance)
- Return: 15s hold-full
- Aram: 12 cycles, 4s / 8s with HUMMING on exhale
- Position: lying or seated
- Premium

WHY THE HUMMING: Laryngeal vibration stimulates a vagus branch and produces
~15x more nasal nitric oxide than quiet breathing. Not optional in Steady.

MODE 5 - NATURAL HIGH (~16m 18s / shown 16 min)
Goal: Reach an altered state
- 3 rounds of Zor + Threshold + Return + Aram
- Zor: 40 breaths @ 1.75/1.75 each round
- Threshold: 55s / 60s / 75s
- Return: 20s hold-full each round
- Aram bridges R1-R2: 5 cycles 4s / 7s; final R3: 12 cycles 5s / 9s
- Position: LYING DOWN MANDATORY
- Premium

WHAT USERS EXPERIENCE IN NATURAL HIGH:
- Round 1: tingling in hands and face, mental clarity, mild warmth
- Round 2: tingling spreads, possible visual effects (phosphenes), noticeable euphoria on Return
- Round 3: fuller altered state, longer hold, peak euphoria on Return
  Some users report quality similar to MDMA onset or cannabis indica without cognitive distortion
  This is physiologically documented, not marketing

---

## PROTOCOL LINEAGE AND ATTRIBUTION

The Aramzor Method draws from (show this in onboarding):
- Tibetan Tummo meditation (Herbert Benson, Harvard Medical School, 1982)
- Kundalini pranayama and Shaivite tantric breathwork (Hatha Yoga Pradipika, 15th century)
- Wim Hof Method (derived from Tummo)
- Breath of Fire / Agni Prana (Kundalini / Hatha yoga tradition)
- Physiological Sigh and Cyclic Sighing (Stanford / Huberman et al., 2023)
- Coherence Breathing (HeartMath Institute)
- Bhramari pranayama (humming exhale tradition)
- Box Breathing (Military / Navy SEAL tradition)

NOTE ON JOE DISPENZA: His spinal energy breathwork is Kundalini kriya
taken without attribution and sold at $3-5k retreats.
Aramzor attributes to original traditions, not modern repackagers.

Attribution card shown once at onboarding:
"The Aramzor Method draws from Tibetan Tummo meditation, Kundalini pranayama,
Shaivite tantric breathwork, and modern HRV research from HeartMath Institute
and Stanford University. These traditions have been combined, not owned."

---

## SAFETY LAYER

Displayed before EVERY session. Non-dismissible for 3 seconds. Not just at signup.

Text:
"Never practice Aramzor near or in water - bathtub, pool, or open water.
Brief loss of consciousness is possible during breath holds on land.
It is fatal near water. Do not practice while driving or operating machinery.
If you are pregnant, have cardiovascular disease, epilepsy, or recent surgery
- consult a physician first. This is not medical treatment."

---

## DESIGN SYSTEM

**Canonical file: `DESIGN.md` (Quiet Precision).** Older terracotta / Newsreader /
warm-archive notes in this master plan are obsolete - do not implement them.

Quick facts:
- Background `#000000`, text `#F5F5F7`, accent `#2997ff`, mint brand `#7dcfb6` / `#9ee0cb`
- Font: Sora for display, body, and labels
- Primary CTA: white on black (pill)
- Session: mint inhale ring, soft coral `#e8956a` exhale ring, time-based progress bar,
  phase stepper Zor / Threshold / Return / Aram, Screen Wake Lock while practicing
- Threshold shows a live hold timer; Zor / Aram show breath or cycle counts

---


## UI SCREENS AND COPY

> Historical copy bank. Live marketing and product UI follow `DESIGN.md` and the
> current Next.js pages. Prefer shipped screens over the drafts below when they conflict.

### Landing Page (/)

Hero headline: "Force in. Peace out."
Subheadline: "The breathwork that earns your calm."
CTA button: white-on-black primary (see DESIGN.md)
Social proof line: "USED BY PEOPLE WHO ARE DONE WITH MEDITATION FLUFF"

Below fold section - three phases explained:
01 - The Zor: "Force is required. The Zor represents the rigorous physical
activation of the nervous system. We do not whisper to your stress;
we command it to exit through structural respiratory mechanics."

02 - The Threshold: "Where modern biology meets ancient stillness.
The Threshold is the precise moment of carbon dioxide tolerance expansion,
where the mind learns to remain unshakeable under physical pressure."

03 - The Aram: "The resolution. Peace is not found; it is synthesized.
The Aram provides the deep, resinous resonance of a nervous system
that has been recalibrated for true depth."

Section header: "The Market of Noise"
"WE ARE NOT A TOY. WE ARE A UTILITY. THE COST REFLECTS THE DISCIPLINE."

Competitor pricing table:
- Othership: $17.99
- Headspace: $12.99
- Calm: $8.99
- ARAMZOR: $8.00 (highlighted)

Footer quote: "Breath is the only tool you cannot leave at home."
CTA: "PRACTICE NOW"

Attribution line: "ARAMZOR. THE ANCIENT MODERNIST."

### Login Page (/login)

Title: "ARAMZOR"
Instruction: "Enter your email. We'll send you a link."
Input: email field (filled container style per DESIGN.md)
Button: "SEND LINK" (primary button)
Magic link for everyone; optional DEV_ADMIN email + password for the test account.
No OAuth.

### Login Verify Page (/login/verify)

Title: "Check your email."
Body: "A link has been sent. Click it to enter."
No resend button needed for v1.

### Mode Selection (/dashboard)

Header: "Select your ritual."
Subhead: "Breath is the bridge between the physical and the metaphysical.
Choose the frequency for your current state."

Dashboard mode list (see DESIGN.md - Quiet Precision, not terracotta/serif):
Each row shows mode name, one-line goal, duration from `protocolDurationSec()`.

CALM (free trial):
Goal: Stop the spiral
Duration: ~7 min

SLEEP (free trial):
Goal: Quiet a racing mind
Duration: ~8 min

ENERGY (premium):
Goal: Wake up without caffeine
Duration: ~4 min

STEADY (premium, id performance):
Goal: Stay steady when performance anxiety hits
Duration: ~6 min

NATURAL HIGH (premium, signature mint panel):
Goal: Reach an altered state
Duration: ~16 min

Footer quote on mode selection:
"The breath is the only part of the autonomic nervous system that is very
accessible to us. By changing the breath, we change the mind."

### Active Session (/session/[mode])

Layout: near-full screen, minimal UI, circle dominates
- ARAMZOR wordmark top center
- Phase label top center in spaced caps: "THE ZOR"
- Large breathing circle center (expands/contracts with animation)
- Instruction text below circle: "Inhale through your nose"
- Pattern and depth labels at bottom: "4-4-4-4" and "DEEP DIAPHRAGM"
- PAUSE PRACTICE text button at very bottom
- No visible countdown timer

Phase instruction text per beat:
THE ZOR: "Inhale through your nose" / "Let it go"
THE THRESHOLD: "Hold. Empty lungs." / "Scan your body."
THE RETURN: "One breath in. Full." / "Hold." / "Release slowly."
THE ARAM: "In through your nose." / "Out through your nose."

### Post-Session Summary (/session/complete)

Header: "You just did your Aramzor."
Body: "The ritual is etched into the archive. Your breath has returned
to the root, leaving only the record of your presence."

Session count (large): "47 Aramzors."
Duration: "24 min"
Consistency note: "Consistent, steady focus."

Quote: "Patience is the anchor of the soul."
Next ritual available label.

Button: "RETURN" (goes back to /dashboard)

Footer nav: JOURNAL / BREATH / RITUAL / ARCHIVE

### Subscribe Page (/subscribe)

Title: "Full Aramzor."
Price: "$8/month. No fluff."
CTA: "BEGIN" (redirects to Lemon Squeezy checkout URL)

---

## AUDIO STRATEGY

### v1 (ship with this - zero cost)

5 CC0 ambient drone loops from Freesound.org (one per mode):
- Calm: search "tibetan bowl loop CC0"
- Sleep: search "brown noise sleep CC0"
- Energy: search "rhythmic pulse drone CC0"
- Steady: search "sub bass drone CC0"
- Natural High: search "deep tone ambient CC0"

3 CC0 chime/tone files for beat transitions:
- inhale cue (soft bowl strike)
- hold cue (lower tone)
- exhale cue (gentle fade)

All guidance via on-screen text only for v1.
Total: ~8 audio files. No API calls. Serve as static files.

### v1.1 (post-launch)
42 ElevenLabs pre-generated voice files.
Voice direction: dark, grounded, short sentences, long pauses, no spa language.
Never call ElevenLabs API at runtime - generate once, serve as static files from Vercel CDN.

---

## APP COPY REFERENCE

Onboarding: "Aramzor. The force of calm. Let's begin."
Session start: "Your Aramzor starts now."
Phase 1 cue: "Full force. This is the Zor."
Phase 2 cue: "Hold. This is the threshold."
Phase 3 cue: "One breath in. This is the return."
Phase 4 cue: "Let go. This is the Aram."
Post session: "You just did your Aramzor. Notice the difference."
Paywall: "Full Aramzor. $8/month. No fluff."
Session count: "47 Aramzors." (private, never social)

Dashboard goal lines (current):
- Calm: Stop the spiral
- Sleep: Quiet a racing mind
- Energy: Wake up without caffeine
- Steady: Stay steady when performance anxiety hits
- Natural High: Reach an altered state

---

## DISTRIBUTION PLAN

Launch week:
- Reddit posts in r/Anxiety, r/stress, r/productivity, r/breathwork
- Value-first posts: explain a mechanism with science, mention app at end
- Not ads - genuine explanations with soft CTA

Reddit copy examples:

r/Anxiety: "I built Aramzor - a breathwork app with a dark edge. No meditation
fluff. No wellness pastels. Three phases: ignite, dissolve, land. Science-backed
protocols that actually work. $8/month."

r/Breathwork: "Aramzor is a three-phase breathwork method combining Tummo
activation, Kundalini retention, and coherence breathing into one daily protocol.
Built an app around it. Would love brutal feedback from people who actually breathe."

r/stress: "Been anxious for years. Built the app I wished existed. It's called
Aramzor - aram means peace, zor means force. You use one to get the other. $8/month."

r/productivity: "Morning routine upgrade: replaced coffee with Aramzor.
Four beats, about seven minutes for Calm, hits harder. Built the app myself."

Week 2-3: ProductHunt launch

Ongoing passive:
- 5 SEO landing pages targeting:
  "box breathing", "4-7-8 breathing", "physiological sigh",
  "coherence breathing", "Wim Hof alternative"
- One monthly email to subscribers (retention only, not newsletter)
- PWA optimization for mobile add-to-homescreen

Hard rules:
- No paid ads
- No social media content treadmill
- No influencer outreach
- Self-serve only, no customer support model

---

## BUILD ORDER (REMAINING SESSIONS)

SESSION 2 - Minimum UI for auth testing:
- /login page with email input and magic link submit
- /login/verify page
- /dashboard placeholder (protected)
- Test full auth flow works end to end

SESSION 3 - Lemon Squeezy + Paywall:
- Set up LS product ($8/month, test mode)
- Webhook handler (subscription_created, subscription_updated)
- useSubscription hook
- /subscribe page
- Update proxy.ts with session count logic
- Test full flow: signup -> pay -> webhook -> DB -> unlock
- DO NOT MOVE ON until this works completely end to end

SESSION 4 - Breathing Timer + Core UI:
- Mode selection screen (/dashboard) with 5 mode cards
- Active session screen (/session/[mode]):
  - Animated breathing circle (CSS animation, expands/contracts)
  - Phase labels (THE ZOR / THE THRESHOLD / THE RETURN / THE ARAM)
  - Instruction text per phase
  - Beat transitions with timing per mode spec above
- Post-session screen (/session/complete)
- Session logging to DB on completion
- Safety disclaimer before each session (non-dismissible 3 seconds)
- CC0 ambient audio per mode

SESSION 5 - Landing Page + SEO:
- Landing page (/) with full copy as specified above
- /about page
- /science page (protocol attribution)
- 2-3 SEO protocol pages
- Mobile responsive check

SESSION 6 - Polish + Ship:
- Full flow test (signup -> pay -> all 5 modes -> cancel -> re-subscribe)
- DNS: point aramzor.com to Vercel
- PWA manifest
- Reddit posts ready to go live

---

## REUSABLE PATTERNS (APPLY EVERY SESSION)

1. Lemon Squeezy webhook: pay -> webhook -> DB write -> proxy.ts reads -> feature unlocked
   Never trust client-side payment state.

2. proxy.ts auth guard: check session + subscription + session count.
   Redirect to /login or /subscribe as needed.

3. useSubscription() hook: reads from DB, not LS API at runtime.
   Returns { isActive, plan, expiresAt }

4. Optimistic UI: update immediately, sync to DB in background, rollback on error.

5. Drizzle migrations: never manually alter production DB.
   Always drizzle-kit generate -> drizzle-kit push.

6. Always reference DESIGN.md for UI. Always reference stitch-reference/ HTML files
   for component structure.

---

## COMPETITOR CONTEXT

| App        | Price   | Problem                                    |
|------------|---------|--------------------------------------------|
| Othership  | $17.99  | Music-driven, bloated, content library     |
| Headspace  | $12.99  | Meditation first, breathwork secondary     |
| Calm       | $8.99   | Sleep focus, generic, pastel               |
| Wim Hof    | ~$10    | One protocol family only                   |
| Aramzor    | $8.00   | One proprietary method, dark aesthetic     |

Key differentiators:
- Cheapest dedicated breathwork app on market
- Proprietary four-beat method (not a protocol library)
- Mouth/nose route shown per phase - no competitor does this
- Dark aesthetic - not another pastel wellness app
- Goal-first UX, not technique-first
- Steady mode humming exhale for performance anxiety
- Natural High mode - endogenous altered state without substances
- Science attribution without Goop-ification
- Session count shown privately ("47 Aramzors") - not gamified

---

## THE ONE PARAGRAPH

Aramzor is a breathwork app with a dark edge. The name comes from Aram (peace, rest)
and Zor (force, power) - two words used across South Asia for centuries. The method
has four beats: ignite the nervous system with controlled activation, dissolve into
the void of breath retention, return with a rescue breath that produces genuine euphoria,
then land in deep parasympathetic calm. It draws from Tibetan Tummo, Kundalini pranayama,
Stanford HRV research, and the bhramari tradition. It costs $8/month - the cheapest
serious breathwork app on the market. It is not Calm. It is not Headspace.
It doesn't apologise for the intensity. Force in. Peace out.
