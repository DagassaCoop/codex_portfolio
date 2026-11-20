# PROGRESS.md — Codex Portfolio

> **What this file is.** The running record of development: what is done, what is in progress, what was decided along the way, and what is blocked. It answers "where are we and why" without digging through git history or chat logs.
>
> **What it is not.** Not a spec. Scope, stack and architecture live in `PROJECT_OVERVIEW.md`; the visual contract lives in `DESIGN.md`. If a decision recorded here changes either of them, update that file too and link it from the entry.
>
> **Who updates it.** Anyone (human or AI) who finishes a meaningful piece of work, makes a decision, or hits a blocker, in the same session the work happens.

## How to write entries

- **Newest first** in every log section.
- **Dates** are absolute: `YYYY-MM-DD`.
- **Keep entries short:** what changed, where (paths), how it was verified. Details belong in code, commits or the spec docs.
- **Status markers:** `[done]` · `[in progress]` · `[blocked]` · `[todo]` · `[dropped]`.
- **Link, don't copy:** reference `PROJECT_OVERVIEW.md §N`, `DESIGN.md §N`, file paths, commits or PRs.
- When an open question is answered, move it to **Decisions** and delete it from **Open questions**.

---

## 1. Current status

_A snapshot. Overwrite it, don't append to it._

- **Phase:** M1 Foundation, base pass (scope in Decisions, 2026-11-19).
- **Now:** M1 stage 5 (Navigation) is done and waiting for review.
- **Next:** M1 stage 6, Feedback: Tooltip, Alert, Toast — the last stage of the base pass.
- **Blocked by:** nothing. The Sheet width is deferred until the mobile menu (M2).

---

## 2. Milestones

| # | Milestone | Status | Notes |
|---|---|---|---|
| M0 | Project init: Next.js + FSD skeleton, i18n routing, tooling | [done] | 2026-11-19. Storybook added the same day |
| M1 | Foundation: kit styles + `shared/ui` components on Base UI, with stories | [in progress] | Two passes: base first, the rest later (Decisions, 2026-11-19). Base pass stages: 1 Styles [done] · 2 Actions [done] · 3 Forms [done] · 4 Data display [done] · 5 Navigation [done] · 6 Feedback |
| M2 | Global layout: header, mobile menu, social rail, footer stamp, locale switch | | |
| M3 | Home (`/[locale]`) | | |
| M4 | Work (`/[locale]/work`) | | |
| M5 | Work detail / case study (`/[locale]/work/[slug]`) | | |
| M6 | About (`/[locale]/about`) | | |
| M7 | Contact form: server action, email, spam protection | | |
| M8 | Command palette (⌘K) | | |
| M9 | 404 | | |
| M10 | Quality pass: E2E, axe, screenshot tests, performance targets | | |

---

## 3. Work log

_One entry per meaningful step. Template:_

```md
### YYYY-MM-DD — <short title>
- **Status:** [done] / [in progress] / [blocked]
- **What:** …
- **Where:** `path/…`
- **Verified:** how it was checked (commands, tests, screenshots)
- **Follow-ups:** …
```

<!-- entries below, newest first -->

### 2026-11-20 — M1 stage 5: Navigation (Nav link, Tabs, Breadcrumb, Pagination, Menu)
- **Status:** [done]
- **What:**
  - **NavBar + NavLink** (client component): a locale-aware link that marks itself `aria-current="page"` from the URL (the same path or a page inside it; `/` only on `/`). It also takes `current` (override), `count` and `disabled`.
  - **Tabs**: `Tabs`, `TabsList` (aria-label), `Tab` (count), `TabsPanel`, on Base UI Tabs.
  - **Breadcrumb**: `items`, the last one is the current page; locale-aware links.
  - **Pagination + PaginationLink**: `current`, `wide` (prev / next), `disabled`.
  - **Menu** on Base UI Menu:
    - `MenuTrigger` looks like a kit button (Mono `sm` by default) with a chevron that turns;
    - `MenuPopup` is the kit surface;
    - `MenuItem` (icon, end, danger), `MenuCheckboxItem`, `MenuRadioGroup` / `MenuRadioItem`, `MenuGroup`, `MenuSeparator`.
  - Stories:
    - the states of each component, as on kit sheet 03;
    - the language menu (EN / FR);
    - the sheet's drawing menu with every item kind.
- **Where:**
  - `src/shared/ui/{nav-link,tabs,breadcrumb,pagination,menu}/`
  - `src/shared/ui/select/select.css`
  - `src/shared/styles/index.css`
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check`, `build` and `build-storybook` pass.
  - `test:stories`: 108/108 on a cold cache. The tests cover:
    - the current page from the URL, with locale prefixes in hrefs;
    - arrows and Enter switching tabs and panels;
    - the breadcrumb's last item as the current page;
    - the current and unavailable pagination pages;
    - the menu: keyboard open, radio choice, Esc returning focus to the trigger, and the checkbox item.
  - Screenshots of every story compared with kit sheet 03. Keyboard highlight in a menu shows no dashed line.
- **Follow-ups:** the Navigation Menu panel (`.cx-navpanel`) and the Context menu are in the later pass.

### 2026-11-20 — M1 stage 4: Data display (Badge, Chip, Separator / Marker / Dimension, Card, Item, Aspect Ratio, Skeleton)
- **Status:** [done]
- **What:**
  - **Badge**: `<Badge tone dot>`, seven tones, a status dot (static or pulsing).
  - **Chip**: Base UI Toggle with a `count`.
  - **Separator** (Base UI Separator: line / ink / strong / vertical), **Marker** (`role="separator"`) and **Dimension** (decorative) share one folder, like the kit's CSS block.
  - **Card** parts: `Card`, `CardMedia` (tag + decorative placeholder), `CardBody`, `CardTitle` (a real heading, h3 by default), `CardFoot`, `CardArrow`.
  - **Item** + **ItemList**: `num`, `title`, `meta`, `end`.
  - With `href`, Card and Item render the locale-aware `Link` from `@/shared/i18n`; `disabled` = "in progress".
  - **AspectRatio**: `ratio`, `label`, image children with next/image `fill`.
  - **Skeleton**: `width` / `height`; the loading container gets `role="status"`.
  - Stories: a states matrix for Card and Chip, the Item list with forced hover / active / focus rows, badge tones, separators, kit ratios, a loading card.
- **Where:**
  - `src/shared/ui/{badge,chip,separator,card,item,aspect-ratio,skeleton}/`
  - `src/shared/styles/index.css`
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check`, `build` and `build-storybook` pass.
  - `test:stories`: 91/91 on a cold cache. The tests cover single-choice chips, separators exposed to assistive tech (the dimension hidden), the card as one locale-aware link with a heading, Item rows as links while the draft row is not, and the busy skeleton.
  - Screenshots of every story compared with kit sheets 04 and 00 §05.

### 2026-11-19 — M1 stage 3: Forms (Field, Input, Textarea, Select, Native Select, Checkbox, Radio Group, Input Group, Spinner)
- **Status:** [done]
- **What:**
  - Nine components in `src/shared/ui/`, plus Button `loading`.
  - **Field** wraps Base UI Field: `<Field label required description error counter>`. The label, description and error are linked to the control. `error` makes the field invalid.
  - **Input** uses Base UI Input. **Textarea** and **NativeSelect** render through `Field.Control`, so a Field labels and validates them too.
  - **Select** is Base UI Select: `label`, an `options` list (flat or grouped), a portal listbox on the kit's menu surface, and keyboard support.
  - **Checkbox** and **Radio / RadioGroup** use Base UI: a whole-row `<label>`, `indeterminate`, `invalid`; the group gets a legend and a horizontal layout.
  - **InputGroup** has `InputGroupAddon`, `InputGroupInput` and `InputGroupButton` parts.
  - **Spinner** is announced as a status (`label`) or hidden (`decorative`).
  - **Button `loading`** shows the spinner, sets `aria-busy`, ignores clicks and stays focusable in full colour.
  - New icons: `CheckIcon`, `ChevronDownIcon`.
  - The menu surface CSS (`.cx-menu`, label, separator) is added early for Select's listbox.
  - Stories:
    - a states matrix for each control, with a new "Active · typing" (:focus) column in `StateMatrix`;
    - an open grouped Select;
    - Field anatomy and errors;
    - the contact form composition (kit sheet 02 §07 with sitemap G3 fields).
- **Where:**
  - `src/shared/ui/{field,input,textarea,select,native-select,checkbox,radio-group,input-group,spinner,menu}/`
  - `src/shared/ui/button/`, `src/shared/ui/icons/`, `src/shared/lib/storybook/`
  - `src/shared/styles/index.css`
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check`, `build` and `build-storybook` pass.
  - `test:stories`: 73/73 on a cold cache. Behaviour tests cover label and help-text linking, aria-invalid with the error in the accessible description, typing, label click and Space on checkbox, `aria-checked="mixed"`, arrow keys in the radio group, keyboard-open and pick in Select (portal listbox), loading ignoring clicks, and the live counter.
  - Screenshots of the Input, Input Group, Checkbox and Radio matrices, the open Select and the contact form compared with kit sheet 02.

### 2026-11-19 — Own icon set replaces lucide-react
- **Status:** [done]
- **What:**
  - Removed `lucide-react`.
  - Added `src/shared/ui/icons`:
    - `Icon`, the base: 24 grid, no fill, stroke 1.6 (2 allowed for chevrons and checks), `aria-hidden` unless labelled, then `role="img"`.
    - One file per icon (`<Name>Icon.tsx`), holding only the icons the stories use: ArrowUpRight, Copy, Download, FileText, Github, LayoutGrid, Linkedin, List, Mail, X.
  - Geometry comes from Lucide. GitHub and LinkedIn come from lucide-react 1.0.0, the last release with brand icons.
  - The license (Lucide ISC + Feather MIT) is in `src/shared/ui/icons/LICENSE`.
  - Story "Foundations/Icons": a gallery that asserts stroke, fill and `aria-hidden`.
  - The social-rail story now shows GitHub, LinkedIn, Email and CV.
- **Where:**
  - `src/shared/ui/icons/`
  - the stories in `src/shared/ui/{button,button-group,toggle,toggle-group}`
  - `vitest.config.ts`
  - `PROJECT_OVERVIEW.md` §3, `DESIGN.md` §0.7
- **Verified:** `test:stories` 36/36 on a cold cache. Screenshots of the gallery and the social rail checked.

### 2026-11-19 — M1 stage 2: Actions (Button, Button Group, Toggle, Toggle Group, Switch, Kbd)
- **Status:** [done]
- **What:**
  - Six components in `src/shared/ui/`, each with its CSS, stories and `index.ts`.
  - Button, Toggle, Toggle Group and Switch are built on Base UI. Button Group and Kbd are plain markup: Base UI has no such primitives.
  - API:
    - `<Button variant size iconOnly>`, plus `buttonClassName()` for links that look like buttons.
    - `<ButtonGroup aria-label orientation>`.
    - `<Toggle iconOnly>` and `<ToggleGroup aria-label value>`.
    - `<Switch>label</Switch>`: the whole row is a `<label>`.
    - `<Kbd tone>`.
  - `iconOnly` requires `aria-label` at the type level.
  - Stories helper `src/shared/lib/storybook` (`StateMatrix` + `pseudoStateParameters`): variant × state tables like the kit sheets, with hover / active / focus forced per cell.
  - Component CSS is registered in `src/shared/styles/index.css` in the kit's cascade order.
- **Where:**
  - `src/shared/ui/{button,button-group,toggle,toggle-group,switch,kbd}/`
  - `src/shared/lib/storybook/`
  - `src/shared/styles/index.css`
  - `vitest.config.ts` (`optimizeDeps`), `eslint.config.mjs`, `stylelint.config.mjs`
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check`, `build` and `build-storybook` pass.
  - `test:stories`: 34/34, including on a cold cache. Behaviour tests cover click / disabled, aria-pressed toggling with Space, single choice with arrow keys in the group, and the switch toggling by label click and Space.
  - Screenshots of every state matrix compared with kit sheet 01. Rendered DOM checked: Switch is `<span role="switch">` named by its `<label>`; ToggleGroup items carry `aria-pressed`.
- **Follow-ups:**
  - Button `loading` (spinner + `aria-busy`) is deferred to stage 3, where the Spinner lives.
  - ~~Icon stroke 1.6 is passed per icon~~ solved by the own icon set (stroke 1.6 is the default).

### 2026-11-19 — M1 stage 1: styles (tokens, reset, typography, focus, reduced motion)
- **Status:** [done]
- **What:**
  - Kit stylesheet brought in from `codex.css` (Rev. B) as formatted, commented files. Values are unchanged; Prettier lower-cases hex and writes `0.45` for `.45`.
  - Cascade layers `reset < base < components < motion`. The order is declared in `layers.css`, imported first.
  - Fonts via `next/font/google`, with `latin` + `latin-ext` subsets. The tokens read the font variables, falling back to the family names. The variables sit on `<html>`.
  - Layout helpers (`.cx-panel`, `.cx-stack`, `.cx-inline`, `.cx-cols-2/3/4`) are included (DESIGN.md §10 allows them for app layout).
  - Doc-only `.is-*` classes are not in the app CSS. Stories show frozen states with `storybook-addon-pseudo-states` instead.
  - Stories: Foundations / Colors, Typography (scale + text-link states + keyboard focus test), Space & effects, State language.
- **Where:**
  - `src/shared/styles/`: `layers`, `tokens`, `reset`, `typography`, `layout`, `focus` and `motion` `.css`, plus `index.css`, `fonts.ts`, `index.ts` and `stories/`
  - `src/app/layouts/LocaleLayout.tsx`
  - `.storybook/main.ts`, `.storybook/preview.tsx`
  - `stylelint.config.mjs`
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check` and `build` pass.
  - `test:stories`: 9/9 passed, including axe, all kit fonts loaded, and a real keyboard Tab showing the dashed sanguine outline.
  - `build-storybook` passes.
  - Checked in the built app CSS that the layer order statement comes first.
  - Pseudo-states checked by hand in the running Storybook: hover colour and the focus-visible outline apply.
- **Follow-ups:**
  - Add a regression test for the layer order (reduced motion beats components) once Button exists, e.g. a Playwright test with `reducedMotion: 'reduce'`.
  - Missing test infrastructure (see Known issues).

### 2026-11-19 — PROJECT_OVERVIEW.md brought up to date
- **Status:** [done]
- **What:**
  - Related docs: added PROGRESS.md and where `codex.css` and the kit sheets live on the canvas.
  - §3: Next.js 16 and `proxy.ts`, the TypeScript and ESLint pins, and a Storybook row.
  - §4.1: tree updated (`proxy.ts`, `context/`, `.storybook/`, `test/`, `e2e/`, root `app/layout.tsx`).
  - §6: readable-code rule and the two-pass foundation.
  - §9: stories as tests, and the current script list.
  - §10.4: Sheet width (deferred).
- **Where:** `context/PROJECT_OVERVIEW.md`

### 2026-11-19 — PROGRESS.md created
- **Status:** [done]
- **What:** Added this file and recorded the first session's work, decisions and open questions. Marked DESIGN.md §9.1 and §9.2 as decided.
- **Where:** `context/PROGRESS.md`, `context/DESIGN.md` §3 (Toggle Group), §9

### 2026-11-19 — Located `codex.css` and the kit sheets on the canvas
- **Status:** [done]
- **What:** `codex.css` (Rev. B, 540 lines) is not a separate canvas file. It is an uploaded asset that every kit sheet links to (asset id `e7eaac61be294e914584ca1ec245a27b`). The six sheets are `project/KitFoundations|KitActions|KitForms|KitNavigation|KitData|KitOverlays.dc.html`. Page designs (Home, Hero studies, tablet and mobile) live on the same canvas.
- **Where:** UI Kit canvas, https://claude.ai/artifact/9nbNbHQVbXt4z57ZGH443K
- **Follow-ups:** `codex.css` is not in the repo yet. It arrives as part of M1.

### 2026-11-19 — Storybook
- **Status:** [done]
- **What:** Storybook 10 (`@storybook/nextjs-vite`) with addon-docs, addon-a11y and addon-vitest, plus `eslint-plugin-storybook`. Every story runs as a test in Chromium, and any axe violation fails it (`a11y.test: 'error'`). Vitest is split into two projects: `unit` (jsdom) and `storybook` (browser). Preview wraps stories in `NextIntlClientProvider` (EN messages).
- **Where:** `.storybook/main.ts`, `.storybook/preview.tsx`, `vitest.config.ts`. Scripts: `storybook`, `build-storybook`, `test:stories`
- **Verified:** with a throwaway story (removed): `build-storybook` built, the dev server served `index.json`, the `play` test passed, and a button without a name failed on axe `button-name`. `typecheck`, `lint` and `format:check` pass.
- **Follow-ups:** ~~import the kit styles in `.storybook/preview.tsx`~~ done in M1 stage 1.

### 2026-11-19 — Project init (M0)
- **Status:** [done]
- **What:**
  - Next.js 16.4 (App Router, Turbopack) with React 19.3 and TypeScript strict.
  - Thin root `app/` that re-exports FSD pages from `src/`, plus an empty root `pages/` (with a README) so Next.js does not read `src/pages` as the Pages Router.
  - `next-intl` routing for `/en` and `/fr` through `proxy.ts`, with typed messages.
  - Runtime deps: Base UI, clsx, lucide-react, shiki, server-only.
  - Tooling: ESLint (next + prettier, import order, a "no deep imports" rule), Prettier, Stylelint, Steiger (FSD), Vitest + Testing Library + vitest-axe, MSW, and Playwright + axe-core with 1440 / 768 / 375 projects.
  - Project files: `.env.example`, `.editorconfig`, `.nvmrc`.
- **Where:** `app/`, `pages/README.md`, `proxy.ts`, `src/app/layouts`, `src/pages/home`, `src/shared/{i18n,config}`, `messages/`, `test/`, `e2e/`, root configs
- **Verified:** `typecheck`, `lint`, `lint:fsd`, `lint:css`, `format:check` and `build` pass, and `/en` and `/fr` prerender as SSG. A throwaway Vitest test (jest-dom + axe + MSW + Base UI Checkbox) passed and was removed. The Playwright smoke test (`e2e/smoke.spec.ts`: both locales, axe WCAG 2.2 AA, `/` → `/en`) passed on the `desktop` project.
- **Follow-ups:** fonts via `next/font`, kit styles, localized 404 page.

---

## 4. Decisions

_Decisions made during development that are not, or not yet, in the spec docs. Template:_

```md
### YYYY-MM-DD — <decision>
- **Context:** why it came up
- **Decision:** what was chosen (and what was rejected)
- **Affects:** files / docs updated (`PROJECT_OVERVIEW.md §N`, `DESIGN.md §N`)
```

<!-- entries below, newest first -->

### 2026-11-20 — After the migration, the project is the source of truth for the kit
- **Context:** Several decisions in M1 differ from the canvas: EN | FR, no Telegram, bug fixes against codex.css, the open-menu trigger. The open question was whether to redraw the canvas.
- **Decision:**
  - The canvas is not redrawn.
  - Once the UI Kit is migrated, the source of truth for every kit element is the project: `src/shared/styles` + `src/shared/ui` (seen in Storybook), with `DESIGN.md` describing them.
  - The canvas and `codex.css` remain the reference only while a component is being migrated.
  - Page designs on the canvas (Home, Hero) are still the reference for layout when pages are built.
- **Affects:** the `DESIGN.md` header (sources of truth) and §9.1–9.2. Closes the "update the kit canvas" open question.

### 2026-11-20 — An open menu's trigger keeps the hover look
- **Context:** Review of stage 5. Kit sheet 03 §05 draws the open dropdown's trigger pressed (`.is-active`).
- **Decision:** While its menu is open, a button trigger looks hovered: lift (−2/−2 + hard shadow) and its variant's hover fill.
  - Implemented in `button.css` by adding `.cx-btn[aria-expanded='true']` to every hover rule.
  - It applies to any kit button that opens something, whatever its variant; the chevron still turns 180°.
- **Affects:** `src/shared/ui/button/button.css`, `DESIGN.md` §5 (Menu), the Menu stories (asserted).

### 2026-11-20 — Navigation: decisions
- **Context:** M1 stage 5.
- **Decision:**
  - **Focus inside menus is the highlight, not the dashed line.** codex.css lists `.cx-menu-item` in the shared focus rule, but sheet 03 §07's note and DESIGN.md §2 say the menu shows focus as the highlight. Base UI moves real focus onto items, so `.cx-menu-item:focus-visible` drops the outline and the popup panel itself draws no focus ring.
  - **Popup motion moved from Select to the shared menu surface** (`.cx-menu`, menu.css): one rule for the Select listbox and the dropdown menu.
  - **⚠ class-only `.is-disabled`** maps to:
    - `[aria-disabled='true']` on `.cx-nav-link` and `.cx-page` (rendered as text);
    - `[data-disabled]` on `.cx-menu-item` (Base UI).
  - Hover / press are guarded with `:not(…)` so disabled items never react.
  - **The menu trigger's chevron rotation** is inline on the sheet, so it lives in `Menu.module.css`.
  - **NavLink, Breadcrumb and Pagination link through `@/shared/i18n`**, like Card and Item.
  - **NavLink is a client component** (it reads the URL). It is the first `'use client'` in `shared/ui`.
  - **Accessible names must contain the visible text** (WCAG 2.5.3). For example, the language trigger is "Language: EN", not just "Language"; axe enforces this in the stories.
  - **Not in this pass:** the Navigation Menu panel (`.cx-navpanel`) and the Context menu (the drawing's easter egg).
- **Affects:** `src/shared/ui/{menu,select,nav-link,pagination}`.

### 2026-11-20 — The in-progress card keeps the kit's dimmed look
- **Context:** The kit dims an in-progress card's media with `opacity: .55` (DESIGN.md §9.8), which puts the tag and the placeholder text at ~2.2–2.9:1. WCAG 2.2 AA needs 4.5:1.
- **Decision:** Follow the design. This is an accepted exception to the WCAG 2.2 AA target (PROJECT_OVERVIEW.md §1):
  - the dimmed media stays as drawn;
  - it is treated as decoration (`aria-hidden`, documented on `Card`);
  - axe checks exclude `.cx-card[data-disabled] .cx-card-media`.
- **Rejected:** dimming only the hatching and keeping the text contrast (a kit change).
- **Affects:**
  - `src/shared/ui/card/Card.tsx` and its stories (already in place);
  - `DESIGN.md` §9.8;
  - the Playwright axe check on the Work page (M4/M10) needs the same exclusion.

### 2026-11-20 — Data display: decisions
- **Context:** M1 stage 4.
- **Decision:**
  - **Bug fix against codex.css:** `.cx-card-media > span` (the placeholder label) out-specified `.cx-card-tag`, so the "TAV. I" tag lost its ink fill. It is now `> span:not(.cx-card-tag)`. Checked on screenshot; this matches DESIGN.md §6 and the sheet's inline dark tag on the disabled card.
  - **Card and Item link through `@/shared/i18n`** (locale-aware `Link`) when given `href`: they always point to internal case studies. Buttons stay link-agnostic (`buttonClassName`).
  - **⚠ class-only `.is-disabled`** on Card and Item maps to `[data-disabled]`, as for `.cx-crow` / `.cx-igroup`.
  - Item hover / active get `:not([data-disabled])`, so an in-progress row never reacts. Item focus uses `outline-offset: -3px`, which is inline on the sheet: the list clips overflow.
  - **Inline-only kit styles moved into CSS:** the muted tag on an in-progress card.
  - **The card placeholder label is decorative** (`aria-hidden`); it stands in for an image.
  - **Marker** keeps the kit's `role="separator"`. Its text is therefore not read out, so sections still need a real heading.
- **Affects:** `src/shared/ui/{card,item}`.

### 2026-11-19 — Forms: mapping the kit onto Base UI
- **Context:** M1 stage 3. The kit styles native inputs. Base UI renders checkbox, radio and the select trigger differently, and several kit states are frozen or inline only.
- **Decision:**
  - **Base UI aliases**, same declarations, no restyling:
    - `.cx-check` / `.cx-radio`: `:checked` → `[data-checked]`, `:disabled` → `[data-disabled]`, `.is-mixed` → `[data-indeterminate]`, `.is-invalid` → `[aria-invalid='true']` / `[data-invalid]`.
    - `.cx-select`: `.is-invalid` → `[aria-invalid='true']` / `[data-invalid]`.
    - `.cx-option`: hover → `[data-highlighted]`, `aria-selected` → `[data-selected]`.
    - `.cx-crow` / `.cx-igroup`: `.is-disabled` → `[data-disabled]` (set by the component).
    - `.cx-igroup`: `.is-focus` → `:has(input:focus-visible)`.
  - **Inline-only kit styles moved into CSS with tokens:**
    - disabled option (`--line-strong`);
    - disabled field button (`--line` / `--muted`);
    - Select placeholder (`--muted`);
    - spinner size inside a button (16px);
    - indeterminate + hover (`#3a2e22`).
  - **Bug fixes against codex.css:**
    - Disabled checkbox / radio no longer react to hover or press (as for Toggle and Switch).
    - The invalid background uses `background-color`, so an invalid NativeSelect keeps its chevron.
  - **Overlay motion** (DESIGN.md §2: 160ms, 8px + fade) is added for the Select popup, with a reduced-motion override. It is not in codex.css.
  - **Select owns its label** (Base UI requires `Select.Label`). Inside a Field, leave out the Field's `label`. **RadioGroup** owns its legend: role `radiogroup`, named by the legend.
  - **Layout the kit draws only inline** (radio options in a row, the fieldset reset) goes into a CSS Module next to the component, not into a new global `cx-` class.
  - **Button `loading`** = Base UI `disabled` + `focusableWhenDisabled`. The button is not `:disabled`, so it keeps the variant's colours as on the kit sheet. The spinner is `decorative`; the busy state is `aria-busy`.
  - The **contact form story** uses NativeSelect for the request type, as the kit composition does.
- **Affects:** `src/shared/ui/{checkbox,select,input,input-group,button,radio-group}`.

### 2026-11-19 — No icon package: own icon components
- **Context:** Lucide deprecated brand icons (lucide-icons/lucide#670), and lucide-react 1.1.0 removed them. The social rail needs GitHub and LinkedIn.
- **Decision:** Option 1 of the open question.
  - Remove `lucide-react`.
  - Keep icons as own components in `shared/ui/icons`, with Lucide geometry (ISC) in the kit's stroke style.
  - Add icons only when something needs them (steps at the top of `shared/ui/icons/index.ts`).
  - Rejected:
    - Simple Icons: filled logos, which break the "no fills" rule;
    - pinning lucide-react 1.0.0.
- **Affects:** `PROJECT_OVERVIEW.md` §3 (Icons), `DESIGN.md` §0.7.

### 2026-11-19 — Actions: mapping the kit onto Base UI
- **Context:** M1 stage 2. Base UI renders some parts differently from the kit's markup, and a few kit states exist only as frozen classes or inline styles.
- **Decision:**
  - **Links that look like buttons** use `buttonClassName()` on the link, not `<Button render={<a/>}>`: Base UI would add `role="button"` to a non-button element.
  - **Switch:** Base UI renders `<span role="switch">`, so `:disabled` gets a `[data-disabled]` alias. Additions, each drawn from DESIGN.md §3:
    - `.cx-switch-row[data-disabled]` makes the row text muted. This is inline-only on the kit sheet.
    - `[aria-checked='true']:active::after { translateX(16px) }` is the real hook for the sheet's frozen "on + active" state.
  - **Disabled on + hover:** a disabled toggle or switch that is on no longer darkens on hover (`:not(:disabled)` added). In codex.css it does, because the on + hover rule out-specifies the disabled rule. This is a bug fix.
  - **Toggle Group** uses Base UI's toggle buttons (`role="group"`, `aria-pressed`) instead of the sheet's `radiogroup` / `radio`. The kit CSS styles both. Arrow keys move focus.
  - **Switch sample copy** is "Live demos only", not "Notte" (no night theme).
  - **Not in components**, because they belong to compositions (the social-rail widget, M2):
    - the social-rail icon turning sanguine on hover (inline on the sheet);
    - the Mono button's surface background in the "field button".
- **Affects:** `src/shared/ui/{switch,toggle}/*.css`, `src/shared/ui/button/Button.tsx`.

### 2026-11-19 — How the kit stylesheet lives in the app
- **Context:** M1 stage 1. `codex.css` is one minified file that mixes the kit with sheet scaffolding and frozen-state classes.
- **Decision:**
  - The kit is split into readable files under `src/shared/styles/`, and later one file per component in `src/shared/ui/<component>/`.
  - `src/shared/styles/index.css` is the only entry point, and it fixes the order (PROJECT_OVERVIEW.md §6: imported once, globally). Components do not import their own CSS.
  - Cascade layers `reset < base < components < motion`. Page CSS Modules are unlayered, so they win; use them for layout only.
  - Doc-only `.is-*` classes and sheet scaffolding (DESIGN.md §10) are not shipped. ⚠ class-only states (DESIGN.md §2.1) will be kept where a component needs them.
  - Frozen states in Storybook come from `storybook-addon-pseudo-states`.
  - Stylelint keeps the kit's colour notation: `rgba(…, .45)`, not `rgb(… / 45%)`. CSS Modules use camelCase class names.
  - The DESIGN.md §9.6 (focus coverage) and §9.7 (reduced-motion coverage) gaps are copied as they are, with comments in `focus.css` and `motion.css`.
- **Affects:** `src/shared/styles/`, `stylelint.config.mjs`, `.storybook/`.

### 2026-11-19 — Foundation in two passes, base pass first
- **Context:** The kit has ~45 components. The MVP pages do not need all of them right away.
- **Decision:** Build a base foundation first. The list below was confirmed by the author on 2026-11-19.
  - **Styles:** tokens, reset/base, typography classes, shared focus rule, reduced motion.
  - **Actions:** Button (all variants, `sm`, icon, loading), Button Group, Toggle, Toggle Group, Switch, Kbd.
  - **Forms:** Field (label, description, error, counter), Input, Textarea, Select, Checkbox, Radio Group, Input Group, Spinner.
  - **Data display:** Badge, Chip, Separator / Marker, Card (tavola), Item, Aspect Ratio, Skeleton.
  - **Navigation:** Nav link, Tabs, Breadcrumb, Pagination, Menu (dropdown).
  - **Feedback:** Tooltip, Alert, Toast.
  - **Later pass:** Navigation Menu panel, Dialog / Alert Dialog, Sheet, Drawer, Hover Card, Accordion / Collapsible, Table, Code Block (Shiki), Trace, Empty, Avatar, Carousel, Command palette, Slider, Progress, Resizable, Scroll Area, Chart.
- **Affects:** M1 in Milestones; `PROJECT_OVERVIEW.md` §6.

### 2026-11-19 — No Telegram in the social links
- **Context:** The kit sheets show Telegram; `sitemap.md` G2 does not.
- **Decision:** Remove Telegram. Social links: GitHub, LinkedIn, Email, CV (PDF).
- **Affects:** `DESIGN.md` §9.2. The canvas still shows Telegram and is not redrawn (Decisions, 2026-11-20).

### 2026-11-19 — Second language is FR, not RU
- **Context:** The kit and `concept-codex.md` show EN | RU; `PROJECT_OVERVIEW.md` and `sitemap.md` say EN | FR.
- **Decision:** EN | FR. RU on the kit sheets is sample copy.
- **Affects:** `DESIGN.md` §3 (Toggle Group) and §9.1. The routing already uses `en` / `fr`.

### 2026-11-19 — Toolchain versions below latest
- **Context:** At init, latest TypeScript was 7.0 and latest ESLint was 10.
- **Decision:**
  - TypeScript `~6.0`: `typescript-eslint` supports only `<6.1`.
  - ESLint `^9`: `eslint-plugin-react`, `jsx-a11y` and `import` (inside `eslint-config-next`) do not support ESLint 10.
  - Re-check both peer ranges before upgrading.
- **Affects:** `package.json`.

### 2026-11-19 — Install only UI/UX, mocks, infra and dev tooling at init
- **Context:** Scope of the first session.
- **Decision:** Deferred until the contact form (M7): `react-hook-form`, `zod`, `@hookform/resolvers`, `resend`, React Email. Storybook was added on request (not in `PROJECT_OVERVIEW.md` §3).
- **Affects:** `package.json`; `PROJECT_OVERVIEW.md` §3 and §9 (Storybook added 2026-11-19).

---

## 5. Open questions

_Things waiting for an answer. Template: `- [ ] <question> — context / options · owner · since YYYY-MM-DD`_

- [ ] **Sheet (mobile menu) width.** `codex.css` sets `.cx-sheet-panel { width: 360px }`. The kit's mobile-menu mockup draws it at 320px, and the overlay rules say "320 / 82vw" (320px, but never wider than 82% of the screen). On a 360px phone a 360px sheet covers the whole screen, so the scrim and the page behind it disappear. Options: `min(320px, 82vw)` (matches the mockup and the rule, recommended) or 360px (matches the CSS). **Deferred** until the mobile menu (M2); also listed in `PROJECT_OVERVIEW.md` §10.4 · owner: author · since 2026-11-19
- [ ] **`sitemap.md` is not in the repo.** It holds the real content and is needed for pages (M2–M6). Copy it into `context/`? · owner: author · since 2026-11-19
- [ ] **EB Garamond Italic** (fifth font, marginalia) · `PROJECT_OVERVIEW.md` §10.2 · owner: author
- [ ] **Email provider:** Resend (proposed) · `PROJECT_OVERVIEW.md` §10.1 · owner: author
- [ ] **Hero illustration** mechanism, and whether to include a portrait · `PROJECT_OVERVIEW.md` §10.3 · owner: author

---

## 6. Known issues and debt

_Shortcuts, `TODO(design)` markers, workarounds and warnings to revisit. Template: `- [ ] <issue> — where (path) · why it exists · since YYYY-MM-DD`_

- [ ] **Unmet peer warning on install:** `tsconfck` wants TypeScript 5 and finds 6.0. It comes through Steiger and through `@storybook/nextjs-vite` → `vite-tsconfig-paths`. Harmless (it only reads tsconfig files). Re-check when those packages update · since 2026-11-19
- [ ] **"Ignored build scripts" notice** for `@parcel/watcher` and `@swc/core` (via `next-intl`) still prints, even with `ignoredBuiltDependencies` set in `pnpm-workspace.yaml`. Both ship prebuilt binaries, so nothing breaks · since 2026-11-19
- [ ] **vitest-axe 0.1.0 is old:** its types target the legacy `Vi` namespace. The matcher types are re-declared in `test/vitest.d.ts`. Replace it if a maintained alternative appears · since 2026-11-19
- [ ] **jsdom has no canvas:** `HTMLCanvasElement.prototype.getContext` is stubbed in `test/setup.ts`. axe colour-contrast is not checked in unit tests; Storybook (Chromium) and Playwright cover it · since 2026-11-19
- [ ] **No localized 404 yet:** `app/not-found.tsx` is a bare English fallback (`TODO` in the file). The real page is M9 · since 2026-11-19
- [ ] **No kit styles in Storybook yet:** `TODO(foundation)` in `.storybook/preview.tsx` · since 2026-11-19
- [ ] **E2E has only run on `desktop`:** the `tablet` and `mobile` Playwright projects exist but have not been run · since 2026-11-19
- [ ] **`test/` and `e2e/` are empty.** `test/setup.ts`, `test/vitest.d.ts` and `test/mocks/{handlers,server}.ts` from M0 are gone, and so is `e2e/smoke.spec.ts`. The folders were emptied around 21:38, before the first commit (`f73532a`), so these files were never in git. `vitest.config.ts` (project `unit`) still points to `./test/setup.ts`, so the first unit test will fail until the files are restored or the config changes. Restore them, or was this intentional? · since 2026-11-19
- [ ] **pseudo-states needs manual registration:** `storybook-addon-pseudo-states` is not loaded into the preview from `main.ts` `addons`, so `.storybook/preview.tsx` registers its decorator and initial globals itself. The toolbar toggle still comes from `main.ts`. Re-check after Storybook upgrades (the decorator could end up registered twice) · since 2026-11-19
- [ ] **Pseudo-state stories carry no style assertions:** the addon rewrites stylesheets after the story renders, after `play` has run. Real interactions (keyboard Tab) are what get asserted · since 2026-11-19
- [x] ~~**First `test:stories` run after adding a dependency can fail**~~ while Vite re-optimizes deps. Fixed in stage 2: the `storybook` Vitest project pre-bundles `@base-ui/react/*`, `lucide-react`, `clsx` and `next-intl` (`optimizeDeps.include`). A brand-new runtime dependency used in stories may need adding there · since 2026-11-19
- [ ] **ESLint 9 is now flagged as deprecated by npm.** Moving to 10 is blocked by the plugins in `eslint-config-next` (Decisions, toolchain versions) · since 2026-11-19
- [ ] **`build-storybook` prints `MODULE_LEVEL_DIRECTIVE` warnings** for Base UI's `"use client"` directives. They are harmless: Vite drops the directive in a client bundle · since 2026-11-19
- [ ] **No dashed focus on the field button (`.cx-ibtn`):** it is part of the DESIGN.md §9.6 gap, kept on purpose. The browser's default focus ring shows instead · since 2026-11-19
- [ ] **Docs reformatted by Prettier once:** at init `pnpm format` reformatted `DESIGN.md` and `PROJECT_OVERVIEW.md` (padded tables, `*italic*` → `_italic_`; no content changes). `context/` is now in `.prettierignore` · since 2026-11-19
