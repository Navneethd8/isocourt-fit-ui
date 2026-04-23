import { isAirtableEnabled } from './airtable/config'
import { upsertProjectRow } from './airtable/upsertProjectRow'
import { loadUserProjects, saveUserProjects } from './userProjectsStorage'

const ACTIVE_KEY = 'ui-lab-active-project'

export type CreateLabProjectResult =
  | { kind: 'scaffolded'; slug: string }
  | { kind: 'browserOnly'; slug: string }
  | { kind: 'error'; message: string }

/**
 * - **Dev (npm run dev):** writes `src/projects/<slug>/` via the Vite server, syncs Airtable if configured, then
 *   navigates to the kit shelf (full reload).
 * - **Production / preview:** no on-disk files — caller should `addUserProject` and route (Airtable still synced if configured).
 */
export async function createLabProject(input: { slug: string; name: string; description: string }): Promise<CreateLabProjectResult> {
  const slug = input.slug.trim().toLowerCase()
  const name = input.name.trim()
  const description = input.description.trim()
  const display = name || slug
  const desc = description || 'Local experiment project'

  if (import.meta.env.DEV) {
    const r = await fetch('/__api/lab-scaffold', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, name, description }),
    })
    const j = (await r.json()) as { ok?: boolean; error?: string }
    if (!j.ok) {
      return { kind: 'error', message: j.error ?? 'Could not create project files.' }
    }
  }

  if (isAirtableEnabled()) {
    try {
      await upsertProjectRow({ name: display, slug, description: desc })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Airtable request failed'
      if (import.meta.env.DEV) {
        return {
          kind: 'error',
          message:
            `Airtable sync failed (${msg}). Project files may already be on disk — fix .env and try again, or run verify:airtable.`,
        }
      }
      return { kind: 'error', message: msg }
    }
  }

  if (import.meta.env.DEV) {
    try {
      const pruned = loadUserProjects().filter((p) => p.slug !== slug)
      saveUserProjects(pruned)
    } catch {
      /* ignore */
    }
    try {
      localStorage.setItem(ACTIVE_KEY, slug)
    } catch {
      /* ignore */
    }
    window.location.assign(`/projects/${slug}/kits`)
    return { kind: 'scaffolded', slug }
  }

  return { kind: 'browserOnly', slug }
}
