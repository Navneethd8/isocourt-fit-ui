import { useKits, useProject } from '@/context/ProjectContext'
import { useMemo } from 'react'
import { orderKitsById } from '@/kits'
import { UI_EXPERIMENTS_PROJECT_SLUG } from '@/projects/ui-experiments'
import { DemoKitColumn } from '@/components/DemoKitColumn'
import { DocumentTitle } from '@/components/DocumentTitle'
import { MaterialKitIcons } from '@/components/MaterialKitIcons'
import { KitShadcnLayer } from '@/components/KitShadcnLayer'
import { KitPaneBar } from '@/components/KitPaneBar'
import { PaneKitGrid } from '@/components/PaneKitGrid'
import { usePaneLayout } from '@/hooks/usePaneLayout'

/**
 * Cross-project route: not IsoCourt-only — `useKits` reflects the active `projectSlug`.
 * Copy below references IsoCourt where that project adds the “Current” column; other projects
 * only see the shared shelf unless you add a resolver in `src/kits.ts`.
 */
export function KitShelfPage() {
  const { projectSlug } = useProject()
  const kits = useKits()
  const { displayIds } = usePaneLayout('kits')
  const visibleKits = useMemo(() => orderKitsById(displayIds, kits), [displayIds, kits])
  const showShadcnLayer = projectSlug !== UI_EXPERIMENTS_PROJECT_SLUG
  const isUiExperiments = projectSlug === UI_EXPERIMENTS_PROJECT_SLUG

  return (
    <>
      <DocumentTitle title="Kit shelf" />
      <div className="app-top">
        <header className="app-hero">
          <p className="app-eyebrow">Comparison view</p>
          <h1>Primitives, once per design kit</h1>
          <p className="app-lede">
            {isUiExperiments ? (
              <>
                Eight one-off art directions (signal, vellum, stencil, constellation, kelp, cassette, mosaic, sonar) live
                in columns here. Add or remove panes below; every enabled kit appears in one scrollable row (more than four
                columns slide sideways). No shared product narrative yet — just the primitives and the vibe.
              </>
            ) : (
              <>
                Shared exports mean you can theme new flows (upload, results, sessions) without re-plumbing props.
                <strong> IsoCourt</strong> in the <em>Current</em> column is a concrete port; the other three explore
                alternate art direction. Add or remove panes below; every enabled kit is a column in one row (more than
                four columns scroll horizontally).
              </>
            )}
          </p>
        </header>
      </div>
      <KitPaneBar pageId="kits" pageLabel="Kit shelf" />
      {visibleKits.length === 0 ? (
        <p className="page-empty" role="status">
          No panes visible. Use the chooser above to add at least one design kit.
        </p>
      ) : null}
      <PaneKitGrid columnCount={visibleKits.length}>
        {visibleKits.map((kit) => {
          const { Button, Card, TextField, Badge } = kit
          return (
            <DemoKitColumn key={kit.id} kit={kit}>
              <header className="demo-header">
                <h2 id={`${kit.id}-panel-title`}>{kit.name}</h2>
                <p>{kit.tagline}</p>
              </header>
              <MaterialKitIcons kitName={kit.name} kitId={kit.id} />
              <Card title="Generic card" subtitle="Reusable in any product flow you drop in this column">
                <p className="demo-copy">
                  Primitives stay identical across kits so you can theme new surfaces without prop churn. Swap
                  the card title to match the experiment of the day.
                </p>
                <div className="demo-row">
                  <Badge>Queued</Badge>
                  <Badge tone="accent">In progress</Badge>
                  <Badge tone="success">OK</Badge>
                  <Badge tone="warning">Review</Badge>
                </div>
              </Card>
              <TextField
                label="Item label"
                placeholder="e.g. Session 12 — variant A"
                hint="Short labels; swap copy when you add a new experiment here."
              />
              <div className="demo-actions">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              {showShadcnLayer ? <KitShadcnLayer /> : null}
            </DemoKitColumn>
          )
        })}
      </PaneKitGrid>
      <footer className="app-foot">
        Default lab theming (semantic tokens) ships from <code>src/projects/isocourt/styles/surface.css</code> today — see{' '}
        <code>main.tsx</code> hiccup comment. Panes: <code>ui-lab-pane-layout</code>; theme:{' '}
        <code>ui-lab-theme</code> in <code>localStorage</code>.
      </footer>
    </>
  )
}
