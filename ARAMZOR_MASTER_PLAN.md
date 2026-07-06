# ARAMZOR - Complete Master Plan
# Copy this entire document into Claude Code at the start of any session.

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
- Auth: NextAuth / Auth.js v5 with DrizzleAdapter - magic link only
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
id: 'calm',        name: 'Calm',         mode: 'calm',         duration_min: 10, is_premium: false
id: 'sleep',       name: 'Sleep',        mode: 'sleep',        duration_min: 14, is_premium: true
id: 'energy',      name: 'Energy',       mode: 'energy',       duration_min: 7,  is_premium: true
id: 'performance', name: 'Performance',  mode: 'performance',  duration_min: 11, is_premium: true
id: 'natural-high',name: 'Natural High', mode: 'natural-high', duration_min: 20, is_premium: true
```

---

## PAYWALL LOGIC

- Free tier: 3 lifetime sessions total (not per day)
- All 5 modes accessible during free trial
- Session count logic in proxy.ts:
  - count < 3 = allow access regardless of subscription
  - count >= 3 AND no active subscription = redirect to /subscribe
  - active subscription (status = 'active') = allow regardless of count
- After limit: hard gate, redirect to /subscribe
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

### The Four Beats

BEAT 1 - THE ZOR (Activation)
- 20-30 connected breaths, full inhale, passive exhale
- First 10 breaths at 70% intensity, remainder at full
- Inhale: nose or mouth (volume matters)
- Exhale: mouth, completely passive - never forced
- Rhythm: 1 breath per 2.5-3 seconds
- Mechanism: Controlled hypocapnia, CO2 drops, epinephrine releases,
  respiratory alkalosis, inner heat (Tummo mechanism)
- Effect: Breaks anxiety spiral, generates activation, clears fog

BEAT 2 - THE THRESHOLD (Retention)
- Hold on EMPTY lungs after last passive exhale
- Do not forcefully empty - just stop after natural exhale
- Duration: hold to urge, then 3 more seconds
- UI shows elapsed time as information, not as target
- Body scan during hold: feet -> calves -> knees -> thighs ->
  pelvis/pelvic floor (extended in Performance mode) ->
  lower abdomen -> solar plexus -> chest -> throat -> jaw -> crown
- Mechanism: CO2 rises, parasympathetic pivot begins,
  interoceptive scan displaces rumination
- Effect: Performance anxiety dissolves here, return to body from head

BEAT 3 - THE RETURN (Rescue breath)
- ONE full inhale through nose, as deep as possible
- Hold at top: 15 seconds (Calm/Performance), 10s (Sleep), 20s (Natural High)
- Release slowly through nose
- Mechanism: Oxygenation rebound, pulmonary stretch receptor activation
- Effect: Euphoria lives here, the natural high peaks at this beat
- THIS BEAT IS NOT OPTIONAL - it bridges Threshold to Aram

BEAT 4 - THE ARAM (Flow/Landing)
- Extended exhale ratio, nasal both ways - mandatory
- Nasal breathing produces nitric oxide, full parasympathetic bias
- No holds, continuous, rhythmic
- Mechanism: Extended exhale activates vagal brake, HRV optimizes,
  cortisol drops within 4-5 cycles
- Effect: Lands you - calm, present, ready. Not sedated.

### The Five Modes

MODE 1 - CALM
Goal: "I need to stop spiraling right now"
- The Zor: 30 breaths, full intensity, 1 breath/2.5-3s, nose or mouth in, mouth out
- The Threshold: hold to urge +3s, full body scan feet to crown
- The Return: deep nasal inhale, hold 15s, slow nasal exhale
- The Aram: 10 cycles, 5s inhale / 7s exhale, nasal both ways
- Position: seated or lying
- Duration: ~10 min

MODE 2 - SLEEP
Goal: "It's late and my brain won't shut off"
- The Zor: 20 breaths, 70% intensity only, 1 breath/3s, nose in, mouth out
- The Threshold: hold to urge only (no +3s), emphasis on jaw and chest in scan
- The Return: deep nasal inhale, hold 10s (gentler), slow nasal exhale
- The Aram: 15 cycles, 5s inhale / 9s exhale + 3s pause at bottom, nasal
- Position: lying down, mandatory, lights off
- Duration: ~14 min
- Note: session auto-logs complete, does not require interaction to end

MODE 3 - ENERGY
Goal: "Morning energy without another coffee"
- The Zor: 30 breaths, full intensity from breath 5, 1 breath/2s (faster), mouth in, mouth out
- The Threshold: 20-30s maximum, pelvis to crown scan only (brief)
- The Return: mouth inhale (volume), hold 15s, sharp mouth exhale
- The Aram: 5 cycles only, 4s inhale / 5s exhale, nasal, balanced ratio (not extended - avoid sedation)
- Position: seated, spine straight
- Duration: ~7 min

MODE 4 - PERFORMANCE
Goal: "I freeze up when it matters most"
Covers: sexual performance anxiety, public speaking, sports, exams, social anxiety
- The Zor: 20 breaths, measured and controlled, 1 breath/3s, nose in, mouth out
- The Threshold: extended hold minimum 45s, EXTENDED pelvis/pelvic floor emphasis
  (8-10 seconds on pelvic floor specifically), then sweep to crown
- The Return: deep nasal inhale, hold 15s, slow nasal exhale
- The Aram: 10 cycles, 4s inhale / 8s exhale with HUMMING on exhale, nasal in
- Position: lying (sexual performance anxiety), seated (all other performance contexts)
- Duration: ~11 min

WHY THE HUMMING: Laryngeal vibration stimulates recurrent laryngeal nerve
(vagus nerve branch). Produces 15x more nasal nitric oxide than quiet breathing.
Most powerful parasympathetic activation in the entire protocol.
The humming exhale is NOT optional in Performance mode.

MODE 5 - NATURAL HIGH
Goal: "Show me what this body can do without substances"
- Structure: 3 complete rounds of Zor + Threshold + Return, brief Aram between rounds
- The Zor: 30 breaths each round, full intensity, do not reduce between rounds
- The Threshold: hold to maximum comfortable limit each round, no minimum shown,
  follow tingling and sensation, round 3 hold is typically longest
- The Return: 20s hold (not 15s), this is where the altered state peaks
- The Aram between rounds: 5 cycles, 4s / 6s, nasal (stabilisation only)
- The Aram final: 10 cycles, 5s / 8s, nasal (full landing)
- Position: LYING DOWN MANDATORY - brief loss of consciousness possible in round 3
- Duration: ~18-22 min depending on hold durations

WHAT USERS EXPERIENCE IN NATURAL HIGH:
- Round 1: tingling in hands and face, mental clarity, mild warmth
- Round 2: tingling spreads, possible visual effects (phosphenes), noticeable euphoria on Return
- Round 3: full altered state, effortless hold, peak euphoria on 20s Return
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

## DESIGN SYSTEM (FROM DESIGN.MD)

Creative direction: "The Nocturnal Archive"
Reference: Black Afgano by Nasomatto. Leather-bound volumes, resinous textures,
soft glow of embers against obsidian.

### Colors (EXACT HEX VALUES)

Primary accent: #C4522A (deep burnt terracotta - NOT bright orange #E35336)
Accent hover: #D4603A
Accent muted: #8B3A1E
Background base: #161310
Background deeper: #110e0b
Surface container low: #1e1b18
Surface container: #252220
Surface container high: #2d2927
Surface container highest: #342f2c
Text primary: #F5EFE6 (warm off-white - NEVER pure white #ffffff)
Text secondary: #9E9189
Outline variant: #57423b
Error: #ffb4ab (never use terracotta for errors)

### Typography

Display/Headlines: Newsreader (Google Font) - tight letter-spacing, authoritative
Body text: Newsreader - artisanal long-form feel
Labels/Buttons: Work Sans (Google Font) - all-caps, 0.05em tracking
NEVER use Work Sans for body copy. NEVER use Inter or Space Grotesk.

### Design Rules

NO-LINE RULE: Never use 1px solid borders. Boundaries only through
background shifts and negative space.

GHOST BORDER: If boundary strictly required for accessibility,
use #57423b at 15% opacity maximum.

NO PURE BLACK: Darkest color is #110e0b.

SHADOWS: Ambient only - 0px 20px 40px rgba(132, 38, 0, 0.08)
Never hard-edged shadows.

BUTTONS:
- Primary: filled #C4522A, Work Sans label-md, all-caps, 0.05em tracking
- Secondary: ghost style, no fill, ghost border only
- Tertiary: text only, #D4603A color, underline on hover only

CARDS: No dividers between items. Use 16-24px vertical padding.
Background shift on hover to indicate interactivity.

GLASSMORPHISM for modals/dropdowns: semi-transparent with 32px backdrop-blur.

### Breathing Circle (Primary UI Element)

- Centered on active session screen
- Expands on inhale, contracts on exhale
- Warm terracotta glow (#C4522A) on dark background
- Phase label above circle in spaced caps: "THE ZOR" / "THE THRESHOLD" / "THE RETURN" / "THE ARAM"
- Instruction text below circle: "Inhale through your nose" - changes per phase
- No countdown timer visible to user - just the circle and phase label
- The circle IS the timer

---

## UI SCREENS AND COPY

### Landing Page (/)

Hero headline: "Force in. Peace out."
Subheadline: "The breathwork that earns your calm."
CTA button: "BEGIN YOUR ARAMZOR - $8/MONTH" (outlined style - terracotta border, no fill)
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
- ARAMZOR: $8.00 (highlighted in terracotta)

Footer quote: "Breath is the only tool you cannot leave at home."
CTA: "PRACTICE NOW"

Attribution line: "ARAMZOR. THE ANCIENT MODERNIST."

### Login Page (/login)

Title: "ARAMZOR"
Instruction: "Enter your email. We'll send you a link."
Input: email field (filled container style per DESIGN.md)
Button: "SEND LINK" (primary button)
No password. No OAuth. Magic link only.

### Login Verify Page (/login/verify)

Title: "Check your email."
Body: "A link has been sent. Click it to enter."
No resend button needed for v1.

### Mode Selection (/dashboard)

Header: "Select your ritual."
Subhead: "Breath is the bridge between the physical and the metaphysical.
Choose the frequency for your current state."

Five mode cards (no dividers between them, background shifts only):
Each card shows:
- Category label in small terracotta text (e.g. "ACTIVE RITUAL", "RECOVERY", "VITALITY")
- Mode name in large Newsreader serif
- One-line description
- Duration in minutes

Card content:
CALM (is_premium: false - free):
Category: ACTIVE RITUAL
Description: "A rhythmic slowing of the internal clock. Designed for the
restoration of equilibrium through extended exhalations."
Duration: 12 min

SLEEP (premium):
Category: RECOVERY
Description: "Deep descent into the nocturnal state. Delta-wave
synchronisation for cellular repair."
Duration: 20 min

ENERGY (premium):
Category: VITALITY
Description: "Oxygenation of the blood through rapid inhalation cycles.
Kinetic awakening."
Duration: 8 min

PERFORMANCE (premium):
Category: FLOW STATE
Description: "Controlled hypercapnia for physical endurance and mental grit."
Duration: 15 min

NATURAL HIGH (premium):
Category: EXPANSION
Description: "Euphoric state through specific breath retention techniques.
Transcendence."
Duration: 30 min

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

Session count (terracotta, large): "47 Aramzors."
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
- Performance: search "sub bass drone CC0"
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

Goal selection labels (on mode selection):
- "ACTIVE RITUAL" (Calm)
- "RECOVERY" (Sleep)
- "VITALITY" (Energy)
- "FLOW STATE" (Performance)
- "EXPANSION" (Natural High)

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
Three phases, ten minutes, hits harder. Built the app myself."

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
- Performance mode humming exhale for performance anxiety
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
