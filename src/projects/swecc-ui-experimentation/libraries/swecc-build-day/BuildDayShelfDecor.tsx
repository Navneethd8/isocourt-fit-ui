import { useId } from 'react'
import { useKitDemoSurface } from '@/context/useKitDemoSurface'
import { cn } from '@/lib/utils'
import shell from '../shared/shelfDecorShell.module.css'
import styles from './build-day-shelf-decor.module.css'

/**
 * Original layered scene for the build-day kit — playful sky / water / buoy / raft energy
 * (not copied from any external site artwork).
 */
export function BuildDayShelfDecor() {
  const uid = useId().replace(/:/g, '')
  const skyId = `bd-sky-${uid}`
  const waterId = `bd-water-${uid}`
  const clipId = `bd-hero-clip-${uid}`
  const surface = useKitDemoSurface()
  const light = surface === 'light-stage'

  const skyTop = light ? '#e8fff4' : '#1a2830'
  const skyMid = light ? '#c8f0dc' : '#243536'
  const skyLow = light ? '#a8dfc8' : '#1e322c'
  const cloud = light ? 'rgba(255,255,255,0.92)' : 'rgba(180,210,195,0.14)'
  const cloudEdge = light ? 'rgba(255,255,255,0.45)' : 'rgba(140,180,160,0.12)'
  const sun = light ? '#ffe9a8' : '#c8e888'
  const sunCore = light ? '#fff4cc' : '#e8f8c8'
  const hill = light ? '#6b9a72' : '#2d4a38'
  const hillFar = light ? '#8fbc88' : '#355545'
  const waterDeep = light ? '#5a9e8a' : '#1a3d34'
  const waterMid = light ? '#7eb89e' : '#245548'
  const waterFoam = light ? 'rgba(255,255,255,0.55)' : 'rgba(180,230,200,0.18)'
  const buoyStripe = light ? '#f5faf7' : '#d8f0e4'
  const buoyStripeAlt = light ? '#e94b6a' : '#c44d68'
  const raft = light ? '#c4956a' : '#8a6548'
  const raftShadow = light ? '#a67b52' : '#6d4a36'
  const mascot = light ? '#4d6340' : '#92c278'
  const mascotSoft = light ? '#6b8f52' : '#a8dc88'
  const ink = light ? '#143828' : '#0f1c18'
  const laptop = light ? 'rgba(255,255,255,0.85)' : 'rgba(30,50,42,0.9)'
  const fish = light ? 'rgba(255,255,255,0.35)' : 'rgba(140,200,170,0.2)'

  return (
    <div className={cn(shell.wrap, light ? styles.light : styles.dark)} aria-hidden>
      <svg
        className={shell.svg}
        viewBox="0 0 400 132"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skyTop} />
            <stop offset="55%" stopColor={skyMid} />
            <stop offset="100%" stopColor={skyLow} />
          </linearGradient>
          <linearGradient id={waterId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={waterMid} />
            <stop offset="100%" stopColor={waterDeep} />
          </linearGradient>
          <clipPath id={clipId}>
            <rect width="400" height="132" rx="0" />
          </clipPath>
        </defs>

        <rect width="400" height="132" fill={`url(#${skyId})`} />

        {/* Sun */}
        <g className={styles.sparkle}>
          <circle cx="318" cy="36" r="22" fill={sun} opacity={light ? 0.95 : 0.55} />
          <circle cx="318" cy="36" r="14" fill={sunCore} opacity={light ? 0.9 : 0.65} />
          {[0, 45, 90, 135].map((deg) => (
            <line
              key={deg}
              x1="318"
              y1="36"
              x2="318"
              y2="14"
              stroke={sun}
              strokeWidth="3"
              strokeLinecap="round"
              opacity={light ? 0.5 : 0.35}
              transform={`rotate(${deg} 318 36)`}
            />
          ))}
        </g>

        {/* Clouds */}
        <g opacity={light ? 0.95 : 0.85}>
          <ellipse cx="72" cy="38" rx="38" ry="14" fill={cloud} />
          <ellipse cx="92" cy="34" rx="28" ry="12" fill={cloudEdge} />
          <ellipse cx="200" cy="28" rx="44" ry="16" fill={cloud} />
          <ellipse cx="228" cy="24" rx="30" ry="11" fill={cloudEdge} />
        </g>

        {/* Distant hills */}
        <path
          d="M0 78 Q80 52 160 72 T320 66 L400 74 V132 H0 Z"
          fill={hillFar}
          opacity={light ? 0.55 : 0.35}
        />
        <path
          d="M0 88 Q120 68 220 86 T400 80 V132 H0 Z"
          fill={hill}
          opacity={light ? 0.45 : 0.4}
        />

        {/* Water base */}
        <rect x="0" y="82" width="400" height="50" fill={`url(#${waterId})`} />

        {/* Animated wave tiles */}
        <g clipPath={`url(#${clipId})`}>
          <g className={styles.waveBack}>
            <path
              d="M-80 88 Q-40 82 0 88 T80 88 T160 88 T240 88 T320 88 T400 88 T480 88 V132 H-80 Z"
              fill={waterMid}
              opacity={light ? 0.65 : 0.5}
            />
          </g>
          <g className={styles.waveFront}>
            <path
              d="M-60 94 Q-20 100 20 94 T100 94 T180 94 T260 94 T340 94 T420 94 T500 94 V132 H-60 Z"
              fill={waterDeep}
              opacity={light ? 0.55 : 0.65}
            />
            <path
              d="M0 96 Q50 92 100 96 T200 96 T300 96 T400 96"
              fill="none"
              stroke={waterFoam}
              strokeWidth="4"
              strokeLinecap="round"
              opacity={light ? 0.85 : 0.45}
            />
          </g>
        </g>

        {/* Tiny fish */}
        <path d="M48 108 L56 104 L56 112 Z" fill={fish} />
        <path d="M340 114 L348 110 L348 118 Z" fill={fish} opacity={0.7} />

        {/* Buoy */}
        <g transform="translate(52, 72)">
          <rect x="-4" y="8" width="8" height="36" rx="2" fill={buoyStripeAlt} />
          <rect x="-4" y="8" width="8" height="10" fill={buoyStripe} opacity={0.95} />
          <rect x="-4" y="28" width="8" height="8" fill={buoyStripe} opacity={0.95} />
          <circle cx="0" cy="8" r="14" fill={buoyStripeAlt} />
          <circle cx="0" cy="8" r="10" fill={buoyStripe} opacity={0.9} />
          <circle cx="3" cy="5" r="3" fill={light ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.25)'} />
        </g>

        {/* Raft + mascot (bobbing) */}
        <g className={styles.bob}>
          <ellipse cx="268" cy="112" rx="52" ry="10" fill={raftShadow} opacity={light ? 0.35 : 0.5} />
          <path
            d="M228 104 Q268 96 308 104 L302 112 H234 Z"
            fill={raft}
            stroke={raftShadow}
            strokeWidth="1"
          />
          <line x1="248" y1="100" x2="248" y2="108" stroke={raftShadow} strokeWidth="2" opacity={0.6} />
          <line x1="268" y1="98" x2="268" y2="108" stroke={raftShadow} strokeWidth="2" opacity={0.6} />
          <line x1="288" y1="100" x2="288" y2="108" stroke={raftShadow} strokeWidth="2" opacity={0.6} />

          {/* Curious builder creature (original silhouette — not site artwork) */}
          <g transform="translate(252, 54)">
            <ellipse cx="16" cy="42" rx="22" ry="18" fill={mascot} />
            <ellipse cx="10" cy="38" rx="8" ry="10" fill={mascot} transform="rotate(-25 10 38)" />
            <ellipse cx="22" cy="38" rx="8" ry="10" fill={mascot} transform="rotate(25 22 38)" />
            <circle cx="10" cy="40" r="3.5" fill={light ? '#f4faf6' : ink} />
            <circle cx="22" cy="40" r="3.5" fill={light ? '#f4faf6' : ink} />
            <circle cx="11" cy="39" r="1.2" fill={ink} opacity={light ? 1 : 0} />
            <circle cx="23" cy="39" r="1.2" fill={ink} opacity={light ? 1 : 0} />
            <path
              d="M10 48 Q16 52 22 48"
              fill="none"
              stroke={mascotSoft}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Laptop */}
            <rect x="4" y="52" width="26" height="16" rx="2" fill={laptop} opacity={0.95} />
            <rect x="6" y="54" width="22" height="10" rx="1" fill={mascot} opacity={light ? 0.12 : 0.35} />
            <line x1="9" y1="58" x2="25" y2="58" stroke={mascotSoft} strokeWidth="1.5" opacity={0.6} />
            <line x1="9" y1="61" x2="18" y2="61" stroke={mascotSoft} strokeWidth="1.5" opacity={0.4} />
          </g>
        </g>

        {/* Sparkles over water */}
        <circle cx="160" cy="100" r="2" fill={waterFoam} opacity={light ? 0.9 : 0.35} />
        <circle cx="188" cy="106" r="1.5" fill={waterFoam} opacity={light ? 0.75 : 0.3} />
        <circle cx="124" cy="104" r="1.2" fill={waterFoam} opacity={light ? 0.65 : 0.28} />
      </svg>
    </div>
  )
}
