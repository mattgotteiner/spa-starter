import type { ThemeMode } from '@mattgotteiner/spa-ui-controls'

export const APP_SETTINGS_STORAGE_KEY = 'spa-starter-settings'

export type Theme = ThemeMode

export interface AppSettings {
  appTitle: string
  showHelpfulHints: boolean
  theme: Theme
}

export const DEFAULT_SETTINGS: AppSettings = {
  appTitle: 'SPA Starter',
  showHelpfulHints: true,
  theme: 'system',
}
