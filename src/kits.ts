import { ISOCOURT_PROJECT_SLUG, getKitsForIsocourtProject } from './projects/isocourt'
import { getSharedShelfKits } from './projects/shared/shelfKits'
import { DEFAULT_PROJECT_SLUG } from './projects/registry'
import type { UiKit } from './kitModel'

export type { UiKit } from './kitModel'

const KIT_RESOLVERS: Record<string, () => UiKit[]> = {
  [ISOCOURT_PROJECT_SLUG]: getKitsForIsocourtProject,
}

/**
 * Which `UiKit[]` columns exist for a project: add a resolver in `KIT_RESOLVERS` per product,
 * or fall back to the shared shelf only.
 */
export function getKitsForProject(projectSlug: string): UiKit[] {
  return KIT_RESOLVERS[projectSlug]?.() ?? getSharedShelfKits()
}

/** @deprecated Use getKitsForProject with active project from context. */
export const kits: UiKit[] = getKitsForProject(DEFAULT_PROJECT_SLUG)

export function orderKitsById(visibleIds: string[], allKits: UiKit[]) {
  return visibleIds
    .map((id) => allKits.find((k) => k.id === id))
    .filter((k): k is UiKit => k != null)
}
