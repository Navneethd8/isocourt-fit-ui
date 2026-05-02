import * as SweccBuildDay from './libraries/swecc-build-day'
import {
  panelClass as sweccBuildDayPanelDark,
  panelClassLight as sweccBuildDayPanelLight,
} from './libraries/swecc-build-day/panel'
import * as AvatarBalance from './libraries/avatar-balance'
import {
  panelClass as sweccAvatarPanelDark,
  panelClassLight as sweccAvatarPanelLight,
} from './libraries/avatar-balance/panel'
import * as SweccBrand from './libraries/swecc-brand'
import { panelClass as sweccBrandPanelDark, panelClassLight as sweccBrandPanelLight } from './libraries/swecc-brand/panel'
import * as SweccDsCampusDay from './libraries/swecc-ds-campus-day'
import {
  panelClass as sweccDsCampusDayPanelDark,
  panelClassLight as sweccDsCampusDayPanelLight,
} from './libraries/swecc-ds-campus-day/panel'
import * as SweccDsGoldRush from './libraries/swecc-ds-gold-rush'
import {
  panelClass as sweccDsGoldRushPanelDark,
  panelClassLight as sweccDsGoldRushPanelLight,
} from './libraries/swecc-ds-gold-rush/panel'
import * as SweccDsGraphitePro from './libraries/swecc-ds-graphite-pro'
import {
  panelClass as sweccDsGraphiteProPanelDark,
  panelClassLight as sweccDsGraphiteProPanelLight,
} from './libraries/swecc-ds-graphite-pro/panel'
import * as SweccDsHackerPurple from './libraries/swecc-ds-hacker-purple'
import {
  panelClass as sweccDsHackerPurplePanelDark,
  panelClassLight as sweccDsHackerPurplePanelLight,
} from './libraries/swecc-ds-hacker-purple/panel'
import * as SweccDsNeonNoir from './libraries/swecc-ds-neon-noir'
import {
  panelClass as sweccDsNeonNoirPanelDark,
  panelClassLight as sweccDsNeonNoirPanelLight,
} from './libraries/swecc-ds-neon-noir/panel'
import * as SweccDsPacificDawn from './libraries/swecc-ds-pacific-dawn'
import {
  panelClass as sweccDsPacificDawnPanelDark,
  panelClassLight as sweccDsPacificDawnPanelLight,
} from './libraries/swecc-ds-pacific-dawn/panel'
import * as SweccDsTerminalGreen from './libraries/swecc-ds-terminal-green'
import {
  panelClass as sweccDsTerminalGreenPanelDark,
  panelClassLight as sweccDsTerminalGreenPanelLight,
} from './libraries/swecc-ds-terminal-green/panel'
import * as SweccDsWhiteboard from './libraries/swecc-ds-whiteboard'
import {
  panelClass as sweccDsWhiteboardPanelDark,
  panelClassLight as sweccDsWhiteboardPanelLight,
} from './libraries/swecc-ds-whiteboard/panel'
import * as SweccGreen from './libraries/swecc-green'
import { panelClass as sweccGreenPanelDark, panelClassLight as sweccGreenPanelLight } from './libraries/swecc-green/panel'
import * as SweccFinale from './libraries/swecc-finale'
import { panelClass as sweccFinalePanelDark, panelClassLight as sweccFinalePanelLight } from './libraries/swecc-finale/panel'
import * as SweccPrime from './libraries/swecc-prime'
import { panelClass as sweccPrimePanelDark, panelClassLight as sweccPrimePanelLight } from './libraries/swecc-prime/panel'
import * as SweccRainier from './libraries/swecc-rainier'
import {
  panelClass as sweccRainierPanelDark,
  panelClassLight as sweccRainierPanelLight,
} from './libraries/swecc-rainier/panel'
import * as SweccFlagshipGothic from './libraries/swecc-flagship-gothic'
import {
  panelClass as sweccFlagshipGothicPanelDark,
  panelClassLight as sweccFlagshipGothicPanelLight,
} from './libraries/swecc-flagship-gothic/panel'
import * as SweccWebsite from './libraries/swecc-website'
import { panelClass as sweccWebsitePanelDark, panelClassLight as sweccWebsitePanelLight } from './libraries/swecc-website/panel'
import type { UiKit } from '@/kitModel'

export function getKitsForSweccUiExperimentationProject(): UiKit[] {
  return [
    {
      id: 'swecc-website',
      name: 'SWECC · Live site theme',
      tagline:
        'Production palette from swecc.org CSS (`:root` / `.dark-mode`): purple copy, charcoal rules, violet pill CTAs.',
      Panel: 'dark',
      ...SweccWebsite,
      panelClass: sweccWebsitePanelDark,
      panelClassLight: sweccWebsitePanelLight,
    } as UiKit,
    {
      id: 'swecc-brand',
      name: 'SWECC · Logo lavender',
      tagline:
        'Navbar-mark purples (lavender / lilac / plum)—flat rail cards plus a lilac moonlight hero with floating facets.',
      Panel: 'dark',
      ...SweccBrand,
      panelClass: sweccBrandPanelDark,
      panelClassLight: sweccBrandPanelLight,
    } as UiKit,
    {
      id: 'swecc-green',
      name: 'SWECC · Logo green + grey',
      tagline:
        'Sage from the white lockup (~#7ea266) with neutral greys—rolling hills, drifting leaves, soft motion.',
      Panel: 'dark',
      ...SweccGreen,
      panelClass: sweccGreenPanelDark,
      panelClassLight: sweccGreenPanelLight,
    } as UiKit,
    {
      id: 'swecc-finale',
      name: 'SWECC · Finale',
      tagline:
        'Semantic UI lab: IBM Plex Sans / Serif; sage #7a9a4a primary; rebrand tokens (--text-primary, --accent light/dark); husky lavender chips; green-accent success—tokens cascade from the pane shell.',
      Panel: 'dark',
      ...SweccFinale,
      panelClass: sweccFinalePanelDark,
      panelClassLight: sweccFinalePanelLight,
    } as UiKit,
    {
      id: 'swecc-avatar',
      name: 'SWECC · Harmony (spirit × earth)',
      tagline:
        'Fan homage: parchment + spirit violet + jade earth—animated ribbons, peaks, and orbiting sparks.',
      Panel: 'dark',
      ...AvatarBalance,
      panelClass: sweccAvatarPanelDark,
      panelClassLight: sweccAvatarPanelLight,
    } as UiKit,
    {
      id: 'swecc-build-day',
      name: 'SWECC · Build day (WINFO rhythm)',
      tagline:
        'WINFO-style rhythm (pills, tracks, mono) plus an original illustrated hero—sky, waves, buoy, and a little builder on a raft—in SWECC greens.',
      Panel: 'dark',
      ...SweccBuildDay,
      panelClass: sweccBuildDayPanelDark,
      panelClassLight: sweccBuildDayPanelLight,
    } as UiKit,
    {
      id: 'swecc-prime',
      name: 'SWECC · Prime · WA flagship',
      tagline:
        'Terminal-prestige deck: Space Grotesk + JetBrains Mono, electric violet × lockup sage, circuit hero — top SWE club signal for Washington.',
      Panel: 'dark',
      ...SweccPrime,
      panelClass: sweccPrimePanelDark,
      panelClassLight: sweccPrimePanelLight,
    } as UiKit,
    {
      id: 'swecc-rainier',
      name: 'SWECC · Rainier & Red Square',
      tagline:
        'Newsreader + Source Sans 3 — peach plaster library, verdigris copper roofs; Red Square brick starts clear of Rainier’s foot.',
      Panel: 'dark',
      ...SweccRainier,
      panelClass: sweccRainierPanelDark,
      panelClassLight: sweccRainierPanelLight,
    } as UiKit,
    {
      id: 'swecc-flagship-gothic',
      name: 'SWECC · Flagship Gothic',
      tagline:
        'Prime telemetry on Rainier stone — DS Hacker Purple primaries (#7c3aed / #a78bfa) on violet-washed plaster; JetBrains rails + Newsreader gravitas; shelf circuits over the quad.',
      Panel: 'dark',
      ...SweccFlagshipGothic,
      panelClass: sweccFlagshipGothicPanelDark,
      panelClassLight: sweccFlagshipGothicPanelLight,
    } as UiKit,
    {
      id: 'swecc-ds-hacker-purple',
      name: 'SWECC DS · Hacker Purple',
      tagline:
        'Terminal × UW pride — Oxanium display, DM Mono body, Victor Mono italic accents; navy-violet tokens from the design reference.',
      Panel: 'dark',
      ...SweccDsHackerPurple,
      panelClass: sweccDsHackerPurplePanelDark,
      panelClassLight: sweccDsHackerPurplePanelLight,
    } as UiKit,
    {
      id: 'swecc-ds-gold-rush',
      name: 'SWECC DS · Gold Rush',
      tagline:
        'UW gold on black substrate — Unbounded / Syne / Martian Mono; Bloomberg-terminal confidence.',
      Panel: 'dark',
      ...SweccDsGoldRush,
      panelClass: sweccDsGoldRushPanelDark,
      panelClassLight: sweccDsGoldRushPanelLight,
    } as UiKit,
    {
      id: 'swecc-ds-pacific-dawn',
      name: 'SWECC DS · Pacific Dawn',
      tagline:
        'Seattle sky & water — Bricolage Grotesque, IBM Plex Mono, DM Serif Display; company-facing PNW polish.',
      Panel: 'dark',
      ...SweccDsPacificDawn,
      panelClass: sweccDsPacificDawnPanelDark,
      panelClassLight: sweccDsPacificDawnPanelLight,
    } as UiKit,
    {
      id: 'swecc-ds-whiteboard',
      name: 'SWECC DS · Whiteboard',
      tagline:
        'Scholarly purple ink — Playfair Display, Libre Baskerville, Courier Prime; wiki / docs energy.',
      Panel: 'dark',
      ...SweccDsWhiteboard,
      panelClass: sweccDsWhiteboardPanelDark,
      panelClassLight: sweccDsWhiteboardPanelLight,
    } as UiKit,
    {
      id: 'swecc-ds-terminal-green',
      name: 'SWECC DS · Terminal Green',
      tagline:
        'CRT phosphor green on near-black — Bebas Neue, IBM Plex Mono, Victor Mono; challenge trackers & bots.',
      Panel: 'dark',
      ...SweccDsTerminalGreen,
      panelClass: sweccDsTerminalGreenPanelDark,
      panelClassLight: sweccDsTerminalGreenPanelLight,
    } as UiKit,
    {
      id: 'swecc-ds-campus-day',
      name: 'SWECC DS · Campus Day',
      tagline:
        'Warm community directory — Fraunces, Instrument Serif, Syne; mentorship & onboarding.',
      Panel: 'dark',
      ...SweccDsCampusDay,
      panelClass: sweccDsCampusDayPanelDark,
      panelClassLight: sweccDsCampusDayPanelLight,
    } as UiKit,
    {
      id: 'swecc-ds-neon-noir',
      name: 'SWECC DS · Neon Noir',
      tagline:
        'Cyberpunk Seattle split — Syne 800, DM Mono, Oxanium; magenta × cyan accents for events.',
      Panel: 'dark',
      ...SweccDsNeonNoir,
      panelClass: sweccDsNeonNoirPanelDark,
      panelClassLight: sweccDsNeonNoirPanelLight,
    } as UiKit,
    {
      id: 'swecc-ds-graphite-pro',
      name: 'SWECC DS · Graphite Pro',
      tagline:
        'Stripe-class neutrals + amber pop — Bricolage Grotesque light, Syne, Martian Mono bold for data.',
      Panel: 'dark',
      ...SweccDsGraphitePro,
      panelClass: sweccDsGraphiteProPanelDark,
      panelClassLight: sweccDsGraphiteProPanelLight,
    } as UiKit,
  ]
}
