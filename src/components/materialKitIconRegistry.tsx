import type { ComponentType } from 'react'
import type { SvgIconProps } from '@mui/material/SvgIcon'
import AccountBalanceOutlined from '@mui/icons-material/AccountBalanceOutlined'
import AltRouteOutlined from '@mui/icons-material/AltRouteOutlined'
import ArchitectureOutlined from '@mui/icons-material/ArchitectureOutlined'
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined'
import AutoStoriesOutlined from '@mui/icons-material/AutoStoriesOutlined'
import BrushOutlined from '@mui/icons-material/BrushOutlined'
import CategoryOutlined from '@mui/icons-material/CategoryOutlined'
import CodeOutlined from '@mui/icons-material/CodeOutlined'
import CreateOutlined from '@mui/icons-material/CreateOutlined'
import DrawOutlined from '@mui/icons-material/DrawOutlined'
import ExtensionOutlined from '@mui/icons-material/ExtensionOutlined'
import FastForwardOutlined from '@mui/icons-material/FastForwardOutlined'
import GraphicEqOutlined from '@mui/icons-material/GraphicEqOutlined'
import GridOnOutlined from '@mui/icons-material/GridOnOutlined'
import HistoryEduOutlined from '@mui/icons-material/HistoryEduOutlined'
import HubOutlined from '@mui/icons-material/HubOutlined'
import HttpOutlined from '@mui/icons-material/HttpOutlined'
import LanguageOutlined from '@mui/icons-material/LanguageOutlined'
import LayersOutlined from '@mui/icons-material/LayersOutlined'
import MovieOutlined from '@mui/icons-material/MovieOutlined'
import MuseumOutlined from '@mui/icons-material/MuseumOutlined'
import OpacityOutlined from '@mui/icons-material/OpacityOutlined'
import PaletteOutlined from '@mui/icons-material/PaletteOutlined'
import PolylineOutlined from '@mui/icons-material/PolylineOutlined'
import PublicOutlined from '@mui/icons-material/PublicOutlined'
import RouteOutlined from '@mui/icons-material/RouteOutlined'
import ScatterPlotOutlined from '@mui/icons-material/ScatterPlotOutlined'
import SensorsOutlined from '@mui/icons-material/SensorsOutlined'
import SignpostOutlined from '@mui/icons-material/SignpostOutlined'
import SpaOutlined from '@mui/icons-material/SpaOutlined'
import SpeedOutlined from '@mui/icons-material/SpeedOutlined'
import StraightenOutlined from '@mui/icons-material/StraightenOutlined'
import TimelineOutlined from '@mui/icons-material/TimelineOutlined'
import TipsAndUpdatesOutlined from '@mui/icons-material/TipsAndUpdatesOutlined'
import TuneOutlined from '@mui/icons-material/TuneOutlined'
import VideoLibraryOutlined from '@mui/icons-material/VideoLibraryOutlined'
import ViewQuiltOutlined from '@mui/icons-material/ViewQuiltOutlined'
import WaterDropOutlined from '@mui/icons-material/WaterDropOutlined'
import WavesOutlined from '@mui/icons-material/WavesOutlined'
import WebAssetOutlined from '@mui/icons-material/WebAssetOutlined'

export type LabIconComponent = ComponentType<SvgIconProps>

/** Default strip for the lab site: layout, i18n, pages, tokens, composition, extensions — not sport-specific. */
export const defaultLabIconRow: LabIconComponent[] = [
  ViewQuiltOutlined,
  LanguageOutlined,
  WebAssetOutlined,
  PaletteOutlined,
  LayersOutlined,
  ExtensionOutlined,
]

/** Product-flow strip: still generic “app studio”, not tennis. */
export const productFlowIconRow: LabIconComponent[] = [
  HubOutlined,
  HttpOutlined,
  CodeOutlined,
  TimelineOutlined,
  TuneOutlined,
  TipsAndUpdatesOutlined,
]

/** Per UI Experiments kit id — glyphs echo each column’s story (site, design, media, data). */
export const uiExperimentsKitIconRows: Record<string, LabIconComponent[]> = {
  'ux-signal': [RouteOutlined, SignpostOutlined, AltRouteOutlined, TimelineOutlined, SpeedOutlined, StraightenOutlined],
  'ux-paper': [AutoStoriesOutlined, DrawOutlined, CreateOutlined, BrushOutlined, HistoryEduOutlined, SpaOutlined],
  'ux-stencil': [
    ArchitectureOutlined,
    GridOnOutlined,
    StraightenOutlined,
    CategoryOutlined,
    ViewQuiltOutlined,
    TuneOutlined,
  ],
  'ux-constellation': [
    AutoAwesomeOutlined,
    PublicOutlined,
    HubOutlined,
    ScatterPlotOutlined,
    PolylineOutlined,
    GraphicEqOutlined,
  ],
  'ux-coral': [WaterDropOutlined, OpacityOutlined, SpaOutlined, WavesOutlined, PaletteOutlined, PublicOutlined],
  'ux-vhs': [VideoLibraryOutlined, MovieOutlined, FastForwardOutlined, HttpOutlined, WebAssetOutlined, LayersOutlined],
  'ux-terracotta': [
    MuseumOutlined,
    AccountBalanceOutlined,
    ArchitectureOutlined,
    BrushOutlined,
    GridOnOutlined,
    HistoryEduOutlined,
  ],
  'ux-sonar': [SensorsOutlined, GraphicEqOutlined, ScatterPlotOutlined, PolylineOutlined, SpeedOutlined, TimelineOutlined],
}
