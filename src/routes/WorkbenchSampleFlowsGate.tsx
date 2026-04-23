import type { ReactNode } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useProject } from '@/context/ProjectContext'
import { projectSupportsSampleFlows } from '@/projects/types'

/** Renders children only when the active project opts into Analyze/Live; otherwise redirects to kit shelf. */
export function WorkbenchSampleFlowsGate({ children }: { children: ReactNode }) {
  const { project } = useProject()
  const { projectSlug = '' } = useParams()
  if (!projectSupportsSampleFlows(project)) {
    return <Navigate to={`/projects/${encodeURIComponent(projectSlug)}/kits`} replace />
  }
  return children
}
