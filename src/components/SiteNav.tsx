import { NavLink, useLocation } from 'react-router-dom'
import { useProject } from '@/context/ProjectContext'
import { projectSupportsSampleFlows } from '@/projects/types'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  ['site-nav__link', isActive ? 'site-nav__link--active' : ''].filter(Boolean).join(' ')

function projectPath(projectSlug: string, segment: 'kits' | 'analyze' | 'live') {
  return `/projects/${projectSlug}/${segment}`
}

export function SiteNav() {
  const { projectSlug, project } = useProject()
  const { pathname } = useLocation()
  const p = pathname.replace(/\/$/, '') || '/'
  const inProjectWorkspace = p !== '/projects' && /^\/projects\/[^/]+/.test(p)
  const flows = projectSupportsSampleFlows(project)

  return (
    <nav className="site-nav" aria-label="UI lab">
      <NavLink to="/" className={linkClass} end>
        Lab
      </NavLink>
      <NavLink to="/projects" className={linkClass} end>
        Projects
      </NavLink>
      {inProjectWorkspace ? (
        <div
          className="site-nav__workbench"
          role="group"
          aria-label={flows ? 'Project: kit shelf, analyze, and live' : 'Project: kit shelf'}
        >
          <NavLink to={projectPath(projectSlug, 'kits')} className={linkClass} end>
            Kits
          </NavLink>
          {flows ? (
            <>
              <NavLink to={projectPath(projectSlug, 'analyze')} className={linkClass} end>
                Analyze
              </NavLink>
              <NavLink to={projectPath(projectSlug, 'live')} className={linkClass} end>
                Live
              </NavLink>
            </>
          ) : null}
        </div>
      ) : null}
    </nav>
  )
}
