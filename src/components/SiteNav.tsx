import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useProject } from '@/context/ProjectContext'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  ['site-nav__link', isActive ? 'site-nav__link--active' : ''].filter(Boolean).join(' ')

function projectPath(projectSlug: string, segment: 'kits' | 'analyze' | 'live') {
  return `/projects/${projectSlug}/${segment}`
}

export function SiteNav() {
  const { projectSlug, projects } = useProject()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const p = pathname.replace(/\/$/, '') || '/'
  const inProjectWorkspace = p !== '/projects' && /^\/projects\/[^/]+/.test(p)

  const onProjectChange = (nextSlug: string) => {
    if (!projects.some((p) => p.slug === nextSlug)) return
    const m = pathname.match(/^\/projects\/[^/]+(\/.*)?$/)
    if (m) {
      const sub = m[1] && m[1].length > 0 ? m[1] : '/kits'
      navigate(`/projects/${nextSlug}${sub}`)
    } else {
      navigate(`/projects/${nextSlug}/kits`)
    }
  }

  return (
    <nav className="site-nav" aria-label="UI lab">
      <label className="site-nav__project">
        <span className="sr-only">Project</span>
        <select
          className="site-nav__select"
          value={projectSlug}
          onChange={(e) => onProjectChange(e.target.value)}
          title="Switch project (keeps the same sub-page, e.g. /kits or /analyze)"
        >
          {projects.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <NavLink to="/" className={linkClass} end>
        Lab
      </NavLink>
      <NavLink to="/projects" className={linkClass} end>
        Projects
      </NavLink>
      {inProjectWorkspace ? (
        <div className="site-nav__workbench" role="group" aria-label="Project: kit shelf, analyze, and live">
          <NavLink to={projectPath(projectSlug, 'kits')} className={linkClass} end>
            Kits
          </NavLink>
          <NavLink to={projectPath(projectSlug, 'analyze')} className={linkClass} end>
            Analyze
          </NavLink>
          <NavLink to={projectPath(projectSlug, 'live')} className={linkClass} end>
            Live
          </NavLink>
        </div>
      ) : null}
    </nav>
  )
}
