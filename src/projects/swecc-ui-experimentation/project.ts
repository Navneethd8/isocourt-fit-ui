import type { ProjectDef } from '../types'

export const SWECC_UI_EXPERIMENTATION_PROJECT_SLUG = "swecc-ui-experimentation" as const

/**
 * Registry row. Airtable "Projects" rows with the same Slug merge in the app nav. Add
 * a getKitsFor*Project in kits.ts when you have theme columns to ship. Set labSampleFlows: true
 * here if you want /analyze and /live for this slug (IsoCourt uses them).
 */
export const sweccUiExperimentationProjectDef: ProjectDef = {
  id: SWECC_UI_EXPERIMENTATION_PROJECT_SLUG,
  slug: SWECC_UI_EXPERIMENTATION_PROJECT_SLUG,
  name: "SWECC UI Experimentation",
  description: "UI lab project — add page themes in code.",
  labSampleFlows: false,
}
