import type { ProjectDef } from '../types'

/** Single source of truth for this project’s URL slug. */
export const ISOCOURT_PROJECT_SLUG = 'isocourt' as const

/**
 * Code registry row for IsoCourt. Airtable `Projects` rows with the same `Slug` merge into the nav.
 * @see getKitsForIsocourtProject in ./kits.ts
 */
export const isocourtProjectDef: ProjectDef = {
  id: ISOCOURT_PROJECT_SLUG,
  slug: ISOCOURT_PROJECT_SLUG,
  name: 'IsoCourt',
  description:
    'Product skin (isocourt.fit) as a first-class column plus shared design kits for comparison.',
}
