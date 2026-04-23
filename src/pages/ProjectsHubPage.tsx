import { Link } from 'react-router-dom'
import { useProject } from '@/context/ProjectContext'
import { getProjectBySlug, isBuiltinProjectSlug } from '@/projects/registry'
import { projectSupportsSampleFlows } from '@/projects/types'
import { DocumentTitle } from '@/components/DocumentTitle'

function path(projectSlug: string, segment: 'kits' | 'analyze' | 'live') {
  return `/projects/${projectSlug}/${segment}`
}

export function ProjectsHubPage() {
  const { projects } = useProject()

  return (
    <>
      <DocumentTitle title="Projects" />
      <div className="app-top">
        <header className="app-hero">
          <p className="app-eyebrow">Registry</p>
          <h1>Projects</h1>
          <p className="app-lede">
            These workspaces are <strong>yours in the repo</strong> — there is no “add project” flow in the app.
            Use your agent to run <code>npm run lab:new-project</code> in this package; that scaffolds{' '}
            <code>src/projects/&lt;slug&gt;/</code> with a <em>blank</em> theme list, wires the registry, and
            (when <code>.env</code> has Airtable) adds a <code>Projects</code> row so you can collect votes. Ship
            to prod; others vote on directions as you run experiments. Press <kbd className="command-palette__kbd">⌘K</kbd>{' '}
            or <kbd className="command-palette__kbd">Ctrl K</kbd> for the command bar.
          </p>
        </header>
      </div>

      <section className="projects-grid" aria-label="All projects">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="projects-card"
            aria-labelledby={`project-card-${p.slug}`}
          >
            <h3 className="projects-card__name" id={`project-card-${p.slug}`}>
              {p.name}
            </h3>
            <p className="projects-card__slug">/{p.slug}</p>
            {p.description ? <p className="projects-card__desc">{p.description}</p> : null}
            <p className="projects-card__meta">
              {getProjectBySlug(p.slug)
                ? isBuiltinProjectSlug(p.slug)
                  ? 'Built-in'
                  : 'In repo (code)'
                : 'Airtable only (add a matching src/projects/ folder)'}
            </p>
            <div className="projects-card__links">
              <Link className="lab-landing__cta" style={{ margin: 0 }} to={path(p.slug, 'kits')}>
                Kits
              </Link>
              {projectSupportsSampleFlows(p) ? (
                <>
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
                </>
              ) : null}
            </div>
            <Link
              to={path(p.slug, 'kits')}
              className="projects-card__hit"
              tabIndex={-1}
              aria-label={`${p.name}: open kit shelf`}
            />
          </article>
        ))}
      </section>
    </>
  )
}
