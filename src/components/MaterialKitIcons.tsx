import { useProject } from '@/context/ProjectContext'
import { ISOCOURT_PROJECT_SLUG } from '@/projects/isocourt'
import { SWECC_UI_EXPERIMENTATION_PROJECT_SLUG } from '@/projects/swecc-ui-experimentation/project'
import { UI_EXPERIMENTS_PROJECT_SLUG } from '@/projects/ui-experiments'
import {
  defaultLabIconRow,
  productFlowIconRow,
  sweccKitIconRows,
  uiExperimentsKitIconRows,
  type LabIconComponent,
} from '@/components/materialKitIconRegistry'

const iconSx = { fontSize: '1.35rem' } as const

type Props = {
  /** Used for the visible caption and accessible name. */
  kitName: string
  /** When set, UI Experiments can pick a kit-specific Material row. */
  kitId?: string
}

function pickIconRow(projectSlug: string, kitId: string | undefined): LabIconComponent[] {
  if (projectSlug === UI_EXPERIMENTS_PROJECT_SLUG) {
    if (kitId && uiExperimentsKitIconRows[kitId]) {
      return uiExperimentsKitIconRows[kitId]!
    }
    return defaultLabIconRow
  }
  if (projectSlug === SWECC_UI_EXPERIMENTATION_PROJECT_SLUG) {
    if (kitId && sweccKitIconRows[kitId]) {
      return sweccKitIconRows[kitId]!
    }
    return defaultLabIconRow
  }
  if (projectSlug === ISOCOURT_PROJECT_SLUG) {
    if (kitId === 'current-site') {
      return productFlowIconRow
    }
    return defaultLabIconRow
  }
  return defaultLabIconRow
}

function captionFor(projectSlug: string): string {
  if (projectSlug === UI_EXPERIMENTS_PROJECT_SLUG) {
    return 'Icon scan (Material)'
  }
  if (projectSlug === ISOCOURT_PROJECT_SLUG) {
    return 'Material UI icons'
  }
  return 'Material icons'
}

/**
 * Same Material stroke weight across columns; which glyphs appear depends on project + kit
 * (lab surfaces vs product flow vs per-theme UI Experiments rows).
 */
export function MaterialKitIcons({ kitName, kitId }: Props) {
  const { projectSlug } = useProject()
  const Row = pickIconRow(projectSlug, kitId)
  const caption = captionFor(projectSlug)

  return (
    <div className="material-kit-icons" aria-label={`${caption} in the ${kitName} theme`}>
      <span className="material-kit-icons__caption" aria-hidden="true">
        {caption}
      </span>
      <div className="material-kit-icons__row" aria-hidden="true">
        {Row.map((Icon, i) => {
          const el = <Icon key={i} sx={iconSx} />
          if (i === 1) {
            return (
              <span key={i} className="material-kit-icons__accent">
                {el}
              </span>
            )
          }
          if (i === 5) {
            return (
              <span key={i} className="material-kit-icons__warn">
                {el}
              </span>
            )
          }
          return el
        })}
      </div>
    </div>
  )
}
