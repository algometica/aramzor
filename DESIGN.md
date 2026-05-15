# Design System Specification: The Ember Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Nocturnal Archive."** 

This system moves away from the sterile, brightly-lit interfaces of SaaS and toward a high-end, editorial experience that feels curated, heavy, and permanent. It is inspired by the warmth of a study at midnight—think leather-bound volumes, resinous textures, and the soft glow of embers against obsidian. 

To achieve this, we break the "template" look through:
*   **Intentional Asymmetry:** Avoid perfectly centered grids. Use off-kilter text alignments and overlapping containers to create a sense of motion.
*   **High-Contrast Typography:** Drastic scaling between the Newsreader displays and functional Work Sans labels.
*   **Tonal Depth:** Rather than using lines to separate ideas, we use the "resinous" dark backgrounds to create a physical sense of space.

## 2. Colors & Surface Philosophy
The palette is anchored by deep, ink-like neutrals and accented by a rich, burnt coral/terracotta. This "ember" tone provides a sophisticated warmth that cuts through the dark backgrounds without the clinical feel of standard "brand colors."

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through:
*   **Background Shifts:** e.g., a `surface-container-low` (#1e1b18) section sitting on a `background` (#161310) base.
*   **Negative Space:** Using the spacing scale to create clear psychological boundaries without physical lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface-container` tiers to create depth:
*   **Base:** `surface` (#161310) or `surface_container_lowest` (#110e0b).
*   **Elevated Containers:** Use `surface_container_high` (#2d2927) for cards or panels that need to draw attention.
*   **Nested Content:** If a card contains a sub-section, use a slightly lower tier (like `surface_container_low`) to "carve out" space within the container.

### The "Glass & Gradient" Rule
To add soul to the interface, floating elements (modals, dropdowns) should utilize **Glassmorphism**:
*   Use semi-transparent surface colors with a `32px` backdrop-blur.
*   Apply a subtle gradient to main CTAs transitioning from `primary_container` (#c4522a) to `primary` (#ffb59d) to mimic the flickering depth of a live flame.

## 3. Typography
The typography is a dialogue between the literary weight of **Newsreader** and the modernist clarity of **Work Sans**.

*   **Display & Headlines (Newsreader):** These are the voice of the system. Large scale displays (`display-lg` at 3.5rem) should use tight letter-spacing and feel authoritative. Use these for editorial moments and brand-heavy statements.
*   **Body (Newsreader):** Unlike many systems that use sans-serifs for body text, we use Newsreader at `body-lg` (1rem) to maintain an artisanal, "long-form" feel.
*   **Functional Labels (Work Sans):** Use Work Sans exclusively for `label-md` and `label-sm`. This creates a clear distinction between "Content" (Serif) and "Utility" (Sans).

## 4. Elevation & Depth
In "The Nocturnal Archive," depth is felt, not seen.

*   **Tonal Layering:** Avoid shadows for static elements. Stacking a `surface-container-highest` card on a `surface` background creates a soft, natural lift.
*   **Ambient Shadows:** For floating elements, use extra-diffused shadows. 
    *   *Formula:* `0px 20px 40px rgba(132, 38, 0, 0.08)`. Note the tint: the shadow uses a low-opacity version of the terracotta-on-primary color to mimic real-world light refraction.
*   **The "Ghost Border" Fallback:** If a boundary is strictly required for accessibility, use the `outline-variant` (#57423b) at 15% opacity. Never use 100% opaque borders.

## 5. Components

### Buttons
*   **Primary:** Filled with the `primary_container` (#c4522a) color. Type should be `label-md` (Work Sans) in all-caps with 0.05em tracking for a premium feel.
*   **Secondary:** Ghost-style but utilizing the "Ghost Border" (15% opacity `outline-variant`). No fill.
*   **Tertiary:** Text-only, using the `primary` (#ffb59d) color with a subtle 1px underline that only appears on hover.

### Cards & Lists
*   **Forbid Dividers:** Do not use lines to separate list items. Use 16px–24px of vertical padding and a subtle `surface-container` shift on hover to indicate interactivity.
*   **Image Handling:** Images should have a subtle `0.25rem` (sm) radius. In dark mode, apply a very subtle 5% darkening overlay to images so they don't "pop" too aggressively against the resinous backgrounds.

### Input Fields
*   **State:** The default state is a filled container (`surface_container_high`). 
*   **Focus:** Upon focus, the background transitions to `surface_container_highest` and a subtle "Ghost Border" of `primary` (#ffb59d) at 30% opacity appears.

### Signature Component: The "Ember" Badge
Used for high-priority status or featured categories. A small, pill-shaped chip using a radial gradient of `primary_container` (#c4522a) to a deep `#842600`, with `on_primary_container` (#fffeff) text.

## 6. Do's and Don'ts

### Do
*   **Do** embrace the dark. Use the highest contrast text (#e9e1dc) only for primary reading; dim secondary information using `on_surface_variant`.
*   **Do** use asymmetrical layouts. Let a headline hang 10% further left than the body copy below it.
*   **Do** use Newsreader for any text that is meant to be "read" as a narrative.

### Don't
*   **Don't** use pure black (#000000). The darkest depth should be `surface_container_lowest` (#110e0b).
*   **Don't** use hard-edged shadows or high-contrast borders.
*   **Don't** use Work Sans for anything other than labels and small buttons. Using it for body copy destroys the editorial aesthetic.
*   **Don't** use the terracotta color for "Error" states. Reserve `primary` for brand moments and use the designated `error` (#ffb4ab) tokens for alerts.