import { useId } from 'react'
import { useKitDemoSurface } from '@/context/useKitDemoSurface'
import { cn } from '@/lib/utils'
import shell from '../shared/shelfDecorShell.module.css'
import styles from './brand-shelf-decor.module.css'

/** Lavender / lilac logo-mark mood — moonlight, sparkles, floating facets (original SVG). */
export function BrandShelfDecor() {
  const uid = useId().replace(/:/g, '')
  const skyId = `sb-sky-${uid}`
  const glowId = `sb-glow-${uid}`
  const surface = useKitDemoSurface()
  const light = surface === 'light-stage'

  const skyTop = light ? '#faf7ff' : '#100e18'
  const skyMid = light ? '#ebe4f7' : '#1c1628'
  const skyLow = light ? '#ddd2ee' : '#2a2238'
  const moon = light ? '#fdf8ff' : '#e8dcf8'
  const moonShade = light ? '#cfc4df' : '#6e5a90'
  const crystal = light ? '#c4b4dd' : '#b8a0d4'
  const crystalCore = light ? '#e4d2f6' : '#e4d2f6'
  const ground = light ? '#9c84c0' : '#3d3250'
  const groundSoft = light ? '#b8a8d4' : '#4a3d5c'
  const star = light ? '#6e5a90' : '#e4d2f6'
  const dust = light ? 'rgba(110,90,144,0.25)' : 'rgba(228,210,246,0.15)'

  return (
    <div className={cn(shell.wrap, light ? styles.light : styles.dark)} aria-hidden>
      <svg className={shell.svg} viewBox="0 0 400 132" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skyTop} />
            <stop offset="50%" stopColor={skyMid} />
            <stop offset="100%" stopColor={skyLow} />
          </linearGradient>
          <radialGradient id={glowId} cx="50%" cy="85%" r="65%">
            <stop offset="0%" stopColor={light ? '#e4d2f6' : '#5d4b7a'} stopOpacity={light ? 0.5 : 0.35} />
            <stop offset="100%" stopColor={skyLow} stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect width="400" height="132" fill={`url(#${skyId})`} />
        <rect width="400" height="132" fill={`url(#${glowId})`} />

        {/* Aurora band */}
        <path
          className={styles.shimmerBand}
          d="M0 72 Q100 56 200 72 T400 68 V132 H0 Z"
          fill={light ? 'rgba(156,132,192,0.2)' : 'rgba(110,90,144,0.22)'}
        />

        {/* Stars */}
        <circle className={styles.star} cx="48" cy="36" r="2" fill={star} />
        <circle className={styles.starDelayed} cx="112" cy="22" r="1.5" fill={star} />
        <circle className={styles.starDelayed2} cx="182" cy="44" r="1.2" fill={star} />
        <circle className={styles.star} cx="268" cy="28" r="1.8" fill={star} />
        <circle className={styles.starDelayed} cx="332" cy="52" r="1.3" fill={star} />
        <circle className={styles.starDelayed2} cx="356" cy="24" r="1.6" fill={star} />

        {/* Dust motes */}
        <circle cx="88" cy="78" r="1" fill={dust} />
        <circle cx="220" cy="62" r="1.2" fill={dust} />
        <circle cx="300" cy="88" r="0.9" fill={dust} />

        {/* Crescent moon */}
        <g className={styles.moon} transform="translate(298, 28)">
          <circle r="22" fill={moon} opacity={light ? 0.92 : 0.5} />
          <circle cx="11" cy="-4" r="18" fill={skyMid} opacity={light ? 1 : 0.92} />
          <circle cx="-6" cy="8" r="3" fill={moonShade} opacity={0.2} />
        </g>

        {/* Floating crystals */}
        <g className={styles.crystalA} transform="translate(62, 82)">
          <polygon points="0,-14 10,0 0,14 -10,0" fill={crystal} opacity={0.85} />
          <polygon points="0,-8 6,0 0,8 -6,0" fill={crystalCore} opacity={0.9} />
        </g>
        <g className={styles.crystalB} transform="translate(168, 68)">
          <polygon points="0,-11 8,0 0,11 -8,0" fill={crystal} opacity={0.75} />
          <polygon points="0,-6 5,0 0,6 -5,0" fill={crystalCore} opacity={0.85} />
        </g>
        <g className={styles.crystalC} transform="translate(238, 90)">
          <polygon points="0,-9 7,0 0,9 -7,0" fill={groundSoft} opacity={light ? 0.65 : 0.45} />
        </g>

        {/* Ground curve */}
        <path
          d="M0 108 Q200 88 400 104 V132 H0 Z"
          fill={ground}
          opacity={light ? 0.35 : 0.55}
        />
        <path
          d="M0 118 Q160 102 320 114 T400 116 V132 H0 Z"
          fill={groundSoft}
          opacity={light ? 0.28 : 0.4}
        />
      </svg>
    </div>
  )
}
