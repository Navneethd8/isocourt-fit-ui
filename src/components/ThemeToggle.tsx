import type { KeyboardEvent } from 'react'
import { useEffect, useState } from 'react'

export type ColorMode = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'ui-lab-theme'
const LEGACY_KEY = 'isocourt-theme'

function readStoredMode(): ColorMode {
  try {
    const v = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {
    /* ignore */
  }
  return 'system'
}

function isDarkMode(mode: ColorMode) {
  if (mode === 'dark') return true
  if (mode === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/** `data-color-mode` + shadcn/Tailwind `.dark` on <html> */
function applyMode(mode: ColorMode) {
  document.documentElement.setAttribute('data-color-mode', mode)
  document.documentElement.classList.toggle('dark', isDarkMode(mode))
}

const modes: { value: ColorMode; label: string; description: string }[] = [
  { value: 'system', label: 'System', description: 'Match operating system light or dark appearance' },
  { value: 'light', label: 'Light', description: 'Light interface for all demo columns' },
  { value: 'dark', label: 'Dark', description: 'Dark interface for all demo columns' },
]

export function ThemeToggle() {
  const [mode, setMode] = useState<ColorMode>(() => readStoredMode())
  const order: ColorMode[] = ['system', 'light', 'dark']

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const i = order.indexOf(mode)
    if (e.key === 'Home') {
      setMode('system')
      return
    }
    if (e.key === 'End') {
      setMode('dark')
      return
    }
    const next = e.key === 'ArrowRight' ? Math.min(order.length - 1, i + 1) : Math.max(0, i - 1)
    setMode(order[next]!)
  }

  useEffect(() => {
    applyMode(mode)
    try {
      if (mode === 'system') {
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(LEGACY_KEY)
        return
      }
      localStorage.setItem(STORAGE_KEY, mode)
      localStorage.removeItem(LEGACY_KEY)
    } catch {
      /* ignore */
    }
  }, [mode])

  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyMode('system')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mode])

  return (
    <div
      className="theme-toggle"
      role="radiogroup"
      aria-label="Color theme"
      onKeyDown={onKeyDown}
    >
      {modes.map((m) => {
        const selected = mode === m.value
        return (
          <button
            key={m.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={m.description}
            tabIndex={selected ? 0 : -1}
            className={selected ? 'theme-toggle__btn theme-toggle__btn--active' : 'theme-toggle__btn'}
            onClick={() => setMode(m.value)}
          >
            {m.label}
          </button>
        )
      })}
    </div>
  )
}
