import { useKits } from '@/context/ProjectContext'
import { useMemo, useState } from 'react'
import { orderKitsById } from '@/kits'
import { DemoKitColumn } from '@/components/DemoKitColumn'
import { DocumentTitle } from '@/components/DocumentTitle'
import { MaterialKitIcons } from '@/components/MaterialKitIcons'
import { KitPaneBar } from '@/components/KitPaneBar'
import { PaneKitGrid } from '@/components/PaneKitGrid'
import { usePaneLayout } from '@/hooks/usePaneLayout'

export function AnalyzePage() {
  const kits = useKits()
  const { displayIds } = usePaneLayout('analyze')
  const visibleKits = useMemo(() => orderKitsById(displayIds, kits), [displayIds, kits])
  const [source, setSource] = useState<'upload' | 'record'>('upload')

  const steps = useMemo(
    () => [
      { id: '1', label: 'Tracing poses', status: 'complete' as const },
      { id: '2', label: 'Analyzing strokes', status: 'current' as const },
      { id: '3', label: 'Coaching tips', status: 'upcoming' as const },
    ],
    [],
  )

  return (
    <>
      <DocumentTitle title="Analyze" />
      <header className="page-head">
        <h1>Analyze (sample flow — IsoCourt-inspired)</h1>
        <p className="page-lede">
          A page-shaped stub: upload vs record, staged pipeline copy, and validation language. The <strong>sample
          content</strong> here is <strong>IsoCourt-specific</strong> in this lab; you still compare it across kit
          columns. Other projects use the same route with their kits—ask if you want additional routes (e.g. a
          different flow for UIExperiments).
        </p>
      </header>
      <KitPaneBar pageId="analyze" pageLabel="Analyze" />
      {visibleKits.length === 0 ? (
        <p className="page-empty" role="status">
          No panes visible. Turn on a design kit above to compare the flow.
        </p>
      ) : null}
      <PaneKitGrid columnCount={visibleKits.length}>
        {visibleKits.map((kit) => {
          const {
            SegmentedControl,
            Stepper,
            Metric,
            Callout,
            ProgressBar,
            Button,
            Card,
            TextField,
            Badge,
          } = kit
          const isSweccKit = kit.id.startsWith('swecc-')
          return (
            <DemoKitColumn key={kit.id} kit={kit}>
              <header className="demo-header">
                <h2 id={`${kit.id}-panel-title`}>{kit.name}</h2>
                <p>{kit.tagline}</p>
              </header>
              <MaterialKitIcons kitName={kit.name} kitId={kit.id} />
              <SegmentedControl
                ariaLabel="Clip source"
                options={[
                  { value: 'upload', label: 'Upload' },
                  { value: 'record', label: 'Record' },
                ]}
                value={source}
                onChange={(v) => setSource(v as 'upload' | 'record')}
              />
              <Stepper steps={steps} />
              <ProgressBar value={62} label={source === 'upload' ? 'Encoding clip' : 'Buffering camera'} />
              <div className="demo-metrics">
                <Metric label="Pose detection" value="78.4%" tone="positive" subvalue="Above noise floor" />
                <Metric label="Overhead read" value="41.2%" tone="negative" subvalue="Needs clearer angle" />
              </div>
              <Callout
                title={isSweccKit ? 'Peer tip' : 'Tip'}
                variant="tip"
              >
                {isSweccKit ? (
                  <>
                    Bring a resume draft or a job posting to mentor night—even rough bullets help mentors steer you
                    faster than a blank page.
                  </>
                ) : (
                  <>
                    For full-game analysis, upload each rally or quarter separately. This keeps pose tracks stable and
                    scores comparable.
                  </>
                )}
              </Callout>
              <Card
                title={isSweccKit ? 'Workshop prep' : 'Clip status'}
                subtitle={
                  isSweccKit
                    ? source === 'upload'
                      ? 'Resume PDF queued for review'
                      : 'Mock interview slot held'
                    : source === 'upload'
                      ? 'File queued'
                      : 'Camera preview armed'
                }
              >
                <p className="demo-copy">
                  {isSweccKit ? (
                    <>
                      <Badge tone="accent">Peer review</Badge> when you sign up for a circle—officers match you with a
                      mentor who has been where you want to go.
                    </>
                  ) : (
                    <>
                      <Badge tone="success">Clip ready to analyze</Badge> when validation passes — same language as the
                      live analyze view.
                    </>
                  )}
                </p>
              </Card>
              <TextField
                label={isSweccKit ? 'What you want feedback on' : 'Session label'}
                placeholder={isSweccKit ? 'e.g. Internship cold outreach, system design stories' : 'e.g. Smash practice — cam 1'}
                hint={
                  isSweccKit
                    ? 'Helps mentors prep examples before you meet.'
                    : 'Optional; helps you find reruns.'
                }
              />
              <div className="demo-actions">
                <Button variant="primary">{isSweccKit ? 'Save RSVP' : 'Analyze stroke'}</Button>
                <Button variant="secondary">{isSweccKit ? 'Email question' : 'Save draft'}</Button>
                <Button variant="ghost">{isSweccKit ? 'Browse workshops' : 'Open history'}</Button>
              </div>
            </DemoKitColumn>
          )
        })}
      </PaneKitGrid>
    </>
  )
}
