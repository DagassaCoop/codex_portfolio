# SITEMAP.md — Codex Portfolio: content map

> **What this file is.** A map of the site's content: which pages and global elements exist, what content each one shows, and **where in the repo every piece of that content lives**. Read it before adding or changing copy, links or data.
>
> **What it is not.** It does not hold the copy itself. All text is in `messages/{en,fr}.json`; data is in typed TS files (PROJECT_OVERVIEW.md §5). The visual contract is in `DESIGN.md`, progress and decisions in `PROGRESS.md`.
>
> **Source.** The full content plan is `sitemap.md` in the Claude project "Portfolio" (not in the repo). This file brings it into the repo piece by piece: **an entry is added when the component that shows it is built**, so everything listed here exists in the code unless marked `[todo]`.
>
> Status markers: `[done]` in the code · `[todo]` planned, not built yet.
>
> **FR copy** is a first draft written during development; it is reviewed once the components are done (PROGRESS.md, Open questions).

---

## 1. Where content lives (PROJECT_OVERVIEW.md §5)

| Kind | What | Where |
| --- | --- | --- |
| **Copy** (translated) | Every visible string: UI labels, headings, project texts, job descriptions, accessible names | `messages/en.json` and `messages/fr.json`, the same keys in both. Read with `useTranslations` / `getTranslations` (`next-intl`); rich text with `t.rich` |
| **Site data** (one language) | Author name and initials, revision and its year, availability, email, social links, CV path, source repo, site URL | `src/shared/config/site.ts` (`siteConfig`) |
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
| `layout` | the page frame and the global widgets (§3) | [done] frame, header, nav, mobile menu, rail, footer |
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
| "(opens in a new tab)" added to the names of external links (rail, footer) | copy | `layout.newTab` (`{label}`) | [done] |
| Ruler letters A–L | decor | `RULER_COLUMNS` in `PageFrame.tsx` | [done] |

### G1 · Header and navigation — `src/widgets/header` [done]

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Monogram initials "DB" | data | `siteConfig.author.initials` | [done] |
| Monogram accessible name "DB — Dmytro Bondar, home" | copy + data | `layout.monogram.label` (`{initials}`, `{name}` ← `siteConfig.author`) | [done] |
| Sheet label "Codex · Rev. B" | copy + data | `layout.header.sheetLabel` (`{revision}` ← `siteConfig.revision`) | [done] |
| Navigation name "Primary" and items Home / Work / About | data + copy | sections, routes and folios in `src/shared/config/navigation.ts`; titles `layout.nav.{label,home,work,about}` (shared with the mobile menu) | [done]. No counters, no Contact item |
| Language switch name "Language", items EN / FR | copy + data | `layout.locale.label`; items from `routing.locales` (`src/shared/i18n`) | [done] (`src/features/switch-locale`) |
| "Let's talk" | copy | `layout.header.letsTalk`; links to `#contact` | [done]. The target section is not built yet |
| ⌘K trigger | copy | — | [todo] with the command palette (M8) |
| Menu button (tablet, phone) | copy | `layout.menu.open`; rendered by `src/widgets/mobile-menu` in the header's `menu` slot | [done] |

### G1 · Mobile menu — `src/widgets/mobile-menu` [done]

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Dialog name "Menu", label "Codex · Index", close button "Close menu" | copy | `layout.menu.{label,heading,close}` | [done] |
| Sections Home / Work / About | data + copy | `src/shared/config/navigation.ts`; `layout.nav.*` | [done] |
| Folio numbers "FOL. 01–03" | decor (`aria-hidden`) | `navigation[].folio`, formatted in `MobileMenu.tsx` | [done] |
| Language switch | — | `src/features/switch-locale` (as in the header) | [done] |
| "Let's talk" | copy | `layout.header.letsTalk`; links to `#contact` | [done]. The target section is not built yet |

### G2 · Social rail — `src/widgets/social-rail` [done]

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Landmark name "Links", group name "Social links" | copy | `layout.rail.{label,group}` | [done] |
| GitHub link (new tab) | data + copy | `siteConfig.links.github`; tooltip `layout.rail.github`, name `layout.newTab` | [done] |
| LinkedIn link (new tab) | data + copy | `siteConfig.links.linkedin`; tooltip `layout.rail.linkedin`, name `layout.newTab` | [done] |
| Email (`mailto:`) | data + copy | `siteConfig.links.email`; `layout.rail.email` | [done] |
| CV (PDF), downloads | data + file + copy | `siteConfig.links.cv` → `public/cv.pdf`; name `layout.rail.cv`, tooltip `layout.rail.cvTip` | [done] |
| "Scroll · Fol. 01 — 04" | copy (decor, `aria-hidden`) | `layout.rail.scroll` | [done] |

### G3 · Contact section (Fol. 04) [todo]

Not part of the layout for now (decided 2026-11-21). The form is M7.

### G4 · Footer stamp — `src/widgets/footer-stamp` [done]

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Landmark name "Title block" | copy | `layout.footer.label` | [done] |
| Cell labels Drawn by / Role / Rev. / Location / Source | copy | `layout.footer.{drawnBy,role,rev,location,source}` | [done] |
| Author name | data | `siteConfig.author.name` | [done] |
| Role "Frontend / Fullstack" | copy | `layout.footer.roleValue` | [done] |
| Revision "B · 2026" | data | `siteConfig.revision`; `siteConfig.revisionYear` = the year of the build | [done] |
| Location "Toronto, ON" | copy | `layout.footer.locationValue` | [done] |
| Source link "GitHub ↗" (new tab) | data + copy | `siteConfig.links.source`; `layout.footer.sourceLink` (the ↗ is decor in the component), name `layout.newTab` | [done] |
| Status "Open for work" / "Say hello" | data + copy | `siteConfig.available`; `layout.footer.status.{available,unavailable}` | [done] |
| "Let's talk" cell | copy | `layout.footer.letsTalk`; links to `#contact` | [done]. The target section is not built yet |

### G5 · Command palette [todo]

Deferred (M8).
