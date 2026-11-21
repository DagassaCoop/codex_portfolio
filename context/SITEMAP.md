# SITEMAP.md — Codex Portfolio: content map

> **What this file is.** A map of the site's content: which pages and global elements exist, what content each one shows, and **where in the repo every piece of that content lives**. Read it before adding or changing copy, links or data.
>
> **What it is not.** It does not hold the copy itself. All text is in `messages/{en,fr}.json`; data is in typed TS files (PROJECT_OVERVIEW.md §5). The visual contract is in `DESIGN.md`, progress and decisions in `PROGRESS.md`.
>
> **Source.** The full content plan is `sitemap.md` in the Claude project "Portfolio" (not in the repo). This file brings it into the repo piece by piece: **an entry is added when the component that shows it is built**, so everything listed here exists in the code unless marked `[todo]`.
>
> Status markers: `[done]` in the code · `[todo]` planned, not built yet.

---

## 1. Where content lives (PROJECT_OVERVIEW.md §5)

| Kind | What | Where |
| --- | --- | --- |
| **Copy** (translated) | Every visible string: UI labels, headings, project texts, job descriptions, accessible names | `messages/en.json` and `messages/fr.json`, the same keys in both. Read with `useTranslations` / `getTranslations` (`next-intl`); rich text with `t.rich` |
| **Site data** (one language) | Availability, email, social links, CV path, site URL | `src/shared/config/site.ts` (`siteConfig`) |
| **Project data** | Slug, Tav. number, type, year, stack, `featured`, links, images, metrics | `src/entities/project/model` |
| **Experience data** | Company, dates, city, format, stack | `src/entities/experience/model` |
| **Decor** (not content) | Ruler letters, construction labels, dimension values | Constants next to the component that draws them; `aria-hidden`, not translated |
| **Files** | CV (PDF), images, favicons | `public/` |

Rules:

- No string is hard-coded in a component if a reader or a screen reader can see or hear it: it goes into `messages`.
- Every key exists in both locales. `messages/en.json` defines the key type (`src/shared/i18n/global.d.ts`), so a missing key fails `typecheck` in code, but FR has to be checked by eye.
- Data is keyed by a stable id (`slug`); its copy lives under the same id in `messages` (e.g. `projects.<slug>.title`).

### Message namespaces

| Namespace | Used by | Status |
| --- | --- | --- |
| `meta` | `<title>` and description (`src/app/layouts/LocaleLayout.tsx`) | [done] |
| `layout` | the page frame and the global widgets (§3) | [done] (frame) |
| `home` | Home page (`src/pages/home`) | [done] placeholder title only |

---

## 2. Pages

| Route | Page | Sections | Status |
| --- | --- | --- | --- |
| `/[locale]` | Home | Hero (Fol. 01), Selected work (Fol. 02, 3 × Tav.), What I do (Fol. 03r), Experience (Fol. 03v) | [todo] (M3). Now a placeholder that shows the layout |
| `/[locale]/work` | Work | All tavole, filter chips, grid / list | [todo] (M4) |
| `/[locale]/work/[slug]` | Case study | Spec table, Task / Solution / Result, gallery, code, prev / next | [todo] (M5) |
| `/[locale]/about` | About | Skills / Experience / Education | [todo] (M6) |
| `*` | 404 | Empty state | [todo] (M9) |

`/` redirects to `/en` (`proxy.ts`).

---

## 3. Global elements (every page)

Drawn on the Home page design; the frame and the cells are described in `DESIGN.md` §1.9.

### Page frame — `src/app/layouts/PageFrame.tsx` [done]

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Skip link "Skip to content" | copy | `layout.skipToContent` | [done] |
| Ruler letters A–L | decor | `RULER_COLUMNS` in `PageFrame.tsx` | [done] |

### G1 · Header and navigation [todo]

Monogram (link home), nav (Home / Work / About; no counters, no Contact), EN | FR, ⌘K trigger, "Let's talk", menu button (tablet and phone).

### G1 · Mobile menu [todo]

Sheet from the right: label, nav with folio numbers, EN | FR, "Let's talk". No theme switch.

### G2 · Social rail [todo]

GitHub, LinkedIn, Email, CV (PDF), with tooltips; "Scroll · Fol. 01 — 04" (decor).

### G3 · Contact section (Fol. 04) [todo]

Not part of the layout for now (decided 2026-11-21). The form is M7.

### G4 · Footer stamp [todo]

Drawn by, Role, Rev., Location, Source, and the "Let's talk" cell with the availability status.

### G5 · Command palette [todo]

Deferred (M8).
