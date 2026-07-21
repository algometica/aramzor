# Aramzor

Breathwork web app built around one method: **Zor → Threshold → Return → Aram**.
Five modes. Dark UI. $8/month.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) - `proxy.ts`, not `middleware.ts` |
| Package manager | **pnpm** only |
| Database | Neon (Postgres) |
| ORM | Drizzle only |
| Auth | NextAuth / Auth.js (magic link + optional `DEV_ADMIN_*` password) |
| Payments | Lemon Squeezy only |
| Fonts | Sora |
| Hosting | Vercel |

## Docs (source of truth)

| Doc | Use for |
|---|---|
| [`DESIGN.md`](./DESIGN.md) | UI, color, session player, brand rules |
| [`PROTOCOL_TIMINGS.md`](./PROTOCOL_TIMINGS.md) | Live mode timings (must match `src/lib/protocol.ts`) |
| [`ARAMZOR_MASTER_PLAN.md`](./ARAMZOR_MASTER_PLAN.md) | Product history / method background - timings and UI may lag; prefer the two files above |
| [`AGENTS.md`](./AGENTS.md) / [`CLAUDE.md`](./CLAUDE.md) | Agent coding constraints |

## Modes

| Id | Display name | Free trial | Approx duration |
|---|---|---|---|
| `calm` | Calm | Yes | ~7 min |
| `sleep` | Sleep | Yes | ~8 min |
| `energy` | Energy | No | ~4 min |
| `performance` | **Steady** | No | ~6 min |
| `natural-high` | Natural High | No | ~16 min |

Durations are computed from beat math in `src/lib/protocol.ts` and shown on the dashboard via `protocolDurationSec()`. DB `protocols.duration_min` is not used for display.

## Develop

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional test account: set `DEV_ADMIN_EMAIL` and `DEV_ADMIN_PASSWORD` in `.env.local` for password login and unlimited access to all modes.

## Design quick facts

- Background `#000000`, text `#F5F5F7`, accent `#2997ff`
- Primary CTA: white on black
- Session inhale ring: mint; exhale ring: soft coral `#e8956a`
- No em dashes in code, comments, or copy - use plain hyphens
