import type { PanelComment } from '@/lib/panelFeedbackStorage'
import { createRecord, deleteRecord, escapeFormulaString, listRecords } from './request'
import { TABLE_PANE_COMMENTS } from './config'

type Row = { ProjectSlug?: string; PaneId?: string; Text?: string }

const filter = (projectSlug: string, paneId: string) => {
  const p = projectSlug.toLowerCase()
  const d = paneId.toLowerCase()
  return `AND(LOWER({ProjectSlug})="${escapeFormulaString(p)}", LOWER({PaneId})="${escapeFormulaString(d)}")`
}

export async function listPaneComments(projectSlug: string, paneId: string): Promise<PanelComment[]> {
  const { records } = await listRecords<Row>(TABLE_PANE_COMMENTS, filter(projectSlug, paneId))
  return records.map((r) => ({
    id: r.id,
    text: String(r.fields.Text ?? ''),
    at: r.createdTime ?? new Date().toISOString(),
  }))
}

export async function addPaneComment(projectSlug: string, paneId: string, text: string) {
  const p = projectSlug.toLowerCase()
  const d = paneId.toLowerCase()
  await createRecord<Row>(TABLE_PANE_COMMENTS, { ProjectSlug: p, PaneId: d, Text: text })
}

export async function deletePaneComment(airtableRecordId: string) {
  await deleteRecord(TABLE_PANE_COMMENTS, airtableRecordId)
}
