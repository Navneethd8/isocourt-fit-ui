import { useId } from 'react'
import { useKitDemoSurface } from '@/context/useKitDemoSurface'
import { cn } from '@/lib/utils'
import shell from '../shared/shelfDecorShell.module.css'
import styles from './finale-shelf-decor.module.css'

/** Token-led strip — fills use inherited CSS variables from the Finale pane shell. */
export function FinaleShelfDecor() {
  const uid = useId().replace(/:/g, '')
  const bgId = `fn-bg-${uid}`
  const surface = useKitDemoSurface()
  const light = surface === 'light-stage'

  return (
    <div className={cn(shell.wrap, light ? styles.light : styles.dark)} aria-hidden>
      <svg className={shell.svg} viewBox="0 0 400 132" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={bgId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--bg)" />
            <stop offset="100%" stopColor="var(--surface)" />
          </linearGradient>
        </defs>

        <rect width="400" height="132" fill={`url(#${bgId})`} />

        <rect className={styles.barPulse} x="0" y="52" width="8" height="80" fill="var(--sage-green)" opacity={0.9} />

        <path
          className={styles.barPulse}
          d="M24 132 L24 36 L180 28 L200 132 Z"
          fill="var(--spirit-purple)"
          opacity={0.2}
        />
        <path d="M28 132 L28 48 L160 42 L176 132 Z" fill="var(--husky-purple)" opacity={0.14} />

        <rect className={styles.shard} x="0" y="118" width="400" height="4" fill="var(--accent)" opacity={0.55} />

        <circle cx="332" cy="36" r="10" fill="var(--lavender)" opacity={0.45} />
        <circle cx="362" cy="52" r="6" fill="var(--pink)" opacity={0.45} />
        <rect x="312" y="72" width="68" height="6" rx="2" fill="var(--green-accent)" opacity={0.35} />
        <rect x="300" y="88" width="88" height="3" rx="1" fill="var(--lavender)" opacity={0.38} />

        <text
          x="218"
          y="122"
          fontFamily="'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif"
          fontSize="7"
          fontWeight="500"
          letterSpacing="0.18em"
          fill="var(--text-muted)"
          opacity={0.9}
        >
          FINALE · TOKENS
        </text>
      </svg>
    </div>
  )
}
