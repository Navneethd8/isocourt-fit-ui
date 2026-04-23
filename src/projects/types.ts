export type ProjectDef = {
  /** Stable id (matches Airtable Slug when synced). */
  id: string
  /** URL-safe key; also used in `ProjectSlug` in Airtable. */
  slug: string
  name: string
  description: string
  /**
   * When `true`, the workbench exposes Analyze + Live (IsoCourt-shaped sample routes). New scaffolds set
   * `false`; omit on Airtable-only rows → treated as kits-only.
   */
  labSampleFlows?: boolean
}

export function projectSupportsSampleFlows(project: ProjectDef | undefined): boolean {
  return project?.labSampleFlows === true
}
