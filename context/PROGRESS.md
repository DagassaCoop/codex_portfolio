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

- **Phase:** M3 Home (branch `ui/home-page`). M2 is done (2026-11-21, merged into `main`).
- **Now:** Experience (Fol. 03v) is done and waiting for review: every Home section of M3 is built (the contact section is G3, M7).
- **Next:** after review, close M3; then M4 Work. Stages are done one at a time, each reviewed before the next (Decisions, 2026-11-21).
- **Blocked by:** nothing.

---

## 2. Milestones

| # | Milestone | Status | Notes |
|---|---|---|---|
| M0 | Project init: Next.js + FSD skeleton, i18n routing, tooling | [done] | 2026-11-19. Storybook added the same day |
| M1 | Foundation: kit styles + `shared/ui` components on Base UI, with stories | [in progress] | Two passes: base first, the rest later (Decisions, 2026-11-19). Base pass stages: 1 Styles [done] · 2 Actions [done] · 3 Forms [done] · 4 Data display [done] · 5 Navigation [done] · 6 Feedback [done]. Later pass [todo]; done early: Dialog and Sheet (M2), Table and Trace (M3); new in M3: Badge list |
| M2 | Global layout: header, mobile menu, social rail, footer stamp, locale switch | [done] | 2026-11-21. Stages: 1 Page frame [done] · 2 Header + monogram [done] · 3 Social rail [done] · 4 Footer stamp [done] · 5 Mobile menu + Dialog in the kit [done]. Command palette (M8) and the toast provider wait (Decisions, 2026-11-21) |
| M3 | Home (`/[locale]`) | [in progress] | Hero: 1 Section + text column [done] · 2 Name [done] · 3 Rota [done]. Selected work [done]. What I do [done]. Experience [done]. Waiting for review |
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

### 2026-11-23 — M3 Experience (Fol. 03v); Table and Trace in the kit
- **Status:** [done]
- **What:**
  - **Kit:** `Table` (`shared/ui/table`) and `Trace` (`shared/ui/trace`, `layout="adaptive"`: on phones the year moves above the body), from codex.css, pulled from M1's later pass; stories with tests (headers and caption, the selected row; an ordered list with decorative rails).
  - **Entity `experience`** (`src/entities/experience`): six jobs and studies (company, start and end month, place, format, employment, stack), `duration` (both ends included) and `formatPeriod` (month names from `Intl`). `formatYears` moved to `shared/lib/years` (projects and experience).
  - **Section** `pages/home/ui/experience`: head with "About me" (Primary, like "All work") → `/about`; `components/spec-table` (the author's spec sheet, values as display figures, "+31%" in sanguine, Italian caption; sticky 24px from the top on desktops); `components/timeline` ("Your team?" → `#contact` on a dashed node, then `components/experience-entry`: company h3, role · employment, period · duration · place · format, bullets with sanguine markers, the stack). One column on tablets; on phones the years move above the entries.
  - Copy: `home.experience` and `experience.<id>` in EN and FR. `steiger.config.ts`: `insignificant-slice` off for `entities/experience` until About (M6) uses it.
- **Where:** `src/shared/ui/{table,trace}/`, `src/shared/lib/years/`, `src/shared/styles/index.css`, `src/entities/{experience,project}/`, `src/pages/home/ui/{experience,HomePage.tsx}`, `messages/{en,fr}.json`, `steiger.config.ts`; docs `DESIGN.md` §6, §12; `PROJECT_OVERVIEW.md` §4.2; `SITEMAP.md` §1, §2, §4
- **Verified:** `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check`, `build` pass; `test:stories` 144/144. In the production build: screenshots at 1440, 768 and 375 (EN) and 1440 (FR) compared with the Home design; every period line matches the design ("Oct 2025 — Nov 2026 · 1 yr 2 mos · Toronto · On-site" …), FR months are localised ("oct. 2025 — nov. 2026 · 1 an 2 mois"); the spec sheet sticks 24px from the top while the timeline scrolls; no horizontal scroll; axe (WCAG 2.2 AA) has no violations.
- **Follow-ups:**
  - "About me" is a Primary button for consistency with "All work" (the design draws a link button). Revert if the link look is wanted here.
  - The spec values are copy ("4+ yrs", "10+"…), not computed from the data.
  - Bullets inside the timeline render as circles (a list nested in the `ol`), as on the design.

### 2026-11-23 — M3 What I do (Fol. 03r)
- **Status:** [done]
- **What:**
  - Section `pages/home/ui/services` (`id="services"`): head; the dimension "3 DIRECTIONS · 1 ENGINEER"; one surface panel with three directions (`components/direction`: `cx-item-num` numeral, "Dir. 01", h3, text, tags as a `BadgeList collapse={false}`), lines between them; the stack strip (`components/stack-strip`: "Stack", main technologies as outline badges, the others as default badges, each group a named list, vertical separators hidden on phones).
  - Tablet: the directions stack, each a row (numeral and title in 200px, text and tags on the right), as on the design; phone: columns.
  - **`SectionHead`** (`pages/home/ui/components/section-head`): the folio, sheet label, h2 and optional action, shared by the Home sections; Selected work now uses it.
  - **`toRoman` moved to `shared/lib/roman`** (projects and directions use it). `BadgeList.moreLabel` is optional (needed only when the list can collapse).
  - Data: `siteConfig.stack`. Copy: `home.services` in EN and FR.
- **Where:** `src/pages/home/ui/{services,components/section-head,selected-work}/`, `src/pages/home/ui/HomePage.tsx`, `src/shared/lib/roman/`, `src/shared/config/site.ts`, `src/shared/ui/badge-list/BadgeList.tsx`, `src/entities/project/`, `messages/{en,fr}.json`; docs `PROJECT_OVERVIEW.md` §4.2, §5; `SITEMAP.md` §1, §4
- **Verified:** `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check`, `build` pass; `test:stories` 139/139. In the production build: screenshots at 1440, 768 and 375 (EN) and 1440 (FR) compared with the Home design; Selected work unchanged after the move to `SectionHead`; no horizontal scroll; axe (WCAG 2.2 AA) has no violations; the section reads as h2 → three articles with h3 and tag lists → "Main stack" and "Also used" lists.
- **Follow-ups:**
  - The kit's vertical `Separator` is `height: 100%`, which does not resolve in an auto-height row (it renders 0px tall); the stack strip sets 22px. Consider fixing it in the kit (e.g. `height: auto` + `align-self: stretch`).
  - Dir. 01 speaks about brands ("every brand is a thin template", "Multi-brand"). The concept rule (PROJECT_OVERVIEW.md §5) covers the hero and the illustration callouts only, so it is allowed here; flagging it for the copy rewrite.

### 2026-11-23 — Badge list: the stack keeps to one row on tablets
- **Status:** [done]
- **What:**
  - **`BadgeList`** (new kit component, `shared/ui/badge-list`, client): badges in a list; with `collapse` (`true` / a media query / `false`) the badges that would wrap are hidden behind a **"…"** badge-button that shows them all. Measured before paint, refits on width change; clipped to one row before JS. `.cx-badge-more` joins the focus rule.
  - **Card `link` variant:** `link="title"` puts the link on `CardTitle href` and stretches it over the card, so the card can hold buttons (a link cannot contain them). `CARD_ROW_QUERY`: the adaptive layout's media query, exported.
  - **ProjectCard:** `link="title"`; the stack is a `BadgeList` that collapses only with `CARD_ROW_QUERY` when the card is `adaptive` (sideways on tablets); elsewhere it wraps. Copy `projectCard.showStack`.
  - Stories: Data display / Badge list (collapsed, fits, wraps; tests for one row then "…", keyboard, no "…" when it fits, `collapse={false}`, media query on and off); Card → Title link (test: one link named by the title covering the card, "…" above it, focus line on the card).
- **Where:** `src/shared/ui/{badge-list,card}/`, `src/shared/styles/{index.css,focus.css}`, `src/entities/project/ui/project-card/`, `messages/{en,fr}.json`; `DESIGN.md` §6, §12; `PROJECT_OVERVIEW.md` §4.3; `SITEMAP.md` §1, §4
- **Verified:** `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check`, `build` pass; `test:stories` 139/139. In the production build: "…" shows only at 601–1024px (768: Life Focus Tree; 601: all three), never at 1440, 1024's single rows, 600 or 375; resizing 768 → 1100 → 768 expands and collapses back; pressing "…" shows all, keeps the URL and moves focus to the list; a click on the media opens the case study; list heights are the same with and without JS (no shift); axe has no violations at any width.

### 2026-11-23 — Kit Card follows the Home design; adaptive layout
- **Status:** [done]
- **What:**
  - **Kit Card** (`shared/ui/card`): body padding 20 and gap 12; title `cx-h3` (22px, 700); the tag "TAV. I" on surface with `--ink-2` text (radius 2 kept); new `CardMedia caption` (`.cx-card-caption`, bottom left over the image), styled like the tag. The in-progress card keeps its dark tag (muted bg, paper text).
  - **Layout variant** `<Card layout="vertical" | "adaptive">` (default `vertical`); `adaptive` lies sideways at 601–1024px as on the Home tablet board. `ProjectCard` forwards `layout`; Selected work passes `adaptive`.
  - **Caption content:** the project's domain, `projects.<slug>.domain` (EN / FR drafts: iGaming, Personal productivity, Pharma · Lab software).
  - Stories: Card → With caption, Adaptive; tags upper-case as in the kit.
- **Where:** `src/shared/ui/card/{card.css,Card.tsx,Card.stories.tsx,index.ts}`, `src/entities/project/ui/project-card/ProjectCard.tsx`, `src/pages/home/ui/selected-work/SelectedWork.tsx`, `messages/{en,fr}.json`; `DESIGN.md` §6; `SITEMAP.md` §1, §4
- **Verified:** `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check`, `build` pass; `test:stories` 129/129 (axe in every story). In the production build: screenshots at 1440, 768 and 375 compared with the Home design; the card is a grid at 601, 768 and 1024 and a column at 600, 375 and 1440; no horizontal scroll; axe has no violations (EN, and FR at 768).
- **Follow-ups:** the domain captions are drafts: replace them with the real wording.

### 2026-11-23 — M3 Selected work (Fol. 02)
- **Status:** [done]
- **What:**
  - **Entity `project`** (`src/entities/project`): `ProjectData` type; `projects` (Tav. I–III from the Home design, all featured) and `featuredProjects`; `toRoman`, `formatYears`; `ProjectCard`, the kit Card unchanged, linking to `/work/<slug>`: preview with the tag "TAV. I", label, title (h3), summary, stack badges, foot "2025—26 · SOFT2BET". Previews: `components/project-preview` covers the hatched media like an image (surface + 24px grid) with one drawing per project (`plates-drawing`, `tree-drawing`, `migration-drawing`), `aria-hidden`.
  - **Section** `pages/home/ui/selected-work`: folio "Fol. 02", "Work · Tav. I — III of III" (from the data), h2, "All work" (Primary button → `/work`; the design draws a link button, changed on review), the cards in a list, 3 per row; one column on tablets and phones. 12 sepia column lines behind it, a line above.
  - Copy: `home.work`, `projects.<slug>`, `projectCard` in EN and FR.
  - `steiger.config.ts`: `insignificant-slice` off for `entities/project` until the Work page (M4) is its second consumer (TODO in the file), as was done for `switch-locale` in M2.
- **Where:** `src/entities/project/`, `src/pages/home/ui/selected-work/`, `src/pages/home/ui/HomePage.tsx`, `messages/{en,fr}.json`, `steiger.config.ts`; docs `PROJECT_OVERVIEW.md` §3, §4.2, §5; `SITEMAP.md` §1, §4
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check` and `build` pass.
  - In the production build: screenshots at 1440, 768 and 375 (EN) and 1440 (FR) compared with the Home design; hover lifts the card, underlines the title and moves the ↗; no horizontal scroll; axe (WCAG 2.2 AA) has no violations; each card is one link named by its text, with an h3 inside; "View work" in the hero now lands on `#work`.
- **Follow-ups:**
  - ~~Tablet: one 16:10 card per row is tall.~~ Done the same day: `<Card layout="adaptive">`.
  - The design's `hh2` hatch pattern (one seed of the tree) is not defined in the design file; the app hatches that seed like Tav. III's block.
  - Concept rule: Tav. I's summary ("Five production brands … brand template") and its preview ("×5") speak about brands. Kept from the design, like the hero lead; to be rewritten with the copy.

### 2026-11-23 — Hero and header: one folder per component
- **Status:** [done]
- **What:** `pages/home/ui/hero` keeps only `index.ts`, `Hero.tsx` and `Hero.module.css`. Children moved to `components/`: `cursor-coordinates`, `constructed-name` (with its child `components/name-dimensions`), `rota`, each with an `index.ts`. `NameDimensions` got its own CSS Module (its label classes left `ConstructedName.module.css`). `HomePage` imports `./hero`. No visual change.
- **Where:** `src/pages/home/ui/hero/`, `src/pages/home/ui/HomePage.tsx`; rule in `PROJECT_OVERVIEW.md` §4.3; paths in `SITEMAP.md` §4
- **Verified:** `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check` and `build` pass; in the production build the hero at 1440 and 375 matches the screenshots from before, the name's labels read the same px, axe has no violations.
- **Then the header:** `widgets/header/ui` keeps `Header.tsx` and its CSS; `Monogram` moved to `ui/components/monogram/` (the slice's `index.ts` still exports both). `typecheck`, `lint`, `lint:fsd`, `format:check` pass.

### 2026-11-23 — M3 Hero step 3: the Rota drawing
- **Status:** [done]
- **What:**
  - `Rota` (server component, inline SVG in a `<figure>`) in the hero grid's columns 6–12, under the text on tablets and phones. From the Home design: the hollow gear (one turn a minute, stops with reduced motion), the spokes, the oval ring with arrows and labels on text paths, four parts cropped by their circles (monitor, rack servers, database, neural network) with titles, descriptions and tags, the hub's spec, the caption and the stamp. `<defs>` ids (arrow marker, label arcs, clip paths) come from `useId()`.
  - Long path data in `rota.paths.ts` (taken from the design file by script). Colours with tokens; vignette fills are `--paper`.
  - Copy: `home.hero.rota` in EN and FR (`aria-label`, ring labels, part titles / descriptions / tags, hub spec, stamp). The Italian note and caption stay in the component. Description lines split at `\n`; the tags line moves down with the number of lines.
  - The SVG has `overflow: visible`: two EN tag rows run ~4 units past the viewBox (as on the design) and were cut ("ODELS", "CACH").
- **Where:** `src/pages/home/ui/hero/{Rota.tsx,Rota.module.css,rota.paths.ts,Hero.tsx,Hero.module.css}`, `messages/{en,fr}.json`, `SITEMAP.md` §4
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check` and `build` pass.
  - In the production build: screenshots at 1440, 768 and 375 (EN) and 1440 (FR) compared with the Home design; no FR text leaves the viewBox; no horizontal scroll at 1440 and 375; axe (WCAG 2.2 AA) has no violations; the figure is one image named by `home.hero.rota.label`; with reduced motion the hub has no animation.
- **Follow-ups:**
  - FR drawing copy is a draft, shortened to fit (part of the FR review, Open questions).
  - The `aria-label` describes the drawing, not the copy; it is long (≈ 90 words). Shorten it if screen-reader testing finds it tiring.

### 2026-11-23 — M3 Hero step 2: the constructed name
- **Status:** [done]
- **What:**
  - `ConstructedName` (server component, inline SVG) inside the h1, from the Home design: DMYTRO over BONDAR in outline; DMYTRO's edges under BONDAR are dashed (two masks); cap lines and baselines with their labels (CAP · I … BASE · II); the compass constructions on the D and the O; the dimension lines. `<defs>` ids come from `useId()`.
  - Glyph outlines and the drawing's geometry live in `constructedName.paths.ts` (taken from the design file by script, not retyped).
  - `NameDimensions` (client, `ResizeObserver` on the SVG): the labels show the real px of the rendered drawing (the design shows em: "CAP 0.700 EM" → "CAP 156 PX"), as decided on 2026-11-21. Before JS: the values at the widest drawing (1140px): CAP 156 PX, Δy 137 PX, 19, WIDTH 951 PX.
  - Colours with tokens (`--ink`, `--ink-2`, `--muted`, `--sanguine` and its `color-mix` tints); text in `--mono`. The labels are not translated (technical marks, like "520 PX").
- **Where:** `src/pages/home/ui/hero/{ConstructedName.tsx,ConstructedName.module.css,NameDimensions.tsx,constructedName.paths.ts,Hero.tsx}`; `SITEMAP.md` §4
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd` and `build` pass.
  - In the production build: screenshots at 1440, 768 and 375 compared with the Home design; the labels read CAP 156 / 83 / 43 PX at those widths; axe (WCAG 2.2 AA) has no violations; the h1's accessible name is "Dmytro Bondar" in EN and FR (the SVG is `aria-hidden`).
- **Review:** accepted as is, phones included: the tiny labels stay as texture. The author centred the drawing in its zone (`margin: 0 auto` on `.drawing`).

### 2026-11-21 — M3 Hero step 1: section and text column
- **Status:** [done]
- **What:**
  - Hero (Fol. 01) in `pages/home/ui/hero`, rendered by `HomePage` instead of the placeholder:
    - the section with the sheet's 40px drawing grid;
    - the folio row "Fol. 01 · Frontispiece · Home" with live cursor coordinates (`CursorCoordinates`, a small client component, rAF-throttled, `aria-hidden`);
    - the h1 with the author's name for screen readers (the drawing comes in step 2), in a 436px name zone;
    - the text column: role, Dimension "520 PX", lead, availability and location badges, "View work" (`#work`) and "Download CV" (downloads `/cv.pdf`), the Italian marginalia.
  - Tablet: one column, the name zone takes its height; phone: the folio row stacks. Padding 32 / 24 / 16 (DESIGN.md §1.9).
  - New icon `ArrowRightIcon`. Copy `home.hero` in EN and FR (from the design; FR drafted).
- **Where:** `src/pages/home/ui/HomePage.tsx`, `src/pages/home/ui/hero/`, `src/shared/ui/icons/ArrowRightIcon.tsx`, `messages/{en,fr}.json`; docs `PROJECT_OVERVIEW.md` §3, §4.2, §10; `SITEMAP.md` §4; `DESIGN.md` §9.4; `fonts.ts`
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd` and `build` pass.
  - In the production build: screenshots at 1440, 768 and 375 compared with the Home design; axe (WCAG 2.2 AA) has no violations; the h1 reads "Dmytro Bondar"; the coordinates follow the pointer.
- **Follow-ups:**
  - Prefetching Work and About returns 404 until M4 / M6 (expected).
  - "520 PX" is a fixed label: below 520px of column width (phones) it no longer matches the drawn line.

### 2026-11-21 — M2 closed: review answers
- **Status:** [done]
- **What:**
  - External links (rail GitHub / LinkedIn, footer Source) get "(opens in a new tab)" in their accessible names (`layout.newTab`); the footer's ↗ became decor (`aria-hidden`).
  - `siteConfig.revisionYear` is the year of the build.
- **Where:** `src/widgets/{social-rail,footer-stamp}`, `src/shared/config/site.ts`, `messages/{en,fr}.json`, `SITEMAP.md`
- **Verified:** `typecheck`, `lint`, `lint:fsd`, `format:check` and `build` pass; in the production build the three external links read "GitHub (opens in a new tab)" etc. in EN and "… (s’ouvre dans un nouvel onglet)" in FR, the stamp shows "B · 2026", axe has no violations in either locale.

### 2026-11-21 — M2 stage 5: mobile menu, Dialog and Sheet in the kit
- **Status:** [done]
- **What:**
  - **Dialog** (`shared/ui/dialog`, Base UI Dialog): `Dialog`, `DialogTrigger`, `DialogPopup` (480 / 620 / 400), `DialogHeader`, `DialogBody`, `DialogDescription`, `DialogFooter`, `DialogClose`. Kit CSS for `.cx-scrim` and `.cx-dialog*` from codex.css, plus the overlay motion (fade, "laid down" from −8px) with reduced motion.
  - **Sheet** (`shared/ui/sheet`, on the same Base UI Dialog): `SheetPopup`, `SheetHeader`, `SheetNav`, `SheetNavLink`, `SheetFooter`. Kit CSS for `.cx-sheet-panel*` and `.cx-sheet-nav`, width `min(320px, 82vw)`, slide-in motion.
  - Stories: Overlays/Dialog (tavola preview, default, keyboard and focus test, close buttons test) and Overlays/Sheet (mobile menu on Work, hover row, current section and Esc test).
  - **Widget `mobile-menu`:** a Secondary icon button (new `MenuIcon`), shown at 1024px and below in the header's new `menu` slot, opens the Sheet: "Codex · Index", Home / Work / About with folio numbers, EN | FR, "Let's talk". A section, a language or "Let's talk" closes it.
  - `shared/config/navigation.ts`: one list of sections for the header and the menu; their titles moved from `layout.header.nav` to `layout.nav`. New copy: `layout.menu`.
  - `isCurrentPath` in `shared/i18n`, used by `NavLink` and `SheetNavLink`.
  - `steiger.config.ts` is back to the recommended config: `switch-locale` now has two consumers.
- **Where:**
  - `src/shared/ui/{dialog,sheet}/`, `src/shared/ui/icons/MenuIcon.tsx`, `src/shared/ui/nav-link/NavLink.tsx`, `src/shared/i18n/isCurrentPath.ts`, `src/shared/styles/index.css`
  - `src/widgets/mobile-menu/`, `src/widgets/header/ui/Header.tsx`, `src/shared/config/navigation.ts`, `src/app/layouts/LocaleLayout.tsx`, `messages/{en,fr}.json`, `steiger.config.ts`
  - Docs: `DESIGN.md` §2, §5, §7, §12; `SITEMAP.md` §3 G1
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check`, `build` and `build-storybook` pass.
  - `test:stories`: 127/127 (axe in every story).
  - In the production build: the menu button is hidden at 1440 and shown at 768 and 375; keyboard open moves focus to "Close menu", Esc closes and returns focus to the button; the sheet is 320px at 768 and 82vw at 375; the current section is sanguine; axe has no violations with the menu open; FR in the menu opens `/fr` and closes it; a section link closes it. Screenshots of the app menu and of the Dialog / Sheet stories compared with kit sheet 05.

### 2026-11-21 — M2 stage 4: footer stamp
- **Status:** [done]
- **What:**
  - Widget `footer-stamp`: the title block. Five cells (Drawn by, Role, Rev., Location, Source → the repo on GitHub, new tab) and the Primary "Let's talk" cell (`#contact`) with the status "Open for work" / "Say hello".
  - Tablet: 3 columns; phone: 2 columns, Source and the button on full rows (Home design).
  - Data: `siteConfig.revisionYear`, `siteConfig.available`, `siteConfig.links.source`. Copy: `layout.footer` in EN and FR.
  - Page frame fix: the main row is `1fr`. Before, a page shorter than the rail stretched the footer row and left empty space under the stamp.
- **Where:**
  - `src/widgets/footer-stamp/`, `src/app/layouts/PageFrame.module.css`, `src/app/layouts/LocaleLayout.tsx`
  - `src/shared/config/site.ts`, `messages/{en,fr}.json`
  - Docs: `DESIGN.md` §1.9, `SITEMAP.md` §3 G4
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check` and `build` pass.
  - In the production build: full-page screenshots at 1440, 768 and 375 and the FR footer compared with the Home design; axe (WCAG 2.2 AA) has no violations; the footer sits at the bottom of the sheet on the short placeholder page.

### 2026-11-21 — M2 stage 3: social rail
- **Status:** [done]
- **What:**
  - Widget `social-rail`: `<aside aria-label="Links">` with a vertical Button Group of Secondary icon links: GitHub, LinkedIn, Email (`#contact`, as in the design), CV (downloads `/cv.pdf`). GitHub and LinkedIn open in a new tab (`target="_blank"`, `rel="noopener noreferrer"`); `RailLink.target` is typed as the `<a>` attribute. Each has a right Tooltip; the icon turns sanguine on hover.
  - The column is sticky; under the group, the decorative "Scroll · Fol. 01 — 04" and an arrow.
  - Phone: a horizontal group at the end of the strip next to the monogram; tooltips and the scroll hint are hidden (Home design).
  - New icon `FileDownIcon` (Lucide `file-down`). Data: `siteConfig.links` (`github`, `linkedin`, `cv`). Copy: `layout.rail` in EN and FR.
- **Where:**
  - `src/widgets/social-rail/`, `src/shared/ui/icons/FileDownIcon.tsx`
  - `src/shared/config/site.ts`, `src/app/layouts/LocaleLayout.tsx`, `messages/{en,fr}.json`
  - Docs: `DESIGN.md` §3 (Button Group), §9.9; `SITEMAP.md` §3 G2
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check` and `build` pass.
  - In the production build: screenshots at 1440, 768 and 375 compared with the Home design; axe (WCAG 2.2 AA) has no violations; hover shows the "GitHub" tooltip and the sanguine icon; with a tall page the group stays 24px below the top while scrolling; the CV link has `download`.
- **Follow-ups (content):** done by the author the same day: the real LinkedIn URL, the email (`siteConfig.links.email`, the Email button is now a `mailto:` link) and `public/cv.pdf`.

### 2026-11-21 — M2 stage 2: header and monogram
- **Status:** [done]
- **What:**
  - Widget `header`: `Monogram` (the "DB" link home in the frame's top-left cell) and `Header` (sheet label, nav Home / Work / About, language switch, "Let's talk"). `LocaleLayout` puts them into the frame's slots.
  - Feature `switch-locale`: `LocaleSwitch`, the EN | FR Toggle Group. It opens the same path in the other locale (`router.replace` from `@/shared/i18n`); the current locale is the pressed item.
  - Tablet hides the label and the nav, phone also hides the language switch (DESIGN.md §1.9).
  - Data: `siteConfig.author` (name, initials) and `siteConfig.revision`. Copy: `layout.monogram`, `layout.header`, `layout.locale` in EN and FR.
  - `steiger.config.ts`: `fsd/insignificant-slice` is off for `features/switch-locale` until the mobile menu becomes its second consumer (TODO in the file).
- **Where:**
  - `src/widgets/header/`, `src/features/switch-locale/`
  - `src/shared/config/site.ts`, `src/app/layouts/LocaleLayout.tsx`, `messages/{en,fr}.json`, `steiger.config.ts`
  - Docs: `DESIGN.md` §5 (Header), `SITEMAP.md` §3 G1
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check` and `build` pass.
  - In the production build: screenshots at 1440, 768 and 375 compared with the Home design; axe (WCAG 2.2 AA) has no violations at any width; the second Tab focuses the monogram (dashed line inside the cell, name "DB — Dmytro Bondar, home"); clicking FR opens `/fr` with `lang="fr"`, the French nav and FR pressed.
- **Follow-ups:**
  - "Let's talk" links to `#contact`, which does not exist until the contact section is built.
  - Work and About link to pages that do not exist yet (M4, M6).
  - Until stage 5, tablets and phones have no navigation (the menu button comes with the mobile menu).

### 2026-11-21 — M2 stage 1: page frame
- **Status:** [done]
- **What:**
  - `PageFrame` in `src/app/layouts`: the drawing sheet from the Home page design, rendered by `LocaleLayout` around every page.
    - Paper padding, the A–L ruler (decor), the 1680px frame with an ink border.
    - Cells with the lines between them: monogram, rail, header, `<main id="main">`, footer. Slots for the widgets of the next stages (`monogram`, `rail`, `header`, `footer`).
    - Phone layout (≤ 600px): one column, monogram and rail in one 72px strip, header 64px.
    - Skip link "Skip to content" (EN / FR in `messages`, namespace `layout`).
  - `HomePage` no longer renders `<main>`; it shows a placeholder title so the layout can be seen on `/` (TODO(M3)).
  - Docs: `DESIGN.md` §1.9 (page layout and breakpoints) and §9.5 (Sheet width); new `context/SITEMAP.md` (content map); `PROJECT_OVERVIEW.md` links and §2.
- **Where:**
  - `src/app/layouts/PageFrame.tsx`, `PageFrame.module.css`, `LocaleLayout.tsx`
  - `src/pages/home/ui/HomePage.tsx`, `HomePage.module.css`
  - `messages/{en,fr}.json`
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, Prettier on `src` and `messages`, and `build` pass.
  - Production build screenshots at 1440, 768, 375 and 1920 compared with the Home design; axe (WCAG 2.2 AA) on `/en`: no violations. The first Tab focuses the skip link with the dashed outline.

### 2026-11-20 — Session end: docs brought in line with the code
- **Status:** [done]
- **What:**
  - `DESIGN.md`:
    - "In the app" notes where the implementation differs from the sheets: fonts, aliases, Button loading, Switch, Toggle Group, Select, Checkbox / Radio, Card tag fix, menu focus, Tooltip sides, Toast.
    - §9 gaps updated with their current status.
    - New §12, a map from kit class to component to status.
  - `PROJECT_OVERVIEW.md`:
    - source of truth;
    - styling (layers, one entry point, CSS Modules for inline-only layout);
    - pseudo-states addon;
    - `shared` slices;
    - `'use client'` rule;
    - quality (components covered by stories);
    - the empty `test/` and `e2e/`.
- **Next session:** choose between the M1 later pass and M2 (global layout). Restore `test/` and `e2e/` when unit or E2E tests are needed.

### 2026-11-20 — M1 stage 6: Feedback (Tooltip, Alert, Toast). Base pass complete
- **Status:** [done]
- **What:**
  - **Tooltip** on Base UI Tooltip: `<Tooltip content side defaultOpen>{trigger}</Tooltip>`.
    - 300ms delay, opens on hover and on keyboard focus.
    - Sides `right` (social rail) and `top` (stack badges), the two the kit draws an arrow for. It never flips to the other side.
  - **Alert**: `<Alert tone title>`, the letter icon is automatic. `error` gets `role="alert"` and the "ERR — " title prefix; the other tones get `role="status"`.
  - **Toast** on Base UI Toast:
    - `ToastProvider` (stack bottom right, 4s, `dismissLabel`) and `useToast()` with `show`, `update` and `close`.
    - Types: `success` (verdigris check), `loading` (spinner, stays until closed), `accent` (sanguine label), default.
    - An optional action ("Undo") and a dismiss button.
  - Stories: tooltips (right, with Kbd, top), the alert tones, and the toasts (copy email; every kind at once).
- **Where:**
  - `src/shared/ui/{tooltip,alert,toast}/`
  - `src/shared/styles/index.css`
- **Verified:**
  - `typecheck`, `lint`, `lint:css`, `lint:fsd`, `format:check`, `build` and `build-storybook` pass.
  - `test:stories`: 118/118 on a cold cache. The tests cover:
    - the tooltip opening on keyboard focus and closing on Esc;
    - alert roles and the ERR prefix;
    - a toast shown by an action, typed, visible after its enter transition, and closed by dismiss.
  - Screenshots compared with kit sheet 05.
- **Follow-ups:**
  - Put `ToastProvider` into the app providers (`src/app`) with a translated `dismissLabel` when the first toast is used (`copy-email`, M2/M7).
  - The rest of the kit is in the later pass (Decisions, 2026-11-19).

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

### 2026-11-23 — Badge list and the card's title link
- **Context:** On tablets the stack should keep to one row with a "…" that shows the rest. A button cannot sit inside the card's `<a>` (invalid HTML, axe `nested-interactive`, a click would navigate).
- **Decision:**
  - **`BadgeList` is a kit component** with a `collapse` variant (`true` / media query / `false`), so it serves the card and any other badge row.
  - **Collapse only while the card lies sideways** (author's correction): `ProjectCard` passes `CARD_ROW_QUERY` when `layout="adaptive"`; on desktops and phones the stack wraps.
  - **The card's link moves to the title, stretched over the card** (`<Card link="title">`, opt-in; the default whole-card link stays). Side effect, accepted: the link's name is now the title, not the whole card's text.
  - **After "…" the list stays open**; there is no "show less".
- **Affects:** `DESIGN.md` §6; `src/shared/ui/{badge-list,card}`.

### 2026-11-23 — Kit Card takes the Home design's look
- **Context:** Review of Selected work. The author chose the Home design's card over the kit sheet's.
- **Decision:**
  - **The kit Card itself changes** (the project is the kit's source of truth): body 20 / 12, title `cx-h3`, every media label on surface with `--ink-2` text — the tag included.
  - **This reverses the 2026-11-20 fix** that kept the tag ink ("Data display: decisions"): the Home design's light tag came from codex.css's `.cx-card-media > span` rule, and it is now the intended look. The in-progress card keeps its dark tag.
  - **New caption** on the media, bottom left: the project's domain.
  - **Changes to a component's look go through props** (variants), not page CSS: the tablet layout is `<Card layout="adaptive">`, the default stays vertical.
- **Affects:** `DESIGN.md` §6; `src/shared/ui/card`; supersedes the first point of "Selected work: kit card, count from the data" below.

### 2026-11-23 — Selected work: kit card, count from the data
- **Context:** Start of Fol. 02. The Home design draws bigger cards than the kit (body 20 / 12, title `cx-h3`, media on a grid) and says "Tav. I — III of VI" while only three projects are known.
- **Decision:**
  - **The kit Card as is** (body 16 / 10, title `cx-h4`). From the design only the content: label, summary, stack, previews. The preview covers the hatched media like an image would.
  - **The total is counted from `projects`**: "of III" now, "of VI" once all projects are in the data. Rejected: a fixed VI.
  - **Projects are an entity** (`entities/project`), with `ProjectCard` in it: the Work grid (M4) uses the same card.
  - **Previews are decorative** (`aria-hidden`): inside a link card their descriptions would become part of the link's name.
- **Affects:** `PROJECT_OVERVIEW.md` §4.2, §5; `SITEMAP.md` §4; `src/entities/project`.

### 2026-11-23 — One folder per component
- **Context:** The hero's folder held five components and their styles and constants side by side.
- **Decision:** A block's folder holds its `index.ts` and its own files; every child component lives in `components/<component-name>/` with its own `index.ts`, recursively. Folder names are kebab-case, like the slices and `shared/ui`.
- **Affects:** `PROJECT_OVERVIEW.md` §4.3; `src/pages/home/ui/hero/`, `src/widgets/header/ui/`.

### 2026-11-21 — Hero: how the name and the Rota drawing are built
- **Context:** Start of M3. The Home design's hero (= canvas "Hero · Rev. B") has two drawings; the Name and Machine studies on the canvas were explorations.
- **Decision:**
  - **Both drawings are inline SVG in React server components**, not image files: tokens for colours, the app's fonts for text, translatable text, CSS animation with reduced motion, no requests. Long path data lives in constant files next to the components; `<defs>` ids are prefixed with `useId()`.
  - **The name's dimension labels show real sizes**: computed in JS from the drawing's rendered width (a small client part); before JS they show the values for the desktop width.
  - **Rota:** every text in the drawing is translated (`messages`) except the Italian marginalia and caption; the label sizes stay as drawn for now (small on phones).
  - **The mechanism is Rota, with no portrait.** Closes `PROJECT_OVERVIEW.md` §10.3.
  - **EB Garamond is approved.** Closes §10.2.
  - **Hero copy comes from the design for now**; it will be rewritten (the lead and the marginalia mention brands, against the concept rule).
  - **"Download CV" downloads the CV** (the design links it to `#contact`); "View work" goes to `#work` on the same page.
  - **Page-only blocks live in the page slice** (`pages/home/ui/hero`), not in `widgets`: Steiger's `insignificant-slice` rule; a block moves to `widgets` when a second page uses it. Updates the slice map in `PROJECT_OVERVIEW.md` §4.2.
- **Affects:** `PROJECT_OVERVIEW.md` §3, §4.2, §10; `DESIGN.md` §9.4; `SITEMAP.md` §4.

### 2026-11-21 — M2 review answers
- **Context:** Open points at the end of M2.
- **Decision:**
  - **"Let's talk" and the menu keep linking to `#contact`** until the contact section exists (M7).
  - **FR copy stays as drafted**; it is reviewed once the components are done (Open questions).
  - **The revision year is the build year** (`new Date().getFullYear()` in `siteConfig`, fixed by prerendering).
  - **External links announce the new tab** to screen readers ("GitHub (opens in a new tab)"); tooltips and visible text stay short.
- **Affects:** `src/shared/config/site.ts`, `src/widgets/{social-rail,footer-stamp}`, `SITEMAP.md`.

### 2026-11-21 — Mobile menu: Dialog and Sheet
- **Context:** M2 stage 5. The mobile menu is the kit's Sheet; the kit has no Base UI mapping for overlays yet.
- **Decision:**
  - **Sheet is its own kit component** (`shared/ui/sheet`), opened with `Dialog` + `DialogTrigger`: the kit lists Sheet and Dialog separately, and both sit on Base UI Dialog.
  - **The scrim and the panels are pinned to the viewport in CSS Modules.** codex.css positions them `absolute` inside a demo stage; the kit CSS is kept as is.
  - **The sheet's bottom area follows the kit** (pushed to the bottom with a line above), not the Home design (right under the nav). Its content follows the Home design: EN | FR and "Let's talk", no social group (the rail is visible on every width), no theme switch.
  - **Folio numbers in the menu are decorative** (`aria-hidden`), so a link's name is the section's title.
  - **One list of sections** (`shared/config/navigation.ts`) for the header and the menu.
- **Affects:** `DESIGN.md` §7, §12; `src/shared/ui/{dialog,sheet}`, `src/widgets/mobile-menu`.

### 2026-11-21 — M2 scope and the layout decisions
- **Context:** Start of M2. The Home page design on the canvas is the layout reference; it differs from the docs in a few places.
- **Decision:**
  - **Scope and order of M2:** 1 page frame → 2 header (the monogram is part of it) → 3 social rail → 4 footer stamp → 5 mobile menu. Each stage is shown on `/` and reviewed before the next one starts.
  - **Deferred:** the command palette (M8) and the toast provider. Only the ⌘K trigger may appear in the header.
  - **The contact section (Fol. 04) is not part of the layout** for now; it is left untouched.
  - **Dialog joins the kit in stage 5** (pulled from M1's later pass), with stories, because the mobile menu needs it.
  - **Sheet width:** the kit rule, `min(320px, 82vw)`. Rejected: 360px (`codex.css`) and `min(360px, 88vw)` (Home design).
  - **No theme switch** anywhere (the Home design's Paper | Notte toggle and "Switch theme" action are dropped).
  - **Navigation:** Home / Work / About. No counters, no Contact item.
  - **Breakpoints and page margins** from the Home design are recorded in `DESIGN.md` §1.9.
  - **Content arrives with its component**, split as in `PROJECT_OVERVIEW.md` §5 (copy in `messages`, data in TS). `context/SITEMAP.md` maps what lives where. This closes the "`sitemap.md` is not in the repo" question.
- **Affects:** `DESIGN.md` §1.8, §1.9, §7 (Sheet), §9.5; `PROJECT_OVERVIEW.md` related docs, §2, §4.1, §5, §10; `context/SITEMAP.md`.

### 2026-11-20 — Feedback: decisions
- **Context:** M1 stage 6.
- **Decision:**
  - **Tooltip:**
    - Only `right` and `top`, with Base UI `collisionAvoidance: { side: 'shift' }`, so it never flips to a side the kit has no arrow for.
    - Gaps of 10px (right) and 8px (top), from the sheet.
    - Motion: 160ms fade + 8px shift away from the trigger, with reduced motion.
  - **Alert:** the "ERR — " prefix of error titles is added by the component, so the rule cannot be forgotten. The roles are `alert` for errors and `status` otherwise.
  - **Toast:**
    - The label colours by type are inline on the sheet and written in toast.css with tokens.
    - Added `max-width: calc(100vw - 40px)`: the kit's 380px toast does not fit a 360px phone.
    - The stack's position is a page-margin rule, not a kit element, so it lives in `Toast.module.css`: 32px from the edges, 20px below 768px.
    - Base UI's default limit of 3 visible toasts is kept.
  - **The dark toast (`.cx-toast--dark`) is not exposed:** its only kit example belongs to the dropped Notte theme, and a dismiss button on ink is not designed (ink icon on ink). Its CSS is kept.
- **Affects:** `src/shared/ui/{tooltip,alert,toast}`.

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

- [ ] **FR copy review.** All FR strings so far are drafts written during development (`messages/fr.json`). Review them once the components are done · owner: author · since 2026-11-21
- [ ] **Email provider:** Resend (proposed) · `PROJECT_OVERVIEW.md` §10.1 · owner: author

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
- [ ] **Toast dismiss is `aria-hidden` but focusable** (Base UI's choice: toasts are announced through the live region). axe's `aria-hidden-focus` may flag it in Playwright page checks; decide then whether to exclude it or override it · since 2026-11-20
- [ ] **Docs reformatted by Prettier once:** at init `pnpm format` reformatted `DESIGN.md` and `PROJECT_OVERVIEW.md` (padded tables, `*italic*` → `_italic_`; no content changes). `context/` is now in `.prettierignore` · since 2026-11-19
