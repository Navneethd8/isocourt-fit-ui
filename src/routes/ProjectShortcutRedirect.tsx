import { Navigate } from 'react-router-dom'
import { useProject } from '@/context/ProjectContext'
import { projectSupportsSampleFlows } from '@/projects/types'

type Segment = 'kits' | 'analyze' | 'live'

export function ProjectShortcutRedirect({ to }: { to: Segment }) {
  const { projectSlug, project } = useProject()
  const segment: Segment = to === 'kits' || projectSupportsSampleFlows(project) ? to : 'kits'
  return <Navigate to={`/projects/${projectSlug}/${segment}`} replace />
}
