import { AIRTABLE_API, airtableBaseId, airtablePat } from './config'

export type AirtableRecord<T> = { id: string; fields: T; createdTime?: string }

type AirtableListResponse<T> = { records: AirtableRecord<T>[] }

function authHeaders() {
  const t = airtablePat()
  if (!t) throw new Error('Airtable not configured')
  return {
    Authorization: `Bearer ${t}`,
    'Content-Type': 'application/json',
  } as const
}

function tablePath(tableName: string) {
  const b = airtableBaseId()
  if (!b) throw new Error('Airtable base id missing')
  return `${AIRTABLE_API}/${encodeURIComponent(b)}/${encodeURIComponent(tableName)}`
}

export function escapeFormulaString(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

export async function listRecords<T extends Record<string, unknown>>(
  tableName: string,
  filterByFormula?: string,
  maxRecords: number = 100,
): Promise<AirtableListResponse<T>> {
  const u = new URL(tablePath(tableName))
  if (filterByFormula) u.searchParams.set('filterByFormula', filterByFormula)
  u.searchParams.set('maxRecords', String(Math.min(100, Math.max(1, maxRecords))))
  const r = await fetch(u.toString(), { headers: authHeaders() })
  if (!r.ok) {
    const err = await r.text()
    throw new Error(`Airtable list ${tableName} ${r.status}: ${err}`)
  }
  return (await r.json()) as AirtableListResponse<T>
}

export async function createRecord<T extends Record<string, unknown>>(tableName: string, fields: T) {
  const r = await fetch(tablePath(tableName), {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ fields }),
  })
  if (!r.ok) {
    const err = await r.text()
    throw new Error(`Airtable create ${tableName} ${r.status}: ${err}`)
  }
  return (await r.json()) as { id: string; fields: T }
}

export async function updateRecord<T extends Record<string, unknown>>(
  tableName: string,
  recordId: string,
  fields: Partial<T>,
) {
  const r = await fetch(`${tablePath(tableName)}/${encodeURIComponent(recordId)}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ fields }),
  })
  if (!r.ok) {
    const err = await r.text()
    throw new Error(`Airtable patch ${tableName} ${r.status}: ${err}`)
  }
  return (await r.json()) as { id: string; fields: T }
}

export async function deleteRecord(tableName: string, recordId: string) {
  const r = await fetch(`${tablePath(tableName)}/${encodeURIComponent(recordId)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!r.ok) {
    const err = await r.text()
    throw new Error(`Airtable delete ${tableName} ${r.status}: ${err}`)
  }
}
