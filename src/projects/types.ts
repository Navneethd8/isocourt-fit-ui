export type ProjectDef = {
  /** Stable id (matches Airtable Slug when synced). */
  id: string
  /** URL-safe key; also used in `ProjectSlug` in Airtable. */
  slug: string
  name: string
  description: string
}
