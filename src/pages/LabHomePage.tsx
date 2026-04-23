import { Link } from 'react-router-dom'
import { DocumentTitle } from '../components/DocumentTitle'
import { DEFAULT_PROJECT_SLUG } from '../projects/registry'

export function LabHomePage() {
  return (
    <>
      <DocumentTitle title="UI lab" />
      <div className="app-top">
        <header className="app-hero">
          <p className="app-eyebrow">UI lab</p>
          <h1>A home for interface experiments</h1>
          <p className="app-lede">
            Use this as a long-lived sandbox: compare design kits, sketch flows, and hand off to agents without
            product-specific framing. <strong>IsoCourt</strong> is the first real-world experiment in the shelf
            (production-grade skin in the “Current” column); everything else is infrastructure you can repurpose
            for the next one. Code and styles for a project live under <code>src/projects/&lt;slug&gt;/</code>—see{' '}
            <code>src/projects/isocourt</code> for the template.
          </p>
        </header>
      </div>

      <section className="lab-landing" aria-label="Ways in">
        <article className="lab-landing__card">
          <h2 className="lab-landing__h">Kit shelf</h2>
          <p>
            The full primitive grid: buttons, cards, fields, badges, and a shadcn check layer — repeated once per
            design kit.
          </p>
          <p className="lab-landing__row">
            <Link to="/projects" className="lab-landing__cta lab-landing__cta--ghost">
              All projects
            </Link>
            <Link to={`/projects/${DEFAULT_PROJECT_SLUG}/kits`} className="lab-landing__cta">
              Open kit shelf
            </Link>
          </p>
        </article>
        <article className="lab-landing__card">
          <h2 className="lab-landing__h">Sample flows (IsoCourt)</h2>
          <p>
            The original brief — analyze upload vs record, then live session UI — as page-shaped sketches. Tweak
            copy to match your next project or replace the children entirely in place.
          </p>
          <p className="lab-landing__row">
            <Link to={`/projects/${DEFAULT_PROJECT_SLUG}/analyze`} className="lab-landing__cta">
              Analyze
            </Link>
            <Link to={`/projects/${DEFAULT_PROJECT_SLUG}/live`} className="lab-landing__cta lab-landing__cta--ghost">
              Live
            </Link>
          </p>
        </article>
        <article className="lab-landing__card lab-landing__card--wide">
          <h2 className="lab-landing__h">Panorama & feedback</h2>
          <p>
            On each page, use the <strong>panes</strong> bar to show or hide design-kit columns (saved per
            page). Every column has a local <strong>poll</strong> and <strong>comment</strong> thread for quick
            critique while you iterate. Nothing leaves this browser.
          </p>
        </article>
      </section>
    </>
  )
}
