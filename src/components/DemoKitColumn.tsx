import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { KitDemoSurface } from '../context/kit-demo-surface'
import { KitDemoSurfaceProvider } from '../context/KitDemoSurfaceProvider'
import { useEffectiveColorMode } from '../hooks/useEffectiveColorMode'
import type { UiKit } from '../kitModel'
import { panelClass as defaultDarkPanelClass } from '../libraries/isometric-chalk/panel'
import { sweccDsThemeSlug } from '../projects/swecc-ui-experimentation/designSystemKitIds'
import '../projects/swecc-ui-experimentation/ds-motion.css'
import { DsMotionLayer } from './DsMotionLayer'
import { PaneFeedback } from './PaneFeedback'

export function DemoKitColumn({ kit, children }: { kit: UiKit; children: ReactNode }) {
  const mode = useEffectiveColorMode()
  const isLightUi = mode === 'light'
  const { Panel, id, name } = kit

  const surface: KitDemoSurface =
    Panel === 'light' ? 'light-stage' : isLightUi ? 'light-stage' : 'dark-stage'

  const ShelfDecor = kit.ShelfDecor
  const dsThemeSlug = sweccDsThemeSlug(id)
  const inner = (
    <div className="demo-stack">
      {ShelfDecor ? <ShelfDecor /> : null}
      {children}
    </div>
  )
  const labelledBy = `${id}-panel-title`
  const motionLayer =
    dsThemeSlug != null ? (
      <div className="ds-motion-layer-host">
        <DsMotionLayer themeSlug={dsThemeSlug} />
      </div>
    ) : null

  if (Panel === 'dark') {
    const lightStage = surface === 'light-stage'
    const stage = lightStage ? (kit.panelClassLight ?? '') : (kit.panelClass ?? defaultDarkPanelClass)
    const sectionCls = lightStage
      ? cn('demo-panel demo-panel--light', dsThemeSlug && 'ds-motion-panel', stage)
      : cn('demo-panel demo-panel--dark', dsThemeSlug && 'ds-motion-panel', stage)

    return (
      <div className="demo-kit-column">
        <KitDemoSurfaceProvider value={surface}>
          <section
            className={sectionCls}
            aria-labelledby={labelledBy}
            data-kit-id={id}
            data-ds-theme={dsThemeSlug ?? undefined}
          >
            {motionLayer}
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
        <section
          className={cn('demo-panel demo-panel--light', dsThemeSlug && 'ds-motion-panel')}
          aria-labelledby={labelledBy}
          data-kit-id={id}
          data-ds-theme={dsThemeSlug ?? undefined}
        >
          {motionLayer}
          {inner}
        </section>
      </KitDemoSurfaceProvider>
      <PaneFeedback paneId={id} panelTitle={name} />
    </div>
  )
}
