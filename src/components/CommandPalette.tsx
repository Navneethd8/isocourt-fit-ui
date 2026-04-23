import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProject } from '@/context/ProjectContext'

type Cmd = { id: string; label: string; hint?: string; run: () => void }

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { projectSlug, projects } = useProject()

  const go = useCallback(
    (path: string) => {
      setOpen(false)
      setQ('')
      void navigate(path)
    },
    [navigate],
  )

  const items = useMemo(() => {
    const list: Cmd[] = [
      { id: 'home', label: 'Open lab home', hint: '/', run: () => go('/') },
      { id: 'dir', label: 'Open projects directory (add / list)', hint: '/projects', run: () => go('/projects') },
      {
        id: 'kits',
        label: 'Open kit shelf — current project',
        hint: `/projects/${projectSlug}/kits`,
        run: () => go(`/projects/${projectSlug}/kits`),
      },
      {
        id: 'analyze',
        label: 'Open analyze — current project',
        run: () => go(`/projects/${projectSlug}/analyze`),
      },
      {
        id: 'live',
        label: 'Open live — current project',
        run: () => go(`/projects/${projectSlug}/live`),
      },
    ]
    for (const p of projects) {
      list.push({
        id: `k-${p.slug}`,
        label: `Open ${p.name} — kit shelf`,
        hint: p.slug,
        run: () => go(`/projects/${p.slug}/kits`),
      })
    }
    return list
  }, [go, projectSlug, projects])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter(
      (c) => c.label.toLowerCase().includes(s) || c.hint?.toLowerCase().includes(s) || c.id.includes(s),
    )
  }, [items, q])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => {
          if (o) return false
          setQ('')
          queueMicrotask(() => inputRef.current?.focus())
          return true
        })
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!open) {
    return (
      <button
        type="button"
        className="command-palette__trigger"
        onClick={() => {
          setQ('')
          setOpen(true)
          queueMicrotask(() => inputRef.current?.focus())
        }}
        title="Command palette (⌘K or Ctrl+K)"
      >
        <span>Commands</span>
        <span className="command-palette__hotkey" aria-hidden>
          ⌘K
        </span>
      </button>
    )
  }

  return (
    <div
      className="command-palette__backdrop"
      role="dialog"
      aria-label="Command palette"
      aria-modal
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div className="command-palette__panel" onMouseDown={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="command-palette__input"
          placeholder="Type a command (navigate, project name, “kits”…)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filtered[0]) {
              e.preventDefault()
              filtered[0].run()
            }
            if (e.key === 'Escape') setOpen(false)
          }}
          autoComplete="off"
        />
        <ul className="command-palette__list" role="listbox">
          {filtered.length === 0 ? (
            <li className="command-palette__empty">No matches</li>
          ) : (
            filtered.map((c) => (
              <li key={c.id} role="option">
                <button type="button" className="command-palette__item" onClick={() => c.run()}>
                  <span className="command-palette__item-label">{c.label}</span>
                  {c.hint ? <span className="command-palette__item-hint">{c.hint}</span> : null}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
