#!/usr/bin/env node
/**
 * Scaffold a new lab project: `src/projects/<slug>/`, registry + KIT_RESOLVER (empty kit list),
 * and upsert a row in Airtable `Projects` when VITE_AIRTABLE_* is in `.env`.
 *
 * Usage: npm run lab:new-project -- <slug> [--name "Display name"] [--description "..."]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadLabEnv } from './load-lab-env.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

function toPascal(slug) {
  return slug
    .split(/-+/g)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join('')
}

function toCamel(pascal) {
  return pascal.length === 0 ? '' : pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

const slugConst = (slug) =>
  `${slug
    .split(/-+/g)
    .filter(Boolean)
    .map((p) => p.toUpperCase())
    .join('_')}_PROJECT_SLUG`

function escapeAirtableFormulaString(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

/**
 * @param {object} p
 * @param {string} p.pat
 * @param {string} p.baseId
 * @param {string} p.table
 * @param {string} p.name
 * @param {string} p.description
 * @param {string} p.slug
 */
async function upsertProjectInAirtable(p) {
  const { pat, baseId, table, name, description, slug } = p
  const pathBase = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`
  const filter = `LOWER({Slug})="${escapeAirtableFormulaString(slug.toLowerCase())}"`
  const listUrl = new URL(pathBase)
  listUrl.searchParams.set('filterByFormula', filter)
  listUrl.searchParams.set('maxRecords', '1')
  const h = {
    Authorization: `Bearer ${pat}`,
    'Content-Type': 'application/json',
  }
  const j = await fetch(listUrl.toString(), { headers: h })
  if (!j.ok) throw new Error(`Airtable list Projects ${j.status}: ${await j.text()}`)
  const { records = [] } = (await j.json()) ?? {}
  const fields = { Name: name, Slug: slug, Description: description }
  const rec = records[0]
  if (rec?.id) {
    const r = await fetch(`${pathBase}/${encodeURIComponent(rec.id)}`, {
      method: 'PATCH',
      headers: h,
      body: JSON.stringify({ fields }),
    })
    if (!r.ok) throw new Error(`Airtable update Projects ${r.status}: ${await r.text()}`)
  } else {
    const r = await fetch(pathBase, { method: 'POST', headers: h, body: JSON.stringify({ fields }) })
    if (!r.ok) throw new Error(`Airtable create Projects ${r.status}: ${await r.text()}`)
  }
}

function writeTree(slug, { pascal, camel, constname, name, description }) {
  const dir = path.join(root, 'src/projects', slug)
  if (fs.existsSync(dir)) {
    throw new Error(`Folder already exists: src/projects/${slug}`)
  }
  const getKits = `getKitsFor${pascal}Project`
  const projectFs = `import type { ProjectDef } from '../types'

export const ${constname} = ${JSON.stringify(slug)} as const

/**
 * Registry row. Airtable "Projects" rows with the same Slug merge in the app nav. Add
 * a getKitsFor*Project in kits.ts when you have theme columns to ship. Set labSampleFlows: true
 * here if you want /analyze and /live for this slug (IsoCourt uses them).
 */
export const ${camel}ProjectDef: ProjectDef = {
  id: ${constname},
  slug: ${constname},
  name: ${JSON.stringify(name)},
  description: ${JSON.stringify(description)},
  labSampleFlows: false,
}
`
  const kitsFs = `import type { UiKit } from '@/kitModel'

/** Add page themes and shared columns here. Starts empty. */
export function ${getKits}(): UiKit[] {
  return []
}
`
  const indexFs = `export { ${constname}, ${camel}ProjectDef } from './project'
export { ${getKits} } from './kits'
`
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'project.ts'), projectFs, 'utf8')
  fs.writeFileSync(path.join(dir, 'kits.ts'), kitsFs, 'utf8')
  fs.writeFileSync(path.join(dir, 'index.ts'), indexFs, 'utf8')
}

function wireRegistry(slug, { camel, constname }) {
  const regPath = path.join(root, 'src/projects/registry.ts')
  let t = fs.readFileSync(regPath, 'utf8')
  if (t.includes(`'./${slug}/project'`)) {
    throw new Error(`Project "${slug}" is already registered.`)
  }
  const newImport = `import { ${camel}ProjectDef } from './${slug}/project'\n`
  t = t.replace("import { ISOCOURT_PROJECT_SLUG, isocourtProjectDef } from './isocourt/project'\n", (m) => m + newImport)
  t = t.replace(
    /export const PROJECTS: ProjectDef\[] = \[([^\]]*)\]/,
    (full, inner) => {
      if (inner.includes(`${camel}ProjectDef`)) return full
      const b = String(inner)
        .trim()
        .replace(/,\s*$/, '')
      return `export const PROJECTS: ProjectDef[] = [${b}, ${camel}ProjectDef]`
    },
  )
  fs.writeFileSync(regPath, t, 'utf8')
}

function wireKits(slug, pascal) {
  const getKits = `getKitsFor${pascal}Project`
  const c = slugConst(slug)
  const kpath = path.join(root, 'src/kits.ts')
  let t = fs.readFileSync(kpath, 'utf8')
  if (t.includes(`'./projects/${slug}'`)) {
    throw new Error('slug already in kits.ts')
  }
  const newImport = `import { ${getKits}, ${c} } from './projects/${slug}'\n`
  t = t.replace(
    "import { ISOCOURT_PROJECT_SLUG, getKitsForIsocourtProject } from './projects/isocourt'\n",
    (m) => m + newImport,
  )
  t = t.replace(
    /const KIT_RESOLVERS: Record<string, \(\) => UiKit\[]\> = \{/,
    (m) => m + `\n  [${c}]: ${getKits},`,
  )
  fs.writeFileSync(kpath, t, 'utf8')
}

async function main() {
  const args = process.argv.slice(2)
  let name = ''
  let description = ''
  const pos = []
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--name' && args[i + 1]) {
      name = args[++i]
    } else if (args[i] === '--description' && args[i + 1]) {
      description = args[++i]
    } else {
      if (args[i] !== undefined) pos.push(args[i])
    }
  }
  const slug = (pos[0] || '').trim().toLowerCase()
  if (!slug) {
    console.error('Usage: npm run lab:new-project -- <slug> [--name "Name"] [--description "…"]')
    process.exit(1)
  }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug) || slug.length > 64) {
    console.error('Invalid slug. Use lowercase letters, numbers, and hyphens (max 64 chars).')
    process.exit(1)
  }

  const pascal = toPascal(slug)
  const camel = toCamel(pascal)
  const constname = slugConst(slug)
  const displayName = name.trim() || slug
  const desc = (description.trim() || 'UI lab project — add page themes in code.').replace(/\r?\n/g, ' ')

  writeTree(slug, { pascal, camel, constname, name: displayName, description: desc })
  wireRegistry(slug, { camel, constname })
  wireKits(slug, pascal)

  const env = loadLabEnv(root)
  const pat = env.VITE_AIRTABLE_PAT
  const baseId = env.VITE_AIRTABLE_BASE_ID
  const table = (env.VITE_AIRTABLE_TABLE_PROJECTS && String(env.VITE_AIRTABLE_TABLE_PROJECTS)) || 'Projects'

  if (pat && baseId) {
    try {
      await upsertProjectInAirtable({ pat, baseId, table, name: displayName, description: desc, slug })
      console.log('Airtable: Projects row upserted.')
    } catch (e) {
      console.warn('Airtable upsert failed (scaffold is on disk):', e instanceof Error ? e.message : e)
    }
  } else {
    console.log('Skipped Airtable (set VITE_AIRTABLE_PAT + VITE_AIRTABLE_BASE_ID in .env to upsert a Projects row).')
  }

  console.log(`Created src/projects/${slug}/ and wired registry + kits. Empty kit list until you add themes.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
