import { useSyncExternalStore } from 'react'

function getEffectiveMode(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'dark'
  const attr = document.documentElement.getAttribute('data-color-mode')
  if (attr === 'light') return 'light'
  if (attr === 'dark') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function subscribe(onChange: () => void) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', onChange)
  const mo = new MutationObserver(onChange)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color-mode', 'class'] })
  window.addEventListener('storage', onChange)
  return () => {
    mq.removeEventListener('change', onChange)
    mo.disconnect()
    window.removeEventListener('storage', onChange)
  }
}

/** Resolves explicit light/dark plus system → prefers-color-scheme (matches ThemeToggle + inline script). */
export function useEffectiveColorMode() {
  return useSyncExternalStore(subscribe, getEffectiveMode, () => 'dark')
}
