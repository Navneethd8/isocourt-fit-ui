/**
 * File-system scaffold for a new `src/projects/<slug>/` module. Used by the Vite dev server only
 * (see `dev/vite-lab-scaffold-plugin.ts`), not the browser.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/
const RESERVED = new Set(['isocourt', 'shared'])

/**
 * @param {object} opts
 * @param {string} [opts.root]  repo root (default: one level above `dev/`)
 * @param {string} opts.slug
 * @param {string} opts.name
 * @param {string} [opts.description]
 * @returns {{ ok: true } | { ok: false, error: string }}
 */
export function scaffoldLabProject({ root = path.join(__dirname, '..'), slug, name, description }) {
  if (!slug || !SLUG_RE.test(slug) || slug.length > 64) {
    return { ok: false, error: 'Invalid slug: use lowercase letters, numbers, and hyphens (1–64 chars).' }
  }
  if (RESERVED.has(slug)) {
    return { ok: false, error: `The slug “${slug}” is reserved.` }
  }
  const pascal = toPascal(slug)
  const getKits = `getKitsFor${pascal}Project`
  const C = slugToConst(slug)
  const def = projectDefName(slug)
  const displayName = (name && name.trim()) || pascal
  const desc = (description && description.trim()) || `Lab project (slug: ${slug}). Add a product kit under libraries/.`
  const projDir = path.join(root, 'src', 'projects', slug)

  if (fs.existsSync(projDir)) {
    return { ok: false, error: `A folder already exists at src/projects/${slug}/.` }
  }
  const regPath = path.join(root, 'src', 'projects', 'registry.ts')
  const kitsPath = path.join(root, 'src', 'kits.ts')
  if (fs.readFileSync(regPath, 'utf8').includes(`'./${slug}/project'`)) {
    return { ok: false, error: 'That slug is already registered in registry.' }
  }
  if (fs.readFileSync(kitsPath, 'utf8').includes(`'./${slug}/'`)) {
    return { ok: false, error: 'That slug is already referenced in src/kits.ts.' }
  }
  const importReg = `import { ${C}, ${def} } from './${slug}/project'`

  write(
    path.join(projDir, 'project.ts'),
    `import type { ProjectDef } from '../types'

export const ${C} = '${esc(slug)}' as const

export const ${def}: ProjectDef = {
  id: ${C},
  slug: ${C},
  name: '${esc(displayName)}',
  description: '${esc(desc)}',
}
`,
  )
  write(
    path.join(projDir, 'kits.ts'),
    `import { getSharedShelfKits } from '../shared/shelfKits'
import type { UiKit } from '@/kitModel'

/** Add a product column under \`libraries/<kit>/\` (see \`isocourt\`), then prepend here. */
export function ${getKits}(): UiKit[] {
  return getSharedShelfKits()
}
`,
  )
  write(
    path.join(projDir, 'index.ts'),
    `/**
 * ${displayName}
 * - \`project.ts\` — \`${C}\` + \`${def}\`
 * - \`kits.ts\` — \`${getKits}()\`
 * - \`libraries/\` — product kit, mirror isocourt’s \`libraries/current-site\`
 */
export { ${C}, ${def} } from './project'
export { ${getKits} } from './kits'
`,
  )
  write(
    path.join(projDir, 'libraries', 'README.md'),
    'Add a kit here like `../isocourt/libraries/current-site`, then re-export and wire `kits.ts`.\n',
  )

  const reg0 = wireRegistry({ reg: fs.readFileSync(regPath, 'utf8'), importReg, def, C })
  fs.writeFileSync(regPath, reg0, 'utf8')
  const k0 = wireKitsFile(fs.readFileSync(kitsPath, 'utf8'), C, getKits, slug)
  fs.writeFileSync(kitsPath, k0, 'utf8')

  return { ok: true }
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function write(file, c) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, c, 'utf8')
}

function toPascal(s) {
  return s
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('')
}

function slugToConst(s) {
  return `${s.toUpperCase().replace(/-/g, '_')}_PROJECT_SLUG`
}

function projectDefName(s) {
  return `${s.split('-').reduce((a, w, i) => (i === 0 ? w : a + w.charAt(0).toUpperCase() + w.slice(1)), '')}ProjectDef`
}

function wireRegistry({ reg, importReg, def, C }) {
  if (!reg.includes(importReg)) {
    const isoc = "import { ISOCOURT_PROJECT_SLUG, isocourtProjectDef } from './isocourt/project'"
    if (reg.includes(isoc)) {
      reg = reg.replace(isoc, `${isoc}\n${importReg}`)
    } else {
      throw new Error('registry.ts: missing isocourt import (unexpected layout)')
    }
  }
  {
    const m = reg.match(/export const PROJECTS: ProjectDef\[] = \[([^\]]+)\]/)
    if (!m) {
      throw new Error('registry.ts: could not parse PROJECTS array')
    }
    const inners = m[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    if (!inners.includes(def)) {
      reg = reg.replace(
        /export const PROJECTS: ProjectDef\[] = \[[^\]]+\]/,
        `export const PROJECTS: ProjectDef[] = [${[...inners, def].join(', ')}]`,
      )
    }
  }
  {
    const m2 = reg.match(/export const BUILTIN_PROJECT_SLUGS: readonly string\[] = \[([^\]]+)\]/)
    if (m2) {
      const in2 = m2[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      if (!in2.includes(C)) {
        reg = reg.replace(
          /export const BUILTIN_PROJECT_SLUGS: readonly string\[] = \[[^\]]+\]/,
          `export const BUILTIN_PROJECT_SLUGS: readonly string[] = [${[...in2, C].join(', ')}]`,
        )
      }
    }
  }
  return reg
}

/**
 * @param {string} k
 * @param {string} C
 * @param {string} getKits
 * @param {string} slug
 */
function wireKitsFile(k, C, getKits, slug) {
  const newImport = `import { ${C}, ${getKits} } from './projects/${slug}'`
  if (!k.includes(newImport)) {
    const lines = k.split('\n')
    let ins = -1
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("from './projects/isocourt'")) {
        ins = i
        break
      }
    }
    if (ins < 0) {
      throw new Error('src/kits.ts: missing isocourt import line')
    }
    let last = ins
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("from './projects/")) {
        last = i
      }
    }
    lines.splice(last + 1, 0, newImport)
    k = lines.join('\n')
  }
  const newLine = `  [${C}]: ${getKits},`
  if (k.includes(newLine)) {
    return k
  }
  const lines2 = k.split('\n')
  let after = -1
  for (let i = 0; i < lines2.length; i++) {
    if (lines2[i].includes('[ISOCOURT_PROJECT_SLUG]:') && lines2[i].includes('getKitsForIsocourtProject')) {
      after = i
    }
  }
  if (after < 0) {
    for (let i = 0; i < lines2.length; i++) {
      if (lines2[i].includes('getKitsForIsocourtProject')) {
        after = i
      }
    }
  }
  if (after < 0) {
    throw new Error('src/kits.ts: could not find isocourt resolver to insert after')
  }
  lines2.splice(after + 1, 0, newLine)
  return lines2.join('\n')
}
