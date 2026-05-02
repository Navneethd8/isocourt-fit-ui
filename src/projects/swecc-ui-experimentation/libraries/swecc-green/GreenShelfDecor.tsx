import { useId } from 'react'
import { useKitDemoSurface } from '@/context/useKitDemoSurface'
import { cn } from '@/lib/utils'
import shell from '../shared/shelfDecorShell.module.css'
import styles from './green-shelf-decor.module.css'

/** Sage + grey-green calm — rolling hills, soft sun, drifting leaves (original SVG). */
export function GreenShelfDecor() {
  const uid = useId().replace(/:/g, '')
  const skyId = `sg-sky-${uid}`
  const surface = useKitDemoSurface()
  const light = surface === 'light-stage'

  const skyTop = light ? '#f4f7f0' : '#161914'
  const skyMid = light ? '#e2e8dd' : '#1f231e'
  const skyLow = light ? '#d4dcc8' : '#2a3028'
  const sun = light ? '#dfe8c8' : '#92c278'
  const sunCore = light ? '#fff9e6' : '#c8e4b8'
  const hillA = light ? '#aeb8a8' : '#3d423c'
  const hillB = light ? '#9aab8f' : '#323832'
  const hillC = light ? '#7ea266' : '#5f7a4e'
  const tree = light ? '#4d6340' : '#92c278'
  const treeDark = light ? '#3d5234' : '#5f7a4e'
  const leaf = light ? '#84a86c' : '#7ea266'
  const leafSoft = light ? '#b8c9a8' : '#4d5c42'

  return (
    <div className={cn(shell.wrap, light ? styles.light : styles.dark)} aria-hidden>
      <svg className={shell.svg} viewBox="0 0 400 132" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skyTop} />
            <stop offset="55%" stopColor={skyMid} />
            <stop offset="100%" stopColor={skyLow} />
          </linearGradient>
        </defs>

        <rect width="400" height="132" fill={`url(#${skyId})`} />

        {/* Sun */}
        <g className={styles.sunGlow} transform="translate(320, 38)">
          <circle cx="0" cy="0" r="26" fill={sun} opacity={light ? 0.55 : 0.25} />
          <circle cx="0" cy="0" r="16" fill={sunCore} opacity={light ? 0.9 : 0.45} />
        </g>

        {/* Hills — tiled paths for drift */}
        <g opacity={light ? 0.55 : 0.45}>
          <g className={styles.hillFar}>
            <path
              d="M-40 132 V96 Q40 72 120 88 T280 82 T440 90 V132 Z"
              fill={hillA}
            />
            <path
              d="M360 132 V96 Q440 72 520 88 T680 82 V132 Z"
              fill={hillA}
            />
          </g>
          <g className={styles.hillMid}>
            <path
              d="M-60 132 V104 Q60 88 140 100 T300 94 T460 102 V132 Z"
              fill={hillB}
            />
            <path
              d="M340 132 V104 Q460 88 540 100 T700 94 V132 Z"
              fill={hillB}
            />
          </g>
        </g>

        <path
          d="M0 132 V112 Q120 96 200 104 T400 108 V132 Z"
          fill={hillC}
          opacity={light ? 0.42 : 0.5}
        />

        {/* Pine */}
        <g className={styles.treeSway}>
          <polygon points="310,118 298,118 304,72" fill={treeDark} />
          <polygon points="304,82 286,118 322,118" fill={tree} opacity={0.95} />
          <polygon points="304,58 278,96 330,96" fill={tree} opacity={0.88} />
          <polygon points="304,42 268,78 340,78" fill={leafSoft} opacity={light ? 0.85 : 0.65} />
        </g>

        {/* Drifting leaves */}
        <ellipse className={styles.leafA} cx="72" cy="56" rx="6" ry="3.5" fill={leaf} transform="rotate(-25 72 56)" />
        <ellipse className={styles.leafB} cx="156" cy="44" rx="5" ry="3" fill={leafSoft} transform="rotate(18 156 44)" />
        <ellipse className={styles.leafC} cx="212" cy="62" rx="5.5" ry="3.2" fill={leaf} transform="rotate(-40 212 62)" />
        <ellipse className={styles.leafA} cx="380" cy="48" rx="4" ry="2.5" fill={leafSoft} transform="rotate(12 380 48)" />
      </svg>
    </div>
  )
}
