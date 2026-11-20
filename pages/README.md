# pages/ — intentionally empty

This folder exists so that Next.js does **not** treat `src/pages` (the FSD _pages_ layer)
as the Pages Router. Routing lives in the root `app/` folder, which only re-exports
FSD pages from `src/pages`. Do not add files here.
