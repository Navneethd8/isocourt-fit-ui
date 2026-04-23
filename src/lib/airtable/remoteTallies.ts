import { createRecord, deleteRecord, escapeFormulaString, listRecords, updateRecord } from './request'
import { TABLE_PANE_TALLIES } from './config'

export type TallyRow = { ProjectSlug?: string; PaneId?: string; Likes?: number; Dislikes?: number }

/** Match project+pane case-insensitively so legacy rows (mixed case) still resolve to one record. */
const formula = (projectSlug: string, paneId: string) => {
  const p = projectSlug.toLowerCase()
  const d = paneId.toLowerCase()
  return `AND(LOWER({ProjectSlug})="${escapeFormulaString(p)}", LOWER({PaneId})="${escapeFormulaString(d)}")`
}

const inflight = new Map<string, Promise<{ id: string; likes: number; dislikes: number }>>()

export async function getTally(
  projectSlug: string,
  paneId: string,
): Promise<{ id: string; likes: number; dislikes: number }> {
  const p = projectSlug.toLowerCase()
  const d = paneId.toLowerCase()
  const key = `${p}\0${d}`
  const existing = inflight.get(key)
  if (existing) return existing
  const promise = getTallyBody(p, d).finally(() => {
    inflight.delete(key)
  })
  inflight.set(key, promise)
  return promise
}

async function getTallyBody(
  projectSlug: string,
  paneId: string,
): Promise<{ id: string; likes: number; dislikes: number }> {
  const { records } = await listRecords<TallyRow>(TABLE_PANE_TALLIES, formula(projectSlug, paneId))
  if (records.length === 0) {
    const created = await createRecord<TallyRow>(TABLE_PANE_TALLIES, {
      ProjectSlug: projectSlug,
      PaneId: paneId,
      Likes: 0,
      Dislikes: 0,
    })
    return { id: created.id, likes: 0, dislikes: 0 }
  }
  if (records.length > 1) {
    return mergeTallyDuplicateRows(projectSlug, paneId, records)
  }
  const r = records[0]!
  const f = r.fields
  return {
    id: r.id,
    likes: Math.max(0, Number(f.Likes ?? 0) || 0),
    dislikes: Math.max(0, Number(f.Dislikes ?? 0) || 0),
  }
}

async function mergeTallyDuplicateRows(
  projectSlug: string,
  paneId: string,
  records: { id: string; fields: TallyRow }[],
): Promise<{ id: string; likes: number; dislikes: number }> {
  let likes = 0
  let dislikes = 0
  for (const r of records) {
    likes += Math.max(0, Number(r.fields.Likes ?? 0) || 0)
    dislikes += Math.max(0, Number(r.fields.Dislikes ?? 0) || 0)
  }
  const keep =
    records.find(
      (r) =>
        (r.fields.ProjectSlug ?? '').toLowerCase() === projectSlug &&
        (r.fields.PaneId ?? '').toLowerCase() === paneId,
    ) ?? records[0]!
  await updateRecord<Partial<TallyRow>>(TABLE_PANE_TALLIES, keep.id, {
    ProjectSlug: projectSlug,
    PaneId: paneId,
    Likes: likes,
    Dislikes: dislikes,
  })
  for (const r of records) {
    if (r.id !== keep.id) await deleteRecord(TABLE_PANE_TALLIES, r.id)
  }
  return { id: keep.id, likes, dislikes }
}
