# CLAUDE.md — Codex Portfolio

Personal portfolio of Dmytro Bondar (Next.js App Router, FSD, Base UI, next-intl EN | FR) in the "Codex" theme: a Renaissance engineer's notebook. This file says **where the project's context lives and what each file holds**. It does not repeat that context: read the files themselves.

## Start of every session

1. Read `context/PROGRESS.md` §1 **Current status** (phase, what is waiting for review, what is next).
2. Read the files below that the task touches before writing code.
3. When the work is done, update the files it affects in the same session (see [Keeping context up to date](#keeping-context-up-to-date)).

## Context files (`context/`)

| File                          | What it is                                                                                                                                                                         | Main sections                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context/PROJECT_OVERVIEW.md` | The spec: goals, scope, stack, architecture, content model, flows. Status markers `[chosen]` / `[proposed]` / `[open]`                                                             | §1 Goals · §2 Scope (pages) · §3 Tech stack · §4 Architecture (FSD layers, slice map, import rules, `'use client'` rule, one folder per component) · §5 Content (copy in `messages`, data in TS) · §6 Styling (codex.css on Base UI, state mapping) · §7 Contact form flow · §8 Environment variables · §9 Quality (tests, stories, lint, a11y) · §10 Open decisions  |
| `context/DESIGN.md`           | The visual contract: the Codex UI Kit as drawn, and how the app implements it ("**In the app**" notes)                                                                             | §0 Rules for writing UI · §1 Tokens (colour, type, space, page layout and breakpoints §1.9) · §2 State language · §3–§7 Components by kit sheet (Actions, Forms, Navigation, Data display, Overlays & feedback) · §8 Decorative layer · §9 Known gaps in the kit · §10 Documentation-only classes · §11 shadcn → kit class · §12 Kit class → app component and status |
| `context/SITEMAP.md`          | The content map: what each page and global element shows and **where each piece of content lives** (copy key, data file, component). Entries are added when the component is built | §1 Where content lives (+ message namespaces) · §2 Pages · §3 Global elements (page frame, header, mobile menu, social rail, contact section G3, footer stamp G4, command palette) · §4 Home sections (Fol. 01 Hero, Fol. 02 Selected work, Fol. 03r What I do, Fol. 03v Experience) · §5 Projects (Fol. 02 Index of tavole, Fol. 02.1 Notebook)                      |
| `context/PROGRESS.md`         | The running record: where the work is and why                                                                                                                                      | How to write entries · §1 Current status · §2 Milestones (M0–M10) · §3 Work log (newest first) · §4 Decisions (newest first) · §5 Open questions · §6 Known issues and debt                                                                                                                                                                                           |

### Which file for which task

- **Building or changing UI:** `DESIGN.md` (§0 rules, the component's section, §12), then the component in `src/shared/ui` and its stories.
- **Adding or changing copy, links or data:** `SITEMAP.md` first (where it lives), then `messages/{en,fr}.json` or the data file it names.
- **Architecture, folders, a new slice or dependency:** `PROJECT_OVERVIEW.md` §3–§4.
- **"Why is it like this?":** `PROGRESS.md` §4 Decisions; open points are in §5 and §6.

## Sources of truth

- **Kit elements:** the code in `src/shared/styles` and `src/shared/ui` (seen in Storybook) together with `DESIGN.md`. The canvas is not redrawn when the code decides differently.
- **Page layout:** the page designs on the UI Kit canvas (Home, tablet and mobile boards).
- **Content:** `SITEMAP.md` in the repo; the full plan is `sitemap.md` in the Claude project (below).
- **Copy:** `messages/en.json` (defines the key types) and `messages/fr.json`. FR is a draft until reviewed.
- **Site data:** `src/shared/config/site.ts` (`siteConfig`); entity data in `src/entities/*/model`.

## Outside the repo

- **UI Kit canvas** (Claude artifact, type Design): https://claude.ai/artifact/9nbNbHQVbXt4z57ZGH443K
  - Kit sheets: `project/Kit{Foundations,Actions,Forms,Navigation,Data,Overlays}.dc.html`.
  - Page designs: `project/Home.dc.html` (layout reference, with tablet and mobile media queries), `project/HomeTablet.dc.html`, `project/HomeMobile.dc.html`, Hero studies `project/HomeHero.dc.html`, `project/HomeName.dc.html`, `project/HomeMachine.dc.html`.
  - Projects page: `project/Projects.dc.html` (intro + the chosen variant F · Notebook), `project/ProjectsNotebook.dc.html` (the notebook: desktop spread, tablet / phone slider and Details dialog), `project/ProjectsNotebook{Tablet,Mobile}Details.dc.html` (the dialog at 768 and 360). `ProjectsAssembly.dc.html` is the rejected variant E.
  - `codex.css`, the original kit stylesheet: an uploaded asset of the canvas, id `e7eaac61be294e914584ca1ec245a27b` (read it with the Artifact tool, `path` = the id). Brought into the app as `src/shared/styles` + one CSS file per component.
- **Claude project "Portfolio":** `concept-codex.md` (the concept), `sitemap.md` (all pages and content), `codex.css`, `shadcn-components.md`.

## Keeping context up to date

- After meaningful work: add an entry to `PROGRESS.md` §3 Work log (what, where, how it was verified, follow-ups) and overwrite §1 Current status; update §2 Milestones.
- A decision made during the work goes to `PROGRESS.md` §4; if it changes the spec or the visual contract, update `PROJECT_OVERVIEW.md` or `DESIGN.md` too and link it.
- New or moved copy, data or content: update `SITEMAP.md` (and its namespace table).
- A kit component added or changed: `DESIGN.md` (its section and §12).
- Dates are absolute (`YYYY-MM-DD`). `context/` is in `.prettierignore`; keep its tables readable by hand.
