import type { ProjectDef } from '@/projects/types'
import { mergeRemoteProjectRecords } from './ensureProjects'
import { escapeFormulaString, listRecords } from './request'
import { TABLE_PROJECTS } from './config'

type Row = { Name?: string; Slug?: string; Description?: string }

/**
 * Fetches project rows. Field names: Name, Slug, Description. Slugs are normalized to lowercase;
 * duplicate rows for the same slug (casing or accidents) are collapsed to one.
 */
export async function listRemoteProjects(): Promise<ProjectDef[]> {
  const { records } = await listRecords<Row>(TABLE_PROJECTS)
  return mergeRemoteProjectRecords(records)
}

export async function findProjectBySlug(slug: string): Promise<ProjectDef | null> {
  const s = slug.trim().toLowerCase()
  if (!s) return null
  const { records } = await listRecords<Row>(
    TABLE_PROJECTS,
    `LOWER({Slug})="${escapeFormulaString(s)}"`,
  )
  if (records.length === 0) return null
  const merged = mergeRemoteProjectRecords(records)
  return merged[0] ?? null
}
