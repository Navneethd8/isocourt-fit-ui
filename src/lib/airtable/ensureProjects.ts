import { PROJECTS } from '@/projects/registry'
import { createRecord, deleteRecord, escapeFormulaString, listRecords, updateRecord } from './request'
import { TABLE_PROJECTS } from './config'
import type { ProjectDef } from '@/projects/types'
import { normalizeProjectPaneKey } from './slug'

type Row = { Name?: string; Slug?: string; Description?: string }

function projectsWithDuplicateSlugFilter(slug: string) {
  return `LOWER({Slug})="${escapeFormulaString(slug)}"`
}

/**
 * Ensures the built-in registry (e.g. IsoCourt) has exactly one row per slug in Airtable.
 * Creates missing rows; removes extra duplicate rows (same slug, different casing or accidental dupes).
 */
export async function ensureBuiltInProjectRows() {
  for (const p of PROJECTS) {
    const canonical = p.slug
    const { records } = await listRecords<Row>(TABLE_PROJECTS, projectsWithDuplicateSlugFilter(canonical))
    if (records.length === 0) {
      await createRecord<Row>(TABLE_PROJECTS, {
        Name: p.name,
        Slug: canonical,
        Description: p.description,
      })
      continue
    }
    const keep =
      records.find((r) => (r.fields.Slug ?? '').trim() === canonical) ?? records[0]!
    if (records.length > 1) {
      for (const r of records) {
        if (r.id !== keep.id) await deleteRecord(TABLE_PROJECTS, r.id)
      }
    }
    const f = keep.fields
    const atSlug = normalizeProjectPaneKey(String(f.Slug ?? ''))
    if (atSlug !== canonical) {
      await updateRecord<Partial<Row>>(TABLE_PROJECTS, keep.id, { Slug: canonical })
    }
  }
}

/**
 * Dedupe and normalize remote project list (slug casing, duplicate Airtable rows).
 */
export function mergeRemoteProjectRecords(records: { id: string; fields: Row; createdTime?: string }[]) {
  const bySlug = new Map<string, ProjectDef>()
  for (const r of records) {
    const raw = (r.fields.Slug ?? '').trim()
    if (!raw) continue
    const slug = raw.toLowerCase()
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug) || slug.length > 64) continue
    if (bySlug.has(slug)) continue
    bySlug.set(slug, {
      id: slug,
      slug,
      name: (r.fields.Name ?? slug).trim() || slug,
      description: (r.fields.Description ?? '').toString().trim() || 'From Airtable',
    } satisfies ProjectDef)
  }
  return [...bySlug.values()]
}
