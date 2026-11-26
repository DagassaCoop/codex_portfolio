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
| **Site data** (one language) | Author name and initials, revision and its year, availability, email, social links, CV path, source repo, site URL, the author's stack | `src/shared/config/site.ts` (`siteConfig`) |
| **Project data** | Slug, Tav. number, direction, status, years, company and country, stack, `featured`, links | `src/entities/project/model` |
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
| `home` | Home page (`src/pages/home`): `home.hero`, `home.work`, `home.services`, `home.experience` | [done] (the contact section is G3, M7) |
| `projectsPage` | Projects page (`src/pages/projects`): `projectsPage.meta`, `projectsPage.intro`, `projectsPage.notebook` (`.slider`: tablets and phones) | [done] |
| `contact` | The contact section and form (`src/widgets/contact-section`) | [done] |
| `experience` | Job and study copy by id: `experience.<id>.{role,points}` (`src/entities/experience`) | [done] |
| `projects` | Project copy by slug: the card's `projects.<slug>.{domain,label,title,summary}` (`src/entities/project`), the notebook's `{fig,task,role,contribution,impact,challenge,stack}` (`src/pages/projects`) | [done] all seven projects |
| `projectCard` | The project card's own strings (`personal`, `showStack`) | [done] |

---

## 2. Pages

| Route | Page | Sections | Status |
| --- | --- | --- | --- |
| `/[locale]` | Home | Hero (Fol. 01), Selected work (Fol. 02, 3 × Tav.), What I do (Fol. 03r), Experience (Fol. 03v) | [done] (M3), see §4 |
| `/[locale]/projects` | Projects | Fol. 02 index of tavole; the notebook (Fol. 02.1) | [in progress] (M4), see §5. No case-study pages (M5 dropped 2026-11-26) |
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
| Navigation name "Primary" and items Home / Projects / About | data + copy | sections, routes and folios in `src/shared/config/navigation.ts`; titles `layout.nav.{label,home,projects,about}` (shared with the mobile menu) | [done]. No counters, no Contact item |
| Language switch name "Language", items EN / FR | copy + data | `layout.locale.label`; items from `routing.locales` (`src/shared/i18n`) | [done] (`src/features/switch-locale`) |
| "Let's talk" | copy | `layout.header.letsTalk`; links to `#contact` | [done]. The target section is not built yet |
| ⌘K trigger | copy | — | [todo] with the command palette (M8) |
| Menu button (tablet, phone) | copy | `layout.menu.open`; rendered by `src/widgets/mobile-menu` in the header's `menu` slot | [done] |

### G1 · Mobile menu — `src/widgets/mobile-menu` [done]

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Dialog name "Menu", label "Codex · Index", close button "Close menu" | copy | `layout.menu.{label,heading,close}` | [done] |
| Sections Home / Projects / About | data + copy | `src/shared/config/navigation.ts`; `layout.nav.*` | [done] |
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

### G3 · Contact section (Fol. 04) — `src/widgets/contact-section` [done] (form; email delivery is M7 stage 2)

On every page, after the page's own sections (`LocaleLayout`). Copy from the Home design.

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Folio "Fol. 04", sheet label "Contact · Colophon", heading "Let’s build the next one.", lead | copy | `contact.{folio,sheet,title,lead}` | [done] |
| Email to copy, "COPY" (name "Copy email address"), toast "Copied" | data + copy | `siteConfig.links.email`; `contact.email.{label,copy,copyLabel,copied,copyFailed}`; toast dismiss `layout.toast.dismiss` | [done] |
| "CV · PDF ↓", "LinkedIn ↗", "GitHub ↗" (Mono buttons; profiles open in a new tab) | data + copy | `siteConfig.links.{cv,linkedin,github}`; `contact.links.*`, names `layout.newTab` | [done] |
| Form fields: Name, Email, Message with a counter, optional consent (no request type: removed 2026-11-23) | copy + schema | `contact.form.*`; rules in `model/contactSchema.ts` | [done] |
| Field errors ("Tell me how to address you." …), with limits | copy | `contact.form.errors.<key>` (`{max}`), keys from the schema | [done] |
| Honeypot label (hidden) | copy | `contact.form.honeypot` | [done] |
| "Send message" / "Sending…", failure alert with the email, success "Message sent" + "Send another message" | copy + data | `contact.form.{submit,sending,failed,sent}`; the email from `siteConfig.links.email` | [done] |

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
| Blank last cell, hatched like a disabled button | decor (`aria-hidden`) | `FooterStamp.tsx` | [done]. Replaced the "Let’s talk" cell and its status on 2026-11-26 (copy `layout.footer.{status,letsTalk}` removed) |

### G5 · Command palette [todo]

Deferred (M8).

---

## 4. Home (`src/pages/home`)

### Fol. 01 · Hero — `src/pages/home/ui/hero` [done]

Copy is taken from the Home design for now; it will be rewritten (decided 2026-11-21).

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Folio "Fol. 01", sheet label "Frontispiece · Home" | copy | `home.hero.{folio,sheet}` | [done] |
| Cursor coordinates "X 0412 · Y 0288" | decor (`aria-hidden`), live | `components/cursor-coordinates` | [done] |
| h1: the author's name (screen readers; the drawing shows it) | data | `siteConfig.author.name` | [done] |
| Constructed name drawing (outlines, construction lines, dimensions in real px) | decor (`aria-hidden`), labels not translated | `components/constructed-name` (outlines in `constructedName.paths.ts`), live px in its `components/name-dimensions` | [done] |
| Role "Frontend & Fullstack developer" | copy | `home.hero.role` | [done] |
| Dimension "520 PX" | decor | `Hero.tsx` | [done] |
| Lead | copy | `home.hero.lead` | [done]. ⚠ mentions brands (PROJECT_OVERVIEW.md §5 concept rule); to be rewritten |
| Badges "Available for work" / "Not available", "Toronto, ON · UTC−5" | data + copy | `siteConfig.available`; `home.hero.{available,unavailable,location}` | [done] |
| "View work" → `#work`, "Download CV" → `siteConfig.links.cv` | copy + data | `home.hero.{viewWork,downloadCv}` | [done]. `#work` is built later in M3 |
| Marginalia "— ogni marca, una sola macchina." | decor (Italian, `aria-hidden`), not translated | `MARGINALIA` in `Hero.tsx` | [done] |
| Rota drawing: part titles, descriptions, ring labels, stamps, `aria-label` | copy (all but the Italian marginalia and caption) | `home.hero.rota.{label,hub,stamp,ring.*,parts.*.{title,description,tags}}`; numbers and geometry in `components/rota/Rota.tsx`, path data in `rota.paths.ts` | [done]. Descriptions break lines at `\n`. A line must fit ~21 characters (186 units beside the circles), so the FR copy is shortened ("DONNÉES", "SQL · REQ. / LIGNES") |
| Rota marginalia "mozzo cavo — qui passa l’asse" and caption "Fig. 1 — Rota: …" | decor (Italian), not translated | `HUB_NOTE`, `CAPTION` in `components/rota/Rota.tsx` | [done] |

### Fol. 02 · Selected work — `src/pages/home/ui/selected-work` [done]

Copy is taken from the Home design for now, like the hero's.

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Folio "Fol. 02", sheet label "Work · Tav. I — III of III" | copy + data | `home.work.{folio,sheet}`; first and last featured tavola and the total from `projects` (`src/entities/project`), in Roman numerals | [done]. "of VII": all seven projects are in the data |
| Heading "Selected work" | copy | `home.work.title` | [done] |
| "All work" → `/projects`, Primary button | copy | `home.work.allWork` | [done] |
| Featured projects, in tavola order | data | `projects` with `featured: true` (`src/entities/project/model/projects.ts`) | [done] Tav. I–III |
| Card: tag "TAV. I", years "2025—26", company, stack | data | `tav`, `years`, `company`, `stack` | [done]. Tag and foot upper-case |
| Card caption: the project's domain ("IGAMING") over the preview | copy | `projects.<slug>.domain` (upper-cased by the card) | [done]. ⚠ Drafted by the AI, check: "iGaming", "Personal productivity", "Pharma · Lab software" |
| Card: label, title, summary | copy | `projects.<slug>.{label,title,summary}` | [done]. ⚠ Tav. I mentions the brand count (PROJECT_OVERVIEW.md §5 concept rule) |
| Card foot for a project without a company: "Personal" | copy | `projectCard.personal` | [done] |
| Stack "…" button name "Show all 5 technologies" (tablets, when the stack would wrap) | copy | `projectCard.showStack` (`{count}`) | [done] |
| Card link → the case study | data | `/work/<slug>`, on the title, stretched over the card | [done]. ⚠ Still points to `/work/<slug>` (404); moves to the project's notebook page in M4 stage 4 (case studies dropped). The link's name is the title |
| Card previews (stacked plates, radial tree, AngularJS → Vue) | decor (`aria-hidden`), labels not translated | `src/entities/project/ui/project-card/components/project-preview` | [done]. ⚠ Tav. I draws "×5" (concept rule). Tav. IV–VII have no drawing yet: hatched placeholder (`TODO(design)`) |

### Fol. 03r · What I do — `src/pages/home/ui/services` [done]

Copy is taken from the Home design for now, like the sections above.

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Folio "Fol. 03r", sheet label "Practice · 3 directions" | copy | `home.services.{folio,sheet}` (`{count}`: the number of directions) | [done] |
| Heading "What I do" | copy | `home.services.title` | [done] |
| Dimension "3 DIRECTIONS · 1 ENGINEER" | copy (decor, `aria-hidden`) | `home.services.dimension` (`{count}`) | [done] |
| Directions: numeral (I–III), "Dir. 01", title, text, tags | copy | order in `Services.tsx` (`DIRECTIONS`); `home.services.direction` (`{number}`); `home.services.directions.<key>.{title,text,tags}` (`tags` is an array, read with `t.raw`) | [done] architecture, product, fullstack |
| Stack: label, main (outline badges), others | data + copy | `siteConfig.stack.{main,other}`; `home.services.stack.{label,main,other}` (`main` / `other` name the two lists for screen readers) | [done] |

### Fol. 03v · Experience — `src/pages/home/ui/experience` [done]

Copy is taken from the Home design for now, like the sections above.

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Folio "Fol. 03v", sheet label "Experience · 2018 — 2026" | copy + data | `home.experience.{folio,sheet}`; the years are the first start and the last end in `experience` | [done] |
| Heading "Where I’ve built" | copy | `home.experience.title` | [done] |
| "About me" → `/about` (Primary button) | copy | `home.experience.about` | [done]. The About page is M6 (404 until then) |
| Spec sheet: headers, row labels and values, the note under "Countries worked in" | copy | `home.experience.spec.{spec,value}`, `home.experience.spec.rows.<key>.{label,value,note}`; row order and the accent row in `SpecTable.tsx` | [done]. Values are copy, not computed. ⚠ "Production brands, one codebase: 5" (concept rule covers only the hero and illustrations) |
| Spec sheet caption "Tav. — specifica dell’autore" | decor (Italian), not translated | `CAPTION` in `SpecTable.tsx` | [done] |
| "Your team?" with "Let’s talk ↗" → `#contact`, year "next" | copy | `home.experience.next.{year,title,link}` | [done]. `#contact` is M7 |
| Jobs and studies: company, dates, place, format, employment, stack | data | `experience` (`src/entities/experience/model/experience.ts`) | [done] six entries |
| Role, what was done | copy | `experience.<id>.{role,points}` (`points` is an array, read with `t.raw`) | [done] |
| Years "2025—26", period "Oct 2025 — Nov 2026", duration "1 yr 2 mos" | data, formatted | `formatYears` (`shared/lib/years`), `formatPeriod` (month names from `Intl` in the page's locale), `duration` (both ends included); units `home.experience.{years,months}` | [done] |
| Format "On-site" / "Hybrid" / "Remote", employment, "Education" | copy | `home.experience.{format,employment,education}` | [done] |

---

## 5. Projects (`src/pages/projects`)

Projects page design on the canvas (`project/Projects.dc.html`, variant F · Notebook; `ProjectsNotebook*.dc.html`). Copy is taken from the design for now.

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| `<title>` "Projects — Dmytro Bondar" | copy | `projectsPage.meta.title` | [done] |

### Fol. 02 · Index of tavole — `src/pages/projects/ui/intro` [done]

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Folio "Fol. 02", sheet label "Opera · Index of tavole" | copy | `projectsPage.intro.{folio,sheet}` | [done] |
| Breadcrumb "Codex / Fol. 02 · Projects" (name "Breadcrumb") | copy | `projectsPage.intro.breadcrumb.{label,root,current}` | [done] |
| h1 "Projects" | copy | `projectsPage.intro.title` | [done] |
| Dimension "07 TAVOLE · 2020 — 2026" | copy + data (decor, `aria-hidden`) | `projectsPage.intro.dimension` (`{count}`, `{first}`, `{last}` ← `projects`) | [done] |
| Lead and body | copy | `projectsPage.intro.{lead,body}` | [done]. ⚠ Both say "Seven" / "six years" in words, and the body mentions five brands; update them when projects change |
| Numbers: tavole, commercial, personal, countries (list name "In numbers") | data + copy | counted from `projects` (`company`, `country`); captions `projectsPage.intro.stats.*` | [done] |
| Marginalia "— ogni tavola, un problema risolto." | decor (Italian, `aria-hidden`), not translated | `MARGINALIA` in `Intro.tsx` | [done] |
| Legend head "Legend · 4 directions", "Tav. count" (decor) | copy | `projectsPage.intro.legend.{title,count}` | [done] |
| Directions: letter (decor), title, text, count ("01"; screen readers hear "1 project") | data + copy | order and letters in `Legend.tsx` (`DIRECTIONS`); `projectsPage.intro.legend.directions.<direction>.{title,text}`; count from `projects[].direction`, `legend.countLabel` | [done] |
| Status key "In progress — still being drawn", "Draft — on the drawing board" | copy | `projectsPage.intro.legend.status.{label,wip,draft}` | [done] |

### Fol. 02.1 · Notebook — `src/pages/projects/ui/notebook` [done]

Desktop: a spread per project with a 3D page turn (`components/notebook-spread`, client), contents and title page on the first spread. Tablets and phones (≤ 1024px): one page at a time (`components/notebook-slider`, client), swipe and Prev / Next, project details in a dialog. CSS switches the two at 1024px.

| Content | Kind | Where | Status |
| --- | --- | --- | --- |
| Folio "Fol. 02.1", sheet label, h2 "Turn the pages", marginalia (decor) | copy | `projectsPage.notebook.{folio,sheet,title,marginalia}` | [done] |
| Section role "notebook" (screen readers) | copy | `projectsPage.notebook.roledescription` | [done] |
| Folios "fol. 3v", "fol. 4r" on the pages and in the contents | decor (`aria-hidden`), not translated | `leftFolio` / `rightFolio` in `Notebook.tsx` | [done] |
| Contents: "Contents", "Projects I — VII", rows "Project II · title · fol. 3v" (buttons), the note (decor) | copy + data | `projectsPage.notebook.contents.*`, `project.tag`; titles `projects.<slug>.title` | [done] |
| Title page: label, compass drawing (decor), "Projects / I — VII", subtitle, text, signature | copy + data | `projectsPage.notebook.titlePage.*`; range from `projects`, name `siteConfig.author.name` | [done]. ⚠ "Seven projects" is written in words |
| Left page: "Project II", "Commercial" / "Personal" | copy + data | `projectsPage.notebook.project.{tag,commercial,personal}`; commercial = has a `company` | [done] |
| Figure: the drawing, the status badge ("In progress" / "Draft"), caption "Fig. II — a tree from one root" | data + copy | `ProjectPreview` (`src/entities/project`); `status`; `projectsPage.intro.legend.status.*.badge`; `project.fig` + `projects.<slug>.fig` | [done]. Tav. IV–VII hatched (no drawing yet) |
| Stack: "Stack", "11 technologies", groups and items | copy | `project.{stack,stackCount}`; `projects.<slug>.stack` (array of `{label, items}`, read with `t.raw`; items are mostly tech names, the same in EN and FR) | [done] |
| Right page: "Direction" / "Domain" and their values, outlined numeral (decor) | copy | `project.{direction,domain}`; `projects.<slug>.{label,domain}` | [done] |
| Title (h3), task | copy | `projects.<slug>.{title,task}` | [done] |
| "01 · Role" (role + contribution), "02 · Impact", "03 · Challenge" | copy | `project.{role,impact,challenge}`; `projects.<slug>.{role,contribution,impact,challenge}` | [done] |
| Links "Live product" / "Live demo" / "GitHub" (new tab) | data + copy | `projects[].links` (`kind`, `href`); `projectsPage.notebook.links.<kind>`, name `layout.newTab` | [done] Tav. VI only. ⚠ TODO(content): URLs of Tav. I, II, IV, V |
| No link: "Internal product · no public link", "Not built yet" | data + copy | `projects[].linkNote`; `projectsPage.notebook.linkNotes.<note>` | [done] Tav. III, VII |
| Draft: "Have a club? Let’s talk →" → `#contact` | copy | `projectsPage.notebook.draftCta`; shown when `status` is `draft` | [done] |
| Controls: group "Turn pages", Prev / Next, counter "Project II of VII · fol. 3v — fol. 4r", Contents | copy | `projectsPage.notebook.controls.{label,prev,next,contents,counterContents,counterProject}` | [done] |
| Announcement after a turn "Spread 3 of 8: Project II, Life Focus Tree" (live region) | copy | `projectsPage.notebook.controls.{announceContents,announceProject}` | [done] |
| Tablets / phones: sheet label "one page per project", marginalia "— swipe left or right, or use the buttons" | copy | `projectsPage.notebook.slider.{sheet,marginalia}` | [done] |
| Slider: group "Projects notebook" (role "swipeable notebook"), contents h3 "All projects" with rows "II · title →" | copy + data | `projectsPage.notebook.slider.{label,roledescription,contentsTitle}`; numerals and titles from `projects` | [done] |
| Slide card: "Project II", numeral (decor), title, drawing + status badge, task | copy + data | as on the spread (`project.tag`, `projects.<slug>.{title,task}`, `status`) | [done] |
| "Details" (name "Open details: Life Focus Tree"), counter "Project II of VII" / "Contents", announcement "Project II of VII: Life Focus Tree" | copy | `projectsPage.notebook.slider.{details,detailsLabel,counterContents,counterProject,announceProject}`; Prev / Next / Contents from `controls` | [done] |
| Details dialog: label "Project II · Personal", title, close "Close details"; body and links as on the spread | copy | `project.{tag,commercial,personal}`, `projects.<slug>.title`, `projectsPage.notebook.slider.close` | [done] |
