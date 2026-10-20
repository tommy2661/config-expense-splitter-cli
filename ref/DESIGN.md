---
name: Sunlit Coastal Spontaneous
colors:
  surface: '#f5faff'
  surface-dim: '#cbdce8'
  surface-bright: '#f5faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e9f5ff'
  surface-container: '#dff0fd'
  surface-container-high: '#d9ebf7'
  surface-container-highest: '#d4e5f1'
  on-surface: '#0d1d26'
  on-surface-variant: '#3d494b'
  inverse-surface: '#22323c'
  inverse-on-surface: '#e2f3ff'
  outline: '#6d797b'
  outline-variant: '#bcc9cb'
  surface-tint: '#006972'
  primary: '#006972'
  on-primary: '#ffffff'
  primary-container: '#0fa3b1'
  on-primary-container: '#003237'
  inverse-primary: '#60d7e5'
  secondary: '#a7391e'
  on-secondary: '#ffffff'
  secondary-container: '#fd7958'
  on-secondary-container: '#6e1500'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#939494'
  on-tertiary-container: '#2b2d2d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#8ef2ff'
  primary-fixed-dim: '#60d7e5'
  on-primary-fixed: '#001f23'
  on-primary-fixed-variant: '#004f56'
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#ffb4a2'
  on-secondary-fixed: '#3c0700'
  on-secondary-fixed-variant: '#862208'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f5faff'
  on-background: '#0d1d26'
  surface-variant: '#d4e5f1'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system crafts an inviting, breezy, and completely friction-free atmosphere for shared group holidays. Group expense splitting often introduces social awkwardness and transactional stiffness; this system counters that tension with sunny optimism, approachable softness, and effortless clarity. 

The aesthetic merges contemporary minimalism with tactile, sun-drenched coastal vibrancy. It prioritizes expansive whitespace, warm undertones, and generous touch targets to foster transparency, trust, and shared joy among traveling companions.

## Colors

The palette draws directly from a Mediterranean coastline: sun-baked sand, crystal turquoise waters, and bright sea coral.

- **Canvas & Background (`#FFF8EF`)**: An ultra-light, warm sand tint that softens the overall interface, avoiding sterile electronic starkness while keeping contrast high against content blocks.
- **Primary Sea Turquoise (`#0FA3B1`)**: Anchors primary navigation, active selection states, key positive balance summaries, and main confirmation CTAs.
- **Accent Vibrant Coral (`#FF7A59`)**: Reserved for urgent visual cues, positive pending debts, floating quick-add (`+`) trigger buttons, and contextual alert badges.
- **Surfaces & Cards (`#FFFFFF`)**: Pure crisp white surfaces elevate content above the warm sand canvas, establishing structure without heavy outlines.
- **Text & Deep Neutrals (`#1B2B34`)**: Deep petroleum navy provides softer, more refined contrast than pure black, ensuring sustained legibility under bright outdoor light.
- **Subtle Dividers & Borders (`rgba(27, 43, 52, 0.08)`)**: Hairline boundaries maintain card structures and list separations without visual clutter.

## Typography

Typography relies on geometric, rounded letterforms that remain crisp and legible even when parsing rapid expense amounts outdoors. 

- **Display & Headings**: Rendered with generous weights (`700` and `800`) to anchor summary sheets and running trip totals. Tighter tracking (`-0.01em` to `-0.02em`) on larger scales gives financial values a cohesive, modern editorial feel.
- **Body Text**: Tuned for maximum legibility (`400` weight with spacious line heights) to cleanly separate line-item descriptions, split categories, and user names.
- **Labels & Microcopy**: Formatted in `600` or `700` weights with slight positive tracking to ensure fast readability across chips, tags, and badge indicators.

## Layout & Spacing

The layout is built mobile-first around a flexible 4-column viewport system that fluidly expands into a balanced single- or dual-column canvas on larger mobile screens and tablets.

- **Rhythm**: Anchored to a baseline 4px/8px module. Primary containers rely on `space-lg` (20px) inner padding to create airy breathing room around line items.
- **Margins & Safe Zones**: A standard outer margin of 16px to 20px insulates content from device bezels, paired with extended bottom-padding to accommodate floating bottom sheets and the prominent primary action button.
- **Reflow**: Financial dashboards feature a fixed top-level trip balance hero, flowing downward into a scrollable expense stream partitioned by category and date chips.

## Elevation & Depth

Depth is established through soft ambient diffusion rather than harsh shadows or structural borders.

- **Base Level (Canvas)**: Warm sand (`#FFF8EF`), fully matte with zero elevation.
- **Cards & Surfaces**: Pure white containers elevated via ambient diffused drop shadows: `0 8px 24px rgba(27, 43, 52, 0.06)`. This lifts cards softly off the sand foundation without creating stark drop lines.
- **Interactive Modals & Overlays**: Modals, quick-split sheets, and bottom navigation draw on elevated ambient shadows (`0 12px 32px rgba(27, 43, 52, 0.10)`), accompanied by a translucent scrim (`rgba(27, 43, 52, 0.35)`).
- **Floating Action Elements**: The primary Floating Action Button (`+`) employs a specialized coral glow shadow (`0 6px 20px rgba(255, 122, 89, 0.35)`) to emphasize immediate tap availability.

## Shapes

The design system embraces an ultra-rounded, friendly visual vocabulary. 

- **Cards & Summary Containers**: Defined by a dedicated 20px border radius, eliminating harsh angles and reinforcing a warm, approachable holiday mood.
- **Chips, Badges, and Primary Buttons**: Embody a full-pill shape (`9999px` border radius). This pill motif is universally applied to CTAs, avatar indicators, expense categories, and filter toggles.
- **Input Fields**: Softened with 16px to 20px radii, harmonizing with surrounding containers.

## Components

### Buttons & Quick Actions
- **Primary Action (CTA)**: Full-width, pill-shaped (`9999px`), 52px minimum height, filled with Sea Turquoise (`#0FA3B1`), white text (`label-lg`), and zero borders.
- **Floating Add Button (`+`)**: A 60px circular Coral (`#FF7A59`) button containing a rounded white plus icon, elevated with a warm coral tinted shadow.
- **Secondary Buttons**: Outlined in Sea Turquoise (`1.5px`) with a transparent surface, or rendered in a washed turquoise tint (`rgba(15, 163, 177, 0.10)`) with solid turquoise label text.

### Chips & Badges
- **Filter & Category Chips**: Completely pill-shaped (`9999px`), 36px height. Unselected state is white background with `rgba(27, 43, 52, 0.08)` border and petroleum navy text. Selected state transitions to solid Sea Turquoise (`#0FA3B1`) with crisp white text.
- **Debt & Balance Badges**: Compact pill badges (`label-sm`). Owed amounts display Coral text on a soft Coral wash (`rgba(255, 122, 89, 0.12)`). Settled or owed-to-you amounts display Sea Turquoise on a subtle mint-tinted wash.

### Cards & Summary Modules
- **Trip Summary Hero**: Sea Turquoise (`#0FA3B1`) card with 20px border radius, white text, and low-opacity decorative white geometric curves in the background. Displays current running total, balance-per-person, and settling status.
- **Transaction List Card**: Crisp White (`#FFFFFF`) surface, 20px corner radius, hairline separator (`rgba(27, 43, 52, 0.08)`), containing rounded category avatars, contextual date stamps, and individual split amounts.

### Input Fields & Selectors
- **Currency & Amount Inputs**: Generous text size (`display-lg`), centered layout, with an unbordered, ultra-minimal warm background.
- **Text & Split Fields**: White pill containers with subtle `1px` borders (`rgba(27, 43, 52, 0.08)`), transitioning to a Sea Turquoise border on active focus.

### Iconography
- Hand-drawn or rounded line icons (Material Symbols Rounded style) featuring soft, circular stroke caps (2px uniform weight), ensuring cohesive alignment with the pill-shaped interface elements.