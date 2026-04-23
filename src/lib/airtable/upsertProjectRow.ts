import { isAirtableEnabled, TABLE_PROJECTS } from './config'
import {
  createRecord,
  deleteRecord,
  escapeFormulaString,
  listRecords,
  updateRecord,
} from './request'

type Row = { Name?: string; Slug?: string; Description?: string }

/** Create or update the Projects row for this slug (dedupes by LOWER(Slug)). */
export async function upsertProjectRow(args: { name: string; slug: string; description: string }) {
  if (!isAirtableEnabled()) {
    return
  }
  const fields = { Name: args.name, Slug: args.slug, Description: args.description }
  const formula = `LOWER({Slug})="${escapeFormulaString(args.slug)}"`
  const { records } = await listRecords<Row>(TABLE_PROJECTS, formula, 20)
  if (records.length === 0) {
    await createRecord(TABLE_PROJECTS, fields)
    return
  }
  const keep = records[0]!
  for (const r of records) {
    if (r.id !== keep.id) {
      await deleteRecord(TABLE_PROJECTS, r.id)
    }
  }
  await updateRecord<Partial<Row>>(TABLE_PROJECTS, keep.id, fields)
}
