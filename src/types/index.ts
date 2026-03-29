import type { ThemeMode } from '@mattgotteiner/spa-ui-controls'

export const APP_SETTINGS_STORAGE_KEY = 'spa-starter-settings'

export const ACCENT_PRESETS = ['indigo', 'emerald', 'slate'] as const

export type Theme = ThemeMode
export type AccentPreset = (typeof ACCENT_PRESETS)[number]

export interface AppSettings {
  accentPreset: AccentPreset
  appTitle: string
  showHelpfulHints: boolean
  theme: Theme
}

export const DEFAULT_SETTINGS: AppSettings = {
  accentPreset: 'indigo',
  appTitle: 'SPA Starter',
  showHelpfulHints: true,
  theme: 'system',
}
