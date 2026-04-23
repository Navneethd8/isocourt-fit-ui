/** Tailwind twin for Iso Board in light-stage — matches dark kit perspective + isometric tilt. */
export const chalkLightTw = {
  wrap: 'inline-block max-w-full [perspective:1200px]',
  cardWrap: 'block max-w-full [perspective:1200px]',
  root: 'font-sans text-neutral-900',
  button:
    'transform-gpu [border-radius:4px_12px_8px_10px/10px_6px_12px_8px] border-2 border-dashed border-neutral-300 bg-white px-4 py-2 text-sm font-semibold tracking-tight text-neutral-800 shadow-sm transition-[transform,border-color,background-color] duration-150 ease-out [transform:rotateX(2deg)_rotateY(-3deg)] hover:[transform:rotateX(0deg)_rotateY(0deg)_translateY(-1px)] hover:border-neutral-400/90 hover:bg-neutral-50/80',
  buttonPrimary:
    'transform-gpu [border-radius:6px_14px_10px_12px/12px_8px_14px_10px] border-2 border-emerald-500 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900 shadow-[0_10px_0_rgba(15,118,110,0.22)] transition-[transform,box-shadow,background-color] duration-150 ease-out [transform:rotateX(2deg)_rotateY(-3deg)] hover:[transform:rotateX(0deg)_rotateY(0deg)_translateY(-2px)] hover:bg-emerald-100/90 hover:shadow-[0_12px_0_rgba(15,118,110,0.18)] active:[transform:translateY(4px)] active:shadow-[0_6px_0_rgba(15,118,110,0.28)]',
  buttonGhost:
    'transform-gpu rounded-lg border-2 border-dashed border-transparent bg-transparent px-4 py-2 text-sm font-semibold text-rose-600 transition-[transform,border-color,background-color] duration-150 ease-out [transform:rotateX(2deg)_rotateY(-3deg)] hover:[transform:rotateX(0deg)_rotateY(0deg)_translateY(-1px)] hover:border-rose-300/90 hover:bg-rose-50/80',
  card:
    'transform-gpu [transform-style:preserve-3d] [border-radius:10px_18px_14px_12px/14px_10px_18px_16px] border-2 border-neutral-200 bg-gradient-to-br from-white via-white to-neutral-100/95 p-4 text-left shadow-[0_20px_40px_rgba(15,23,42,0.12)] transition-transform duration-150 ease-out [transform:rotateX(6deg)_rotateY(-8deg)] hover:[transform:rotateX(5deg)_rotateY(-6deg)_translateY(-1px)]',
  title: 'm-0 mb-0.5 text-base font-bold tracking-tight text-neutral-900 [text-shadow:0_0_14px_rgba(255,255,255,0.9)]',
  subtitle: 'm-0 mb-2.5 text-xs font-medium text-neutral-500',
  field: 'flex flex-col gap-1.5 text-left',
  label: 'text-xs font-semibold text-neutral-500',
  input:
    'rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-inner outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25',
  hint: 'text-xs text-neutral-500',
  badge:
    'inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-600',
  badgeAccent: 'inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700',
  badgeSuccess:
    'inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800',
  badgeWarning:
    'inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-900',
  segmented: 'inline-flex max-w-full flex-wrap gap-1 rounded-lg border border-neutral-200 bg-neutral-100/90 p-1',
  segmentedBtn:
    'rounded-md border border-transparent bg-transparent px-3 py-1.5 text-xs font-semibold text-neutral-500 transition-colors hover:text-neutral-800',
  segmentedBtnActive:
    'rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm',
  stepper: 'm-0 flex list-none flex-wrap items-center gap-x-4 gap-y-2 p-0',
  stepperItem: 'flex items-center gap-1.5 text-xs font-semibold text-neutral-500',
  stepperItemCurrent: 'flex items-center gap-1.5 text-xs font-semibold text-emerald-700',
  stepperItemDone: 'flex items-center gap-1.5 text-xs font-semibold text-emerald-600',
  stepperDot: 'h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300',
  stepperDotCurrent: 'h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.25)]',
  stepperDotDone: 'h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500',
  metric:
    'transform-gpu rounded-lg border border-neutral-200 bg-white/90 p-3 shadow-sm transition-transform duration-150 [transform:rotateX(3deg)_rotateY(-4deg)] hover:[transform:rotateX(2deg)_rotateY(-3deg)]',
  metricLabel: 'mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-500',
  metricValue: 'text-lg font-bold tracking-tight text-neutral-900',
  metricValuePositive: 'text-lg font-bold tracking-tight text-emerald-700',
  metricValueNegative: 'text-lg font-bold tracking-tight text-rose-600',
  metricSub: 'mt-0.5 text-xs text-neutral-500',
  calloutTip:
    'transform-gpu rounded-lg border border-emerald-200 bg-emerald-50/90 p-3 text-sm leading-snug text-emerald-950 shadow-sm transition-transform duration-150 [transform:rotateX(3deg)_rotateY(-4deg)]',
  calloutInfo:
    'transform-gpu rounded-lg border border-sky-200 bg-sky-50/90 p-3 text-sm leading-snug text-sky-950 shadow-sm transition-transform duration-150 [transform:rotateX(3deg)_rotateY(-4deg)]',
  calloutWarning:
    'transform-gpu rounded-lg border border-amber-200 bg-amber-50/90 p-3 text-sm leading-snug text-amber-950 shadow-sm transition-transform duration-150 [transform:rotateX(3deg)_rotateY(-4deg)]',
  calloutTitle: 'm-0 mb-1.5 text-xs font-semibold text-neutral-800',
  progress: 'w-full',
  progressLabel: 'mb-1.5 flex justify-between text-[11px] font-semibold text-neutral-500',
  progressTrack: 'h-2 w-full overflow-hidden rounded-full border border-neutral-200 bg-neutral-100',
  progressFill: 'h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-[width] duration-300',
} as const
