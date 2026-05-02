/** Official SWECC design-system theme panes (primitives + tokens from the eight-theme reference). */
export const SWECC_DS_KIT_IDS = new Set([
  'swecc-ds-hacker-purple',
  'swecc-ds-gold-rush',
  'swecc-ds-pacific-dawn',
  'swecc-ds-whiteboard',
  'swecc-ds-terminal-green',
  'swecc-ds-campus-day',
  'swecc-ds-neon-noir',
  'swecc-ds-graphite-pro',
])

export function sweccDsThemeSlug(kitId: string): string | null {
  if (!SWECC_DS_KIT_IDS.has(kitId)) return null
  return kitId.replace(/^swecc-ds-/, '')
}
