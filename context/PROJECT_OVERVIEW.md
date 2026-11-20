# PROJECT_OVERVIEW.md — Codex Portfolio

> Personal portfolio of **Dmytro Bondar**, Frontend / Fullstack Developer (Toronto, ON).
> Theme **"Codex"**: the site is a Renaissance engineer's notebook. Every section is a folio (_Fol._), every project is a _tavola_ (_Tav._) drawn as an exploded view.
>
> Related docs:
>
> - `context/DESIGN.md`: UI Kit (tokens, components, states). The visual source of truth.
> - Claude project "Portfolio": `concept-codex.md` (concept), `sitemap.md` (pages and content), `codex.css` (kit stylesheet), `shadcn-components.md`.
> - UI Kit canvas: https://claude.ai/artifact/9nbNbHQVbXt4z57ZGH443K
>
> Status markers: **[chosen]** decided · **[proposed]** recommended, waiting for confirmation · **[open]** under discussion, see §10.

---

## 1. Goals

- Show real commercial work (multi-brand iGaming monorepo, AngularJS → Vue migration, pet projects) as readable case studies.
- Make it easy to contact me: a contact form on every page, plus a copyable email address, CV, LinkedIn and GitHub.
- The site is itself a portfolio piece: an accessible, fast, tested codebase with a strict design system and FSD architecture.

**Audience:** recruiters, hiring managers and tech leads (mostly in Canada), and freelance clients.

**Targets:** LCP < 2.5 s · CLS < 0.1 · WCAG 2.2 AA · works without JS for reading content.

---

## 2. Scope (MVP)

Pages (details in `sitemap.md`):

| Route                   | Page                     | Notes                                                                                   |
| ----------------------- | ------------------------ | --------------------------------------------------------------------------------------- |
| `/[locale]`             | Home                     | Hero (Fol. 01), Featured work (3 × Tav.), What I do, Experience (spec table + timeline) |
| `/[locale]/work`        | Work                     | All tavole, filter chips, grid/list toggle                                              |
| `/[locale]/work/[slug]` | Work detail (case study) | Spec table, Task / Solution / Result, gallery, code, prev/next                          |
| `/[locale]/about`       | About                    | Skills / Experience / Education                                                         |
| `*`                     | 404                      | Empty state                                                                             |

Global on every page: header and navigation, social rail, contact form (Fol. 04), footer stamp, EN | FR language switch, ⌘K command palette.

- **One theme only (Paper).** There is no dark "Notte" theme and no theme switch. [chosen]
- Languages: **EN** (default) and **FR**. Every piece of copy exists in both. [chosen]

---

## 3. Tech stack

| Layer                  | Choice                                                                                                        | Status     | Notes                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Language               | TypeScript (strict)                                                                                           | [chosen]   |                                                                                                                                                                             |
| Framework              | **Next.js (App Router)**, React 19                                                                            | [chosen]   | All pages prerendered (SSG). One server action handles the contact form.                                                                                                    |
| Primitives             | **Base UI** (`@base-ui/react`)                                                                                | [chosen]   | Headless and accessible. Components Base UI lacks (command palette, carousel) are not critical: we build them later on Base UI primitives, with no extra libraries for now. |
| Styling                | Plain CSS: `codex.css` tokens + `cx-` classes, CSS Modules for page layout, `clsx`                            | [chosen]   | No Tailwind. Every value comes from DESIGN.md (see §6).                                                                                                                     |
| Icons                  | `lucide-react`, stroke 1.6                                                                                    | [chosen]   |                                                                                                                                                                             |
| Fonts                  | `next/font/google` (self-hosted): Space Grotesk, Hanken Grotesk, IBM Plex Mono, EB Garamond Italic            | [chosen]   | No layout shift, no external requests. EB Garamond still needs final approval.                                                                                              |
| Code highlighting      | Shiki at build time, theme mapped to the kit's `.tk-*` classes                                                | [chosen]   |                                                                                                                                                                             |
| i18n                   | **`next-intl`**: `/en` and `/fr` locale routing, messages in JSON                                             | [chosen]   |                                                                                                                                                                             |
| Content                | Typed TS data + `next-intl` messages. No MDX, no CMS                                                          | [chosen]   | Every page follows a fixed template. See §5.                                                                                                                                |
| Forms                  | React Hook Form + zod (`@hookform/resolvers`)                                                                 | [chosen]   | The same zod schema validates on the client and on the server.                                                                                                              |
| Email                  | Resend + React Email                                                                                          | [proposed] | Two emails: a notification to me and an auto-reply to the sender.                                                                                                           |
| Spam protection        | Honeypot + time trap + zod limits (field lengths, number of links); Cloudflare Turnstile only if spam appears | [chosen]   | No external services. See §7.                                                                                                                                               |
| Unit / component tests | Vitest + Testing Library + `vitest-axe`                                                                       | [chosen]   |                                                                                                                                                                             |
| API mocking            | MSW                                                                                                           | [chosen]   | Form success and error states in tests.                                                                                                                                     |
| E2E                    | Playwright + `@axe-core/playwright` + screenshot tests for kit states                                         | [chosen]   |                                                                                                                                                                             |
| Lint / format          | ESLint (flat config) + Prettier · Stylelint · **Steiger** (FSD linter)                                        | [chosen]   |                                                                                                                                                                             |
| Package manager        | pnpm                                                                                                          | [chosen]   | Strict dependencies: only what `package.json` declares can be imported.                                                                                                     |

**Not in the project (decided):** database, TanStack Query, dark theme, MDX.
**Not now:** env validation, git hooks (Lefthook).
**Not discussed yet:** hosting, CI, analytics, SEO.

---

## 4. Architecture — Feature-Sliced Design

### 4.1 Next.js and FSD together

The Next.js `app/` router lives in the **repo root** and only re-exports FSD pages. FSD lives in `src/`. An empty root `pages/` folder (with a README) stops Next.js from treating `src/pages` as the Pages Router.

```
/
├─ app/                         # Next.js routing only (thin)
│  ├─ [locale]/
│  │  ├─ layout.tsx            → src/app/layouts
│  │  ├─ page.tsx              → export { HomePage as default } from '@/pages/home'
│  │  ├─ work/page.tsx         → @/pages/work
│  │  ├─ work/[slug]/page.tsx  → @/pages/work-detail
│  │  └─ about/page.tsx        → @/pages/about
│  └─ not-found.tsx
├─ pages/README.md              # empty on purpose (see above)
├─ messages/                    # all copy: en.json, fr.json (next-intl)
├─ public/                      # cv.pdf, static images, favicons
├─ context/DESIGN.md
└─ src/
   ├─ app/        # providers (i18n, toast), global styles, layouts
   ├─ pages/      # home, work, work-detail, about, not-found
   ├─ widgets/    # composed page blocks
   ├─ features/   # user actions
   ├─ entities/   # business entities
   └─ shared/     # ui kit, config, lib, api, i18n
```

### 4.2 Slice map

| Layer      | Slices                                                                                                                                                                                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `widgets`  | `header`, `mobile-menu`, `social-rail`, `hero`, `featured-work`, `services` (What I do), `experience` (spec table + trace), `work-grid`, `case-study`, `contact-section`, `footer-stamp`, `command-palette`, `drawing-layer` (grid, "+", marginalia — decorative) |
| `features` | `send-message` (contact form + server action), `copy-email`, `switch-locale`, `filter-work`, `toggle-work-view`                                                                                                                                                   |
| `entities` | `project` (Tav.), `experience` (job / education entry), `tech` (stack item + tooltip text)                                                                                                                                                                        |
| `shared`   | `ui` (Base UI wrappers styled with `cx-`), `styles` (`codex.css`, fonts), `config` (site config: availability status, links, email), `lib`, `api` (email client), `i18n`                                                                                          |

### 4.3 Rules

- Imports go only downward: `app → pages → widgets → features → entities → shared`. Slices on the same layer never import each other.
- Each slice exposes a public API through `index.ts`. No deep imports. This is enforced by Steiger and ESLint.
- Server-only code (Resend, secrets) lives in `*.server.ts` files and is marked with `import 'server-only'`.
- Components are Server Components by default. `'use client'` only where there is interaction (form, palette, toggles, carousel).

---

## 5. Content

All content lives in git. There is no CMS, no database and no MDX: every page, case studies included, follows a fixed template built from kit components. Content is split into **data** (language-independent) and **copy** (translated):

| What                                                                                                     | Format                       | Where                                 |
| -------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------- |
| Project data: slug, Tav. number, type, year, stack, `featured`, links, images, metrics                   | Typed TS objects             | `entities/project/model`              |
| Experience and education data: company, dates, city, format, stack                                       | Typed TS objects             | `entities/experience/model`           |
| Site config: availability, email, social links, CV path                                                  | TS                           | `shared/config`                       |
| All copy: UI strings, section headings, project titles, Task / Solution / Result texts, job descriptions | JSON messages, keyed by slug | `messages/{en,fr}.json` (`next-intl`) |

```ts
// entities/project/model/projects.ts
export const projects = [
  {
    slug: 'innopharma-migration',
    tav: 'III',
    type: 'fullstack',
    year: 2023,
    stack: ['Vue', 'TypeScript', 'Docker'],
    featured: true,
  },
] as const satisfies Project[];

// copy: messages/en.json → projects.innopharma-migration.{title, task, solution, result}
```

- A single page template (`pages/work-detail`) renders every case study from its data and its messages.
- `featured: true` puts a project on the Home page (currently Tav. I Soft2Bet multi-brand platform, Tav. II Life Focus Tree, Tav. III AngularJS → Vue migration at Innopharma). The same list drives the Work grid, the command palette and prev/next pagination.
- Rich text inside messages (bold, links) uses `t.rich` with tags mapped to kit elements.
- Concept rule: brands (how many, multi-branding, the "brand template") are **not** mentioned in the hero or in the illustration callouts. They may appear in a case study.

---

## 6. Styling: codex.css on Base UI

- `codex.css` is imported once, globally, in `src/app`. `shared/ui` components render Base UI parts with `cx-` classes. Pages never restyle components (DESIGN.md §0).
- **State mapping:** Base UI exposes state through ARIA attributes and `data-*` attributes. Many kit selectors already match the ARIA ones (`aria-pressed`, `aria-checked`, `aria-selected`, `aria-expanded`, `aria-current`). Where the kit relies on native pseudo-classes or `.is-*` classes, add aliases for the Base UI attributes (e.g. `[data-checked]`, `[data-disabled]`, `[data-highlighted]`, `[data-popup-open]`) to the **same declarations**, without restyling. Example: Base UI Checkbox renders `role="checkbox"`, not a native `<input>`, so `.cx-check:checked` won't match (DESIGN.md §9.10). Check the rendered DOM before you wire anything up.
- Single theme: tokens live in `:root` only.
- Overlays use the kit's motion: 160 ms, 8px offset + fade. Use Base UI `data-starting-style` / `data-ending-style` for enter and exit. Respect `prefers-reduced-motion`.

---

## 7. Contact form flow

1. The client renders `features/send-message`: RHF + `contactSchema` (zod). Fields: name, email, request type (Job offer / Freelance / Question / Other), message with a counter, optional consent, a hidden honeypot field and a hidden render timestamp.
2. Submit calls a server action. Spam checks run first: if the honeypot is filled, or the form was submitted less than 3 s after render, the server returns a fake success and sends nothing. Then `contactSchema.safeParse`, which also caps field lengths and the number of links in the message.
3. Resend sends a notification to me (with reply-to set to the sender) and an auto-reply to the sender in their locale.
4. The UI shows each state: submitting (Spinner in the button, form disabled) → success Alert, or error Alert with the email as a fallback link. Field errors appear under the field with the `ERR —` prefix.
5. Copying the email triggers a Toast: "Email copied".

---

## 8. Environment variables

| Name                   | Where  | Purpose                      |
| ---------------------- | ------ | ---------------------------- |
| `RESEND_API_KEY`       | server | Email sending                |
| `CONTACT_TO_EMAIL`     | server | Inbox for notifications      |
| `CONTACT_FROM_EMAIL`   | server | Verified sender on my domain |
| `NEXT_PUBLIC_SITE_URL` | client | Absolute URLs                |

---

## 9. Quality

- **Unit / component (Vitest):** zod schemas, formatters, every `shared/ui` component (states and a11y), the contact form with MSW.
- **E2E (Playwright):** navigation in both locales, language switch, ⌘K palette, contact form happy path and error paths, 404. Run axe on every page. Screenshot tests at 1440 / 768 / 375.
- **Lint:** ESLint + Prettier for TS/TSX, Stylelint for CSS, Steiger for FSD boundaries.
- **Accessibility:** skip link; focus-visible = the kit's dashed sanguine line; touch targets 44px; decorative layer is `aria-hidden`.

Scripts (planned, run with pnpm): `dev` · `build` · `start` · `typecheck` · `lint` · `lint:fsd` · `lint:css` · `test` · `test:e2e`.

---

## 10. Open decisions

1. **Email provider:** Resend (proposed).
2. Fifth font (EB Garamond Italic) for marginalia.
3. Hero illustration mechanism, and whether to include a portrait.
