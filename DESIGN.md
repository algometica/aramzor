# Design System Specification: Quiet Precision

## 1. Overview & Creative North Star
The Creative North Star is **"Quiet Precision."**

Aramzor should feel like a first-party Apple product page at night: calm, exact, and confident. No editorial theatrics. No warm terracotta. No serif display drama. The interface gets out of the way so the practice can dominate.

To achieve this:
* **System typography first.** Prefer SF Pro via the Apple system stack. One sans family for display, body, and labels.
* **Restraint over ornament.** Large type, generous space, soft contrast. Hierarchy comes from size and weight, not color shouting.
* **Cool black surfaces.** Near-black bases with cool gray elevations. Accent is used sparingly for links and status, never as the default text color.

## 2. Colors & Surface Philosophy
Palette is cool black and soft silver, with a single blue accent for interactive emphasis.

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
| `text-dim` | `#6e6e73` | Meta / captions |
| `accent` | `#2997ff` | Links, focus, status |
| `accent-hover` | `#0077ed` | Hover for accent |
| `error` | `#ff453a` | Alerts only |

### Surface Rules
* Prefer tonal shifts over borders.
* If a border is required, use white at 8-12% opacity.
* Do not use warm browns, terracotta, or orange anywhere.

### Buttons
* **Primary:** Solid white (`#f5f5f7`) fill, black text, medium weight, slight radius (`9999px` or `12px` for forms).
* **Secondary:** Transparent with a light ghost border (`rgba(255,255,255,0.18)`).
* **Tertiary:** Text only in `text-muted`, `text` on hover. Accent blue only for true links.

## 3. Typography
Use **Sora** (Google Font) for display, body, and labels. One family, clear hierarchy through weight and size.

Sora is geometric but warmer than a system stack - distinctive enough to feel like a product, calm enough for breathwork. Do not fall back to Inter, Arial, or raw system UI fonts as the primary face.

* **Display:** Large, semibold (600), tight tracking (`-0.03em` to `-0.045em`). Never italic by default.
* **Body:** Regular / medium, comfortable leading (`1.5-1.6`), `text` / `text-muted`.
* **Labels:** Smaller, medium weight, normal case preferred.

Avoid Newsreader, Work Sans, Inter, and any warm editorial serif pairing.

## 4. Elevation & Depth
* Static lift comes from surface steps (`#000` -> `#1d1d1f` -> `#2c2c2e`).
* Shadows are soft and cool: `0 20px 40px rgba(0,0,0,0.35)`.
* Homepage hero orb uses soft mint / celadon (`#7dcfb6` family) for attraction on black.
* Session visuals use quiet phase-tinted cores: blue-white (Zor), silver (Threshold), cyan-white (Return), mint (Aram).

## 5. Signature Experience: Session Player
The session screen is the product.

* Full black canvas.
* One large breathing orb (dominant, ~min(72vw, 440px)). Soft phase-tinted core with radial bloom - never CSS `filter: blur` glows (they paint a square).
* SVG ring around the orb shows beat progress explicitly.
* Phase stepper (Zor / Threshold / Return / Aram) shows journey through the method.
* Phase name and instruction in clean sans - clear, large.
* Thin session progress bar at top.
* Controls are quiet and thumb-friendly.

## 6. Paywall Presentation
Premium modes show a small lock affordance and route unpaid users to `/subscribe`.
Never tease Natural High as free content. Free trial sessions may only access free modes.

## 7. Do's and Don'ts

### Do
* Keep black.
* Use white primary CTAs and blue only for links/status.
* Let whitespace and type scale carry the brand.
* Make session UI calmer than marketing UI.

### Don't
* Don't use terracotta, ember orange, or cream text.
* Don't use italic display serifs.
* Don't fill the first viewport with cards, stats, or badge clusters.
* Don't paint instructional text in accent orange.
