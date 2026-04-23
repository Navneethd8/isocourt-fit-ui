/**
 * One-off: verify Airtable PAT + base + table names from .env (Vite-style vars).
 * Run: node scripts/verify-airtable.mjs
 * Does not print secrets. Tests read on all tables, then create+delete a tally row.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const envPath = path.join(root, '.env')

function loadEnv() {
  if (!fs.existsSync(envPath)) {
    console.error('Missing .env at', envPath)
    process.exit(1)
  }
  const env = {}
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i === -1) continue
    const k = t.slice(0, i).trim()
    let v = t.slice(i + 1).trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
      v = v.slice(1, -1)
    env[k] = v
  }
  return env
}

const env = loadEnv()
const pat = env.VITE_AIRTABLE_PAT
const baseId = env.VITE_AIRTABLE_BASE_ID
if (!pat || !baseId) {
  console.error('Need VITE_AIRTABLE_PAT and VITE_AIRTABLE_BASE_ID in .env')
  process.exit(1)
}

const tProjects = env.VITE_AIRTABLE_TABLE_PROJECTS || 'Projects'
const tTallies = env.VITE_AIRTABLE_TABLE_PANE_TALLIES || 'PaneTallies'
const tComments = env.VITE_AIRTABLE_TABLE_PANE_COMMENTS || 'PaneComments'

const api = 'https://api.airtable.com/v0'
const auth = { Authorization: `Bearer ${pat}` }

async function getJson(url) {
  const r = await fetch(url, { headers: auth })
  const text = await r.text()
  let j
  try {
    j = text ? JSON.parse(text) : {}
  } catch {
    j = { raw: text }
  }
  return { ok: r.ok, status: r.status, j }
}

async function listTable(name) {
  const u = `${api}/${encodeURIComponent(baseId)}/${encodeURIComponent(name)}?maxRecords=1`
  return getJson(u)
}

async function createTally() {
  const u = `${api}/${encodeURIComponent(baseId)}/${encodeURIComponent(tTallies)}`
  const body = {
    fields: {
      ProjectSlug: '__ui_lab_verify__',
      PaneId: '__verify__',
      Likes: 0,
      Dislikes: 0,
    },
  }
  const r = await fetch(u, { method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const text = await r.text()
  const j = text ? JSON.parse(text) : {}
  return { ok: r.ok, status: r.status, j }
}

async function deleteRecord(table, id) {
  const u = `${api}/${encodeURIComponent(baseId)}/${encodeURIComponent(table)}/${encodeURIComponent(id)}`
  const r = await fetch(u, { method: 'DELETE', headers: auth })
  return { ok: r.ok, status: r.status }
}

function summarizeRecordFields(j) {
  const r = j.records?.[0]
  if (!r) return '(no rows)'
  return Object.keys(r.fields || {}).join(', ') || '(empty fields)'
}

// Token sanity: list bases the PAT can access
const who = await getJson('https://api.airtable.com/v0/meta/bases')
if (who.ok) {
  const ids = (who.j.bases || []).map((b) => b.id)
  const hit = ids.includes(baseId)
  console.log('Airtable verification')
  console.log('  PAT: lists bases — OK, token is valid. Base in list:', hit ? 'yes' : 'NO (wrong base id or not shared to token)')
  if (!hit) {
    if (who.j.bases?.length) {
      const names = who.j.bases.map((b) => `${b.id} (${b.name || '?'})`).join('\n     ')
      console.log('  Bases this token can access (set VITE_AIRTABLE_BASE_ID to one of these app… ids):\n     ' + names)
    } else {
      console.log('  This PAT returns zero bases. In https://airtable.com/create/tokens open the token and under')
      console.log('  "Access" add your base (or workspace), with at least: data.records:read, data.records:write,')
      console.log('  and schema.bases:read. Save, then re-run this script.')
    }
  }
} else {
  const err = who.j.error?.type || 'ERR'
  console.log('Airtable verification')
  console.log('  ✗ Token cannot list bases (HTTP', who.status, ') —', err, who.j.error?.message || '')
  console.log('  Fix: In airtable.com/create/tokens, enable scope "data: read" and add this base, or re-create the PAT.')
}

console.log('  Base id in .env:', baseId, who.ok && !who.j.bases?.map((b) => b.id).includes(baseId) ? '← not in your accessible bases' : '')

const tables = [
  [tProjects, 'Projects (list)'],
  [tTallies, 'PaneTallies (list)'],
  [tComments, 'PaneComments (list)'],
]
let fail = false
for (const [name, label] of tables) {
  const { ok, status, j } = await listTable(name)
  if (ok) {
    console.log(`  ✓ ${label} HTTP ${status}, sample fields: ${summarizeRecordFields(j)}`)
  } else {
    fail = true
    const err = j.error?.type || j.error || j.raw || 'unknown'
    const msg = j.error?.message || JSON.stringify(j).slice(0, 200)
    console.log(`  ✗ ${label} HTTP ${status} —`, err, msg)
  }
}

if (!fail) {
  const { ok, status, j } = await createTally()
  if (ok && j.id) {
    const d = await deleteRecord(tTallies, j.id)
    if (d.ok) {
      console.log('  ✓ PaneTallies create + delete (write access OK, test row removed)')
    } else {
      console.log('  ⚠ Tally test record created; delete failed HTTP', d.status, '(remove row __ui_lab_verify__ manually in Airtable if needed)')
    }
  } else {
    const msg = j.error?.message || JSON.stringify(j)
    console.log('  ✗ PaneTallies create failed HTTP', status, '—', msg)
    if (j.error) fail = true
  }
}

process.exit(fail ? 1 : 0)
