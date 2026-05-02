import { useKits, useProject } from '@/context/ProjectContext'
import { useMemo } from 'react'
import { orderKitsById } from '@/kits'
import { UI_EXPERIMENTS_PROJECT_SLUG } from '@/projects/ui-experiments'
import { DemoKitColumn } from '@/components/DemoKitColumn'
import { DocumentTitle } from '@/components/DocumentTitle'
import { MaterialKitIcons } from '@/components/MaterialKitIcons'
import { KitPaneBar } from '@/components/KitPaneBar'
import { PaneKitGrid } from '@/components/PaneKitGrid'
import { usePaneLayout } from '@/hooks/usePaneLayout'
import { SWECC_DS_KIT_IDS } from '@/projects/swecc-ui-experimentation/designSystemKitIds'

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
          const isSweccBrandKit = kit.id === 'swecc-brand'
          const isSweccWebsiteKit = kit.id === 'swecc-website'
          const isSweccGreenKit = kit.id === 'swecc-green'
          const isSweccFinaleKit = kit.id === 'swecc-finale'
          const isSweccAvatarKit = kit.id === 'swecc-avatar'
          const isSweccPrimeKit = kit.id === 'swecc-prime'
          const isSweccRainierKit = kit.id === 'swecc-rainier'
          const isSweccFlagshipGothicKit = kit.id === 'swecc-flagship-gothic'
          const isSweccDsKit = SWECC_DS_KIT_IDS.has(kit.id)
          return (
            <DemoKitColumn key={kit.id} kit={kit}>
              <header className="demo-header">
                <h2 id={`${kit.id}-panel-title`}>{kit.name}</h2>
                <p>{kit.tagline}</p>
              </header>
              <MaterialKitIcons kitName={kit.name} kitId={kit.id} />
              {isSweccWebsiteKit ? (
                <Card
                  title="Who we are"
                  subtitle="Software Engineering Career Club · University of Washington"
                >
                  <p className="demo-copy">
                    Same purple body copy, charcoal borders, and rounded CTAs as the shipped swecc.org stylesheet—this
                    pane is the live-site theme, not the logo-derived kit beside it.
                  </p>
                  <div className="demo-row">
                    <Badge>Meetings</Badge>
                    <Badge tone="accent">Mentorship</Badge>
                    <Badge tone="success">Resume lab</Badge>
                    <Badge tone="warning">Room fills fast</Badge>
                  </div>
                </Card>
              ) : isSweccGreenKit ? (
                <Card
                  title="Peer lab night"
                  subtitle="Study tables · snacks · officers circulating"
                >
                  <p className="demo-copy">
                    The sage strip is the same green family sampled from the SWECC white lockup—paired with greys so it
                    feels grounded and informal, not corporate purple.
                  </p>
                  <div className="demo-row">
                    <Badge>Pairs session</Badge>
                    <Badge tone="accent">Algos table</Badge>
                    <Badge tone="success">Partner found</Badge>
                    <Badge tone="warning">Quiet floor</Badge>
                  </div>
                </Card>
              ) : isSweccFinaleKit ? (
                <Card
                  title="Semantic shell"
                  subtitle="Sage primary · IBM Plex Sans / Serif · husky lavender chips · --accent links / focus"
                >
                  <p className="demo-copy" id="finale-accent-link-demo">
                    Page uses <code>--bg</code>, <code>--surface</code>, <code>--surface-2</code>,{' '}
                    <code>--text-primary</code>, <code>--text-muted</code>, <code>--border</code>—no arbitrary hex in
                    components; palette literals live only on the pane token blocks. Try an{' '}
                    <a href="#finale-accent-link-demo">accent link</a> in prose.
                  </p>
                  <div className="demo-row">
                    <Badge>Neutral</Badge>
                    <Badge tone="accent">Identity</Badge>
                    <Badge tone="success">Verified</Badge>
                    <Badge tone="warning">Alert</Badge>
                  </div>
                </Card>
              ) : kit.id === 'swecc-build-day' ? (
                <Card
                  title="Sprint for social good"
                  subtitle="SWECC × build-day energy · Loew / Hub vibes"
                >
                  <p className="demo-copy">
                    Same beats as the WINFO hackathon site—hero mint field, midnight tracks slab, REGISTER pill,
                    prize-track headings—recolored entirely in SWECC logo greens for your club experiments.
                  </p>
                  <div className="demo-row">
                    <Badge>Team formation</Badge>
                    <Badge tone="accent">Mentor swim</Badge>
                    <Badge tone="success">Demo OK</Badge>
                    <Badge tone="warning">Submit cutoff</Badge>
                  </div>
                </Card>
              ) : isSweccPrimeKit ? (
                <Card
                  title="Statewide signal"
                  subtitle="UW Software Engineering Career Club — the club other chapters measure against"
                >
                  <p className="demo-copy">
                    Graphite deck, telemetry type, and a circuit hero with a digital #1 lock: this column is the
                    “we ship the best student SWE program in Washington” flex—pair it with the live-site pane when
                    you need production parity.
                  </p>
                  <div className="demo-row">
                    <Badge>Flagship</Badge>
                    <Badge tone="accent">Seattle hub</Badge>
                    <Badge tone="success">Offer track</Badge>
                    <Badge tone="warning">Competitive cap</Badge>
                  </div>
                </Card>
              ) : isSweccRainierKit ? (
                <Card
                  title="Quad office hours"
                  subtitle="Peach walls · patina copper roofs · brick only on the Red Square side"
                >
                  <p className="demo-copy">
                    Warm plaster on the library silhouette and verdigris roof shapes; brick paving is clipped to the
                    campus forecourt so nothing red reads against the mountain mass.
                  </p>
                  <div className="demo-row">
                    <Badge>Campus</Badge>
                    <Badge tone="accent">Copper roof</Badge>
                    <Badge tone="success">Summit cap</Badge>
                    <Badge tone="warning">Fog rolling</Badge>
                  </div>
                </Card>
              ) : isSweccFlagshipGothicKit ? (
                <Card
                  title="Signal on stone"
                  subtitle="Grey spires + copper roofs · violet rails read like a flagship ops deck"
                >
                  <p className="demo-copy">
                    Merges Prime’s uppercase mono controls and electric accents with Rainier’s plaster field and gothic
                    massing—think statewide SWE credibility without losing the library silhouette.
                  </p>
                  <div className="demo-row">
                    <Badge>Flagship</Badge>
                    <Badge tone="accent">Quad</Badge>
                    <Badge tone="success">Telemetry</Badge>
                    <Badge tone="warning">Fog low</Badge>
                  </div>
                </Card>
              ) : isSweccAvatarKit ? (
                <Card title="Temple scroll" subtitle="Parchment light · spirit twilight when you flip the column">
                  <p className="demo-copy">
                    Violet spine, jade footing, jade primary buttons—purple segmented chips—meant to evoke harmony of
                    opposing energies (fan homage, not official IP).
                  </p>
                  <div className="demo-row">
                    <Badge>Air</Badge>
                    <Badge tone="accent">Spirit</Badge>
                    <Badge tone="success">Earth</Badge>
                    <Badge tone="warning">Tempest</Badge>
                  </div>
                </Card>
              ) : isSweccBrandKit ? (
                <Card
                  title="Wednesday meeting"
                  subtitle="Loew 216 · 5:30–6:30 PM · Spring 2026"
                >
                  <p className="demo-copy">
                    Resume feedback, interview prep, and mentor circles—bring questions, leave with a clearer next step
                    toward a software career.
                  </p>
                  <div className="demo-row">
                    <Badge>New member</Badge>
                    <Badge tone="accent">Mentor night</Badge>
                    <Badge tone="success">RSVP open</Badge>
                    <Badge tone="warning">Room cap</Badge>
                  </div>
                </Card>
              ) : isSweccDsKit ? (
                <Card
                  title="Design system primitives"
                  subtitle={kit.name.replace(/^SWECC DS · /, '')}
                >
                  <p className="demo-copy">
                    {kit.tagline} This column is token-for-token with the SWECC eight-theme reference—fonts, surfaces,
                    accents—so you can pick a lane before wiring motion (scanlines, shimmer, etc.) into real routes.
                  </p>
                  <div className="demo-row">
                    <Badge>Tokens</Badge>
                    <Badge tone="accent">Typography</Badge>
                    <Badge tone="success">Light + dark</Badge>
                    <Badge tone="warning">Motion later</Badge>
                  </div>
                </Card>
              ) : (
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
              )}
              <TextField
                label={
                  isSweccWebsiteKit
                    ? 'UW email'
                    : isSweccGreenKit
                      ? 'Topic at your table'
                      : isSweccFinaleKit
                        ? 'Token note'
                        : isSweccBrandKit
                          ? 'Focus this quarter'
                          : kit.id === 'swecc-build-day'
                            ? 'Project working title'
                            : isSweccPrimeKit
                              ? 'Deployment target'
                              : isSweccRainierKit
                                ? 'Landmark note'
                                : isSweccFlagshipGothicKit
                                  ? 'Ops + campus note'
                                  : isSweccAvatarKit
                                    ? 'Lesson note'
                                    : isSweccDsKit
                                      ? 'Theme usage note'
                                      : 'Item label'
                }
                placeholder={
                  isSweccWebsiteKit
                    ? 'you@uw.edu'
                    : isSweccGreenKit
                      ? 'e.g. Binary trees, CI/CD basics'
                      : isSweccFinaleKit
                        ? 'e.g. --surface-2 on hubs · --accent for links'
                        : isSweccBrandKit
                          ? 'e.g. Leet patterns, portfolio story'
                          : kit.id === 'swecc-build-day'
                            ? 'e.g. Mentorship matcher, study buddy bot'
                            : isSweccPrimeKit
                              ? 'e.g. FAANG onsite sprint · statewide summit keynote'
                              : isSweccRainierKit
                                ? 'e.g. Suzzallo study sprint · Rainier clearness calendar'
                                : isSweccFlagshipGothicKit
                                  ? 'e.g. Chapter sync · Red Square livestream runbook'
                                  : isSweccAvatarKit
                                    ? 'e.g. Balance drills, steady breathing'
                                    : isSweccDsKit
                                      ? 'e.g. Dashboard = Hacker Purple · docs = Whiteboard'
                                      : 'e.g. Session 12 — variant A'
                }
                hint={
                  isSweccWebsiteKit
                    ? 'How the public site would gate a simple signup field—same chrome as the rest of this column.'
                    : isSweccGreenKit
                      ? 'Helps officers route you to a mentor who likes that stack.'
                      : isSweccFinaleKit
                        ? 'Finale variables—paste the same names into product CSS when this deck ships beyond the lab.'
                        : isSweccBrandKit
                          ? 'What you want out of SWECC this term—peers and mentors can point you to the right workshop.'
                          : kit.id === 'swecc-build-day'
                            ? 'Hackathon-style pitch field—mono label like WINFO schedule meta.'
                            : isSweccPrimeKit
                              ? 'Prime deck copy—telemetry labels read like a systems dashboard, not generic forms.'
                              : isSweccRainierKit
                                ? 'Rainier deck—warm brick accent rails echo Red Square; serif titles carry campus gravitas.'
                                : isSweccFlagshipGothicKit
                                  ? 'Hybrid hint—mono labels stay technical while Newsreader titles stay architectural.'
                                  : isSweccAvatarKit
                                    ? 'Placeholder lore—swap for real flow copy when you ship a screen.'
                                    : isSweccDsKit
                                      ? 'Where this theme should ship—motion recipes from the reference doc layer on separately.'
                                      : 'Short labels; swap copy when you add a new experiment here.'
                }
              />
              <div className="demo-actions">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                {kit.id === 'swecc-finale' ? (
                  <Button variant="destructive">Destructive</Button>
                ) : null}
              </div>
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
