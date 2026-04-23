import { useKits } from '@/context/ProjectContext'
import { useMemo, useState } from 'react'
import { orderKitsById } from '@/kits'
import { DemoKitColumn } from '@/components/DemoKitColumn'
import { DocumentTitle } from '@/components/DocumentTitle'
import { KitShadcnLayer } from '@/components/KitShadcnLayer'
import { MaterialKitIcons } from '@/components/MaterialKitIcons'
import { KitPaneBar } from '@/components/KitPaneBar'
import { PaneKitGrid } from '@/components/PaneKitGrid'
import { usePaneLayout } from '@/hooks/usePaneLayout'

export function LivePage() {
  const kits = useKits()
  const { displayIds } = usePaneLayout('live')
  const visibleKits = useMemo(() => orderKitsById(displayIds, kits), [displayIds, kits])
  const [session, setSession] = useState<'idle' | 'connecting' | 'live'>('idle')

  const steps = useMemo(
    () => [
      { id: '1', label: 'Session token', status: session === 'idle' ? ('upcoming' as const) : ('complete' as const) },
      { id: '2', label: 'WebSocket', status: session === 'connecting' ? ('current' as const) : session === 'live' ? ('complete' as const) : ('upcoming' as const) },
      { id: '3', label: 'Camera stream', status: session === 'live' ? ('current' as const) : ('upcoming' as const) },
    ],
    [session],
  )

  return (
    <>
      <DocumentTitle title="Live" />
      <header className="page-head">
        <h1>Live (sample flow — IsoCourt-inspired)</h1>
        <p className="page-lede">
          Stub “live” UI: connection, capacity, and stream health. The <strong>sample</strong> here is{' '}
          <strong>IsoCourt-shaped</strong> like Analyze; kit columns are whatever the active project exposes. If you
          need another page type for a project, add it in code and wire the nav—we can do that on request.
        </p>
      </header>
      <KitPaneBar pageId="live" pageLabel="Live" />
      {visibleKits.length === 0 ? (
        <p className="page-empty" role="status">
          No panes visible. Turn on a design kit above to compare the flow.
        </p>
      ) : null}
      <PaneKitGrid columnCount={visibleKits.length}>
        {visibleKits.map((kit) => {
          const { SegmentedControl, Stepper, Metric, Callout, ProgressBar, Button, Card, Badge } = kit
          return (
            <DemoKitColumn key={kit.id} kit={kit}>
              <header className="demo-header">
                <h2 id={`${kit.id}-panel-title`}>{kit.name}</h2>
                <p>{kit.tagline}</p>
              </header>
              <MaterialKitIcons kitName={kit.name} kitId={kit.id} />
              <SegmentedControl
                ariaLabel="Session simulation"
                options={[
                  { value: 'idle', label: 'Idle' },
                  { value: 'connecting', label: 'Connecting' },
                  { value: 'live', label: 'Live' },
                ]}
                value={session}
                onChange={(v) => setSession(v as 'idle' | 'connecting' | 'live')}
              />
              <Stepper steps={steps} />
              <ProgressBar value={session === 'idle' ? 5 : session === 'connecting' ? 48 : 92} label="Link quality" />
              <div className="demo-metrics">
                <Metric label="Target FPS" value="30" subvalue="Browser capture" />
                <Metric label="RTT (est.)" value={session === 'live' ? '42 ms' : '—'} tone={session === 'live' ? 'positive' : 'default'} />
              </div>
              <Callout title="Camera access" variant="info">
                Browsers will prompt for microphone/camera permissions. Match that moment with a calm callout and a
                secondary action to fall back to upload.
              </Callout>
              {session === 'connecting' ? (
                <Callout variant="warning">If the API returns 503, show capacity messaging and offer retry — same shape as the live client.</Callout>
              ) : null}
              <Card title="Live session" subtitle="WebSocket + camera">
                <p className="demo-copy">
                  <Badge>Session</Badge>{' '}
                  <Badge tone={session === 'live' ? 'success' : 'neutral'}>
                    {session === 'live' ? 'Frames flowing' : 'Waiting'}
                  </Badge>
                </p>
              </Card>
              <div className="demo-actions">
                <Button variant="primary" onClick={() => setSession('live')}>
                  Start stream
                </Button>
                <Button variant="secondary" onClick={() => setSession('idle')}>
                  End session
                </Button>
                <Button variant="ghost">Diagnostics</Button>
              </div>
              <KitShadcnLayer />
            </DemoKitColumn>
          )
        })}
      </PaneKitGrid>
    </>
  )
}
