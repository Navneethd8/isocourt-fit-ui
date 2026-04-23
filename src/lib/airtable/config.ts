/**
 * Airtable: create a base with tables documented in the inline comments here and in .env.example.
 * Never commit secrets; the PAT in Vite is visible in the client bundle (fine for a personal base with scoped token).
 */
export const AIRTABLE_API = 'https://api.airtable.com/v0'

export function isAirtableEnabled() {
  return Boolean(import.meta.env.VITE_AIRTABLE_PAT && import.meta.env.VITE_AIRTABLE_BASE_ID)
}

export function airtablePat() {
  return import.meta.env.VITE_AIRTABLE_PAT as string | undefined
}

export function airtableBaseId() {
  return import.meta.env.VITE_AIRTABLE_BASE_ID as string | undefined
}

export const TABLE_PROJECTS = (import.meta.env.VITE_AIRTABLE_TABLE_PROJECTS as string) || 'Projects'
export const TABLE_PANE_TALLIES = (import.meta.env.VITE_AIRTABLE_TABLE_PANE_TALLIES as string) || 'PaneTallies'
export const TABLE_PANE_COMMENTS = (import.meta.env.VITE_AIRTABLE_TABLE_PANE_COMMENTS as string) || 'PaneComments'
export const TABLE_EXPERIMENTS = (import.meta.env.VITE_AIRTABLE_TABLE_EXPERIMENTS as string) || 'Experiments'
