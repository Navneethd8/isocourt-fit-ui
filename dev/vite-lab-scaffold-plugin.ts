import type { IncomingMessage } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('invalid json'))
      }
    })
    req.on('error', reject)
  })
}

/**
 * Dev-only: POST /__api/lab-scaffold writes `src/projects/<slug>/` and patches registry + kits.
 * Localhost only. Not available in `vite build` or production.
 */
export function labScaffoldPlugin(): Plugin {
  return {
    name: 'ui-lab-scaffold',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/__api/lab-scaffold' || req.method !== 'POST') {
          return next()
        }
        const host = (req.headers.host ?? '').split(':')[0] ?? ''
        if (host !== 'localhost' && host !== '127.0.0.1' && host !== '::1' && host !== '::ffff:127.0.0.1') {
          res.statusCode = 403
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ ok: false, error: 'Scaffold API is only available on localhost.' }))
          return
        }
        let body: { slug?: string; name?: string; description?: string }
        try {
          body = (await readJsonBody(req as IncomingMessage)) as {
            slug?: string
            name?: string
            description?: string
          }
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ ok: false, error: 'Invalid JSON body.' }))
          return
        }
        // Runtime ESM; tsc does not resolve .mjs next to this file.
        // @ts-expect-error 7016
        const { scaffoldLabProject } = await import('./scaffoldLabProject.mjs')
        const out = scaffoldLabProject({
          root: projectRoot,
          slug: (body.slug ?? '').trim().toLowerCase(),
          name: (body.name ?? '').trim(),
          description: (body.description ?? '').trim(),
        })
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.statusCode = (out as { ok: boolean }).ok ? 200 : 400
        res.end(JSON.stringify(out))
      })
    },
  }
}
