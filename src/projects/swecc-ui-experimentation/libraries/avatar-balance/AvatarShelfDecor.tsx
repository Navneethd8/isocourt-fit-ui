import { useId } from 'react'
import { useKitDemoSurface } from '@/context/useKitDemoSurface'
import { cn } from '@/lib/utils'
import shell from '../shared/shelfDecorShell.module.css'
import styles from './avatar-shelf-decor.module.css'

/** Spirit violet × jade earth harmony — ribbons, mountains, slow orbit (original homage art). */
export function AvatarShelfDecor() {
  const uid = useId().replace(/:/g, '')
  const skyId = `ab-sky-${uid}`
  const surface = useKitDemoSurface()
  const light = surface === 'light-stage'

  const skyTop = light ? '#faf6ee' : '#120f1a'
  const skyMid = light ? '#ebe3d6' : '#1a1528'
  const skyLow = light ? '#ddd4c4' : '#252038'
  const purple = light ? '#6b5094' : '#b89cff'
  const purpleSoft = light ? '#dcd2ee' : '#4a3d6b'
  const green = light ? '#3f7d62' : '#5dbe8a'
  const greenSoft = light ? '#c5e5d4' : '#1f3d32'
  const parchment = light ? '#f3ebe0' : '#1e1a2c'
  const peak = light ? '#5c5347' : '#6b5094'
  const peakSnow = light ? '#faf6ee' : '#d4c4f8'

  return (
    <div className={cn(shell.wrap, light ? styles.light : styles.dark)} aria-hidden>
      <svg className={shell.svg} viewBox="0 0 400 132" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skyTop} />
            <stop offset="45%" stopColor={skyMid} />
            <stop offset="100%" stopColor={skyLow} />
          </linearGradient>
        </defs>

        <rect width="400" height="132" fill={`url(#${skyId})`} />

        {/* Warm / spirit horizon wash */}
        <rect
          x="0"
          y="72"
          width="400"
          height="60"
          fill={light ? '#ebe3d6' : '#1e1a2c'}
          opacity={light ? 0.55 : 0.45}
        />

        {/* Intertwined ribbons — abstract balance */}
        <g className={styles.ribbon} opacity={light ? 0.9 : 0.85}>
          <path
            d="M-20 96 Q80 40 200 72 T420 88"
            fill="none"
            stroke={purple}
            strokeWidth="10"
            strokeLinecap="round"
            opacity={light ? 0.35 : 0.4}
          />
          <path
            d="M420 72 Q300 110 200 78 T-20 56"
            fill="none"
            stroke={green}
            strokeWidth="8"
            strokeLinecap="round"
            opacity={light ? 0.45 : 0.5}
          />
          <path
            d="M40 108 Q140 52 220 84 T380 64"
            fill="none"
            stroke={purpleSoft}
            strokeWidth="5"
            strokeLinecap="round"
            opacity={light ? 0.5 : 0.35}
          />
        </g>

        {/* Mountains */}
        <g className={styles.mountain}>
          <polygon points="0,132 0,92 52,132" fill={peak} opacity={light ? 0.25 : 0.35} />
          <polygon points="32,132 88,56 156,132" fill={greenSoft} opacity={light ? 0.55 : 0.5} />
          <polygon points="88,132 140,68 210,132" fill={peak} opacity={light ? 0.35 : 0.45} />
          <polygon points="118,132 168,78 248,132" fill={purpleSoft} opacity={light ? 0.4 : 0.3} />
          <polygon points="100,132 140,72 175,132" fill={peakSnow} opacity={light ? 0.5 : 0.15} />
        </g>

        {/* Orbit dots */}
        <g transform="translate(200, 72)">
          <g className={styles.orbit}>
            <circle cx="62" cy="0" r="3.5" fill={purple} opacity={0.85} />
            <circle cx="-62" cy="0" r="2.8" fill={green} opacity={0.9} />
          </g>
        </g>

        {/* Corner sparks */}
        <path
          className={styles.spark}
          d="M44 28 L46 34 L52 32 L46 30 Z"
          fill={purple}
          opacity={light ? 0.55 : 0.65}
        />
        <path
          className={styles.sparkB}
          d="M348 36 L350 42 L356 40 L350 38 Z"
          fill={green}
          opacity={light ? 0.5 : 0.55}
        />

        {/* Ground parchment strip */}
        <path d="M0 122 Q200 112 400 118 V132 H0 Z" fill={parchment} opacity={light ? 0.65 : 0.5} />
      </svg>
    </div>
  )
}
