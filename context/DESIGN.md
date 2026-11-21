# DESIGN.md — Codex UI Kit (Rev. B)

> **Purpose.** This file transfers the existing, already-designed Codex UI Kit into the app. It is a _description of what exists_, not a place to invent.
>
> **After the UI Kit is migrated (M1), the project is the source of truth for every kit element:** the code in `src/shared/styles` and `src/shared/ui`, shown in Storybook, together with this file. The canvas is not redrawn to follow decisions made in the code; it stays as the historical reference. Decided 2026-11-20.
>
> **Sources of truth while the kit is being migrated (in priority order):**
>
> 1. `codex.css` — the stylesheet every UI Kit sheet is rendered with (identical to project doc `claude/codex.css`). All values below are copied from it. **If this file and `codex.css` ever disagree, `codex.css` wins.**
> 2. UI Kit canvas, page "UI Kit", 6 sheets: `00 Foundations`, `01 Actions`, `02 Forms`, `03 Navigation`, `04 Data display`, `05 Overlays & feedback` — https://claude.ai/artifact/9nbNbHQVbXt4z57ZGH443K
> 3. Content (copy, page structure, real data) comes from `sitemap.md`, **not** from the kit. Text on the kit sheets is sample copy.
>
> Sections §1–§11 describe the kit as drawn. Lines marked **In the app** say how the project implements it; §12 maps every kit class to its component and status.

---

## 0. Rules for anyone (human or AI) writing UI in this repo

1. **Use only what is listed here.** Every component, variant, size and state exists in the kit stylesheet with a `cx-` class (in the app: `src/shared/styles` and `src/shared/ui/*/*.css`, brought in from `codex.css`; see §12). Use the `shared/ui` components rather than raw classes. Do not add new variants, sizes, colors, radii, shadows, durations or easings.
2. **No new values.** If a design need is not covered, stop and mark it `TODO(design)`. Do not approximate with a "close enough" value.
3. **Tokens only.** Use the CSS custom properties from §1. The only literal colors allowed are the ones listed in §1.6 (they are literals in `codex.css` itself).
4. **No blur, no soft shadows, no gradients for depth.** Depth = hard offset ink shadow (`--lift`, `--float`) or hatching.
5. **No `opacity` for disabled.** Disabled = hatching + `--line` border + `--muted` text (exceptions in §9 are documented, not to be copied).
6. **One accent per screen.** Sanguine (`--sanguine`) = accent. One Primary button per screen.
7. **Icons:** Lucide, `stroke-width: 1.6`, 24 grid, no fills, no emoji. In the app: the `Icon` components in `src/shared/ui/icons` (Lucide geometry, no icon package).
8. **Touch:** interactive height 44px. `sm` (36px) only in dense desktop panels.
9. **Two-layer rule** (from concept): content layer (~80%) stays clean and readable, with no hatching under text. The drawing layer (~20%: grid, constructions, marginalia, stamp) is decorative: `pointer-events: none`, `aria-hidden="true"`.

---

## 1. Tokens (`:root` in `codex.css`; in the app `src/shared/styles/tokens.css`)

### 1.1 Color — surfaces

| Token       | Value     | Use                           |
| ----------- | --------- | ----------------------------- |
| `--paper`   | `#F1EADB` | page background               |
| `--surface` | `#F8F4EA` | cards, panels, menus, dialogs |
| `--white`   | `#FFFDF8` | input fields, code block      |
| `--sunk`    | `#E9DFCB` | hover fill                    |
| `--sunk-2`  | `#DED2B9` | active / pressed fill         |

### 1.2 Color — ink & lines

| Token           | Value     | Use                                        |
| --------------- | --------- | ------------------------------------------ |
| `--ink`         | `#231B13` | text, component outlines                   |
| `--ink-2`       | `#4A3F33` | body text                                  |
| `--muted`       | `#6B5C48` | captions (4.8:1)                           |
| `--line-strong` | `#8A7558` | input borders (3.6:1)                      |
| `--line`        | `#D3C5A8` | dividers inside components                 |
| `--sepia`       | `#8A6A45` | **decor only** (grid, "+", mirror writing) |

### 1.3 Color — accent (sanguine)

| Token              | Value                                               |
| ------------------ | --------------------------------------------------- |
| `--sanguine`       | `#A3402A` (default)                                 |
| `--sanguine-hover` | `#8B3422`                                           |
| `--sanguine-press` | `#7F2F1E`                                           |
| `--sanguine-wash`  | `#EAD2C3` (highlight / selected row / accent badge) |

### 1.4 Color — semantic (Renaissance pigments)

| Token         | Value                | Wash               | Wash value | Meaning                    |
| ------------- | -------------------- | ------------------ | ---------- | -------------------------- |
| `--verdigris` | `#2F6049`            | `--verdigris-wash` | `#D6E3D6`  | success                    |
| `--ochre`     | `#7E560C`            | `--ochre-wash`     | `#F0DDB4`  | warning                    |
| `--error`     | `#8E2A1A`            | `--error-wash`     | `#F2D3C9`  | error                      |
| `--scrim`     | `rgba(35,27,19,.45)` | —                  | —          | overlay backdrop (ink 45%) |

Error is darker and cooler than sanguine and **always** comes with an icon and the `ERR —` prefix so it is never confused with the accent.

### 1.5 Effects

```css
--r: 4px; /* default radius */
--r-sm: 3px; /* badge, kbd, menu item, option, tgroup item */
--lift: 3px 3px 0 0 var(--ink); /* hover */
--float: 4px 4px 0 0 var(--ink); /* menus, dialogs, hover card, toast */
--hatch: repeating-linear-gradient(135deg, rgba(74, 63, 51, 0.42) 0 1px, transparent 1px 6px);
--xhatch:
  repeating-linear-gradient(135deg, rgba(74, 63, 51, 0.42) 0 1px, transparent 1px 7px),
  repeating-linear-gradient(45deg, rgba(74, 63, 51, 0.28) 0 1px, transparent 1px 7px);
--ease: cubic-bezier(0.2, 0.7, 0.2, 1);
--t: 120ms;
--t-btn: 220ms;
--t-press: 90ms;
--ease-btn: cubic-bezier(0.25, 0.8, 0.25, 1);
```

Other radii in the kit: `0` (sheet frame, stamp), pill (`13px` switch, `18px` chip), `2px` (card tag, progress, skeleton, crumb link), `12px 12px 0 0` (drawer only), `50%` (radio, round avatar, dots).

### 1.6 Literal colors that exist in `codex.css` (not tokens — allowed only where listed)

| Value     | Where                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| `#fff`    | text on Primary button; text on Danger active                                                              |
| `#3A2E22` | hover fill of ink-filled elements (Ink button, Toggle on, Switch on, Checkbox checked); `.cx-kbd--dark` bg |
| `#000`    | Ink button active                                                                                          |
| `#6A5A47` | `.cx-kbd--dark` border                                                                                     |
| `#F0A58F` | `<sup>` inside a chip that is on; `<mark>` on active command item (kit inline)                             |
| `#D9CDB6` | secondary text on ink (dark toast, labels on ink)                                                          |
| `#FFF8F4` | invalid input background                                                                                   |
| `#5A3F86` | code token `.tk-f` (functions/types)                                                                       |

### 1.7 Typography

Fonts (Google Fonts on the kit sheets; **in the app** self-hosted by `next/font` in `src/shared/styles/fonts.ts`, subsets latin + latin-ext, EB Garamond not preloaded):
`Space Grotesk` 400/500/600/700 · `Hanken Grotesk` 400/500/600 · `IBM Plex Mono` 400/500/600 · `EB Garamond` italic 400/500.

```css
--display: 'Space Grotesk', sans-serif;
--body: 'Hanken Grotesk', sans-serif;
--mono: 'IBM Plex Mono', ui-monospace, monospace;
--marg: 'EB Garamond', serif;
```

**In the app** the tokens read the `next/font` variables, with the family name as a fallback: `--display: var(--font-space-grotesk, 'Space Grotesk'), sans-serif` (the same for `--body`, `--mono`, `--marg`). The font classes sit on `<html>`.

| Class              | Font        | Size / line-height / tracking             | Color                                     |
| ------------------ | ----------- | ----------------------------------------- | ----------------------------------------- |
| `.cx-display` (h1) | display 700 | 56 / 1.02 / −0.035em                      | inherit                                   |
| `.cx-h2`           | display 700 | 32 / 1.08 / −0.025em                      | inherit                                   |
| `.cx-h3`           | display 700 | 22 / 1.15 / −0.015em                      | inherit                                   |
| `.cx-h4`           | display 600 | 17 / 1.25 / −0.01em                       | inherit                                   |
| `.cx-lead`         | body 400    | 20 / 1.5                                  | `--ink-2`                                 |
| `.cx-body` (p)     | body 400    | 17.5 / 1.56                               | `--ink-2`                                 |
| `.cx-small`        | body 400    | 14 / 1.5                                  | `--ink-2`                                 |
| `.cx-label`        | mono 500    | 12, UPPERCASE, +0.13em                    | inherit (often `--sanguine`)              |
| `.cx-cap`          | mono        | 10, UPPERCASE, +0.16em                    | `--muted`                                 |
| `.cx-marg`         | marg italic | 18                                        | `--ink-2` — **max 2 per screen**          |
| `.cx-mirror`       | —           | `transform: scaleX(-1)`                   | `--sepia` (mirror writing, decor)         |
| `.cx-icode`        | mono        | .88em, bg `--sunk`, pad 1px 5px, `--r-sm` | —                                         |
| `.cx-tlink`        | —           | underline 1px `--line-strong`, offset 4px | hover → sanguine, active → sanguine-press |
| `.cx-note`         | body        | 13 / 1.45                                 | `--ink-2`                                 |

The kit maps shadcn **Typography** onto these classes.

### 1.8 Space, borders, grid

- **Space scale (step 4):** `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 (sections) · 96 (folio)`.
- **Borders:** 1px `--line` inside cards · 1px `--line-strong` inputs · 1px `--ink` component outlines · **2px `--ink`** header, stamp, tables (`th`), accordion top, sheet/drawer edges · 1px dashed `--sanguine` construction lines.
- **Grid:** 12 columns **without gutter** (grid lines = column borders). Max width 1440. Page margins 32 (desktop) / 20 (mobile). Social rail 72. "+" marks on key intersections in `--sepia`, mono font, decorative.
- **Icons:** Lucide, stroke 1.6, 24 grid. In the kit, chevrons (Select, Nav, Dropdown) and check marks use `stroke-width="2"`.
- **In the app:** the page frame, breakpoints and section padding follow the Home page design, see §1.9. Its frame is 1680px wide (not 1440) and its outer and section margins differ from the 32 / 20 above.

### 1.9 Page layout and breakpoints (Home page design)

Not part of the kit sheets: these values come from the Home page design on the canvas (`project/Home.dc.html`). The tablet (768) and mobile (360) boards render the same page, so its media queries are the only responsive spec. Added 2026-11-21.

**Breakpoints** (the design uses `max-width`):

| Name    | Width        | What changes                                                                                         |
| ------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| desktop | > 1024px     | —                                                                                                    |
| tablet  | ≤ 1024px     | header: the sheet label and the nav are replaced by the menu button; content grids become one column; section padding 24 |
| phone   | ≤ 600px      | the frame becomes one column; the ruler is hidden; paper padding 12; header 64; section padding 16; language toggle and ⌘K leave the header |

The design also has a rule at 1180px for an element that is not drawn (`.h-tlabel`); it is not used. The Toast stack (M1) moves at 768px (Toast.module.css); it was set before this section and is left as is.

**The sheet frame** (every page):

- Paper around the sheet: padding `28 20 20 20` (phone: 12).
- Ruler above the frame: letters A–L over the 12 content columns, mono 10px, +0.12em, `--muted`, 8px from the top of the paper. Decor (`aria-hidden`). Hidden on phones.
- Frame: max-width **1680**, centered, 1px `--ink` border, bg `--paper`.
- Grid: columns `72px | 1fr` (social rail 72). Rows: header **72**, main, footer.
  - Desktop / tablet: monogram (top left, 72×72) · header (top) · rail (left, under the monogram) · main · footer.
  - Phone: monogram + rail share a 72px strip (the rail turns horizontal), then the header (**64**), main, footer.
- Lines between the cells: monogram bottom **2px ink** + right 1px ink · header bottom **2px ink** · rail right 1px ink (phone: bottom 1px ink, the monogram gets a 1px bottom and keeps its right line) · footer top **2px ink**.
- Skip link "Skip to content" (first focusable element): ink bg, paper text, mono 12px +0.1em UPPER, padding 12 16, `--r`; hidden above the page, appears 16px from the top on focus with the dashed sanguine outline.

**Section padding** inside `main` (`.h-pad` in the design): **32** desktop · **24** tablet · **16** phone. Section rhythm: head `40 / 24`, body bottom 56.

**In the app:** `src/app/layouts/PageFrame.tsx` + `PageFrame.module.css` draws the frame, the cells and the lines; widgets fill the cells. Media queries cannot read custom properties, so the breakpoints are literals in the CSS Modules (`width <= 1024px`, `width <= 600px`). The ruler is anchored to the frame rather than to the paper (as on the canvas), so it stays over the columns once the frame stops at 1680px.

---

## 2. State language (identical for every component)

| State                              | Visual                                                                                                                      | Implementation                                                                                                                     |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Default**                        | flat sheet, 1px ink outline                                                                                                 | —                                                                                                                                  |
| **Hover — "lift"**                 | `translate(-2px,-2px)` + `box-shadow: var(--lift)`                                                                          | buttons. **Flat elements** (menu items, rows, tabs, nav links, accordion, toggles, chips, pagination) get **only** a `--sunk` fill |
| **Active — "press"**               | `translate(1px,1px)`, no shadow, `--sunk-2` fill (filled elements go one tone darker)                                       | `transition-duration: var(--t-press)`                                                                                              |
| **Focus-visible**                  | construction line: `outline: 2px dashed var(--sanguine); outline-offset: 3px`                                               | keyboard only (`:focus-visible`). Inside menus, focus = highlight (same look as hover), not dashed                                 |
| **Disabled**                       | `background: var(--sunk)` + `var(--hatch)`, border `--line`, text `--muted`, no shadow, no transform, `cursor: not-allowed` | **no opacity**                                                                                                                     |
| **Selected / on / current**        | ink fill + paper text. For tabs & navigation: 2–3px sanguine bar at the bottom                                              |                                                                                                                                    |
| **Open** (menu, accordion, select) | trigger in ink fill **or** number in sanguine; chevron rotates 180°; "+" → "−"; **in the app** a kit button that opens a menu keeps its hover look while open (§5 Menu)                                              |                                                                                                                                    |
| **Floating**                       | `box-shadow: var(--float)`, never blur                                                                                      |                                                                                                                                    |

**Exception — Button Group:** inside a group, hover = fill only (no lift). The active / selected segment (`aria-pressed="true"`, `aria-current`) is **raised out of the group**: `translate(-2px,-2px)` + `--lift`, `z-index: 2`, bg `--sunk` (secondary/mono).

**Motion**

- Buttons (Button, Toggle, Chip, Pagination, Switch, `.cx-ibtn`): enter/exit a state in `220ms cubic-bezier(.25,.8,.25,1)`; press is fast, `90ms`; release is smooth again.
- Everything else: `120ms cubic-bezier(.2,.7,.2,1)`. Menu items: `80ms` background.
- Lines "drawing themselves" (stroke-dashoffset): 600ms.
- Overlays appear in 160ms: 8px shift + fade (dialog "sheet laid down": −8px → 0). **In the app:** implemented for the menu surface (Select listbox, dropdown), the tooltip and the toast, each with a reduced-motion override.
- Tooltip delay 300ms. Toast lifetime 4s.
- Spinner 1.4s/turn; skeleton hatch moves 1.6s; pulse dot 1.8s.
- `prefers-reduced-motion: reduce` disables shifts and animations (see §9 for what the CSS actually covers).

### 2.1 How states are wired in `codex.css`

Each `.is-*` class mirrors a real selector so the kit sheets can show frozen states. **In the app use the real selectors**; the `.is-*` classes are for documentation, except where a state has no other hook (marked ⚠).

| Kit class      | Real hook in CSS                                                                                                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.is-hover`    | `:hover`                                                                                                                                                                                                   |
| `.is-active`   | `:active` (also `.cx-input:focus` for inputs = "typing")                                                                                                                                                   |
| `.is-focus`    | `:focus-visible`                                                                                                                                                                                           |
| `.is-disabled` | `:disabled` on buttons/inputs/toggles/switch/chip/tab; ⚠ **class only** for `.cx-nav-link`, `.cx-page`, `.cx-menu-item`, `.cx-card`, `.cx-item`, `.cx-acc-trigger`, `.cx-slider`, `.cx-igroup`, `.cx-crow` |
| `.is-on`       | `[aria-pressed="true"]`, `[aria-checked="true"]`, `:checked`                                                                                                                                               |
| `.is-open`     | `[aria-expanded="true"]`                                                                                                                                                                                   |
| `.is-current`  | `[aria-current="page"]` / `[aria-current="true"]`                                                                                                                                                          |
| `.is-selected` | `[aria-selected="true"]` (tabs); ⚠ class only for table rows                                                                                                                                               |
| `.is-invalid`  | `[aria-invalid="true"]` (input, textarea); ⚠ class only for `.cx-select`, `.cx-check`, `.cx-radio`                                                                                                         |
| `.is-mixed`    | ⚠ class only (checkbox indeterminate)                                                                                                                                                                      |
| `.is-checked`  | `[aria-checked="true"]` (menu item)                                                                                                                                                                        |
| `.is-loading`  | ⚠ class only (button), used with `aria-busy="true"`                                                                                                                                                        |
| —              | `[data-highlighted]` on `.cx-menu-item` = hover look (keyboard highlight)                                                                                                                                  |

**In the app:**

- **Frozen `.is-*` classes and sheet scaffolding are not shipped.** Storybook shows frozen states with `storybook-addon-pseudo-states` and the `StateMatrix` helper (`src/shared/lib/storybook`).
- **⚠ class-only states** map to attributes the components set:
  - `.is-disabled` → `[data-disabled]` (Card, Item, `.cx-crow`, `.cx-igroup`, `.cx-menu-item`) or `[aria-disabled='true']` (Nav link, Pagination);
  - `.is-invalid` → `[aria-invalid='true']` / `[data-invalid]`;
  - `.is-mixed` → `[data-indeterminate]`;
  - `.is-loading` stays a class, set by `<Button loading>`.
- **Base UI renders some controls as `<span role=…>`** (Checkbox, Radio, Switch). Their native selectors get aliases with the same declarations: `[data-checked]`, `[data-disabled]`, `[data-highlighted]`, `[data-selected]`.
- **Hover and press never apply to disabled controls** (`:not(:disabled)` / `:not([data-disabled])`). In codex.css some on + hover rules out-specify disabled; this is fixed.

---

## 3. Actions (sheet 01)

### Button — `.cx-btn` + one variant

Base: `inline-flex`, gap 8, **height 44**, padding 0 20, border 1px transparent, `--r`, body 500 15px, line-height 1, icon 16×16.

| Variant   | Class         | Default                                                      | Hover (lift)                                        | Active (press)        | Use                           |
| --------- | ------------- | ------------------------------------------------------------ | --------------------------------------------------- | --------------------- | ----------------------------- |
| Primary   | `--primary`   | bg sanguine, text `#fff`                                     | bg sanguine-hover + lift                            | bg sanguine-press     | CTA, **1 per screen**         |
| Ink       | `--ink`       | bg ink, text paper                                           | bg `#3A2E22` + shadow `3px 3px 0 0 var(--sanguine)` | bg `#000`             | strong secondary action       |
| Secondary | `--secondary` | bg surface, border ink                                       | bg sunk + lift                                      | bg sunk-2             | outline action                |
| Mono      | `--mono`      | transparent, border ink, mono 600 12px, +0.08em, UPPER       | bg sunk + lift                                      | bg sunk-2             | utility actions (Download CV) |
| Ghost     | `--ghost`     | transparent                                                  | bg sunk, **no lift**                                | bg sunk-2             | Cancel, Close, icon close     |
| Danger    | `--danger`    | bg surface, border+text error                                | bg error-wash + shadow `3px 3px 0 0 var(--error)`   | bg error, text `#fff` | destructive                   |
| Link      | `--link`      | height auto, pad 4px 0, underline `--line-strong` offset 5px | text+underline sanguine, no lift                    | sanguine-press        | in text and lists             |

Modifiers: `--sm` (h36, pad 0 14, 14px) · `--icon` (44×44, pad 0; with `--sm` = 36) — **icon buttons must have `aria-label`**.
Disabled: hatch on sunk, border line, text muted. Ghost/Link disabled: no background, transparent border.
Loading: `.is-loading` + `aria-busy="true"`, `<span class="cx-spinner" style="width:16px;height:16px">` before the label ("Sending…"). **In the app:** `<Button loading>` adds `.is-loading`, `aria-busy` and a decorative spinner (sized 16px in `button.css`). The button ignores clicks but stays focusable and in colour.
With icon: leading (Download) or trailing (↗ external).

### Button Group — `.cx-btngroup` (`role="group"` + `aria-label`)

Buttons share borders (`margin-left:-1px`), radius only on outer corners. `.cx-btngroup--v` = vertical (social rail).
Hover = fill only. Active / `aria-pressed="true"` / `aria-current` = raised segment (see §2).
Kit compositions:

- **Case actions:** Secondary × N (Live / Code / Figma).
- **"Field button" (EngRadar):** Primary + Mono (Mono with inline `background:#F8F4EA`).
- **Social rail:** vertical, Secondary icon buttons. Hover: sunk + icon in sanguine + Tooltip on the right. ⚠ The sanguine icon color on hover is set inline in the kit and is **not in `codex.css`**.
- **Carousel prev/next:** Secondary icon buttons.

### Toggle — `.cx-toggle`

h40, min-w 40, pad 0 12, border `--line-strong`, transparent, mono 500 12px +0.08em UPPER, color ink-2, icon 16.
Hover: sunk + ink text + ink border. Active: press + sunk-2. **On** (`aria-pressed="true"` / `aria-checked="true"`): ink fill, paper text; on+hover: `#3A2E22`. Disabled: hatch.
Kit uses: "Live only" filter, grid/list icon toggle (`aria-label`).

### Toggle Group — `.cx-tgroup`

Container: pad 3, gap 3, border 1px ink, `--r`, bg surface. Children `.cx-toggle`: border transparent, **h34**, `--r-sm`.
A11y in kit: `role="radiogroup"` + `aria-label`; items `role="radio"` + `aria-checked`. **In the app:** Base UI ToggleGroup renders `role="group"` with toggle buttons (`aria-pressed`) and arrow-key focus; the kit CSS styles both.
Kit uses: Language (EN | RU on the sheet; the app uses EN | FR, see §9.1), Theme (Paper | Notte), View (Grid | List), Filter (All | Front | Mobile-disabled).

### Switch — `.cx-switch` inside `.cx-switch-row`

Track 46×26, border 1px ink, radius 13, bg surface. Thumb 16×16 ink at 4/4.
Hover: sunk. Active: thumb widens to 20px. **On** (`aria-checked="true"`): track ink, thumb paper, `translateX(20px)`; on+hover track `#3A2E22`; on+active thumb at 16px.
Disabled: hatch track, line border, thumb `--line-strong`; row text muted.
Row: min-h 44, gap 12, 15px. Markup: `<button type="button" role="switch" aria-checked aria-label>`. **In the app:** Base UI renders `<span role="switch">` inside `<label class="cx-switch-row">` (the label names it). `:disabled` has a `[data-disabled]` alias, and the disabled row text is muted (`.cx-switch-row[data-disabled]`).
Kit uses: Notte (night sheet), reduce motion, "Live demos only".

### Kbd — `.cx-kbd`

min-w 22, h22, pad 0 6, border 1px ink + **2px bottom**, `--r-sm`, bg surface, mono 500 11px.
`.cx-kbd--dark`: bg `#3A2E22`, paper text, border `#6A5A47` (on ink: tooltip, dark panels).
Kit hints: `⌘ K` open index · `← →` prev/next tavola · `Esc` close · `↑ ↓ ↵` in command palette.

---

## 4. Forms (sheet 02)

### Field — `.cx-field`

Column, gap 7. Parts:

- `.cx-flabel` — mono 500 11px, +0.12em, UPPER, ink. Required marker: `<em>*</em>` in sanguine.
- `.cx-fdesc` — 13 / 1.45, muted (help text).
- `.cx-ferr` — 13 / 1.45, error color, auto-prefix `"ERR — "` (mono 11px). Link it via `aria-describedby` and set `aria-invalid="true"` on the control.
- `.cx-counter` — mono 10px +0.1em muted, aligned right (`58 / 1000`).

### Input / Textarea / Select trigger — `.cx-input`, `.cx-textarea`, `.cx-select`

Shared: width 100%, **h44**, pad 0 12, border 1px `--line-strong`, `--r`, bg `--white`, body 15px, placeholder muted.

- Hover: border ink.
- Active (typing / open, `:focus`, `aria-expanded="true"`): border ink + `inset 0 0 0 1px var(--ink)` (reads as 2px).
- Focus-visible: + dashed sanguine outline.
- Invalid: border error, bg `#FFF8F4`.
- Disabled: hatch on sunk, border line, text muted.
- Textarea: auto height, **min-h 120**, pad 10 12, lh 1.5, `resize: vertical`.
- `.cx-select` (custom trigger, shadcn Select): flex, space-between, chevron 14px rotates 180° when open. Placeholder text in kit uses muted color inline.
- `.cx-select.cx-select-native`: native `<select>` with an inline SVG chevron, pad-right 36 (mobile-friendly).

### Select listbox (open)

`.cx-menu` (`role="listbox"`) with `.cx-menu-label` groups and `.cx-option` (`role="option"`):
option min-h 36, pad 0 10, `--r-sm`, 14px. Hover sunk · active ink fill/paper text · `aria-selected="true"` = weight 600 + check icon 14px sanguine · disabled in kit = inline `color:#8A7558; cursor:not-allowed` + `aria-disabled="true"`. **In the app:** `.cx-option[data-disabled]` (`--line-strong`), highlight = `[data-highlighted]`, selected = `[data-selected]`; the listbox sits on the menu surface with `min-width: var(--anchor-width)`.

### Input Group — `.cx-igroup`

h44, border line-strong, `--r`, bg white. Hover ink border; `:focus-within` ink + inset 1px; `.is-focus` dashed outline; disabled hatch.

- `.cx-addon` (prefix): bg sunk, mono 12px ink-2, right border line-strong. `.cx-addon--end` = suffix (left border).
- `.cx-ibtn` ("field button", e.g. `SEND`): bg ink, paper text, mono 600 12px +0.08em, left border ink, radius `0 3px 3px 0`. Hover bg sanguine; active sanguine-press. Disabled in kit (inline): bg `#D3C5A8`, text `#6B5C48`. **In the app:** `.cx-igroup .cx-ibtn:disabled` uses `--line` / `--muted`. `.is-focus` maps to `:has(input:focus-visible)` and `.is-disabled` to `[data-disabled]`.
  Use: email + copy (sitemap G3), `https://` prefix.

### Checkbox / Radio — `.cx-check`, `.cx-radio` inside `label.cx-crow`

Native `<input>` with `appearance:none`. **In the app:** Base UI renders `<span role="checkbox">` / `<span role="radio">`; see the aliases in §2.1. Radio groups render `role="radiogroup"` named by the legend. 20×20, border 1.5px ink, bg white; checkbox `--r-sm`, radio 50%.
Row `.cx-crow`: min-h 44, gap 12, 15px; `.cx-crow.is-disabled` muted.
Hover sunk · active `scale(.88)` · checked: checkbox ink fill + paper check mark (clip-path) / radio ink dot 10px · checked+hover `#3A2E22` · indeterminate `.is-mixed` (2px bar) + `aria-checked="mixed"` · invalid border error · disabled hatch, border line-strong.
Radio groups: `<fieldset>` with `<legend class="cx-flabel">`.

### Slider — "ruler"

`.cx-slider` (h44) → `.cx-slider-track` (2px ink) + `.cx-slider-ticks` (10% ticks, ink-2) + `.cx-slider-range` (4px sanguine) + `.cx-slider-thumb` (20×20 **diamond** = rotated square, surface, 1.5px ink, `role="slider"` + aria-value*) + optional `.cx-slider-val` (mono 11px sanguine above, e.g. `6 WEEKS`).
Thumb hover: sanguine fill. Active/drag: `rotate(45deg) scale(1.15)`, sanguine-press. Disabled: track line-strong, thumb sunk.

### Spinner — "compass"

`.cx-spinner`: 20×20, 1.5px **dashed** circle in currentColor + needle (`::after`), 1.4s linear spin. `.cx-spinner--lg` 36×36. Always `role="status" aria-label="Loading"` when standalone. Colors used in kit: currentColor, sanguine, muted, paper on ink.

### Composition — Contact form (kit sheet 02 §07)

`<form class="cx-panel">`, grid 2 columns, gap `20px 24px`, padding 28. Message spans both columns with counter. Footer row: `grid-column: 1/-1`, border-top 1px line, padding-top 20, space-between: checkbox on the left; `Clear` (Ghost, `type=reset`) + `Send message →` (Primary, `type=submit`) on the right.
⚠ The kit's fields (Budget radios, "Reply by email") are a layout demo. The **fields and options come from `sitemap.md` G3** (Name, Email, Request type: Job offer / Freelance / Question / Other, Message, optional consent checkbox, honeypot). Storybook: Forms → Composition → Contact form.

---

## 5. Navigation (sheet 03)

### Navigation Menu

- `.cx-navbar` — flex, gap 4.
- `.cx-nav-link` — h40, pad 0 12, `--r`, mono 500 13px, +0.04em, UPPER, ink-2. `<sup>` counter in sanguine 10px. Chevron 12px.
  Hover sunk/ink · active sunk-2 · **current** (`aria-current="page"`): ink text + 2px sanguine bar (`left/right 12px, bottom -1px`) · **open** (`aria-expanded="true"`): ink fill, paper text, chevron 180° · disabled (`.is-disabled`, `aria-disabled`): `--line-strong` text.
- `.cx-navpanel` (mega-menu): 2-column grid, gap 4, **w520**, pad 8, surface, border ink, `--r`, `--float`. Items: pad 12, `--r-sm`, `.cx-label` 10px sanguine (Tav. N) + `<b>` display 15 + `<span>` 13px ink-2. Hover sunk, active sunk-2.

**Header (kit composition):** height 72, padding 0 24, border-bottom **2px ink**, bg paper. Left: name in Space Grotesk 700 21px −0.03em + `.cx-cap` sheet label. Nav at `margin-left:auto`. Then ⌘K trigger = Secondary `sm` button with search icon + `<kbd class="cx-kbd" style="height:20px">⌘K</kbd>`, `aria-label="Open codex index"`.
⚠ Nav items in the kit (Work, About, Stack, Notes, Contact) are a demo. Real items: `sitemap.md` G1. **In the app:** `NavLink` marks itself `aria-current=\"page\"` from the URL.

### Tabs — `.cx-tabs` / `.cx-tab` / `.cx-tabpanel`

List: border-bottom 1px ink. Tab: h44, pad 0 18, mono 600 12px +0.1em UPPER, ink-2; `<sup>` muted 9px.
Hover sunk · active sunk-2 · **selected** (`aria-selected="true"`): bg surface, ink text, **3px sanguine bar** at the bottom, sup in sanguine · disabled `--line-strong`. Panel: padding-top 20.
Kit use: Fol. 03 — Skills / Experience / Education.

### Breadcrumb — `ol.cx-crumb`

mono 12px +0.1em UPPER, gap 10. Links ink-2 → hover sanguine + underline → active sanguine-press. Separator `/` in `.cx-crumb-sep` (line-strong, `aria-hidden`). Current: `aria-current="page"`, ink 600. Example: `Codex / Fol. 02 / Tav. III`.

### Pagination — `nav.cx-pager` / `.cx-page`

gap 6. Item: min-w 44, h44, pad 0 10, border 1px line, `--r`, mono 500 13px. Roman numerals (I–VI).
Hover sunk + ink border · active press + sunk-2 · **current** ink fill/paper · disabled hatch + line-strong text ("in progress"). `.cx-page--wide` for `← Tav. II` / `Tav. IV →` (pad 0 16, UPPER 12px).

### Menu (Dropdown / Context / Command list) — `.cx-menu`

min-w 240, pad 6, surface, border ink, `--r`, `--float`.

- `.cx-menu-label`: mono 10px +0.16em UPPER muted, pad 8 10 6.
- `.cx-menu-sep`: 1px line, margin `6px -6px`.
- `.cx-menu-item`: min-h 36, pad 0 10, gap 10, `--r-sm`, body 14px, icon 16 ink-2; `.cx-menu-end` = right-aligned mono 11 muted (shortcut / kbd).
  Hover/highlighted sunk · active ink fill, paper text+icon · checked (`aria-checked="true"`): 6px sanguine dot before · disabled line-strong · `.cx-menu-item--danger` error text, hover error-wash.
  **Inside menus focus = highlight:** in the app `.cx-menu-item:focus-visible` drops the dashed outline, and the open panel draws no focus ring (§9.6).
- Kit uses: language/theme dropdown (trigger = Mono `sm` button, chevron rotates when open; **decided 2026-11-20:** while its menu is open the trigger keeps the button's hover look — lift + hard shadow + the variant's hover fill — instead of the sheet's pressed look); context menu on the drawing (easter egg: Explode view `E`, Show construction lines `G`, Mirror writing ✓, Copy SVG `⌘C`, Reset sketch — danger).

### Command palette (⌘K "codex index") — `.cx-cmd`

Inside a Dialog over scrim. **w600**, surface, border ink, `--r`, `--float`.

- `.cx-cmd-input`: h56, pad 0 16, bottom border ink, search icon 18, input body 17px, `Esc` kbd at the end.
- `.cx-cmd-list`: pad 6, uses `.cx-menu-label` groups and `.cx-menu-item` options (`role="option"`). Matches are `<mark>` → sanguine 600, no background. Tav. number as `.cx-label` 10px, width 56.
- `.cx-cmd-foot`: bg sunk, top border line, mono 10px UPPER: `↑↓ Navigate · ↵ Open · Esc Close · N results`.
  Groups per `sitemap.md` G5: Pages, Work, Actions; empty state "No results".

---

## 6. Data display (sheet 04)

### Card — tavola (project) — `.cx-card`

Column, surface, border 1px ink, `--r`, overflow hidden.

- `.cx-card-media`: aspect 16/10, bottom border ink, placeholder = sunk + `--xhatch`; inner label `<span>` mono 10px on surface. `.cx-card-tag` (e.g. `TAV. I`): absolute 10/10, mono 10px, ink bg, paper text, radius 2. **In the app:** codex.css writes the placeholder label as `.cx-card-media > span`, which also hits the tag and out-specifies its ink fill. Fixed as `> span:not(.cx-card-tag)`.
- `.cx-card-body`: pad 16, gap 10 — title `.cx-card-title.cx-h4` + Badges.
- `.cx-card-foot`: pad 12 16, top border line, mono 11px muted — year left, `.cx-card-arrow` `↗` right.
- **Link card** `.cx-card--link` (`<a>`): hover `translate(-3px,-3px)` + `5px 5px 0 0 var(--ink)`, arrow moves `(3px,-3px)` and turns sanguine, title underlined. Active: `translate(0,0)`, shadow `1px 1px 0 0 ink`, bg sunk. Uses `--t`/`--ease` (120ms), not button timing.
- Disabled / in progress `.cx-card.is-disabled` + `aria-disabled`: border line, muted text, media at opacity .55, tag bg muted (inline), Badge `warning` "Draft". **In the app:** `<Card disabled>` → `[data-disabled]`; its media is decorative (`aria-hidden`, §9.8).

### Item — list mode — `.cx-items` / `.cx-item`

Container: border ink, `--r`, surface. Row (`<a>`): grid `44px 1fr auto`, gap 14, pad 14 16, bottom border line.

- `.cx-item-num`: 40×40, border ink, `--r`, mono 12 (Roman numeral).
- `.cx-item-title`: display 700 17; `.cx-item-meta`: badges, gap 6, mt 6.
- `.cx-item-end`: mono 13 right (year) + `<small>` 10px muted + `.cx-item-arrow`.
  Hover sunk + underline title + arrow ↗ sanguine · active sunk-2 + number in ink fill · disabled muted + hatched number. Focus in kit uses `outline-offset:-3px` (inline).

### Badge — `.cx-badge` (static)

pad 4 7, `--r-sm`, mono 500 11px +0.06em UPPER, lh 1.2.

| Variant                                                  | Look                           | Kit use                                           |
| -------------------------------------------------------- | ------------------------------ | ------------------------------------------------- |
| default                                                  | sunk / ink-2                   | stack items                                       |
| `--accent`                                               | sanguine-wash / sanguine-press | domain tag (iGaming)                              |
| `--solid`                                                | ink / paper                    | selected                                          |
| `--outline`                                              | transparent, 1px ink, pad 3 6  | stack (with tooltip on top)                       |
| `--success`                                              | verdigris-wash / verdigris     | "Available for work" with `.cx-dot.cx-dot--pulse` |
| `--warning`                                              | ochre-wash / ochre             | "Draft"                                           |
| `--error`                                                | error-wash / error             | "Archived"                                        |
| `.cx-dot`: 7×7 currentColor circle; `--pulse` 1.8s ring. |

### Chip — interactive filter — `button.cx-chip` + `aria-pressed`

h36, pad 0 12, border line-strong, radius 18, mono 500 12px +0.06em UPPER, ink-2; `<sup>` count in sanguine 9px.
Hover sunk + ink border · active sunk-2 · **on** ink fill/paper, sup `#F0A58F` · disabled hatch. Kit use: Work filter (All / Frontend / Fullstack / Design / Pet / Mobile).

### Avatar — `.cx-avatar`

44×44, border ink, `--r`, sunk + `--xhatch` (portrait placeholder), mono 600 13. `--fallback` (initials on surface), `--sm` 32, `--lg` 72, `--round`. `.cx-avatar-status` 12px verdigris dot. `.cx-avatars` overlap −8px. Portrait direction: sepia duotone + hatching (placeholder for now).

### Aspect Ratio — `.cx-ratio`

border ink, sunk + xhatch, label `<span>` bottom-left mono 10. Ratios in kit: 16:9, 4:5, 16:7 (dialog), 16:10 (card).

### Accordion & Collapsible

- `.cx-acc` top border **2px ink**; `.cx-acc-item` bottom 1px ink.
- `.cx-acc-trigger` (`<button aria-expanded>`): grid `44px 1fr 28px`, min-h 60; `.cx-acc-n` mono 11 muted (01, 02…); `.cx-acc-t` display 700 18; `.cx-acc-ico` "+" (two 1.5px bars) → "−" when open.
  Hover sunk · active sunk-2 · open: number turns sanguine, "+" → "−" · disabled muted.
- `.cx-acc-content`: pad `0 16 20 44`, 15 / 1.56 ink-2.
- Collapsible = `.cx-btn--link` text trigger in mono 12px +0.08em (inline in kit): `SHOW SPEC ▾` / `HIDE SPEC ▴`, for secondary content.
  Kit use: case study Problem / Approach / Result / Learnings / Metrics.

### Table — spec sheet

`.cx-table-wrap` (border ink, `--r`) > `table.cx-table` (14px, surface).
`th`: pad 10 14, bg sunk, **bottom 2px ink**, mono 600 10px +0.14em UPPER ink-2. `td`: pad 12 14, bottom 1px line. `.num` right + mono. Row hover sunk; `.is-selected` sanguine-wash. `caption`: bottom, EB Garamond italic 15 ink-2 (e.g. "Tav. I — specifica tecnica").

### Code Block — `.cx-code`

border ink, `--r`, bg white. `.cx-code-head` h40, sunk, mono 11: file path + TS badge + Ghost `sm` "Copy" button (→ "Copied" with check, color verdigris). `pre`: mono 13 / 1.7, line numbers via `span.ln` counter (40px, muted), highlighted line `span.ln.hl` = sanguine-wash.
Syntax tokens: `.tk-k` keyword sanguine · `.tk-s` string verdigris · `.tk-c` comment muted italic · `.tk-f` function/type `#5A3F86` · `.tk-n` number ochre.

### Carousel — `.cx-carousel` (`role="region" aria-roledescription="carousel"`)

`.cx-carousel-view` (border ink, `--r`) holding a `.cx-ratio`. `.cx-carousel-bar`: ticks left, counter `.cx-label` 11px (`02 / 06`) center, prev/next Button Group right. `.cx-tick`: 16×12 hit area, 2px line-strong bar; hover ink; **current** (`aria-current="true"`) w28, 3px sanguine. Caption: `.cx-marg` 15px ("Fig. 2 — …").

### Chart (optional) — `.cx-chart`

`.cx-bars` h160, bottom border ink, 40px horizontal rules in line. `.cx-bar`: border ink (no bottom), sunk + hatch; hover sunk-2; `.cx-bar--accent` solid sanguine (the one highlighted value). `.cx-bar-val` mono 10 above; `.cx-bar-labels` mono 10 muted. Wrap with `role="img"` + `aria-label`. Values in the kit are samples.

### Progress (optional) — ruler

`.cx-progress` h12, border ink, radius 2, surface. `.cx-progress-bar` sanguine; `--hatch` variant ink-2 with light hatching; `.cx-progress-ticks` 10% ticks under. Indeterminate = `.cx-skel` inside.
**Do not use as "skill level"** (reads as self-assessment) — loading only.

### Trace — timeline (optional) — `ol.cx-trace`

`li`: grid `72px 24px 1fr`, gap `0 14`. `.cx-trace-year` mono 12 right. `.cx-trace-rail` 1px ink vertical line (last item stops at 10px). `.cx-trace-node` 14×14: default ink fill (past job/study) · `--current` surface + sanguine border + 3px sanguine-wash ring · `--future` paper, **dashed** ("Your team?" → link to contact). `.cx-trace-body`: pad-bottom 24, gap 4 — `.cx-h4` company + `.cx-small` details.

### Empty (optional) — `.cx-empty`

Centered column, gap 12, pad 40 24, **1px dashed line-strong**, `--r`, bg paper. Icon: 56px compass SVG (dashed sanguine circle + cross, ink center dot). Then `.cx-h4` title, `.cx-small` text, Secondary `sm` button. Use: "Tav. VI — in lavorazione", 404.

### Skeleton — `.cx-skel`

sunk + hatch (24px), radius 2, hatch slides 1.6s ("pencil"). Container `aria-busy="true"` + `aria-label`.

### Resizable (optional) — `.cx-resizable` / `.cx-pane` / `.cx-handle`

h180, border ink. Handle: 1px ink line + 12×28 grip with two bars. Hover sanguine; drag (`.is-active`) 2px sanguine + filled grip. `role="separator" aria-orientation="vertical" tabindex="0"`. Use: before/after.

### Scroll Area — `.cx-scroll`

border ink, `--r`, surface. `.cx-scrollbar` 8px with left 1px line; `.cx-scrollthumb` 6px, radius 3: idle line-strong · hover ink-2 · drag sanguine 7px.

---

## 7. Overlays & feedback (sheet 05)

**Overlay rules (from the kit):**

- Scrim is always ink 45% (`--scrim`), over the sheet grid.
- Floating elements (menu, hover card, toast, dialog, command) = `--float`, no blur.
- Appear in 160ms: 8px shift + fade. **Esc and scrim click close; focus returns to the trigger.**
- **Dialog** = tavola preview without navigating away. **Alert Dialog** = only before external links and form reset.
- **Sheet** = from the right, width 320 / 82vw, header 64px + 2px ink. Current section in sanguine.
- **Drawer** = from the bottom, for filters and quick actions, radius 12 on top only, grip handle.

### Tooltip — `.cx-tip` (`role="tooltip"`)

pad 6 9, `--r-sm`, **ink bg, paper text, mono 11px +0.06em**, nowrap, 8px rotated-square arrow. `--right` (arrow on the left) for the social rail; `--top` above stack badges. Shows on hover **and** focus; delay 300ms. May contain `.cx-kbd--dark`. **In the app:** only `right` and `top` (the sides the kit draws an arrow for). The tooltip never flips to the other side; the gaps are 10px (right) and 8px (top).

### Hover Card — `.cx-hcard`

w320, pad 16, gap 12, surface, border ink, `--r`, `--float`. Kit content: avatar lg + `.cx-h4` name + `.cx-label` 10px sanguine + success badge; `.cx-small` text; separator; `.cx-cap` + `.cx-tlink` "Full profile →". Trigger: `.cx-tlink` (name or a sanguine annotation with a callout arrow).

### Dialog / Alert Dialog — `.cx-dialog`

Default w480 (kit shows 620 for tavola preview, 400 for alert), max-w 100%, surface, border ink, `--r`, `--float`.

- `.cx-dialog-head`: pad `20 20 0 24`, label `.cx-label` 10px sanguine (e.g. `Fol. 02 · Tav. I`) + `.cx-h3` title; Ghost icon close (`aria-label="Close"`).
- `.cx-dialog-body`: pad `12 24 20`, gap 12.
- `.cx-dialog-foot`: pad 14 24, top border line, **bg sunk**, buttons right, gap 10 (Ghost + Primary; Alert: Ghost "Stay" + Ink "Open site ↗").
  A11y: `role="dialog"`/`"alertdialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`.

### Sheet — `.cx-sheet-panel` (mobile menu)

⚠ **Name clash:** `.cx-sheet` in `codex.css` is _documentation scaffolding_ (the 1440px kit page). The Sheet **component** is `.cx-sheet-panel`.
Right side, full height, surface, **left border 2px ink** (`--left` variant mirrors). CSS default width 360; kit composition uses 320 (rule: 320 / 82vw). **In the app:** `min(320px, 82vw)` (§9.5).

- `.cx-sheet-panel-head`: h64, pad `0 10 0 20`, bottom 2px ink; `.cx-label` 11 + Ghost icon close.
- `.cx-sheet-nav a`: pad 14 12, bottom 1px line; `<b>` display 24 −0.02em + `<span>` mono 11 muted (folio number); hover sunk; `aria-current="page"` → title in sanguine.
- Bottom area: `margin-top:auto`, pad 16 20, top border line, gap 14 — Toggle Group (language) + horizontal Button Group of social icons.

### Drawer — `.cx-drawer`

Bottom, surface, **top border 2px ink**, radius `12px 12px 0 0`. `.cx-drawer-grip` 48×4 line-strong radius 2. Kit content: `.cx-h3` "Filter" + `.cx-cap` count; chips; switch row; footer (top border line) with Ghost "Reset" (flex 1) + Primary "Show N tavole" (flex 2).

### Alert — `.cx-alert` (form status)

grid `28px 1fr`, gap `4 12`, pad 14 16, border, `--r`. `.cx-alert-ico` 28px circle, 1px currentColor border, mono 600 13 **letter icon**: `i` info · `✓` success · `!` warning · `×` error. `.cx-alert-title` display 700 15; `.cx-alert-desc` 14 / 1.5 ink-2.
Variants: default (ink border, surface) · `--success` · `--warning` · `--error` (pigment border + wash bg + pigment icon). Error title starts with **`ERR —`**. Roles: `status` (info/success/warning), `alert` (error). Error alert includes a recovery link (`.cx-tlink` "try again" / email).

### Toast — `.cx-toast`

w380, flex gap 14, pad `12 12 12 16`, surface, border ink, `--r`, `--float`. Position **bottom right**, **4s**. `role="status"`.
`.cx-toast-body`: `.cx-label` 10px (colored: verdigris "Copied", sanguine "Draft saved", default "Sending") + 14px ink-2 text. Optional leading icon 20px or spinner; trailing Secondary `sm` action ("Undo") and Ghost `sm` icon dismiss.
`.cx-toast--dark`: ink bg, paper text, **shadow `4px 4px 0 0 var(--sanguine)`**, secondary text `#D9CDB6`, label `#F0A58F`.

**In the app:**
- `ToastProvider` + `useToast().show({ type, title, description, action })`.
- Types: `success` (verdigris check), `loading` (spinner, no timeout), `accent` (sanguine label).
- `max-width: calc(100vw - 40px)` is added so the 380px toast fits phones.
- The stack is 32px from the edges (20px below 768px).
- `--dark` is not exposed by the component (its only example is the dropped Notte theme, and a dismiss button on ink is not designed).

---

## 8. Decorative layer — Separator, Marker, Dimension (sheet 00 §05)

- `hr.cx-sep` (1px line) · `--ink` · `--strong` (2px ink) · `--v` (vertical, 1px line).
- `.cx-marker` (`role="separator"`): labeled divider — ink lines both sides, mono 11 +0.16em UPPER ink-2, `<b>` in sanguine: `Fol. 03 · About`.
- `.cx-dim` (`aria-hidden`): dimension line with end ticks, mono 10 muted, real values (`1280 PX`).
- `.cx-stage`: overlay demo surface = paper with a 40px grid in `rgba(138,106,69,.22)`. Usable as the "sheet grid" background behind overlays.
- Concept motifs (12-col grid with "+", hatching instead of shadows, dimension lines, cursor coordinates, outline name with compass constructions, mirror writing, sanguine annotations with callouts drawn via stroke-dashoffset, drawing stamp in the footer with CTA as last cell, Fol./Tav. numbering): all decor → `aria-hidden`, `pointer-events:none`.

---

## 9. Known gaps and inconsistencies in the kit (do NOT "fix" silently — decide, then update kit + this file)

1. **Language toggle:** kit and `concept-codex.md` show **EN | RU**; `sitemap.md` says **EN | FR**. **Decided 2026-11-19: EN | FR.** RU on the kit sheets is sample copy; the canvas is not redrawn (the project is the source of truth).
2. **Social rail:** kit shows GitHub, LinkedIn, **Telegram**, Email; `sitemap.md` G2 lists GitHub, LinkedIn, Email, **CV (PDF)**. **Decided 2026-11-19: no Telegram**; links follow `sitemap.md` G2. The canvas is not redrawn (the project is the source of truth).
3. **Dark theme "Notte":** only 4 colors are defined (`#1C1712 / #F1EADB / #C9A97A / #E0704F`, concept doc). `codex.css` has **no Notte theme** and no mapping of these to tokens. `.cx-toast--dark` and `.cx-kbd--dark` are "on ink" components, not the Notte theme. Don't derive a dark palette — `TODO(design)`. **In the app:** one theme only (PROJECT_OVERVIEW.md §2); `.cx-toast--dark` is kept in CSS but not exposed.
4. **EB Garamond** (5th font) is still awaiting approval (concept doc).
5. **Sheet width:** CSS default `.cx-sheet-panel{width:360px}` vs rule "320 / 82vw" (the Home design draws `min(360px, 88vw)`). **Decided 2026-11-21: the kit rule, `min(320px, 82vw)`.**
6. **Focus rule coverage:** the shared `:focus-visible` selector does **not** include `.cx-ibtn`, `.cx-tick`, `.cx-option`, `.cx-navpanel a`, `.cx-sheet-nav a`, `.cx-card` (non-link). Browsers will show default focus there. **In the app:** kept as is, except `.cx-menu-item`: focus inside menus is the highlight, not the dashed line (sheet 03 note, §2).
7. **Reduced motion coverage:** the `prefers-reduced-motion` block only covers `.cx-btn, .cx-toggle, .cx-chip, .cx-page, .cx-switch, .cx-card, .cx-item, .cx-switch::after` (transitions) and `.cx-spinner, .cx-skel, .cx-dot--pulse` (animations). Not covered: menus, tabs, accordion, inputs, slider, ticks, `.cx-ibtn`, overlays. **In the app:** still not covered for those transitions; the new overlay motion (menu surface, tooltip, toast) has its own reduced-motion override.
8. **Opacity exceptions:** `.cx-card.is-disabled .cx-card-media{opacity:.55}` and an inline `opacity:.4` on a disabled accordion icon contradict "no opacity". Documented only; not a pattern to reuse. **Decided 2026-11-20:** the in-progress card keeps its dimmed media as drawn. Its text falls below 4.5:1, an accepted exception to WCAG 2.2 AA; the media is marked decorative (`aria-hidden`) and excluded from axe checks.
9. **Inline-only styles in the kit** (not in CSS): social icon turning sanguine on hover; disabled `.cx-ibtn` colors; disabled `.cx-option` color; Mono button bg surface in the "field button"; collapsible link-button mono styling; `outline-offset:-3px` on focused Item/Accordion rows; card tag muted bg on disabled card. **In the app, implemented with tokens:** disabled `.cx-ibtn`, disabled `.cx-option`, `outline-offset:-3px` on `.cx-item`, the muted card tag, the Select placeholder colour, the spinner size inside a button, indeterminate + hover. **Left to compositions:** the social-rail icon colour and the field-button Mono background (M2).
10. **Native-element dependency:** `.cx-check`/`.cx-radio` are styled through native `:checked` / `:disabled`; `.cx-select-native` is a native `<select>`. If a library primitive renders something else (e.g. a `<button role="checkbox">` with `aria-checked`/`data-state`), these selectors won't match. Check the DOM the installed shadcn component actually renders before wiring; map its state attributes onto the **same declarations** — don't restyle. **In the app:** resolved with Base UI attribute aliases (§2.1).
11. **Kit sample copy** (e.g. "Notes" nav item, "UI Kit library" as Tav. II, "One core, five brands", "4 live · 1 launching", budgets, hello@[your-domain]) is placeholder. Real content = `sitemap.md`; `concept-codex.md` says brand counts / multi-branding do not appear in the concept.

---

## 10. Documentation-only classes (never use in the app)

`.cx-sheet`, `.cx-sheet-head`, `.cx-sheet-meta`, `.cx-sec`, `.cx-sec-title`, `.cx-matrix` (+ `.cx-mh`, `.cx-mv`, `.cx-last`), `.cx-strip`, and the frozen `.is-*` state classes except the ⚠ ones in §2.1. Layout helpers `.cx-panel`, `.cx-cols-2/3/4`, `.cx-stack`, `.cx-inline`, `.cx-cap`, `.cx-note` live in the same scaffolding block of `codex.css`; they may be reused for app layout, but they are not components. **In the app:** none of the documentation-only classes are shipped; the layout helpers are in `src/shared/styles/layout.css`.

## 11. shadcn component → kit class (as named on the kit sheets)

Button → `.cx-btn` · Button Group → `.cx-btngroup` · Toggle → `.cx-toggle` · Toggle Group → `.cx-tgroup` · Switch → `.cx-switch` · Kbd → `.cx-kbd` · Separator → `.cx-sep` · Marker → `.cx-marker` · Badge → `.cx-badge` (+ Chip `.cx-chip`) · Avatar → `.cx-avatar` · Card → `.cx-card` · Item → `.cx-item` · Navigation Menu → `.cx-nav-link` / `.cx-navpanel` · Tabs → `.cx-tab` · Breadcrumb → `.cx-crumb` · Pagination → `.cx-page` · Dropdown / Context Menu → `.cx-menu` · Command → `.cx-cmd` · Dialog / Alert Dialog → `.cx-dialog` · Sheet → `.cx-sheet-panel` · Drawer → `.cx-drawer` · Tooltip → `.cx-tip` · Hover Card → `.cx-hcard` · Alert → `.cx-alert` · Toast (sonner) → `.cx-toast` · Field / Label → `.cx-field` / `.cx-flabel` · Input → `.cx-input` · Input Group → `.cx-igroup` · Textarea → `.cx-textarea` · Select / Native Select → `.cx-select` (+ `.cx-option`) · Checkbox / Radio Group → `.cx-check` / `.cx-radio` · Slider → `.cx-slider` · Spinner → `.cx-spinner` · Progress → `.cx-progress` · Accordion / Collapsible → `.cx-acc` · Table → `.cx-table` · Code Block → `.cx-code` · Carousel → `.cx-carousel` · Chart → `.cx-chart` · Trace → `.cx-trace` · Empty → `.cx-empty` · Skeleton → `.cx-skel` · Resizable → `.cx-resizable` · Scroll Area → `.cx-scroll` · Aspect Ratio → `.cx-ratio` · Typography → §1.7 classes.

---

## 12. In the app: kit class → component (M1)

Import components from their folder: `import { Button } from '@/shared/ui/button'`. CSS is never imported by components. `src/shared/styles/index.css` loads every file in the kit's cascade order, in layers `reset < base < components < motion`. Stories: `pnpm storybook`.

| Kit class | Component (`src/shared/ui/…`) | Base | Status |
|---|---|---|---|
| Tokens, reset, typography, layout helpers, focus, reduced motion | `src/shared/styles/*.css`, fonts in `fonts.ts` | — | done |
| Icons (Lucide geometry) | `icons/` — `Icon` + one file per icon | — | done (add on demand) |
| `.cx-btn` | `button/` — `Button`, `buttonClassName()` (for links) | Base UI Button | done |
| `.cx-btngroup` | `button-group/` — `ButtonGroup` | markup | done |
| `.cx-toggle` | `toggle/` — `Toggle` | Base UI Toggle | done |
| `.cx-tgroup` | `toggle-group/` — `ToggleGroup` | Base UI ToggleGroup | done |
| `.cx-switch` | `switch/` — `Switch` | Base UI Switch | done |
| `.cx-kbd` | `kbd/` — `Kbd` | markup | done |
| `.cx-field` (+ label, desc, err, counter) | `field/` — `Field` | Base UI Field | done |
| `.cx-input` | `input/` — `Input` | Base UI Input | done |
| `.cx-textarea` | `textarea/` — `Textarea` | Base UI Field.Control | done |
| `.cx-select` + `.cx-option` | `select/` — `Select` | Base UI Select | done |
| `.cx-select-native` | `native-select/` — `NativeSelect` | Base UI Field.Control | done |
| `.cx-igroup`, `.cx-addon`, `.cx-ibtn` | `input-group/` — `InputGroup`, `InputGroupAddon`, `InputGroupInput`, `InputGroupButton` | markup + Base UI | done |
| `.cx-check`, `.cx-crow` | `checkbox/` — `Checkbox` | Base UI Checkbox | done |
| `.cx-radio` | `radio-group/` — `RadioGroup`, `Radio` | Base UI RadioGroup + Fieldset | done |
| `.cx-spinner` | `spinner/` — `Spinner` | markup | done |
| `.cx-sep`, `.cx-marker`, `.cx-dim` | `separator/` — `Separator`, `Marker`, `Dimension` | Base UI Separator + markup | done |
| `.cx-badge`, `.cx-dot` | `badge/` — `Badge` | markup | done |
| `.cx-chip` | `chip/` — `Chip` | Base UI Toggle | done |
| `.cx-card` | `card/` — `Card`, `CardMedia`, `CardBody`, `CardTitle`, `CardFoot`, `CardArrow` | markup + i18n `Link` | done |
| `.cx-items`, `.cx-item` | `item/` — `ItemList`, `Item` | markup + i18n `Link` | done |
| `.cx-ratio` | `aspect-ratio/` — `AspectRatio` | markup | done |
| `.cx-skel` | `skeleton/` — `Skeleton` | markup | done |
| `.cx-navbar`, `.cx-nav-link` | `nav-link/` — `NavBar`, `NavLink` (client: reads the URL) | i18n `Link` | done |
| `.cx-tabs`, `.cx-tab`, `.cx-tabpanel` | `tabs/` — `Tabs`, `TabsList`, `Tab`, `TabsPanel` | Base UI Tabs | done |
| `.cx-crumb` | `breadcrumb/` — `Breadcrumb` | i18n `Link` | done |
| `.cx-pager`, `.cx-page` | `pagination/` — `Pagination`, `PaginationLink` | i18n `Link` | done |
| `.cx-menu`, `.cx-menu-item` | `menu/` — `Menu`, `MenuTrigger`, `MenuPopup`, `MenuItem`, `MenuCheckboxItem`, `MenuRadioGroup`, `MenuRadioItem`, `MenuGroup`, `MenuSeparator` | Base UI Menu | done (dropdown) |
| `.cx-tip` | `tooltip/` — `Tooltip` | Base UI Tooltip | done |
| `.cx-alert` | `alert/` — `Alert` | markup | done |
| `.cx-toast` | `toast/` — `ToastProvider`, `useToast` | Base UI Toast | done (provider not yet in `src/app`) |
| `.cx-navpanel`, Context menu, `.cx-cmd` | — | — | later pass |
| `.cx-dialog`, `.cx-sheet-panel`, `.cx-drawer`, `.cx-hcard`, `.cx-stage`, `.cx-scrim` | — | — | later pass |
| `.cx-acc`, `.cx-table`, `.cx-code`, `.cx-trace`, `.cx-empty`, `.cx-avatar`, `.cx-carousel` | — | — | later pass |
| `.cx-slider`, `.cx-progress`, `.cx-resizable`, `.cx-scroll`, `.cx-chart` (optional) | — | — | later pass |
