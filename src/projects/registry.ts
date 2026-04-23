import type { ProjectDef } from './types'
import { ISOCOURT_PROJECT_SLUG, isocourtProjectDef } from './isocourt/project'
import { uiExperimentsProjectDef } from './ui-experiments/project'

/**
 * Code-defined projects. Optional Airtable `Projects` rows (same `Slug`) merge in `ProjectContext` for
 * the hub and voting. Prefer `npm run lab:new-project` to scaffold a new folder, then add themes in
 * `getKitsFor*Project` and on Analyze / Live pages.
 */
export const PROJECTS: ProjectDef[] = [isocourtProjectDef, uiExperimentsProjectDef]

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}

export const DEFAULT_PROJECT_SLUG = ISOCOURT_PROJECT_SLUG

export const BUILTIN_PROJECT_SLUGS: readonly string[] = [ISOCOURT_PROJECT_SLUG]

export function isBuiltinProjectSlug(slug: string) {
  return BUILTIN_PROJECT_SLUGS.includes(slug)
}
