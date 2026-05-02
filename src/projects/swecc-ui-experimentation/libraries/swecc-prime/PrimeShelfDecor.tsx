import { useId } from 'react'
import { useKitDemoSurface } from '@/context/useKitDemoSurface'
import { cn } from '@/lib/utils'
import shell from '../shared/shelfDecorShell.module.css'
import styles from './prime-shelf-decor.module.css'

/** Circuit grid, Seattle skyline hint, digital #1 beacon — flagship SWE club energy (original artwork). */
export function PrimeShelfDecor() {
  const uid = useId().replace(/:/g, '')
  const bgId = `pm-bg-${uid}`
  const gridId = `pm-grid-${uid}`
  const glowId = `pm-glow-${uid}`
  const surface = useKitDemoSurface()
  const light = surface === 'light-stage'

  const voidBg = light ? '#dce8e3' : '#060908'
  const panel = light ? '#cbd8d3' : '#0c1210'
  const grid = light ? 'rgba(91, 33, 182, 0.08)' : 'rgba(126, 162, 102, 0.12)'
  const gridBold = light ? 'rgba(91, 33, 182, 0.14)' : 'rgba(167, 139, 250, 0.14)'
  const violet = light ? '#6d28d9' : '#a78bfa'
  const violetSoft = light ? '#c4b5fd' : '#7c3aed'
  const sage = light ? '#5f7a4e' : '#7ea266'
  const trace = light ? 'rgba(91, 33, 182, 0.45)' : 'rgba(167, 139, 250, 0.45)'
  const ink = light ? '#0a1210' : '#ecfdf5'

  return (
    <div className={cn(shell.wrap, light ? styles.light : styles.dark)} aria-hidden>
      <svg className={shell.svg} viewBox="0 0 400 132" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={bgId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={voidBg} />
            <stop offset="100%" stopColor={panel} />
          </linearGradient>
          <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0 H0 V24" fill="none" stroke={grid} strokeWidth="1" />
          </pattern>
          <radialGradient id={glowId} cx="72%" cy="28%" r="55%">
            <stop offset="0%" stopColor={violetSoft} stopOpacity={light ? 0.35 : 0.28} />
            <stop offset="70%" stopColor={voidBg} stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect width="400" height="132" fill={`url(#${bgId})`} />
        <rect width="400" height="132" fill={`url(#${gridId})`} />
        <rect width="400" height="132" fill={`url(#${glowId})`} />

        {/* Bold perspective grid lines */}
        <g opacity={light ? 0.55 : 0.65}>
          <line x1="0" y1="96" x2="400" y2="72" stroke={gridBold} strokeWidth="1" />
          <line x1="0" y1="108" x2="400" y2="88" stroke={gridBold} strokeWidth="0.75" opacity={0.7} />
          <line x1="0" y1="118" x2="400" y2="102" stroke={gridBold} strokeWidth="0.5" opacity={0.5} />
        </g>

        {/* Scan line */}
        <rect className={styles.scan} x="0" y="0" width="400" height="3" fill={violet} opacity={light ? 0.12 : 0.18} />

        {/* Circuit traces toward beacon */}
        <path
          className={styles.trace}
          d="M24 72 H120 Q160 72 188 56 L248 56"
          fill="none"
          stroke={trace}
          strokeWidth="2"
          strokeLinecap="square"
        />
        <path
          className={styles.trace}
          d="M32 92 H108 Q148 92 176 78"
          fill="none"
          stroke={sage}
          strokeWidth="1.5"
          strokeOpacity={0.55}
          strokeLinecap="square"
        />

        <circle className={styles.nodeA} cx="120" cy="72" r="3" fill={violet} />
        <circle className={styles.nodeB} cx="188" cy="56" r="2.5" fill={sage} />
        <circle className={styles.nodeC} cx="108" cy="92" r="2.5" fill={violetSoft} />

        {/* Seattle skyline abstraction — towers + Space Needle silhouette (not traced). */}
        <g opacity={light ? 0.28 : 0.42}>
          {/* Mid/high-rises west of the needle */}
          <rect x="22" y="98" width="16" height="34" fill={sage} opacity={0.75} />
          <rect x="40" y="86" width="18" height="46" fill={sage} opacity={0.95} />
          <rect x="60" y="94" width="12" height="38" fill={ink} opacity={light ? 0.15 : 0.35} />
          {/* Space Needle: mast + disc + collar */}
          <rect x="84" y="76" width="5" height="56" rx="1" fill={sage} />
          <rect x="71" y="70" width="31" height="9" rx="2" fill={violetSoft} opacity={light ? 0.55 : 0.4} />
          <rect x="82" y="62" width="9" height="12" rx="1" fill={sage} opacity={0.85} />
          <line x1="86.5" y1="62" x2="86.5" y2="48" stroke={sage} strokeWidth="2" strokeLinecap="round" />
          <polygon points="86.5,46 84,52 89,52" fill={violet} opacity={0.65} />
          {/* Towers east toward Elliott */}
          <rect x="104" y="90" width="14" height="42" fill={sage} opacity={0.8} />
          <rect x="120" y="72" width="20" height="60" fill={ink} opacity={light ? 0.12 : 0.32} />
          <rect x="142" y="84" width="11" height="48" fill={sage} opacity={0.7} />
          <rect x="155" y="96" width="9" height="36" fill={violetSoft} opacity={light ? 0.35 : 0.28} />
          {/* Roofline stitches */}
          <line x1="40" y1="86" x2="58" y2="86" stroke={ink} strokeWidth="1" opacity={light ? 0.2 : 0.35} />
          <line x1="120" y1="72" x2="140" y2="72" stroke={ink} strokeWidth="1" opacity={light ? 0.18 : 0.3} />
        </g>

        {/* Digital #1 trophy lock */}
        <g className={styles.beacon} transform="translate(258, 38)">
          <rect x="-2" y="-2" width="84" height="72" rx="4" fill={light ? 'rgba(244,247,246,0.92)' : 'rgba(12,16,14,0.92)'} stroke={violet} strokeWidth="2" />
          <rect x="6" y="6" width="68" height="52" rx="2" fill="none" stroke={sage} strokeWidth="1.5" opacity={0.65} />
          {/* digit 1 */}
          <rect x="38" y="18" width="10" height="34" rx="1" fill={violet} />
          <rect x="34" y="22" width="6" height="8" rx="1" fill={violetSoft} opacity={0.9} transform="rotate(-35 34 22)" />
          {/* rank chips */}
          <rect x="10" y="62" width="22" height="6" rx="1" fill={sage} opacity={0.85} />
          <rect x="36" y="62" width="38" height="6" rx="1" fill={violetSoft} opacity={light ? 0.5 : 0.45} />
        </g>

        {/* Telemetry ticks */}
        <g fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="7" fill={light ? '#5c6d66' : '#7a948a'} opacity={0.85}>
          <text x="14" y="124">
            SEA
          </text>
          <text x="38" y="124">
            SWE
          </text>
          <text x="68" y="124">
            SIG
          </text>
          <text x="102" y="124">
            ::01
          </text>
        </g>

        <rect x="318" y="112" width="62" height="3" rx="1" fill={violet} opacity={light ? 0.35 : 0.45} />
        <rect x="318" y="118" width="38" height="3" rx="1" fill={sage} opacity={0.55} />
      </svg>
    </div>
  )
}
