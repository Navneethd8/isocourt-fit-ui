import type { ProjectDef } from '../types'

export const UI_EXPERIMENTS_PROJECT_SLUG = "ui-experiments" as const

/**
 * Registry row. Airtable "Projects" rows with the same Slug merge in the app nav. Add
 * a getKitsFor*Project in kits.ts when you have theme columns to ship.
 */
export const uiExperimentsProjectDef: ProjectDef = {
  id: UI_EXPERIMENTS_PROJECT_SLUG,
  slug: UI_EXPERIMENTS_PROJECT_SLUG,
  name: "UIExperiments",
  description: "Build the UI for this site (this lab) — design surfaces and flow experiments.",
  labSampleFlows: false,
}
