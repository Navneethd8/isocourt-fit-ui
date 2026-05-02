import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'

type ConfettiPiece = {
  id: number
  left: number
  top: number
  dx: string
  dy: string
  rot: string
  color: string
}

const MATRIX_CHARS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789'

export function DsMotionLayer({ themeSlug }: { themeSlug: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scanTick, setScanTick] = useState(0)
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (themeSlug !== 'hacker-purple') return
    setScanTick((t) => t + 1)
    const id = window.setInterval(() => setScanTick((t) => t + 1), 7200)
    return () => window.clearInterval(id)
  }, [themeSlug])

  useEffect(() => {
    if (themeSlug !== 'campus-day') return
    const root = rootRef.current
    const section = root?.closest('section')
    if (!section || !root) return

    const onCap = (e: MouseEvent) => {
      const t = e.target
      if (!(t instanceof Element)) return
      const actions = t.closest('.demo-actions')
      if (!actions || !section.contains(actions)) return
      const firstBtn = actions.querySelector(':scope > button')
      if (
        !firstBtn ||
        (t !== firstBtn && !firstBtn.contains(t))
      ) {
        return
      }

      const hr = root.getBoundingClientRect()
      const br = (firstBtn as HTMLElement).getBoundingClientRect()
      const cx = br.left + br.width / 2 - hr.left
      const cy = br.top + br.height / 2 - hr.top
      const colors = ['#6d28d9', '#f59e0b', '#ec4899', '#22c55e', '#0ea5e9']
      const base = Date.now()
      const next: ConfettiPiece[] = Array.from({ length: 26 }, (_, i) => ({
        id: base + i,
        left: cx,
        top: cy,
        dx: `${(Math.random() - 0.5) * 160}px`,
        dy: `${140 + Math.random() * 180}px`,
        rot: `${360 + Math.random() * 540}deg`,
        color: colors[i % colors.length]!,
      }))
      const spawned = new Set(next.map((p) => p.id))
      setConfetti((c) => [...c, ...next])
      window.setTimeout(() => {
        setConfetti((c) => c.filter((p) => !spawned.has(p.id)))
      }, 1400)
    }

    section.addEventListener('click', onCap, true)
    return () => section.removeEventListener('click', onCap, true)
  }, [themeSlug])

  useEffect(() => {
    if (themeSlug !== 'terminal-green') return
    const canvas = canvasRef.current
    const host = rootRef.current
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colStep = 14
    let cols: number[] = []
    let raf = 0
    let last = 0
    const fps = 11

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = host.clientWidth
      const h = host.clientHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.ceil(w / colStep) + 1
      cols = Array.from({ length: n }, () => Math.random() * h)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    resize()

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      if (t - last < 1000 / fps) return
      last = t
      const w = host.clientWidth
      const h = host.clientHeight
      if (w < 2 || h < 2) return

      ctx.fillStyle = 'rgba(4, 14, 10, 0.14)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = '11px IBM Plex Mono, ui-monospace, monospace'

      for (let i = 0; i < cols.length; i++) {
        const x = i * colStep
        let y = cols[i] ?? 0
        const ch = MATRIX_CHARS[(Math.random() * MATRIX_CHARS.length) | 0]!
        const head = Math.random() > 0.96
        ctx.fillStyle = head ? 'rgba(187, 247, 208, 0.22)' : 'rgba(74, 222, 128, 0.12)'
        ctx.fillText(ch, x, y % (h + 24))
        y += 12 + Math.random() * 10
        cols[i] = y
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [themeSlug])

  return (
    <div ref={rootRef} className="ds-motion-layer-root" aria-hidden>
      {themeSlug === 'hacker-purple' && scanTick > 0 ? (
        <div key={scanTick} className="ds-motion-scanline" />
      ) : null}
      {themeSlug === 'terminal-green' ? (
        <canvas ref={canvasRef} className="ds-motion-matrix-canvas" />
      ) : null}
      {themeSlug === 'campus-day'
        ? confetti.map((p) => (
            <span
              key={p.id}
              className="ds-motion-confetti-piece"
              style={
                {
                  left: p.left,
                  top: p.top,
                  background: p.color,
                  ['--dx' as string]: p.dx,
                  ['--dy' as string]: p.dy,
                  ['--rot' as string]: p.rot,
                } as CSSProperties
              }
            />
          ))
        : null}
    </div>
  )
}
