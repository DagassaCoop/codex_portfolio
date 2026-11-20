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
- **Now:** M1 stage 1 (styles) is done and waiting for review.
- **Next:** M1 stage 2, Actions: Button, Button Group, Toggle, Toggle Group, Switch, Kbd.
- **Blocked by:** nothing. The Sheet width is deferred until the mobile menu (M2).

---

## 2. Milestones

| # | Milestone | Status | Notes |
|---|---|---|---|
| M0 | Project init: Next.js + FSD skeleton, i18n routing, tooling | [done] | 2026-11-19. Storybook added the same day |
| M1 | Foundation: kit styles + `shared/ui` components on Base UI, with stories | [in progress] | Two passes: base first, the rest later (Decisions, 2026-11-19). Base pass stages: 1 Styles [done] · 2 Actions · 3 Forms · 4 Data display · 5 Navigation · 6 Feedback |
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
- **Affects:** `DESIGN.md` §9.2. The kit canvas still shows Telegram (Open questions).

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
- [ ] **Update the kit canvas** to EN | FR and no Telegram, or leave the sheets as they are and treat them as sample copy · owner: author · since 2026-11-19
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
- [ ] **First `test:stories` run after adding a dependency can fail** with "Vitest failed to find the current suite" while Vite re-optimizes deps. A second run passes · since 2026-11-19
- [ ] **ESLint 9 is now flagged as deprecated by npm.** Moving to 10 is blocked by the plugins in `eslint-config-next` (Decisions, toolchain versions) · since 2026-11-19
- [ ] **Docs reformatted by Prettier once:** at init `pnpm format` reformatted `DESIGN.md` and `PROJECT_OVERVIEW.md` (padded tables, `*italic*` → `_italic_`; no content changes). `context/` is now in `.prettierignore` · since 2026-11-19
