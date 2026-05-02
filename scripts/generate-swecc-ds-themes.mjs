/**
 * One-shot generator for SWECC design-system kit CSS + panel.ts files.
 * Run: node scripts/generate-swecc-ds-themes.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const libRoot = path.join(root, 'src/projects/swecc-ui-experimentation/libraries')

const SHARED_TAIL = `
.root {
  font-size: 0.92rem;
  color: var(--sw-text);
}

.button,
.buttonPrimary,
.buttonGhost {
  font-family: inherit;
  font-weight: 500;
  font-size: 0.8125rem;
  border-radius: 6px;
  padding: 0.45em 1em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  border: none;
}

.button:focus-visible,
.buttonPrimary:focus-visible,
.buttonGhost:focus-visible {
  outline: 2px solid var(--sw-focus);
  outline-offset: 2px;
}

.button {
  background: var(--sw-bg-accent);
  color: var(--sw-text-title);
  border: var(--sw-border);
}

.button:hover {
  background: var(--sw-bg-hover);
}

.buttonPrimary {
  background: var(--sw-primary);
  color: var(--sw-on-accent);
  font-weight: 600;
}

.buttonPrimary:hover {
  background: var(--sw-primary-hover);
}

.buttonGhost {
  background: transparent;
  color: var(--sw-primary);
  border: var(--sw-border);
}

.themeDark .buttonGhost {
  color: var(--sw-highlight);
  border-color: var(--sw-border-soft);
}

.buttonGhost:hover {
  background: var(--sw-bg-hover);
}

.card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border: var(--sw-border);
  border-radius: 0 10px 10px 0;
  background: var(--sw-card);
  text-align: left;
  overflow: hidden;
}

.cardRail {
  width: 6px;
  flex-shrink: 0;
  background: var(--sw-card-rail);
}

.cardMain {
  flex: 1;
  min-width: 0;
  padding: 0.65rem 0.95rem 0.85rem;
}

.cardEyebrow {
  margin: 0 0 0.2rem;
  font-family: var(--sw-font-accent);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-style: italic;
  color: var(--sw-muted-chip);
}

.title {
  margin: 0 0 0.15rem;
  font-family: var(--sw-font-display);
  font-size: 1.05rem;
  font-weight: var(--sw-display-weight, 700);
  color: var(--sw-text-title);
}

.subtitle {
  margin: 0 0 0.5rem;
  font-size: 0.76rem;
  font-weight: 500;
  color: var(--sw-text-sub);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: left;
}

.label {
  font-family: var(--sw-font-accent);
  font-size: 0.72rem;
  font-weight: 600;
  font-style: italic;
  color: var(--sw-text-title);
}

.input {
  font-family: var(--sw-font-accent);
  font-size: 0.84rem;
  border: var(--sw-border);
  border-radius: 6px;
  padding: 0.45rem 0.6rem;
  background: var(--sw-bg);
  color: var(--sw-text);
  outline: none;
  transition: border-color 0.15s ease;
}

.input:focus {
  border-color: var(--sw-primary);
  outline: 2px solid var(--sw-focus);
  outline-offset: 0;
}

.hint {
  font-family: var(--sw-font-accent);
  font-size: 0.68rem;
  font-style: italic;
  color: var(--sw-text-sub);
}

.badge,
.badgeAccent,
.badgeSuccess,
.badgeWarning {
  display: inline-flex;
  align-items: center;
  font-size: 0.62rem;
  font-weight: 600;
  padding: 0.12rem 0.4rem;
  border-radius: 4px;
  border: var(--sw-border);
}

.badge {
  background: var(--sw-bg-accent);
  color: var(--sw-text-title);
}

.badgeAccent {
  background: var(--sw-logo-lilac);
  border-color: var(--sw-logo-mid);
  color: var(--sw-plum);
}

.themeDark .badgeAccent {
  background: color-mix(in srgb, var(--sw-primary) 18%, var(--sw-card));
  border-color: var(--sw-logo-mid);
  color: var(--sw-text-title);
}

.badgeSuccess {
  background: var(--sw-bg-accent);
  border-color: var(--sw-positive);
  color: var(--sw-positive);
}

.themeDark .badgeSuccess {
  color: var(--sw-positive);
  border-color: var(--sw-positive);
}

.badgeWarning {
  background: var(--sw-bg-accent);
  border-color: var(--sw-negative);
  color: var(--sw-negative);
}

.segmented {
  display: inline-flex;
  border: var(--sw-border);
  background: var(--sw-bg-accent);
  border-radius: 6px;
  overflow: hidden;
  padding: 0;
  gap: 0;
}

.segmentedBtn,
.segmentedBtnActive {
  font-family: inherit;
  font-size: 0.74rem;
  font-weight: 500;
  padding: 0.35rem 0.65rem;
  border: none;
  background: transparent;
  color: var(--sw-text);
  cursor: pointer;
  transition: background 0.2s ease;
}

.segmentedBtn:hover {
  background: var(--sw-bg-hover);
}

.segmentedBtnActive {
  background: var(--sw-primary);
  color: var(--sw-on-accent);
}

.segmentedBtn + .segmentedBtn,
.segmentedBtn + .segmentedBtnActive,
.segmentedBtnActive + .segmentedBtn,
.segmentedBtnActive + .segmentedBtnActive {
  border-left: var(--sw-border);
}

.stepper {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.65rem;
  align-items: center;
}

.stepper li {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--sw-font-accent);
  font-size: 0.7rem;
  font-weight: 600;
}

.stepperItem {
  color: var(--sw-text);
  opacity: 0.88;
}

.stepperItemCurrent {
  color: var(--sw-text-title);
}

.stepperItemDone {
  color: var(--sw-logo-mid);
  opacity: 0.95;
}

.stepperDot,
.stepperDotCurrent,
.stepperDotDone {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--sw-bg-accent);
  border: var(--sw-border);
  flex-shrink: 0;
}

.stepperDotCurrent {
  background: var(--sw-primary);
  border-color: var(--sw-text-title);
}

.stepperDotDone {
  background: var(--sw-muted-chip);
  border-color: var(--sw-border-soft);
}

.metric {
  background: var(--sw-card);
  border: var(--sw-border);
  border-radius: 6px;
  padding: 0.55rem 0.65rem;
}

.metricLabel {
  font-family: var(--sw-font-accent);
  font-size: 0.62rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--sw-text-sub);
}

.metricValue,
.metricValuePositive,
.metricValueNegative {
  font-family: var(--sw-font-accent);
  font-size: 1.05rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--sw-text-title);
}

.metricValuePositive {
  color: var(--sw-positive);
}

.metricValueNegative {
  color: var(--sw-negative);
}

.metricSub {
  font-size: 0.68rem;
  color: var(--sw-text);
  margin-top: 0.08rem;
}

.callout,
.calloutTip,
.calloutInfo,
.calloutWarning {
  font-size: 0.78rem;
  line-height: 1.55;
  padding: 0.55rem 0.65rem;
  border: var(--sw-border);
  border-radius: 6px;
  background: var(--sw-bg-accent);
  color: var(--sw-text);
}

.calloutTip {
  border-color: var(--sw-logo-mid);
  background: var(--sw-bg);
}

.calloutInfo {
  border-color: var(--sw-border-soft);
  background: var(--sw-bg-accent);
}

.calloutWarning {
  border-color: var(--sw-negative);
  background: var(--sw-bg);
}

.calloutTitle {
  font-family: var(--sw-font-display);
  font-size: 0.72rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  color: var(--sw-text-title);
}

.progress {
  width: 100%;
}

.progressLabel {
  display: flex;
  justify-content: space-between;
  font-family: var(--sw-font-accent);
  font-size: 0.62rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--sw-text-sub);
  margin-bottom: 0.35rem;
}

.progressTrack {
  height: 8px;
  border: var(--sw-border);
  background: var(--sw-bg-accent);
  border-radius: 4px;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  width: 0;
  background: var(--sw-primary);
  transition: width 0.45s ease;
}

.themeDark .progressFill {
  background: var(--sw-highlight);
}
`

/** @type {Record<string, { slug: string; comment: string; fonts: { root: string; display: string; accent: string; displayWeight?: string }; light: Record<string,string>; dark: Record<string,string>; panelL: [string,string]; panelD: [string,string]; noItalicAccent?: boolean }>} */
const THEMES = {
  'hacker-purple': {
    slug: 'hacker-purple',
    comment: 'SWECC DS · Hacker Purple — Oxanium / DM Mono / Victor Mono.',
    fonts: {
      root: "'DM Mono', ui-monospace, monospace",
      display: "'Oxanium', sans-serif",
      accent: "'Victor Mono', ui-monospace, monospace",
    },
    light: {
      '--sw-bg': '#f4f2ff',
      '--sw-bg-accent': '#ede8ff',
      '--sw-bg-hover': '#e0daf8',
      '--sw-text': '#1a1230',
      '--sw-text-sub': '#8070b0',
      '--sw-text-title': '#1a1230',
      '--sw-logo-mid': '#a78bfa',
      '--sw-logo-lilac': '#ede8ff',
      '--sw-plum': '#1a1230',
      '--sw-primary': '#6d28d9',
      '--sw-primary-hover': '#5b21b6',
      '--sw-highlight': '#5b21b6',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#ffffff',
      '--sw-card-border': '#d4cdf4',
      '--sw-card-rail': '#6d28d9',
      '--sw-muted-chip': '#8070b0',
      '--sw-border': '1px solid #d4cdf4',
      '--sw-border-soft': '#e0dcf8',
      '--sw-focus': '#7c3aed',
      '--sw-positive': '#059669',
      '--sw-negative': '#dc2626',
    },
    dark: {
      '--sw-bg': '#0a0812',
      '--sw-bg-accent': '#120f1e',
      '--sw-bg-hover': '#1a1530',
      '--sw-text': '#e8e4f8',
      '--sw-text-sub': '#7c6fa0',
      '--sw-text-title': '#e8e4f8',
      '--sw-logo-mid': '#a78bfa',
      '--sw-logo-lilac': '#1a1530',
      '--sw-plum': '#ffffff',
      '--sw-primary': '#7c3aed',
      '--sw-primary-hover': '#a78bfa',
      '--sw-highlight': '#a78bfa',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#120f1e',
      '--sw-card-border': '#2a2040',
      '--sw-card-rail': '#7c3aed',
      '--sw-muted-chip': '#7c6fa0',
      '--sw-border': '1px solid #2a2040',
      '--sw-border-soft': '#342858',
      '--sw-focus': '#a78bfa',
      '--sw-positive': '#34d399',
      '--sw-negative': '#f87171',
    },
    panelL: ['#d4cdf4', '#f4f2ff'],
    panelD: ['#2a2040', '#0a0812'],
  },
  'gold-rush': {
    slug: 'gold-rush',
    comment: 'SWECC DS · Gold Rush — Unbounded / Syne / Martian Mono.',
    fonts: {
      root: "'Syne', sans-serif",
      display: "'Unbounded', sans-serif",
      accent: "'Martian Mono', ui-monospace, monospace",
    },
    light: {
      '--sw-bg': '#fffbeb',
      '--sw-bg-accent': '#fef3c7',
      '--sw-bg-hover': '#fde68a',
      '--sw-text': '#1c1400',
      '--sw-text-sub': '#92783a',
      '--sw-text-title': '#1c1400',
      '--sw-logo-mid': '#ffd940',
      '--sw-logo-lilac': '#fef3c7',
      '--sw-plum': '#1c1400',
      '--sw-primary': '#b45309',
      '--sw-primary-hover': '#d97706',
      '--sw-highlight': '#d97706',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#ffffff',
      '--sw-card-border': '#fde68a',
      '--sw-card-rail': '#b45309',
      '--sw-muted-chip': '#92783a',
      '--sw-border': '1px solid #fde68a',
      '--sw-border-soft': '#fcd34d',
      '--sw-focus': '#d97706',
      '--sw-positive': '#059669',
      '--sw-negative': '#dc2626',
    },
    dark: {
      '--sw-bg': '#080600',
      '--sw-bg-accent': '#110e00',
      '--sw-bg-hover': '#1c1800',
      '--sw-text': '#f5f0d8',
      '--sw-text-sub': '#8a7040',
      '--sw-text-title': '#f5f0d8',
      '--sw-logo-mid': '#ffd940',
      '--sw-logo-lilac': '#1c1800',
      '--sw-plum': '#000000',
      '--sw-primary': '#f5b800',
      '--sw-primary-hover': '#ffd940',
      '--sw-highlight': '#ffd940',
      '--sw-on-accent': '#000000',
      '--sw-card': '#110e00',
      '--sw-card-border': '#2e2600',
      '--sw-card-rail': '#f5b800',
      '--sw-muted-chip': '#8a7040',
      '--sw-border': '1px solid #2e2600',
      '--sw-border-soft': '#3d3300',
      '--sw-focus': '#ffd940',
      '--sw-positive': '#39e09b',
      '--sw-negative': '#f87171',
    },
    panelL: ['#fde68a', '#fffbeb'],
    panelD: ['#2e2600', '#080600'],
  },
  'pacific-dawn': {
    slug: 'pacific-dawn',
    comment: 'SWECC DS · Pacific Dawn — Bricolage Grotesque / IBM Plex Mono / DM Serif Display.',
    fonts: {
      root: "'IBM Plex Mono', ui-monospace, monospace",
      display: "'Bricolage Grotesque', sans-serif",
      accent: "'DM Serif Display', serif",
    },
    light: {
      '--sw-bg': '#f0f8ff',
      '--sw-bg-accent': '#e0f2fe',
      '--sw-bg-hover': '#bae6fd',
      '--sw-text': '#0c1a26',
      '--sw-text-sub': '#5888a8',
      '--sw-text-title': '#0c1a26',
      '--sw-logo-mid': '#38bdf8',
      '--sw-logo-lilac': '#e0f2fe',
      '--sw-plum': '#0c1a26',
      '--sw-primary': '#0284c7',
      '--sw-primary-hover': '#0369a1',
      '--sw-highlight': '#0369a1',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#ffffff',
      '--sw-card-border': '#bae6fd',
      '--sw-card-rail': '#0284c7',
      '--sw-muted-chip': '#5888a8',
      '--sw-border': '1px solid #bae6fd',
      '--sw-border-soft': '#7dd3fc',
      '--sw-focus': '#0ea5e9',
      '--sw-positive': '#059669',
      '--sw-negative': '#dc2626',
    },
    dark: {
      '--sw-bg': '#050e18',
      '--sw-bg-accent': '#091624',
      '--sw-bg-hover': '#0d2035',
      '--sw-text': '#d8eef8',
      '--sw-text-sub': '#5888a8',
      '--sw-text-title': '#d8eef8',
      '--sw-logo-mid': '#38bdf8',
      '--sw-logo-lilac': '#0d2035',
      '--sw-plum': '#ffffff',
      '--sw-primary': '#0ea5e9',
      '--sw-primary-hover': '#38bdf8',
      '--sw-highlight': '#38bdf8',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#091624',
      '--sw-card-border': '#0e2a40',
      '--sw-card-rail': '#0ea5e9',
      '--sw-muted-chip': '#5888a8',
      '--sw-border': '1px solid #0e2a40',
      '--sw-border-soft': '#164e72',
      '--sw-focus': '#38bdf8',
      '--sw-positive': '#34d399',
      '--sw-negative': '#f87171',
    },
    panelL: ['#bae6fd', '#f0f8ff'],
    panelD: ['#0e2a40', '#050e18'],
    noItalicAccent: true,
  },
  whiteboard: {
    slug: 'whiteboard',
    comment: 'SWECC DS · Whiteboard — Playfair / Libre Baskerville / Courier Prime.',
    fonts: {
      root: "'Libre Baskerville', serif",
      display: "'Playfair Display', serif",
      accent: "'Courier Prime', monospace",
    },
    light: {
      '--sw-bg': '#f8f7fc',
      '--sw-bg-accent': '#f0eeff',
      '--sw-bg-hover': '#e8e4fc',
      '--sw-text': '#1a1528',
      '--sw-text-sub': '#7c70a0',
      '--sw-text-title': '#1a1528',
      '--sw-logo-mid': '#a78bfa',
      '--sw-logo-lilac': '#f0eeff',
      '--sw-plum': '#1a1528',
      '--sw-primary': '#5b21b6',
      '--sw-primary-hover': '#7c3aed',
      '--sw-highlight': '#7c3aed',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#ffffff',
      '--sw-card-border': '#e0dcf8',
      '--sw-card-rail': '#5b21b6',
      '--sw-muted-chip': '#7c70a0',
      '--sw-border': '1px solid #e0dcf8',
      '--sw-border-soft': '#d4cdf4',
      '--sw-focus': '#7c3aed',
      '--sw-positive': '#059669',
      '--sw-negative': '#dc2626',
    },
    dark: {
      '--sw-bg': '#1a1a2e',
      '--sw-bg-accent': '#22223b',
      '--sw-bg-hover': '#2d2b55',
      '--sw-text': '#eeeef8',
      '--sw-text-sub': '#8888b0',
      '--sw-text-title': '#eeeef8',
      '--sw-logo-mid': '#a78bfa',
      '--sw-logo-lilac': '#2d2b55',
      '--sw-plum': '#ffffff',
      '--sw-primary': '#7c3aed',
      '--sw-primary-hover': '#a78bfa',
      '--sw-highlight': '#a78bfa',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#22223b',
      '--sw-card-border': '#3a3860',
      '--sw-card-rail': '#7c3aed',
      '--sw-muted-chip': '#8888b0',
      '--sw-border': '1px solid #3a3860',
      '--sw-border-soft': '#4a4578',
      '--sw-focus': '#a78bfa',
      '--sw-positive': '#34d399',
      '--sw-negative': '#f87171',
    },
    panelL: ['#e0dcf8', '#f8f7fc'],
    panelD: ['#3a3860', '#1a1a2e'],
    noItalicAccent: true,
  },
  'terminal-green': {
    slug: 'terminal-green',
    comment: 'SWECC DS · Terminal Green — Bebas Neue / IBM Plex Mono / Victor Mono.',
    fonts: {
      root: "'IBM Plex Mono', ui-monospace, monospace",
      display: "'Bebas Neue', sans-serif",
      accent: "'Victor Mono', ui-monospace, monospace",
    },
    light: {
      '--sw-bg': '#f0fff4',
      '--sw-bg-accent': '#dcfce7',
      '--sw-bg-hover': '#bbf7d0',
      '--sw-text': '#052e16',
      '--sw-text-sub': '#3a7048',
      '--sw-text-title': '#052e16',
      '--sw-logo-mid': '#15803d',
      '--sw-logo-lilac': '#dcfce7',
      '--sw-plum': '#052e16',
      '--sw-primary': '#16a34a',
      '--sw-primary-hover': '#15803d',
      '--sw-highlight': '#15803d',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#ffffff',
      '--sw-card-border': '#86efac',
      '--sw-card-rail': '#16a34a',
      '--sw-muted-chip': '#3a7048',
      '--sw-border': '1px solid #86efac',
      '--sw-border-soft': '#4ade80',
      '--sw-focus': '#16a34a',
      '--sw-positive': '#16a34a',
      '--sw-negative': '#dc2626',
    },
    dark: {
      '--sw-bg': '#020d06',
      '--sw-bg-accent': '#041209',
      '--sw-bg-hover': '#071a0d',
      '--sw-text': '#b0f0c0',
      '--sw-text-sub': '#3a7048',
      '--sw-text-title': '#b0f0c0',
      '--sw-logo-mid': '#4dff88',
      '--sw-logo-lilac': '#071a0d',
      '--sw-plum': '#000000',
      '--sw-primary': '#00e05a',
      '--sw-primary-hover': '#4dff88',
      '--sw-highlight': '#4dff88',
      '--sw-on-accent': '#000000',
      '--sw-card': '#041209',
      '--sw-card-border': '#082810',
      '--sw-card-rail': '#00e05a',
      '--sw-muted-chip': '#3a7048',
      '--sw-border': '1px solid #082810',
      '--sw-border-soft': '#0f3d20',
      '--sw-focus': '#4dff88',
      '--sw-positive': '#00e05a',
      '--sw-negative': '#ff6b6b',
    },
    panelL: ['#86efac', '#f0fff4'],
    panelD: ['#082810', '#020d06'],
  },
  'campus-day': {
    slug: 'campus-day',
    comment: 'SWECC DS · Campus Day — Fraunces / Instrument Serif / Syne.',
    fonts: {
      root: "'Instrument Serif', serif",
      display: "'Fraunces', serif",
      accent: "'Syne', sans-serif",
    },
    light: {
      '--sw-bg': '#faf9f7',
      '--sw-bg-accent': '#f5f1ea',
      '--sw-bg-hover': '#ebe6dc',
      '--sw-text': '#2a2520',
      '--sw-text-sub': '#9a8e80',
      '--sw-text-title': '#2a2520',
      '--sw-logo-mid': '#8b5cf6',
      '--sw-logo-lilac': '#f5f1ea',
      '--sw-plum': '#2a2520',
      '--sw-primary': '#6d28d9',
      '--sw-primary-hover': '#8b5cf6',
      '--sw-highlight': '#8b5cf6',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#ffffff',
      '--sw-card-border': '#e8e4de',
      '--sw-card-rail': '#6d28d9',
      '--sw-muted-chip': '#9a8e80',
      '--sw-border': '1px solid #e8e4de',
      '--sw-border-soft': '#dcd6cc',
      '--sw-focus': '#8b5cf6',
      '--sw-positive': '#16a34a',
      '--sw-negative': '#dc2626',
    },
    dark: {
      '--sw-bg': '#18140f',
      '--sw-bg-accent': '#22190e',
      '--sw-bg-hover': '#2e2214',
      '--sw-text': '#f5f0e8',
      '--sw-text-sub': '#8a7860',
      '--sw-text-title': '#f5f0e8',
      '--sw-logo-mid': '#8b5cf6',
      '--sw-logo-lilac': '#2e2214',
      '--sw-plum': '#ffffff',
      '--sw-primary': '#6d28d9',
      '--sw-primary-hover': '#8b5cf6',
      '--sw-highlight': '#8b5cf6',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#22190e',
      '--sw-card-border': '#3a2e1e',
      '--sw-card-rail': '#6d28d9',
      '--sw-muted-chip': '#8a7860',
      '--sw-border': '1px solid #3a2e1e',
      '--sw-border-soft': '#4d4030',
      '--sw-focus': '#a78bfa',
      '--sw-positive': '#34d399',
      '--sw-negative': '#f87171',
    },
    panelL: ['#e8e4de', '#faf9f7'],
    panelD: ['#3a2e1e', '#18140f'],
    noItalicAccent: true,
  },
  'neon-noir': {
    slug: 'neon-noir',
    comment: 'SWECC DS · Neon Noir — Syne / DM Mono / Oxanium.',
    fonts: {
      root: "'DM Mono', ui-monospace, monospace",
      display: "'Syne', sans-serif",
      accent: "'Oxanium', sans-serif",
    },
    light: {
      '--sw-bg': '#fdf4ff',
      '--sw-bg-accent': '#fae8ff',
      '--sw-bg-hover': '#f5d0fe',
      '--sw-text': '#1a0028',
      '--sw-text-sub': '#9333ea',
      '--sw-text-title': '#1a0028',
      '--sw-logo-mid': '#0891b2',
      '--sw-logo-lilac': '#fae8ff',
      '--sw-plum': '#1a0028',
      '--sw-primary': '#a21caf',
      '--sw-primary-hover': '#c026d3',
      '--sw-highlight': '#0891b2',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#ffffff',
      '--sw-card-border': '#e879f9',
      '--sw-card-rail': '#a21caf',
      '--sw-muted-chip': '#9333ea',
      '--sw-border': '1px solid #e879f9',
      '--sw-border-soft': '#d946ef',
      '--sw-focus': '#c026d3',
      '--sw-positive': '#059669',
      '--sw-negative': '#dc2626',
    },
    dark: {
      '--sw-bg': '#06010f',
      '--sw-bg-accent': '#0e0520',
      '--sw-bg-hover': '#160a30',
      '--sw-text': '#f0e8ff',
      '--sw-text-sub': '#6040a0',
      '--sw-text-title': '#f0e8ff',
      '--sw-logo-mid': '#06b6d4',
      '--sw-logo-lilac': '#160a30',
      '--sw-plum': '#ffffff',
      '--sw-primary': '#c026d3',
      '--sw-primary-hover': '#e879f9',
      '--sw-highlight': '#06b6d4',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#0e0520',
      '--sw-card-border': '#1e0e3a',
      '--sw-card-rail': '#c026d3',
      '--sw-muted-chip': '#6040a0',
      '--sw-border': '1px solid #1e0e3a',
      '--sw-border-soft': '#2d1858',
      '--sw-focus': '#06b6d4',
      '--sw-positive': '#34d399',
      '--sw-negative': '#f87171',
    },
    panelL: ['#e879f9', '#fdf4ff'],
    panelD: ['#1e0e3a', '#06010f'],
    displayWeight: '800',
  },
  'graphite-pro': {
    slug: 'graphite-pro',
    comment: 'SWECC DS · Graphite Pro — Bricolage Grotesque light / Syne / Martian Mono.',
    fonts: {
      root: "'Syne', sans-serif",
      display: "'Bricolage Grotesque', sans-serif",
      accent: "'Martian Mono', ui-monospace, monospace",
    },
    light: {
      '--sw-bg': '#f4f4f6',
      '--sw-bg-accent': '#ededf0',
      '--sw-bg-hover': '#e2e2e8',
      '--sw-text': '#101012',
      '--sw-text-sub': '#808088',
      '--sw-text-title': '#101012',
      '--sw-logo-mid': '#f97316',
      '--sw-logo-lilac': '#ededf0',
      '--sw-plum': '#101012',
      '--sw-primary': '#ea6c00',
      '--sw-primary-hover': '#f97316',
      '--sw-highlight': '#f97316',
      '--sw-on-accent': '#ffffff',
      '--sw-card': '#ffffff',
      '--sw-card-border': '#dcdce0',
      '--sw-card-rail': '#ea6c00',
      '--sw-muted-chip': '#808088',
      '--sw-border': '1px solid #dcdce0',
      '--sw-border-soft': '#d0d0d6',
      '--sw-focus': '#f97316',
      '--sw-positive': '#16a34a',
      '--sw-negative': '#dc2626',
    },
    dark: {
      '--sw-bg': '#0c0c0e',
      '--sw-bg-accent': '#141416',
      '--sw-bg-hover': '#1c1c20',
      '--sw-text': '#e8e8ec',
      '--sw-text-sub': '#606068',
      '--sw-text-title': '#e8e8ec',
      '--sw-logo-mid': '#fb923c',
      '--sw-logo-lilac': '#1c1c20',
      '--sw-plum': '#000000',
      '--sw-primary': '#f97316',
      '--sw-primary-hover': '#fb923c',
      '--sw-highlight': '#fb923c',
      '--sw-on-accent': '#000000',
      '--sw-card': '#141416',
      '--sw-card-border': '#242428',
      '--sw-card-rail': '#f97316',
      '--sw-muted-chip': '#606068',
      '--sw-border': '1px solid #242428',
      '--sw-border-soft': '#343438',
      '--sw-focus': '#fb923c',
      '--sw-positive': '#22c55e',
      '--sw-negative': '#f87171',
    },
    panelL: ['#dcdce0', '#f4f4f6'],
    panelD: ['#242428', '#0c0c0e'],
    displayWeight: '300',
    noItalicAccent: true,
  },
}

function toVars(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')
}

for (const [key, spec] of Object.entries(THEMES)) {
  const dir = path.join(libRoot, `swecc-ds-${spec.slug}`)
  const cssPath = path.join(dir, `swecc-ds-${spec.slug}.module.css`)
  const italicFix = spec.noItalicAccent
    ? `
.cardEyebrow { font-style: normal; }
.label { font-style: normal; }
.hint { font-style: normal; }
`
    : ''

  const displayWeightVar = spec.displayWeight ? `\n  --sw-display-weight: ${spec.displayWeight};` : ''

  const css = `/* ${spec.comment} */
.themeLight {
${toVars(spec.light)}
  --sw-font-display: ${spec.fonts.display};
  --sw-font-accent: ${spec.fonts.accent};${displayWeightVar}
}

.themeDark {
${toVars(spec.dark)}
  --sw-font-display: ${spec.fonts.display};
  --sw-font-accent: ${spec.fonts.accent};${displayWeightVar}
}

.themeLight .root,
.themeDark .root {
  font-family: ${spec.fonts.root};
}
${italicFix}
${SHARED_TAIL}
`
  fs.writeFileSync(cssPath, css.trimStart())

  const [bL, bgL] = spec.panelL
  const [bD, bgD] = spec.panelD
  const panel = `/** Design system pane shell — ${spec.slug.replace(/-/g, ' ')} */
export const panelClass =
  'relative overflow-hidden rounded-xl border border-solid border-[${bD}] bg-[${bgD}] p-5'

export const panelClassLight =
  'relative overflow-hidden rounded-xl !border !border-solid !border-[${bL}] !bg-[${bgL}] p-5'
`
  fs.writeFileSync(path.join(dir, 'panel.ts'), panel)

  const indexTs = `export { Button } from './Button'
export { Card } from './Card'
export { TextField } from './TextField'
export { Badge } from './Badge'
export { SegmentedControl } from './SegmentedControl'
export { Stepper } from './Stepper'
export { Metric } from './Metric'
export { Callout } from './Callout'
export { ProgressBar } from './ProgressBar'
`
  fs.writeFileSync(path.join(dir, 'index.ts'), indexTs)

  const cardTs = `import type { LibraryCardProps } from '@/shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import s from './swecc-ds-${spec.slug}.module.css'

/** ${spec.comment.split('—')[1]?.trim() ?? 'Design system kit'} */
export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  const L = useKitLightPrimitives()
  const theme = L ? s.themeLight : s.themeDark
  return (
    <article className={cn(s.card, s.root, theme, className)}>
      <div className={s.cardRail} aria-hidden />
      <div className={s.cardMain}>
        <p className={s.cardEyebrow}>SWECC · DS</p>
        <h3 className={s.title}>{title}</h3>
        {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
        {children}
      </div>
    </article>
  )
}
`
  fs.writeFileSync(path.join(dir, 'Card.tsx'), cardTs)
}

console.log('Generated', Object.keys(THEMES).length, 'SWECC DS theme kits.')
