import { ISOCOURT_PROJECT_SLUG, getKitsForIsocourtProject } from './projects/isocourt'
import { getKitsForUiExperimentsProject, UI_EXPERIMENTS_PROJECT_SLUG } from './projects/ui-experiments'
import { DEFAULT_PROJECT_SLUG } from './projects/registry'
import type { UiKit } from './kitModel'

export type { UiKit } from './kitModel'

const KIT_RESOLVERS: Record<string, () => UiKit[]> = {
  [UI_EXPERIMENTS_PROJECT_SLUG]: getKitsForUiExperimentsProject,
  [ISOCOURT_PROJECT_SLUG]: getKitsForIsocourtProject,
}

/**
 * Which `UiKit[]` columns exist for a project: add a `getKitsFor*Project` in `src/projects/<slug>/kits.ts`
 * and register it in `KIT_RESOLVERS` here. New projects return `[]` until you add themes. IsoCourt
 * (and any project you like) can spread in shared shelf kits from `./projects/shared/shelfKits`.
 */
export function getKitsForProject(projectSlug: string): UiKit[] {
  return KIT_RESOLVERS[projectSlug]?.() ?? []
}

/** @deprecated Use getKitsForProject with active project from context. */
export const kits: UiKit[] = getKitsForProject(DEFAULT_PROJECT_SLUG)

export function orderKitsById(visibleIds: string[], allKits: UiKit[]) {
  return visibleIds
    .map((id) => allKits.find((k) => k.id === id))
    .filter((k): k is UiKit => k != null)
}
