import { useLayoutEffect } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { useProject } from '@/context/ProjectContext'

/**
 * Scopes all child routes to a project slug. Syncs `projectSlug` in context with the URL
 * and rejects unknown slugs. Slugs in the URL are normalized to lowercase to match the registry.
 */
export function ProjectLayout() {
  const { projectSlug: paramSlug = '' } = useParams()
  const { search, hash, pathname } = useLocation()
  const { setProjectSlug, projects } = useProject()

  const canonical = paramSlug.trim().toLowerCase()
  const known = projects.some((p) => p.slug === canonical)
  const segs = pathname.split('/').filter(Boolean)

  useLayoutEffect(() => {
    if (canonical && known) {
      setProjectSlug(canonical)
    }
  }, [canonical, known, setProjectSlug])

  if (
    paramSlug &&
    canonical &&
    segs[0] === 'projects' &&
    segs[1] === paramSlug &&
    paramSlug !== canonical
  ) {
    const to = `/${['projects', canonical, ...segs.slice(2)].join('/')}` + search + hash
    return <Navigate to={to} replace />
  }

  if (!paramSlug || !canonical || !known) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
