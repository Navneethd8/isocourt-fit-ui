import type { ComponentType } from 'react'
import type { SvgIconProps } from '@mui/material/SvgIcon'
import AccountBalanceOutlined from '@mui/icons-material/AccountBalanceOutlined'
import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined'
import AltRouteOutlined from '@mui/icons-material/AltRouteOutlined'
import ArchitectureOutlined from '@mui/icons-material/ArchitectureOutlined'
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined'
import AutoStoriesOutlined from '@mui/icons-material/AutoStoriesOutlined'
import BoltOutlined from '@mui/icons-material/BoltOutlined'
import BrushOutlined from '@mui/icons-material/BrushOutlined'
import CategoryOutlined from '@mui/icons-material/CategoryOutlined'
import CodeOutlined from '@mui/icons-material/CodeOutlined'
import CreateOutlined from '@mui/icons-material/CreateOutlined'
import DrawOutlined from '@mui/icons-material/DrawOutlined'
import ExtensionOutlined from '@mui/icons-material/ExtensionOutlined'
import FilterHdrOutlined from '@mui/icons-material/FilterHdrOutlined'
import FastForwardOutlined from '@mui/icons-material/FastForwardOutlined'
import EmojiEventsOutlined from '@mui/icons-material/EmojiEventsOutlined'
import EventAvailableOutlined from '@mui/icons-material/EventAvailableOutlined'
import GrassOutlined from '@mui/icons-material/GrassOutlined'
import GroupsOutlined from '@mui/icons-material/GroupsOutlined'
import GraphicEqOutlined from '@mui/icons-material/GraphicEqOutlined'
import GridOnOutlined from '@mui/icons-material/GridOnOutlined'
import HistoryEduOutlined from '@mui/icons-material/HistoryEduOutlined'
import HubOutlined from '@mui/icons-material/HubOutlined'
import HttpOutlined from '@mui/icons-material/HttpOutlined'
import LanguageOutlined from '@mui/icons-material/LanguageOutlined'
import LeaderboardOutlined from '@mui/icons-material/LeaderboardOutlined'
import LayersOutlined from '@mui/icons-material/LayersOutlined'
import MilitaryTechOutlined from '@mui/icons-material/MilitaryTechOutlined'
import MovieOutlined from '@mui/icons-material/MovieOutlined'
import MuseumOutlined from '@mui/icons-material/MuseumOutlined'
import OpacityOutlined from '@mui/icons-material/OpacityOutlined'
import PaletteOutlined from '@mui/icons-material/PaletteOutlined'
import ParkOutlined from '@mui/icons-material/ParkOutlined'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import PolylineOutlined from '@mui/icons-material/PolylineOutlined'
import PublicOutlined from '@mui/icons-material/PublicOutlined'
import RocketLaunchOutlined from '@mui/icons-material/RocketLaunchOutlined'
import RouteOutlined from '@mui/icons-material/RouteOutlined'
import ScatterPlotOutlined from '@mui/icons-material/ScatterPlotOutlined'
import SensorsOutlined from '@mui/icons-material/SensorsOutlined'
import SignpostOutlined from '@mui/icons-material/SignpostOutlined'
import SpaOutlined from '@mui/icons-material/SpaOutlined'
import SpeedOutlined from '@mui/icons-material/SpeedOutlined'
import StraightenOutlined from '@mui/icons-material/StraightenOutlined'
import TerminalOutlined from '@mui/icons-material/TerminalOutlined'
import TimelineOutlined from '@mui/icons-material/TimelineOutlined'
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined'
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

/** SWECC UI Experimentation — optional per-pane Material rows. */
export const sweccKitIconRows: Record<string, LabIconComponent[]> = {
  'swecc-avatar': [
    AutoAwesomeOutlined,
    GrassOutlined,
    WaterDropOutlined,
    SpaOutlined,
    WavesOutlined,
    PublicOutlined,
  ],
  'swecc-build-day': [
    EventAvailableOutlined,
    GroupsOutlined,
    EmojiEventsOutlined,
    CodeOutlined,
    HubOutlined,
    TipsAndUpdatesOutlined,
  ],
  'swecc-finale': [
    PaletteOutlined,
    LayersOutlined,
    CategoryOutlined,
    TuneOutlined,
    ViewQuiltOutlined,
    StraightenOutlined,
  ],
  'swecc-prime': [
    EmojiEventsOutlined,
    MilitaryTechOutlined,
    RocketLaunchOutlined,
    TerminalOutlined,
    LeaderboardOutlined,
    BoltOutlined,
  ],
  'swecc-rainier': [
    FilterHdrOutlined,
    ApartmentOutlined,
    MuseumOutlined,
    ParkOutlined,
    PlaceOutlined,
    PublicOutlined,
  ],
  'swecc-flagship-gothic': [
    TerminalOutlined,
    ArchitectureOutlined,
    MilitaryTechOutlined,
    MuseumOutlined,
    FilterHdrOutlined,
    BoltOutlined,
  ],
  'swecc-ds-hacker-purple': [
    TerminalOutlined,
    CodeOutlined,
    HubOutlined,
    TimelineOutlined,
    SpeedOutlined,
    BoltOutlined,
  ],
  'swecc-ds-gold-rush': [
    EmojiEventsOutlined,
    TrendingUpOutlined,
    LeaderboardOutlined,
    MilitaryTechOutlined,
    TimelineOutlined,
    TipsAndUpdatesOutlined,
  ],
  'swecc-ds-pacific-dawn': [
    WavesOutlined,
    WaterDropOutlined,
    PublicOutlined,
    ParkOutlined,
    GraphicEqOutlined,
    SpaOutlined,
  ],
  'swecc-ds-whiteboard': [
    AutoStoriesOutlined,
    HistoryEduOutlined,
    ArchitectureOutlined,
    GridOnOutlined,
    DrawOutlined,
    BrushOutlined,
  ],
  'swecc-ds-terminal-green': [
    SensorsOutlined,
    TerminalOutlined,
    HttpOutlined,
    CodeOutlined,
    TuneOutlined,
    TipsAndUpdatesOutlined,
  ],
  'swecc-ds-campus-day': [
    GroupsOutlined,
    GrassOutlined,
    EventAvailableOutlined,
    PlaceOutlined,
    SpaOutlined,
    PaletteOutlined,
  ],
  'swecc-ds-neon-noir': [
    AutoAwesomeOutlined,
    GraphicEqOutlined,
    BoltOutlined,
    HubOutlined,
    ScatterPlotOutlined,
    MovieOutlined,
  ],
  'swecc-ds-graphite-pro': [
    GridOnOutlined,
    StraightenOutlined,
    ScatterPlotOutlined,
    TimelineOutlined,
    LayersOutlined,
    ViewQuiltOutlined,
  ],
}
