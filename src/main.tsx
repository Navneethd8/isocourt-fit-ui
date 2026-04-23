import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
/**
 * Hiccup: global theme — `surface.css` is authored under the IsoCourt project but applied to the
 * whole app shell (nav, lab home, modals), not only `/projects/isocourt/*`. Changing project in
 * the UI does not swap these tokens; only kit columns and resolvers in `getKitsForProject` change.
 * For per-project shell themes you’d need scoped CSS (e.g. `data-project` on root) or route-level lazy CSS.
 */
import './projects/isocourt/styles/surface.css'
import './brand/kit-fonts.css'
import './projects/isocourt/styles/kit-override.css'
import './styles/shadcn-tokens.css'
import './styles/kit-shadcn-scope.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
