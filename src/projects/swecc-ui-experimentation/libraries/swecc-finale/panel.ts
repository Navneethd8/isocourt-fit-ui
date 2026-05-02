import { cn } from '@/lib/utils'
import s from './swecc-finale.module.css'

/** Pane shell — defines Finale tokens for all descendants. */
export const panelClass = cn('relative overflow-hidden rounded-lg p-5', s.panelDark)

export const panelClassLight = cn('relative overflow-hidden rounded-lg p-5', s.panelLight)
