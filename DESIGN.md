# Design System Specification: Quiet Precision

## 1. Overview & Creative North Star
The Creative North Star is **"Quiet Precision."**

Aramzor should feel like a first-party Apple product page at night: calm, exact, and confident. No editorial theatrics. No serif display drama. The interface gets out of the way so the practice can dominate.

To achieve this:
* **One expressive sans.** Sora for display, body, and labels - geometric with character, not Inter / system UI as the primary face.
* **Restraint over ornament.** Large type, generous space, soft contrast. Hierarchy comes from size and weight, not color shouting.
* **Cool black surfaces.** Pure black bases with cool gray elevations. Accent blue is for links and focus; mint is for brand and breath identity.

## 2. Colors & Surface Philosophy
Palette is cool black and soft silver, with blue for interaction and mint for brand / breath.

| Token | Hex | Role |
|---|---|---|
| `bg` | `#000000` | Page base |
| `bg-deep` | `#000000` | Immersive session base |
| `surface-low` | `#1d1d1f` | Elevated panels |
| `surface` | `#2c2c2e` | Hover / secondary surfaces |
| `surface-high` | `#3a3a3c` | Inputs / active surfaces |
| `surface-highest` | `#48484a` | Focused inputs |
| `text` | `#f5f5f7` | Primary reading |
| `text-muted` | `#86868b` | Secondary copy |
| `text-dim` | `#8e8e93` | Meta / captions (WCAG-friendly on black) |
| `accent` | `#2997ff` | Links, focus rings, status |
| `accent-hover` | `#0077ed` | Hover for accent |
| `accent-mint` | `#9ee0cb` | Brand highlight, signature cards |
| `error` | `#ff453a` | Alerts only |

### Breath / session palette (session player only)
| Use | Hex / family | Role |
|---|---|---|
| Inhale ring + Zor / Return / Aram cores | `#7dcfb6` – `#7ecfc0` mint family | Breath in, phase identity |
| Threshold core / ring | silver `#a8b0b8` | Quiet retention |
| Exhale ring | soft coral `#e8956a` | Breath direction only - not a brand accent |

### Surface Rules
* Prefer tonal shifts over borders.
* If a border is required, use white at 8-12% opacity.
* Marketing and product chrome stay cool (no warm browns or terracotta panels).
* Soft coral is reserved for the session exhale progress ring so inhale vs exhale reads clearly.

### Buttons
* **Primary CTA:** White (`#f5f5f7`) on black, medium weight, pill (`9999px`) or `12px` for forms.
* **Secondary:** Transparent with a light ghost border (`rgba(255,255,255,0.18)`).
* **Tertiary:** Text only in `text-muted`, `text` on hover. Accent blue only for true links.
* **Session pause:** Quiet surface pill (`surface-low`), not a white primary CTA.

## 3. Typography
Use **Sora** (Google Font) for display, body, and labels. One family, clear hierarchy through weight and size.

Sora is geometric but warmer than a system stack - distinctive enough to feel like a product, calm enough for breathwork. Do not fall back to Inter, Arial, or raw system UI fonts as the primary face.

* **Display:** Large, semibold (600), tight tracking (`-0.03em` to `-0.045em`). Never italic by default.
* **Body:** Regular / medium, comfortable leading (`1.5-1.6`), `text` / `text-muted`.
* **Labels:** Smaller, medium weight, normal case preferred.

Avoid Newsreader, Work Sans, Inter, and any warm editorial serif pairing.

## 4. Elevation & Depth
* Static lift comes from surface steps (`#000` -> `#1d1d1f` -> `#2c2c2e`).
* Shadows are soft and cool: `0 20px 40px rgba(0,0,0,0.35)` (`shadow-ambient`).
* Homepage hero orb and wordmark mark use soft mint / celadon (`#7dcfb6` family) for attraction on black.
* Session visuals use quiet phase-tinted cores: mint (Zor), silver (Threshold), brighter mint (Return), soft mint (Aram). Blooms are radial gradients - never CSS `filter: blur` (it paints a square).

## 5. Signature Experience: Session Player
The session screen is the product.

* Full black canvas (`bg-deep`), safe-area aware, wake lock while running / paused.
* Chrome: Exit · Wordmark · Pause; thin **time-based** session progress bar; phase stepper.
* Phase stepper stays four steps: **Zor / Threshold / Return / Aram**. Return’s inhale → hold-full → exhale stay inside the phase (do not promote them into the stepper). Natural High shows `Round n of 3` under the stepper.
* One large breathing orb (about `min(78vw, 46dvh, 420px)`). Soft phase-tinted core with radial bloom.
* SVG ring around the orb shows progress through the current inhale / exhale / hold. Mint on inhale and holds; soft coral on exhale.
* Phase subtitle + phase name above the orb; instruction and counters below.
* Threshold shows a live hold timer; Zor / Aram show breath or cycle counts.
* Controls are quiet and thumb-friendly (header Pause + footer Pause practice).

## 6. Marketing & Product Chrome
* Brand first on promotional surfaces: wordmark with mint orb mark is a hero-level signal, not nav-only text.
* Dashboard mode list is minimal - no card grids of stats. Natural High may use a mint-tinted signature panel.
* Mode display names: Calm, Sleep, Energy, **Steady** (id `performance`), Natural High.
* Dashboard durations come from live protocol math, not stale DB `duration_min`.
* Primary subscribe CTA can use a luminous mint panel; body CTAs stay white-on-black.
* Site header / mobile nav: session-aware (Dashboard, Account, Sign out when logged in).

## 7. Paywall Presentation
Premium modes show a small lock affordance and route unpaid users to `/subscribe`.
Never tease Natural High as free content. Free trial sessions may only access free modes.
Dashboard and Account stay reachable after the trial; only new session routes are gated.

## 8. Do's and Don'ts

### Do
* Keep black.
* Use white primary CTAs; blue for links / focus; mint for brand and breath identity.
* Let whitespace and type scale carry the brand.
* Make session UI calmer than marketing UI.
* Keep session progress time-based so longer Aram / Threshold phases feel honest.

### Don't
* Don't use terracotta panels, ember orange CTAs, or cream editorial themes on product pages.
* Don't use italic display serifs.
* Don't fill the first viewport with cards, stats, or badge clusters.
* Don't paint instructional text in accent orange or coral.
* Don't split Return into stepper steps.
* Don't use Prisma, Supabase, Stripe, or Inter as defaults (stack: Drizzle + Neon, Lemon Squeezy, Sora).
