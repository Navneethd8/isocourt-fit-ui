import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import { useEffect, useId, useState, type FormEvent } from 'react'
import { useProject } from '@/context/ProjectContext'
import { useAirtablePaneFeedback } from '@/hooks/useAirtablePaneFeedback'
import { isAirtableEnabled } from '@/lib/airtable/config'
import {
  loadPanelFeedback,
  namespacedKey,
  savePanelFeedback,
  subscribePanelFeedback,
} from '@/lib/panelFeedbackStorage'

type Props = {
  /** Stable id for the pane (e.g. design kit id). Drives localStorage keying. */
  paneId: string
  /** Human label for a11y and the thread. */
  panelTitle: string
}

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

/**
 * Per-pane poll (like / dislike with ±) and a simple comment thread. Keyed by project + pane; local or Airtable.
 */
function PaneFeedbackLocal({ paneId, panelTitle }: Props) {
  const { projectSlug } = useProject()
  const formId = useId()
  const [data, setData] = useState(loadPanelFeedback)
  const [draft, setDraft] = useState('')

  const key = namespacedKey(projectSlug, paneId)

  useEffect(() => subscribePanelFeedback(() => setData(loadPanelFeedback())), [])

  const tally = data.tallies[key] ?? { likes: 0, dislikes: 0 }
  const thread = data.comments[key] ?? []

  const persist = (next: typeof data) => {
    savePanelFeedback(next)
    setData(next)
  }

  const bumpLike = () => {
    const d = loadPanelFeedback()
    const t = d.tallies[key] ?? { likes: 0, dislikes: 0 }
    d.tallies[key] = { ...t, likes: t.likes + 1 }
    persist(d)
  }

  const bumpDislike = () => {
    const d = loadPanelFeedback()
    const t = d.tallies[key] ?? { likes: 0, dislikes: 0 }
    d.tallies[key] = { ...t, dislikes: t.dislikes + 1 }
    persist(d)
  }

  const removeLike = () => {
    const d = loadPanelFeedback()
    const t = d.tallies[key] ?? { likes: 0, dislikes: 0 }
    if (t.likes <= 0) return
    d.tallies[key] = { ...t, likes: t.likes - 1 }
    persist(d)
  }

  const removeDislike = () => {
    const d = loadPanelFeedback()
    const t = d.tallies[key] ?? { likes: 0, dislikes: 0 }
    if (t.dislikes <= 0) return
    d.tallies[key] = { ...t, dislikes: t.dislikes - 1 }
    persist(d)
  }

  const deleteComment = (commentId: string) => {
    const d = loadPanelFeedback()
    const list = d.comments[key] ?? []
    const next = list.filter((c) => c.id !== commentId)
    if (next.length === 0) delete d.comments[key]
    else d.comments[key] = next
    persist(d)
  }

  const onSubmitComment = (e: FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    const d = loadPanelFeedback()
    const list = d.comments[key] ?? []
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`
    d.comments[key] = [...list, { id, text, at: new Date().toISOString() }]
    persist(d)
    setDraft('')
  }

  const label = `Feedback on ${panelTitle}`

  return (
    <div className="kit-feedback" aria-label={label}>
      <p className="kit-feedback__eyebrow">Poll</p>
      <div className="kit-feedback__row kit-feedback__row--votes" role="group" aria-label={`Likes and dislikes for ${panelTitle}`}>
        <div className="kit-feedback__vote-line" role="group" aria-label={`Likes for ${panelTitle}`}>
          <span className="kit-feedback__vote-caption">Like:</span>
          <button
            type="button"
            className="kit-feedback__btn kit-feedback__btn--vote-step kit-feedback__btn--like"
            onClick={bumpLike}
            aria-label={`Add one like for ${panelTitle}. ${tally.likes} likes now.`}
          >
            +
          </button>
          <button
            type="button"
            className="kit-feedback__btn kit-feedback__btn--vote-step kit-feedback__btn--like"
            onClick={removeLike}
            disabled={tally.likes <= 0}
            aria-label={`Remove one like for ${panelTitle}. ${tally.likes} likes now.`}
          >
            −
          </button>
          <span className="kit-feedback__vote-count" aria-live="polite">
            {tally.likes}
          </span>
        </div>
        <div className="kit-feedback__vote-line" role="group" aria-label={`Dislikes for ${panelTitle}`}>
          <span className="kit-feedback__vote-caption">Dislike:</span>
          <button
            type="button"
            className="kit-feedback__btn kit-feedback__btn--vote-step kit-feedback__btn--dislike"
            onClick={bumpDislike}
            aria-label={`Add one dislike for ${panelTitle}. ${tally.dislikes} dislikes now.`}
          >
            +
          </button>
          <button
            type="button"
            className="kit-feedback__btn kit-feedback__btn--vote-step kit-feedback__btn--dislike"
            onClick={removeDislike}
            disabled={tally.dislikes <= 0}
            aria-label={`Remove one dislike for ${panelTitle}. ${tally.dislikes} dislikes now.`}
          >
            −
          </button>
          <span className="kit-feedback__vote-count" aria-live="polite">
            {tally.dislikes}
          </span>
        </div>
      </div>
      <p className="kit-feedback__hint">Saved in this browser only (project + pane). Clear site data to reset.</p>

      <div className="kit-feedback__chat" role="region" aria-label={`Notes for ${panelTitle}`}>
        <p className="kit-feedback__chat-title">Comments</p>
        <form className="kit-feedback__form" onSubmit={onSubmitComment}>
          <label className="sr-only" htmlFor={formId}>
            Add a comment for {panelTitle}
          </label>
          <textarea
            id={formId}
            className="kit-feedback__input"
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Quick note or idea for this pane…"
            maxLength={2000}
          />
          <button type="submit" className="kit-feedback__submit" disabled={!draft.trim()}>
            Post
          </button>
        </form>
        <ul className="kit-feedback__thread">
          {thread.length === 0 ? (
            <li className="kit-feedback__empty">No comments yet—use the box above.</li>
          ) : (
            thread.map((c) => (
              <li key={c.id} className="kit-feedback__bubble">
                <div className="kit-feedback__bubble-head">
                  <time className="kit-feedback__bubble-time" dateTime={c.at}>
                    {formatWhen(c.at)}
                  </time>
                  <button
                    type="button"
                    className="kit-feedback__delete"
                    onClick={() => deleteComment(c.id)}
                    aria-label={`Delete this comment on ${panelTitle}`}
                  >
                    <DeleteOutlined fontSize="small" aria-hidden />
                  </button>
                </div>
                <p className="kit-feedback__bubble-text">{c.text}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

function PaneFeedbackAirtable({ paneId, panelTitle }: Props) {
  const { projectSlug } = useProject()
  const a = useAirtablePaneFeedback(projectSlug, paneId)
  const formId = useId()
  const [draft, setDraft] = useState('')
  const thread = a.comments
  const tally = a.tally ?? { id: '', likes: 0, dislikes: 0 }
  const label = `Feedback on ${panelTitle}`

  const onSubmitComment = (e: FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    void a.postComment(text).then(() => setDraft(''))
  }

  if (a.loading) {
    return <p className="kit-feedback__hint">Loading feedback…</p>
  }
  if (a.err) {
    return (
      <div className="kit-feedback" role="alert">
        <p className="page-empty" style={{ margin: 0 }}>
          {a.err}
        </p>
        <button type="button" className="pane-chooser__link" onClick={() => a.retry()}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="kit-feedback" aria-label={label}>
      <p className="kit-feedback__eyebrow">Poll</p>
      <div
        className="kit-feedback__row kit-feedback__row--votes"
        role="group"
        aria-label={`Likes and dislikes for ${panelTitle}`}
      >
        <div className="kit-feedback__vote-line" role="group" aria-label={`Likes for ${panelTitle}`}>
          <span className="kit-feedback__vote-caption">Like:</span>
          <button
            type="button"
            className="kit-feedback__btn kit-feedback__btn--vote-step kit-feedback__btn--like"
            onClick={() => void a.bumpLike()}
            aria-label={`Add one like for ${panelTitle}. ${tally.likes} likes now.`}
          >
            +
          </button>
          <button
            type="button"
            className="kit-feedback__btn kit-feedback__btn--vote-step kit-feedback__btn--like"
            onClick={() => void a.removeLike()}
            disabled={tally.likes <= 0}
            aria-label={`Remove one like for ${panelTitle}. ${tally.likes} likes now.`}
          >
            −
          </button>
          <span className="kit-feedback__vote-count" aria-live="polite">
            {tally.likes}
          </span>
        </div>
        <div className="kit-feedback__vote-line" role="group" aria-label={`Dislikes for ${panelTitle}`}>
          <span className="kit-feedback__vote-caption">Dislike:</span>
          <button
            type="button"
            className="kit-feedback__btn kit-feedback__btn--vote-step kit-feedback__btn--dislike"
            onClick={() => void a.bumpDislike()}
            aria-label={`Add one dislike for ${panelTitle}. ${tally.dislikes} dislikes now.`}
          >
            +
          </button>
          <button
            type="button"
            className="kit-feedback__btn kit-feedback__btn--vote-step kit-feedback__btn--dislike"
            onClick={() => void a.removeDislike()}
            disabled={tally.dislikes <= 0}
            aria-label={`Remove one dislike for ${panelTitle}. ${tally.dislikes} dislikes now.`}
          >
            −
          </button>
          <span className="kit-feedback__vote-count" aria-live="polite">
            {tally.dislikes}
          </span>
        </div>
      </div>
      <p className="kit-feedback__hint">Saved to your Airtable base (see .env). Anyone with the app and token can read counts.</p>

      <div className="kit-feedback__chat" role="region" aria-label={`Notes for ${panelTitle}`}>
        <p className="kit-feedback__chat-title">Comments</p>
        <form className="kit-feedback__form" onSubmit={onSubmitComment}>
          <label className="sr-only" htmlFor={formId}>
            Add a comment for {panelTitle}
          </label>
          <textarea
            id={formId}
            className="kit-feedback__input"
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Quick note or idea for this pane…"
            maxLength={2000}
          />
          <button type="submit" className="kit-feedback__submit" disabled={!draft.trim()}>
            Post
          </button>
        </form>
        <ul className="kit-feedback__thread">
          {thread.length === 0 ? (
            <li className="kit-feedback__empty">No comments yet—use the box above.</li>
          ) : (
            thread.map((c) => (
              <li key={c.id} className="kit-feedback__bubble">
                <div className="kit-feedback__bubble-head">
                  <time className="kit-feedback__bubble-time" dateTime={c.at}>
                    {formatWhen(c.at)}
                  </time>
                  <button
                    type="button"
                    className="kit-feedback__delete"
                    onClick={() => void a.deleteComment(c.id)}
                    aria-label={`Delete this comment on ${panelTitle}`}
                  >
                    <DeleteOutlined fontSize="small" aria-hidden />
                  </button>
                </div>
                <p className="kit-feedback__bubble-text">{c.text}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export function PaneFeedback(props: Props) {
  if (isAirtableEnabled()) return <PaneFeedbackAirtable {...props} />
  return <PaneFeedbackLocal {...props} />
}
