import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getKitsForProject, type UiKit } from '@/kits'
import { DEFAULT_PROJECT_SLUG, PROJECTS } from '@/projects/registry'
import type { ProjectDef } from '@/projects/types'

const STORAGE_KEY = 'ui-lab-active-project'

type Ctx = {
  projectSlug: string
  setProjectSlug: (slug: string) => void
  project: ProjectDef | undefined
  kits: UiKit[]
  projects: ProjectDef[]
  registerProjects: (fromRemote: ProjectDef[]) => void
}

const ProjectContext = createContext<Ctx | null>(null)

function readStoredSlug() {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (s) return s
  } catch {
    /* ignore */
  }
  return DEFAULT_PROJECT_SLUG
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectSlug, setSlugState] = useState<string>(() => readStoredSlug())
  const [remoteProjects, setRemoteProjects] = useState<ProjectDef[]>([])

  const projects = useMemo(() => {
    const by = new Map<string, ProjectDef>()
    for (const p of PROJECTS) by.set(p.slug, p)
    for (const p of remoteProjects) {
      if (!by.has(p.slug)) by.set(p.slug, p)
    }
    return [...by.values()]
  }, [remoteProjects])

  const setProjectSlug = useCallback(
    (slug: string) => {
      if (!projects.some((p) => p.slug === slug)) return
      setSlugState(slug)
    },
    [projects],
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, projectSlug)
    } catch {
      /* ignore */
    }
  }, [projectSlug])

  useEffect(() => {
    if (projects.length > 0 && !projects.some((p) => p.slug === projectSlug)) {
      const t = setTimeout(() => {
        setSlugState(DEFAULT_PROJECT_SLUG)
      }, 0)
      return () => clearTimeout(t)
    }
    return undefined
  }, [projects, projectSlug])

  const project = useMemo(
    () => projects.find((p) => p.slug === projectSlug),
    [projects, projectSlug],
  )

  const kits = useMemo(() => getKitsForProject(projectSlug), [projectSlug])

  const registerProjects = useCallback((fromRemote: ProjectDef[]) => {
    setRemoteProjects(fromRemote)
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      projectSlug,
      setProjectSlug,
      project,
      kits,
      projects,
      registerProjects,
    }),
    [projectSlug, setProjectSlug, project, kits, projects, registerProjects],
  )

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProject() {
  const c = useContext(ProjectContext)
  if (!c) throw new Error('useProject must be used under ProjectProvider')
  return c
}

// eslint-disable-next-line react-refresh/only-export-components
export function useKits() {
  return useProject().kits
}
