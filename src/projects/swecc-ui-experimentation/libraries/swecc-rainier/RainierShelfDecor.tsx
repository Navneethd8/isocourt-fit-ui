import { useId, type ReactNode } from 'react'
import { useKitDemoSurface } from '@/context/useKitDemoSurface'
import { cn } from '@/lib/utils'
import shell from '../shared/shelfDecorShell.module.css'
import styles from './rainier-shelf-decor.module.css'

/**
 * Rainier + campus library — peach plaster, verdigris roofs; brick only under Red Square (never at the mountain).
 */

const ROSE_SPOKES = [0, 45, 90, 135, 180, 225, 270, 315] as const

/** Brick paving starts past Rainier’s base (mountain paths reach ~x=220 at the datum). */
const BRICK_X0 = 226

function brickCourse(
  y: number,
  xStart: number,
  xEnd: number,
  brick: string,
  brickDark: string,
  rowOffset: number,
) {
  const w = 20
  const gap = 2
  const step = w + gap
  const els: ReactNode[] = []
  let i = 0
  for (let x = xStart + rowOffset; x < xEnd; x += step) {
    const fill = i % 2 === 0 ? brick : brickDark
    els.push(<rect key={`${y}-${x}`} x={x} y={y} width={w} height={5} fill={fill} opacity={0.92} />)
    i += 1
  }
  return els
}

export function RainierShelfDecor() {
  const uid = useId().replace(/:/g, '')
  const skyId = `sr-sky-${uid}`
  const surface = useKitDemoSurface()
  const light = surface === 'light-stage'

  const skyTop = light ? '#ebe3dc' : '#2a2420'
  const skyLow = light ? '#d4cec8' : '#161210'
  const mist = light ? 'rgba(255, 232, 220, 0.55)' : 'rgba(180, 140, 120, 0.08)'
  const mountain = light ? '#64748b' : '#5c6b7c'
  const mountainShadow = light ? '#475569' : '#3d4856'
  const snow = light ? '#ffffff' : '#f1f5f9'
  const snowShadow = light ? '#e2e8f0' : '#cbd5e1'

  const wall = light ? '#f2d5c6' : '#7a5e54'
  const wallMid = light ? '#e8c4b2' : '#634a42'
  const wallDeep = light ? '#d9a896' : '#4a3a34'
  const roof = light ? '#5a7d6e' : '#4a685c'
  const roofHighlight = light ? '#7a9e8e' : '#5f8274'

  /** Flanking Gothic towers + spires/crowns — grey stone (nave stays peach). */
  const spireTower = light ? '#9aa3ad' : '#6f7a86'
  const spireTowerDeep = light ? '#7e8792' : '#555f6a'
  const spireCap = light ? '#6b7280' : '#8b95a1'

  const brick = light ? '#a3352f' : '#c56a5c'
  const brickDark = light ? '#7f2924' : '#9a4a40'

  const window = light ? 'rgba(255,255,255,0.42)' : 'rgba(35, 25, 22, 0.45)'
  const roseStroke = wallDeep

  return (
    <div className={cn(shell.wrap, light ? styles.light : styles.dark)} aria-hidden>
      <svg className={shell.svg} viewBox="0 0 400 132" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skyTop} />
            <stop offset="100%" stopColor={skyLow} />
          </linearGradient>
        </defs>

        <rect width="400" height="132" fill={`url(#${skyId})`} />

        <rect className={styles.mist} x="0" y="72" width="400" height="48" fill={mist} />

        {/* Mt Rainier */}
        <g transform="translate(0, 8)">
          <path
            d="M-20 132 L72 132 L108 58 L142 132 L200 132 Z"
            fill={mountainShadow}
            opacity={0.85}
          />
          <path d="M8 132 L88 132 L118 52 L165 132 L220 132 Z" fill={mountain} />
          <path d="M118 52 L132 78 L108 88 Z" fill={mountainShadow} opacity={0.55} />
          <path className={styles.snowGlint} d="M108 58 L118 38 L128 52 L124 56 Z" fill={snow} />
          <path d="M114 44 L118 34 L122 44 Z" fill={snowShadow} opacity={0.9} />
          <path d="M118 38 L124 48 L118 52 Z" fill={snow} opacity={0.95} />
        </g>

        {/* Red Square brick — campus forecourt only (clear of Rainier) */}
        <g>
          <rect x={BRICK_X0} y="118" width={400 - BRICK_X0} height="14" fill={brickDark} opacity={0.95} />
          {brickCourse(120, BRICK_X0 + 4, 396, brick, brickDark, 0)}
          {brickCourse(126, BRICK_X0 + 4, 396, brickDark, brick, 11)}
        </g>

        {/* Peach nave + verdigris roofs; grey flanking spire towers */}
        <g transform="translate(218, 18)">
          {/* Left tower — grey shaft + spire, verdigris roof */}
          <rect x="0" y="54" width="34" height="64" fill={spireTower} />
          <path d="M0 54 L17 24 L34 54 Z" fill={roof} />
          <path d="M4 50 L17 28 L30 50 Z" fill={roofHighlight} opacity={0.45} />
          <rect x="14" y="10" width="6" height="16" fill={spireTowerDeep} />
          <path d="M17 10 L14 17 L20 17 Z" fill={spireCap} />
          <rect x="4" y="50" width="5" height="6" fill={spireTowerDeep} opacity={0.85} />
          <rect x="25" y="50" width="5" height="6" fill={spireTowerDeep} opacity={0.85} />
          <path d="M8 118 L8 68 L11 64 L14 68 L14 118 Z" fill={window} />
          <path d="M20 118 L20 66 L23 62 L26 62 L26 118 Z" fill={window} />

          {/* Central nave wall (peach) + copper roof triangle */}
          <path d="M34 118 L34 66 L128 66 L128 118 Z" fill={wall} />
          <path d="M34 66 L81 36 L128 66 Z" fill={roof} />
          <path d="M42 64 L81 38 L120 64 Z" fill={roofHighlight} opacity={0.35} />
          <path d="M34 76 L128 76 L128 118 L34 118 Z" fill={wallMid} opacity={0.35} />

          {/* Rose */}
          <circle
            cx="81"
            cy="54"
            r="13"
            fill={light ? 'rgba(255,248,242,0.5)' : 'rgba(40,30,28,0.45)'}
            stroke={roseStroke}
            strokeWidth="1.2"
          />
          {ROSE_SPOKES.map((deg) => {
            const r = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1="81"
                y1="54"
                x2={81 + 11 * Math.cos(r)}
                y2={54 + 11 * Math.sin(r)}
                stroke={roseStroke}
                strokeWidth="0.85"
                opacity={0.55}
              />
            )
          })}
          <circle cx="81" cy="54" r="5" fill="none" stroke={roseStroke} strokeWidth="1" opacity={0.65} />
          <circle cx="81" cy="54" r="2.2" fill={wallDeep} opacity={0.25} />

          {/* Lancet arcade */}
          <path d="M38 118 V94 Q48 80 58 94 V118 H38 Z" fill={wallDeep} opacity={0.28} />
          <path d="M62 118 V90 Q73 76 84 90 V118 H62 Z" fill={wallDeep} opacity={0.38} />
          <path d="M88 118 V94 Q98 80 108 94 V118 H88 Z" fill={wallDeep} opacity={0.28} />
          <path d="M112 118 V92 Q118 82 124 92 V118 H112 Z" fill={wallDeep} opacity={0.22} />

          {/* Buttresses */}
          <path d="M34 118 L28 66 L34 68 Z" fill={wallDeep} opacity={0.5} />
          <path d="M128 118 L134 66 L128 68 Z" fill={wallDeep} opacity={0.5} />

          {/* Right tower — grey shaft + spire, verdigris roof */}
          <rect x="124" y="42" width="40" height="76" fill={spireTower} />
          <path d="M124 42 L144 8 L164 42 Z" fill={roof} />
          <path d="M128 38 L144 14 L160 38 Z" fill={roofHighlight} opacity={0.4} />
          <rect x="141" y="0" width="6" height="14" fill={spireTowerDeep} />
          <path d="M144 0 L141 8 L147 8 Z" fill={spireCap} />
          <rect x="129" y="46" width="5" height="6" fill={spireTowerDeep} opacity={0.85} />
          <rect x="154" y="46" width="5" height="6" fill={spireTowerDeep} opacity={0.85} />
          <path d="M132 118 L132 64 L135 60 L138 60 L138 118 Z" fill={window} />
          <path d="M146 118 L146 58 L149 54 L152 54 L152 118 Z" fill={window} />
        </g>

        <text
          x="248"
          y="114"
          fontFamily="Source Sans 3, ui-sans-serif, system-ui, sans-serif"
          fontSize="8"
          fontWeight="700"
          letterSpacing="0.14em"
          fill={light ? '#6b5348' : '#c4a89c'}
          opacity={0.88}
        >
          RED SQUARE
        </text>
      </svg>
    </div>
  )
}
