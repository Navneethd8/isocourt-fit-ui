/**
 * IsoCourt project (self-contained)
 *
 * - `project.ts` — registry metadata + `ISOCOURT_PROJECT_SLUG`
 * - `kits.ts` — `getKitsForIsocourtProject` (product column + shared shelf)
 * - `libraries/current-site` — the shipped isocourt.fit design kit
 * - `styles/surface.css`, `kit-override.css` — imported from `src/main.tsx` (see hiccup note there)
 */
export { ISOCOURT_PROJECT_SLUG, isocourtProjectDef } from './project'
export { getKitsForIsocourtProject } from './kits'
