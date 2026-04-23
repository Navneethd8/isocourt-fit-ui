/**
 * Load `.env` from the repo root (Vite-style keys). No dependency on `dotenv`.
 * @param {string} [root] — directory containing .env
 */
import fs from 'node:fs'
import path from 'node:path'

export function loadLabEnv(root = process.cwd()) {
  const envPath = path.join(root, '.env')
  if (!fs.existsSync(envPath)) return {}
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
