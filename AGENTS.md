# UI lab: agent workflow

## New project (blank themes)

1. In this package: `npm run lab:new-project -- <slug> [--name "Name"] [--description "…"]`
2. This creates `src/projects/<slug>/` (`project.ts`, `kits.ts`, `index.ts` with an **empty** `getKitsFor*Project()`), registers the project, and, if `VITE_AIRTABLE_PAT` and `VITE_AIRTABLE_BASE_ID` are in `.env`, upserts a row in the Airtable **Projects** table.
3. Add design themes as you go: **Analyze** and **Live** (and the kit shelf) are page-level; extend `getKitsFor*Project` and the shared shelf under `src/projects/shared/` as needed, following **IsoCourt** as the reference.
4. Push the UI to production so others can use Airtable tallies to vote on directions.

The web app is not an admin surface for “creating” projects: projects are **yours in git**. Airtable is for **feedback and experiments** on the designs you ship.
