import { useEffect } from 'react'
import { useProject } from '@/context/ProjectContext'
import { isAirtableEnabled } from '@/lib/airtable/config'
import { ensureBuiltInProjectRows } from '@/lib/airtable/ensureProjects'
import { listRemoteProjects } from '@/lib/airtable/remoteProjects'

/**
 * Ensures built-in project rows (e.g. IsoCourt) exist in the Projects table, then merges remote
 * projects with the app registry. Duplicate Airtable rows for the same slug are collapsed in code.
 */
export function AirtableBootstrap() {
  const { registerProjects } = useProject()

  useEffect(() => {
    if (!isAirtableEnabled()) return
    void (async () => {
      try {
        await ensureBuiltInProjectRows()
        registerProjects(await listRemoteProjects())
      } catch {
        /* keep registry-only; PAT/base wrong or table missing */
      }
    })()
  }, [registerProjects])

  return null
}
