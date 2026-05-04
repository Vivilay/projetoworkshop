# Design System — Dark Athletic / Kinetic Power

---

## 1. Concept and Style

This system is built around the idea of **human transformation under pressure** — raw, forceful, and unapologetically intense. The visual language draws from high-performance sport culture and merges it with a cinematic, editorial sensibility. Every element communicates tension, motion, and earned power. The aesthetic is dark-first, with molten gold energy as the activating force across all surfaces.

**Keywords:** `dark-cinematic` · `gold-kinetic` · `high-contrast` · `editorial-bold` · `transformation` · `premium-athletic`

---

## 2. Color System

### Primitive Colors

#### Neutral Scale

| Token | HEX | Usage |
|---|---|---|
| `neutral-950` | `#0A0A0A` | Deepest backgrounds, base layer |
| `neutral-900` | `#111111` | Primary surface, hero backgrounds |
| `neutral-800` | `#1A1A1A` | Cards, elevated surfaces |
| `neutral-700` | `#2A2A2A` | Borders, dividers, subtle containers |
| `neutral-600` | `#3D3D3D` | Disabled states, inactive elements |
| `neutral-400` | `#6B6B6B` | Muted text, subtext |
| `neutral-200` | `#C2C2C2` | Secondary text, captions |
| `neutral-100` | `#E0E0E0` | Body text on dark |
| `neutral-50` | `#F5F5F5` | White-adjacent, max contrast text |

#### Core Base Colors

| Token | HEX | Description |
|---|---|---|
| `gold-core` | `#FFD700` | Primary gold — the brand's ignition point |
| `gold-bright` | `#FFE340` | Brighter variant, high-energy moments |
| `gold-deep` | `#D4A800` | Darker variant, hover states and cinematic overlays |
| `gold-muted` | `#B8960A` | Subdued tone for borders and subtle accents |
| `gold-glow` | `#FFD70020` | Ambient glow at low opacity, halo effects |
| `steel-muted` | `#5A7080` | Rare cool counterpoint — used for contrast, never dominant |
| `absolute-white` | `#FFFFFF` | Pure knockout text, logo lockup |
| `absolute-black` | `#000000` | Darkest anchor points, button text on gold |

---

### Semantic Colors

| Role | Token | HEX | Rationale |
|---|---|---|---|
| **Primary** | `gold-core` | `#FFD700` | The dominant activating color — buttons, highlights, key copy |
| **Primary Hover** | `gold-deep` | `#D4A800` | Pressed and hover states on primary elements |
| **Secondary** | `neutral-800` | `#1A1A1A` | Card backgrounds, secondary surfaces |
| **Accent** | `gold-bright` | `#FFE340` | Interactive highlights, focus rings |
| **Text Primary** | `absolute-white` | `#FFFFFF` | All major headings and body on dark |
| **Text Muted** | `neutral-200` | `#C2C2C2` | Supporting copy, metadata, captions |
| **Success** | `#3DAA6E` | — | Positive confirmations — use with restraint |
| **Warning** | `gold-core` | `#FFD700` | Native to the palette — alerts and emphasis |
| **Error** | `#D93025` | — | System feedback only |
| **Background Base** | `neutral-900` | `#111111` | Default page background |
| **Surface Elevated** | `neutral-800` | `#1A1A1A` | Cards, panels, drawers |
| **Border Subtle** | `neutral-700` | `#2A2A2A` | Structural lines |
| **Border Accent** | `gold-muted` | `#B8960A` | Highlighted containers and active states |

**Color Logic:**
- Dark surfaces are always dominant. Gold is used as a signal — concentrated, purposeful, never decorative.
- `gold-core` (#FFD700) marks what matters. It is directive, not aesthetic.
- White text is the primary reading surface across all dark backgrounds.
- Glows use `gold-glow` (#FFD70020) at 8–20% opacity to create cinematic depth without visual noise.
- Gold carries an inherent premium, high-stakes connotation — it reads as earned, not given.

---

## 3. Typography

### General Style
The typographic system is built on **condensed and expanded grotesque** forms — mechanical, unapologetic, uppercase-forward. Two registers coexist: a heavy display voice for impact and a clean functional voice for readability.

### Hierarchy

| Level | Style | Weight | Size Range | Case | Tracking |
|---|---|---|---|---|---|
| **Display / Hero** | Condensed Grotesque | Black / 900 | 64px – 120px+ | UPPERCASE | -0.02em to 0 |
| **H1** | Expanded Grotesque | Bold / 700–800 | 40px – 64px | UPPERCASE | -0.01em |
| **H2** | Grotesque | Bold / 700 | 28px – 40px | Mixed / Upper | 0 |
| **H3 / Label** | Condensed or All-Caps | SemiBold / 600 | 12px – 16px | UPPERCASE | 0.08em – 0.15em |
| **Body** | Humanist Sans | Regular / 400 | 14px – 16px | Sentence | 0.01em |
| **Caption / Micro** | Monospace or Condensed | Regular / 400 | 10px – 12px | UPPERCASE | 0.1em |

### Weight Distribution
- 80% of typographic weight is Heavy or Black — this system leads with force.
- Body copy is the only regular-weight element, always subordinate.
- Italic is not part of this system. Emphasis is achieved through `gold-core` and weight shift, not angle.

### Keyword Contrast Pattern
A recurring motif: **one word or phrase in `gold-core`** within an otherwise white heading. This creates a compositional hotspot that guides attention without decoration.

```
SEM MÁGICA, SEM ATALHOS, SEM [DESCULPAS]
                                ↑ gold-core (#FFD700)
```

### Spacing Tendencies
- Display type: tight leading (1.0–1.1), zero or negative letter-spacing
- Body copy: balanced leading (1.5–1.65), slightly open tracking
- Label text: wide tracking (0.08–0.15em) to compensate for small size

---

## 4. Spacing and Layout

### Spacing Scale (8pt base)

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Micro gaps, icon padding |
| `space-2` | 8px | Inline spacing, tight component internals |
| `space-3` | 16px | Default component padding |
| `space-4` | 24px | Section internals, card padding |
| `space-5` | 32px | Component separation |
| `space-6` | 48px | Section gaps, major rhythm breaks |
| `space-7` | 64px | Large layout gaps |
| `space-8` | 96px | Hero breathing room, section headers |
| `space-9` | 128px+ | Full-bleed section spacers |

### Layout Density
**Balanced to Spacious.** Content is never crowded — breathing room is intentional. Sections alternate between full-bleed cinematic zones and contained informational panels.

### Grid System
- **Desktop:** 12-column grid, 24px gutters, 80–120px horizontal margins
- **Tablet:** 8-column grid, 20px gutters
- **Mobile:** 4-column grid, 16px gutters
- **Alignment base:** 8pt grid — all sizing and spacing divisible by 8

### Layout Logic
- Hero sections are full-viewport, image-dominant, with text layered over dark overlays
- Information sections use asymmetric splits (40/60 or 50/50)
- Left alignment dominates. Center is reserved for hero moments and pull quotes only

---

## 5. Shapes and UI Language

### Border Radius

| Context | Radius |
|---|---|
| Buttons (primary) | 0px – 4px (sharp to nearly-sharp) |
| Cards / Panels | 8px – 12px |
| Image containers | 8px – 16px |
| Pills / Tags | 999px — used sparingly |
| Icons / Badges | 4px or circular |

**Principle:** The system trends sharp. Rounded elements are the exception. Hero and structural elements remain hard-edged.

### Stroke Usage
- Borders are rare and always subtle (`neutral-700`, 1px)
- Fill-dominant buttons are preferred over outlined variants
- Ghost/outline buttons use `gold-core` 1px stroke with transparent fill — secondary CTAs only
- Accent dividers use `gold-core` or `gold-muted` at 1–2px

### Component Style
- **Flat with selective elevation** — depth through color contrast, not shadows
- Accordion rows: full-width, separated by subtle background shift, arrow indicators
- Navigation: minimal, horizontal — active states use `gold-core`, not underlines
- Primary CTAs: rectangular, `gold-core` fill + `#000000` text (black), full-width on mobile

> **Critical:** Because `gold-core` (#FFD700) is a light color, all button labels on gold backgrounds must use `#000000` (black) to meet WCAG AA contrast requirements.

---

## 6. Visual Details

### Shadows
- No generic box shadows on UI cards or buttons
- **Ambient glow:** radial gradient of `gold-glow` (#FFD70020) at 10–20% opacity, positioned directionally
- **Light streaks:** diagonal or radial motion lines in `gold-core` at 20–40% opacity — for campaign and hero backgrounds
- **Text glow:** `gold-core` drop-shadow at 0 offset, 12–20px blur — reserved for display/hero moments only

### Borders
- Structural borders: invisible by default
- When visible: `neutral-700`, 1px — only when contrast with background is insufficient
- Accent borders: `gold-core` or `gold-muted`, 2–3px — left-edge treatment on highlighted blocks and active items

### Decorations

| Element | Style |
|---|---|
| **Background texture** | Halftone dot grid at 4–8% opacity in `gold-core` on dark fields |
| **Light sweep / rays** | Radial or diagonal streaks in `gold-glow` — hero and campaign zones |
| **Noise overlay** | Subtle film grain (SVG or CSS filter) at 3–6% opacity on dark backgrounds |
| **Motion lines** | Speed-blur streaks in `gold-core` at 20–40% opacity — editorial use only, not UI |
| **Ghost type** | Oversized text at 4–8% opacity as background texture layer behind photography |
| **Dot matrix** | Pixel dot pattern in `gold-core` at low opacity — system identifier, tech reference |

**Principle:** Decoration amplifies energy. It never fills space. Every background treatment responds to the human in frame.

---

## 7. Contrast and Accessibility

### Contrast Level
**High contrast by default.** White (#FFFFFF) on dark (#111111) exceeds WCAG AA at ~18:1.

### Readability Approach

| Pairing | Contrast Ratio | Standard |
|---|---|---|
| `#FFFFFF` on `#111111` | ~18:1 | AAA ✓ |
| `#000000` on `#FFD700` | ~13.4:1 | AAA ✓ |
| `gold-core` (#FFD700) on `#111111` | ~11.2:1 | AAA ✓ (large text) |
| `neutral-200` (#C2C2C2) on `#111111` | ~8:1 | AA ✓ |

- Body copy: always white or near-white on dark — never gold for reading text
- `gold-core` is used for headlines, accent words, and UI activation only
- Never use gold as a background for body-length text

### Color as Hierarchy
- **White** — primary information, maximum importance
- **`gold-core`** — activation point, the word or element that changes everything
- **`neutral-200`** — supporting, contextual, subordinate
- **`neutral-400`** — de-emphasized, metadata only

### Inclusive Considerations
- Never rely on color alone to convey meaning — use arrow indicators, position and size to reinforce states
- Minimum touch target: 44×44px
- Focus states: `gold-core` outline, 2px, on all interactive elements

---

## Final Notes

This system does not decorate — it **charges**. The palette is elemental: molten gold against deep darkness. The type is physical and direct. The space is earned. Gold here is not ornamental — it is the mark of what has been forged. When in doubt, strip back. When power is needed, activate through color, scale, and contrast. Never through complexity.

> **Design Principle:** *Gold is not given. It is forged.*
