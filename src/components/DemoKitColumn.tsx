import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { KitDemoSurface } from '../context/kit-demo-surface'
import { KitDemoSurfaceProvider } from '../context/KitDemoSurfaceProvider'
import { useEffectiveColorMode } from '../hooks/useEffectiveColorMode'
import type { UiKit } from '../kitModel'
import { panelClass as defaultDarkPanelClass } from '../libraries/isometric-chalk/panel'
import { PaneFeedback } from './PaneFeedback'

export function DemoKitColumn({ kit, children }: { kit: UiKit; children: ReactNode }) {
  const mode = useEffectiveColorMode()
  const isLightUi = mode === 'light'
  const { Panel, id, name } = kit

  const surface: KitDemoSurface =
    Panel === 'light' ? 'light-stage' : isLightUi ? 'light-stage' : 'dark-stage'

  const inner = <div className="demo-stack">{children}</div>
  const labelledBy = `${id}-panel-title`

  if (Panel === 'dark') {
    const lightStage = surface === 'light-stage'
    const stage = lightStage ? (kit.panelClassLight ?? '') : (kit.panelClass ?? defaultDarkPanelClass)
    const sectionCls = lightStage
      ? cn('demo-panel demo-panel--light', stage)
      : cn('demo-panel demo-panel--dark', stage)

    return (
      <div className="demo-kit-column">
        <KitDemoSurfaceProvider value={surface}>
          <section className={sectionCls} aria-labelledby={labelledBy} data-kit-id={id}>
            {inner}
          </section>
        </KitDemoSurfaceProvider>
        <PaneFeedback paneId={id} panelTitle={name} />
      </div>
    )
  }

  return (
    <div className="demo-kit-column">
      <KitDemoSurfaceProvider value={surface}>
        <section className="demo-panel demo-panel--light" aria-labelledby={labelledBy} data-kit-id={id}>
          {inner}
        </section>
      </KitDemoSurfaceProvider>
      <PaneFeedback paneId={id} panelTitle={name} />
    </div>
  )
}
