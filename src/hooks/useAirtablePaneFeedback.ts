import { useCallback, useEffect, useState } from 'react'
import { addPaneComment, deletePaneComment, listPaneComments } from '@/lib/airtable/remoteComments'
import { getTally, type TallyRow } from '@/lib/airtable/remoteTallies'
import { updateRecord } from '@/lib/airtable/request'
import { TABLE_PANE_TALLIES } from '@/lib/airtable/config'
import type { PanelComment } from '@/lib/panelFeedbackStorage'

type State = {
  loading: boolean
  err: string | null
  tally: { id: string; likes: number; dislikes: number } | null
  comments: PanelComment[]
}

export function useAirtablePaneFeedback(projectSlug: string, paneId: string) {
  const [s, setS] = useState<State>({
    loading: true,
    err: null,
    tally: null,
    comments: [],
  })

  const reload = useCallback(async () => {
    setS((o) => ({ ...o, loading: true, err: null }))
    try {
      const t = await getTally(projectSlug, paneId)
      const c = await listPaneComments(projectSlug, paneId)
      c.sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime())
      setS({ loading: false, err: null, tally: t, comments: c })
    } catch (e) {
      setS((o) => ({
        ...o,
        loading: false,
        err: e instanceof Error ? e.message : 'Airtable error',
      }))
    }
  }, [projectSlug, paneId])

  useEffect(() => {
    void reload()
  }, [reload])

  const bumpLike = useCallback(async () => {
    const t = await getTally(projectSlug, paneId)
    const likes = t.likes + 1
    await updateRecord<Partial<TallyRow>>(TABLE_PANE_TALLIES, t.id, { Likes: likes, Dislikes: t.dislikes })
    setS((o) => ({ ...o, tally: { id: t.id, likes, dislikes: t.dislikes } }))
  }, [projectSlug, paneId])

  const bumpDislike = useCallback(async () => {
    const t = await getTally(projectSlug, paneId)
    const d = t.dislikes + 1
    await updateRecord<Partial<TallyRow>>(TABLE_PANE_TALLIES, t.id, { Likes: t.likes, Dislikes: d })
    setS((o) => ({ ...o, tally: { id: t.id, likes: t.likes, dislikes: d } }))
  }, [projectSlug, paneId])

  const removeLike = useCallback(async () => {
    const t = await getTally(projectSlug, paneId)
    if (t.likes <= 0) return
    const likes = t.likes - 1
    await updateRecord<Partial<TallyRow>>(TABLE_PANE_TALLIES, t.id, { Likes: likes, Dislikes: t.dislikes })
    setS((o) => ({ ...o, tally: { id: t.id, likes, dislikes: t.dislikes } }))
  }, [projectSlug, paneId])

  const removeDislike = useCallback(async () => {
    const t = await getTally(projectSlug, paneId)
    if (t.dislikes <= 0) return
    const d = t.dislikes - 1
    await updateRecord<Partial<TallyRow>>(TABLE_PANE_TALLIES, t.id, { Likes: t.likes, Dislikes: d })
    setS((o) => ({ ...o, tally: { id: t.id, likes: t.likes, dislikes: d } }))
  }, [projectSlug, paneId])

  const post = useCallback(
    async (text: string) => {
      await addPaneComment(projectSlug, paneId, text)
      await reload()
    },
    [projectSlug, paneId, reload],
  )

  const del = useCallback(
    async (id: string) => {
      await deletePaneComment(id)
      setS((o) => ({ ...o, comments: o.comments.filter((c) => c.id !== id) }))
    },
    [],
  )

  return {
    ...s,
    bumpLike,
    bumpDislike,
    removeLike,
    removeDislike,
    postComment: post,
    deleteComment: del,
    retry: reload,
  }
}
