# Aramzor Protocol Timings

Source of truth: `src/lib/protocol.ts`.
Dashboard labels use `protocolDurationSec()` (rounded minutes).

All hold times are predetermined for safety. Users cannot customize hold durations.

## Summary

| Mode | Actual total | Shown |
|---|---|---|
| Calm | **6m 45s** | 7 min |
| Sleep | **8m 09s** | 8 min |
| Energy | **4m 05s** | 4 min |
| Steady | **5m 34s** | 6 min |
| Natural High | **16m 18s** | 16 min |

Zor pace: Energy **1.25s / 1.25s**. Calm, Sleep, Steady, Natural High **1.75s / 1.75s**.

---

## CALM - 6m 45s (405s)

| Phase | Detail | Duration |
|---|---|---|
| Zor | 40 breaths @ 3.5s (1.75s in + 1.75s out). First 10 reduced intensity | **2m 20s** |
| Threshold | Empty-lung hold | **45s** |
| Return | 5s inhale + 15s hold-full + 5s exhale | **25s** |
| Aram | 15 cycles (5s inhale + 8s exhale) | **3m 15s** |

---

## SLEEP - 8m 09s (489s)

| Phase | Detail | Duration |
|---|---|---|
| Zor | 30 breaths @ 3.5s (1.75s in + 1.75s out) | **1m 45s** |
| Threshold | Empty-lung hold | **40s** |
| Return | 5s inhale + 10s hold-full + 5s exhale | **20s** |
| Aram | 18 cycles (5s inhale + 10s exhale + 3s bottom pause) | **5m 24s** |

---

## ENERGY - 4m 05s (245s)

| Phase | Detail | Duration |
|---|---|---|
| Zor | 40 breaths @ 2.5s (1.25s in + 1.25s out), mouth inhale | **1m 40s** |
| Threshold | Empty-lung hold | **40s** |
| Return | 5s inhale + 15s hold-full + 5s mouth exhale | **25s** |
| Aram | 8 cycles (4s inhale + 6s exhale) | **1m 20s** |

---

## STEADY - 5m 34s (334s)

| Phase | Detail | Duration |
|---|---|---|
| Zor | 30 breaths @ 3.5s (1.75s in + 1.75s out) | **1m 45s** |
| Threshold | Empty-lung hold | **60s** |
| Return | 5s inhale + 15s hold-full + 5s exhale | **25s** |
| Aram | 12 cycles (4s inhale + 8s hum exhale) | **2m 24s** |

---

## NATURAL HIGH - 16m 18s (978s) - 3 rounds

### Round 1 - 4m 40s
| Phase | Duration |
|---|---|
| Zor - 40 breaths @ 3.5s | 2m 20s |
| Threshold | 55s |
| Return - 5s + 20s hold + 5s | 30s |
| Aram - 5 cycles (4s + 7s) | 55s |

### Round 2 - 4m 45s
| Phase | Duration |
|---|---|
| Zor - 40 breaths @ 3.5s | 2m 20s |
| Threshold | 60s |
| Return - 5s + 20s hold + 5s | 30s |
| Aram - 5 cycles (4s + 7s) | 55s |

### Round 3 - 6m 53s
| Phase | Duration |
|---|---|
| Zor - 40 breaths @ 3.5s | 2m 20s |
| Threshold | 75s |
| Return - 5s + 20s hold + 5s | 30s |
| Aram - 12 cycles (5s + 9s) | 2m 48s |

---

## Notes for tweaking

Edit helpers in `src/lib/protocol.ts`:
- `zorBeats(count, perBreathMs, instruction)` - `perBreathMs` is full cycle (split evenly inhale/exhale)
- `thresholdBeat(durationSec)`
- `returnBeat(holdSec, mouthExhale?)`
- `aramCycles(count, inhaleMs, exhaleMs, bottomPauseMs?, exhaleInstruction?)`

Dashboard minutes auto-update from the beat math.
