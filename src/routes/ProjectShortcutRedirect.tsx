import { Navigate } from 'react-router-dom'
import { useProject } from '@/context/ProjectContext'

type Segment = 'kits' | 'analyze' | 'live'

export function ProjectShortcutRedirect({ to }: { to: Segment }) {
  const { projectSlug } = useProject()
  return <Navigate to={`/projects/${projectSlug}/${to}`} replace />
}
