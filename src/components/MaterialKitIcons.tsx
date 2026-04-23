import AnalyticsOutlined from '@mui/icons-material/AnalyticsOutlined'
import ModelTrainingOutlined from '@mui/icons-material/ModelTrainingOutlined'
import SmartToyOutlined from '@mui/icons-material/SmartToyOutlined'
import SportsTennisOutlined from '@mui/icons-material/SportsTennisOutlined'
import TipsAndUpdatesOutlined from '@mui/icons-material/TipsAndUpdatesOutlined'
import VideocamOutlined from '@mui/icons-material/VideocamOutlined'

const iconSx = { fontSize: '1.35rem' } as const

type Props = {
  /** Used for the visible caption and accessible name. */
  kitName: string
}

/**
 * Fixed Material UI icon set so each kit column shows how the same glyphs read
 * on that kit’s surfaces (stroke weight is consistent; colour comes from layout CSS).
 */
export function MaterialKitIcons({ kitName }: Props) {
  return (
    <div className="material-kit-icons" aria-label={`Material UI icons in the ${kitName} theme`}>
      <span className="material-kit-icons__caption" aria-hidden="true">
        Material UI icons
      </span>
      <div className="material-kit-icons__row" aria-hidden="true">
        <SportsTennisOutlined sx={iconSx} />
        <span className="material-kit-icons__accent">
          <SmartToyOutlined sx={iconSx} />
        </span>
        <VideocamOutlined sx={iconSx} />
        <AnalyticsOutlined sx={iconSx} />
        <ModelTrainingOutlined sx={iconSx} />
        <span className="material-kit-icons__warn">
          <TipsAndUpdatesOutlined sx={iconSx} />
        </span>
      </div>
    </div>
  )
}
