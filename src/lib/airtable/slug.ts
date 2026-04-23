/** Text fields on Airtable records: compare and normalize with lowercase. */
export function normalizeProjectPaneKey(s: string) {
  return s.trim().toLowerCase()
}
