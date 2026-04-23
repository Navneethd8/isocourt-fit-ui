import type { ProjectDef } from './types'
import { ISOCOURT_PROJECT_SLUG, isocourtProjectDef } from './isocourt/project'

/**
 * Built-in projects (code). User + Airtable rows are merged in `ProjectContext`.
 * To add a product: create `projects/<slug>/`, export `projectDef` + `getKitsFor*`, then register here and in `src/kits.ts` `KIT_RESOLVERS`.
 */
export const PROJECTS: ProjectDef[] = [isocourtProjectDef]

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}

export const DEFAULT_PROJECT_SLUG = ISOCOURT_PROJECT_SLUG

export const BUILTIN_PROJECT_SLUGS: readonly string[] = [ISOCOURT_PROJECT_SLUG]

export function isBuiltinProjectSlug(slug: string) {
  return BUILTIN_PROJECT_SLUGS.includes(slug)
}
