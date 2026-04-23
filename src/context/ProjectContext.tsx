import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getKitsForProject, type UiKit } from '@/kits'
import { loadUserProjects, saveUserProjects, subscribeUserProjects } from '@/lib/userProjectsStorage'
import { DEFAULT_PROJECT_SLUG, isBuiltinProjectSlug, PROJECTS } from '@/projects/registry'
import type { ProjectDef } from '@/projects/types'

const STORAGE_KEY = 'ui-lab-active-project'

type Ctx = {
  projectSlug: string
  setProjectSlug: (slug: string) => void
  project: ProjectDef | undefined
  kits: UiKit[]
  projects: ProjectDef[]
  registerProjects: (fromRemote: ProjectDef[]) => void
  addUserProject: (p: ProjectDef) => boolean
  removeUserProject: (slug: string) => void
  userProjectSlugs: Set<string>
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
  const [userProjects, setUserProjects] = useState<ProjectDef[]>(() => loadUserProjects())

  useEffect(() => subscribeUserProjects(() => setUserProjects(loadUserProjects())), [])

  const userProjectSlugs = useMemo(
    () => new Set(userProjects.map((p) => p.slug)),
    [userProjects],
  )

  const projects = useMemo(() => {
    const by = new Map<string, ProjectDef>()
    for (const p of PROJECTS) by.set(p.slug, p)
    for (const p of userProjects) {
      if (!by.has(p.slug)) by.set(p.slug, p)
    }
    for (const p of remoteProjects) {
      if (!by.has(p.slug)) by.set(p.slug, p)
    }
    return [...by.values()]
  }, [userProjects, remoteProjects])

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

  const addUserProject = useCallback(
    (p: ProjectDef) => {
      const slug = p.slug.trim().toLowerCase()
      if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug) || slug.length > 64) return false
      if (projects.some((x) => x.slug === slug)) return false
      const next: ProjectDef = {
        id: slug,
        slug,
        name: p.name.trim() || slug,
        description: p.description.trim() || 'Local experiment project',
      }
      const list = [...userProjects, next]
      saveUserProjects(list)
      setUserProjects(list)
      return true
    },
    [projects, userProjects],
  )

  const removeUserProject = useCallback(
    (slug: string) => {
      if (isBuiltinProjectSlug(slug) || !userProjectSlugs.has(slug)) return
      const list = userProjects.filter((p) => p.slug !== slug)
      saveUserProjects(list)
      setUserProjects(list)
      if (projectSlug === slug) {
        setSlugState(DEFAULT_PROJECT_SLUG)
      }
    },
    [userProjectSlugs, userProjects, projectSlug],
  )

  const value = useMemo<Ctx>(
    () => ({
      projectSlug,
      setProjectSlug,
      project,
      kits,
      projects,
      registerProjects,
      addUserProject,
      removeUserProject,
      userProjectSlugs,
    }),
    [
      projectSlug,
      setProjectSlug,
      project,
      kits,
      projects,
      registerProjects,
      addUserProject,
      removeUserProject,
      userProjectSlugs,
    ],
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
