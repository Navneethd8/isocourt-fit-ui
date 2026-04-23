import { useId, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProject } from '@/context/ProjectContext'
import { isBuiltinProjectSlug } from '@/projects/registry'
import { createLabProject } from '@/lib/createLabProject'
import { DocumentTitle } from '@/components/DocumentTitle'

function path(projectSlug: string, segment: 'kits' | 'analyze' | 'live') {
  return `/projects/${projectSlug}/${segment}`
}

export function ProjectsHubPage() {
  const { projects, addUserProject, removeUserProject, userProjectSlugs } = useProject()
  const navigate = useNavigate()
  const baseId = useId()
  const [slug, setSlug] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const onAdd = (e: FormEvent) => {
    e.preventDefault()
    setErr(null)
    const s = slug.trim().toLowerCase()
    if (!s) {
      setErr('Slug is required (lowercase letters, numbers, hyphens).')
      return
    }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(s) || s.length > 64) {
      setErr('Use a short URL-safe slug: lowercase letters, numbers, and hyphens only.')
      return
    }
    void (async () => {
      setBusy(true)
      try {
        const result = await createLabProject({
          slug: s,
          name: name.trim() || s,
          description: description.trim() || 'Local experiment project',
        })
        if (result.kind === 'error') {
          setErr(result.message)
          return
        }
        if (result.kind === 'scaffolded') {
          return
        }
        const ok = addUserProject({
          id: s,
          slug: s,
          name: name.trim() || s,
          description: description.trim() || 'Local experiment project',
        })
        if (!ok) {
          setErr('That slug is already taken or invalid. Use another slug (e.g. my-idea-2).')
          return
        }
        setSlug('')
        setName('')
        setDescription('')
        void navigate(path(s, 'kits'), { replace: true })
      } finally {
        setBusy(false)
      }
    })()
  }

  return (
    <>
      <DocumentTitle title="Projects" />
      <div className="app-top">
        <header className="app-hero">
          <p className="app-eyebrow">Registry</p>
          <h1>Projects</h1>
          <p className="app-lede">
            Add a name + slug to open a new design workspace. With <strong>npm run dev</strong>, this also creates
            the real <code>src/projects/&lt;slug&gt;/</code> files and Airtable <strong>Projects</strong> row (when
            <code>.env</code> is set). A production or preview build saves the project in this browser only, plus
            Airtable. Press <kbd className="command-palette__kbd">⌘K</kbd> or <kbd className="command-palette__kbd">Ctrl
            K</kbd> to open the command bar any time.
          </p>
        </header>
      </div>

      <section className="projects-hub" aria-labelledby={`${baseId}-add`}>
        <h2 id={`${baseId}-add`} className="projects-hub__h">
          New project
        </h2>
        {import.meta.env.DEV ? (
          <p className="page-lede" style={{ marginTop: 0, marginBottom: '1rem' }}>
            This session can write into the repository on <strong>localhost</strong> (dev server only).
          </p>
        ) : null}
        <form className="projects-hub__form" onSubmit={onAdd}>
          {err ? <p className="page-empty">{err}</p> : null}
          <label>
            <span>Slug (URL, unique)</span>
            <input
              className="projects-hub__input"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. acme-ui"
              pattern="[a-z0-9][a-z0-9-]*"
              autoComplete="off"
            />
          </label>
          <label>
            <span>Name</span>
            <input
              className="projects-hub__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Display name"
            />
          </label>
          <label className="projects-hub__span2">
            <span>Description (optional)</span>
            <input
              className="projects-hub__input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What you’re exploring"
            />
          </label>
          <div className="projects-hub__actions">
            <button type="submit" className="lab-landing__cta" style={{ margin: 0 }} disabled={busy}>
              {busy ? 'Creating…' : 'Create and open kit shelf'}
            </button>
          </div>
        </form>
      </section>

      <section className="projects-grid" aria-label="All projects">
        {projects.map((p) => (
          <article key={p.slug} className="projects-card">
            <h3 className="projects-card__name">{p.name}</h3>
            <p className="projects-card__slug">/{p.slug}</p>
            {p.description ? <p className="projects-card__desc">{p.description}</p> : null}
            <p className="projects-card__meta">
              {isBuiltinProjectSlug(p.slug)
                ? 'Built-in'
                : userProjectSlugs.has(p.slug)
                  ? 'Saved in this browser'
                  : 'Airtable / remote'}
            </p>
            <div className="projects-card__links">
              <Link className="lab-landing__cta" style={{ margin: 0 }} to={path(p.slug, 'kits')}>
                Kits
              </Link>
              <Link
                to={path(p.slug, 'analyze')}
                className="lab-landing__cta lab-landing__cta--ghost"
                style={{ margin: 0 }}
              >
                Analyze
              </Link>
              <Link
                to={path(p.slug, 'live')}
                className="lab-landing__cta lab-landing__cta--ghost"
                style={{ margin: 0 }}
              >
                Live
              </Link>
              {userProjectSlugs.has(p.slug) && !isBuiltinProjectSlug(p.slug) ? (
                <button
                  type="button"
                  className="projects-card__remove"
                  onClick={() => removeUserProject(p.slug)}
                >
                  Remove local
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
