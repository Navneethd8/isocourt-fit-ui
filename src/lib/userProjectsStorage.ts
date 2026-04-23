import type { ProjectDef } from '@/projects/types'

const STORAGE_KEY = 'ui-lab-user-projects'
const CHANGED = 'ui-lab-user-projects-changed'

function readRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function sanitizeEntry(x: unknown): ProjectDef | null {
  if (!x || typeof x !== 'object') return null
  const o = x as Record<string, unknown>
  const slug = String(o.slug ?? '')
    .trim()
    .toLowerCase()
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug) || slug.length > 64) return null
  const name = String(o.name ?? slug).trim() || slug
  const description = String(o.description ?? '').trim()
  return { id: slug, slug, name, description }
}

export function loadUserProjects(): ProjectDef[] {
  try {
    const raw = readRaw()
    if (!raw) return []
    const p = JSON.parse(raw) as unknown
    if (!Array.isArray(p)) return []
    return p.map(sanitizeEntry).filter((e): e is ProjectDef => e != null)
  } catch {
    return []
  }
}

export function saveUserProjects(projects: ProjectDef[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    window.dispatchEvent(new CustomEvent(CHANGED))
  } catch {
    /* ignore */
  }
}

export function subscribeUserProjects(fn: () => void) {
  const h = () => fn()
  window.addEventListener(CHANGED, h)
  window.addEventListener('storage', h)
  return () => {
    window.removeEventListener(CHANGED, h)
    window.removeEventListener('storage', h)
  }
}
