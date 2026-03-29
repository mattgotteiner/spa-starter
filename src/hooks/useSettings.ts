import { useEffect, useState } from 'react'
import { THEME_OPTIONS } from '@mattgotteiner/spa-ui-controls'
import {
  ACCENT_PRESETS,
  APP_SETTINGS_STORAGE_KEY,
  DEFAULT_SETTINGS,
  type AccentPreset,
  type AppSettings,
  type Theme,
} from '../types'
import { getStoredValue, setStoredValue } from '../utils/localStorage'

interface PersistedSettings {
  accentPreset?: unknown
  appTitle?: unknown
  showHelpfulHints?: unknown
  theme?: unknown
}

function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && THEME_OPTIONS.includes(value as Theme)
}

function isAccentPreset(value: unknown): value is AccentPreset {
  return typeof value === 'string' && ACCENT_PRESETS.includes(value as AccentPreset)
}

function normalizeAppTitle(value: unknown): string {
  if (typeof value !== 'string') {
    return DEFAULT_SETTINGS.appTitle
  }

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : DEFAULT_SETTINGS.appTitle
}

function normalizeSettings(candidate: PersistedSettings): AppSettings {
  return {
    accentPreset: isAccentPreset(candidate.accentPreset)
      ? candidate.accentPreset
      : DEFAULT_SETTINGS.accentPreset,
    appTitle: normalizeAppTitle(candidate.appTitle),
    showHelpfulHints:
      typeof candidate.showHelpfulHints === 'boolean'
        ? candidate.showHelpfulHints
        : DEFAULT_SETTINGS.showHelpfulHints,
    theme: isTheme(candidate.theme) ? candidate.theme : DEFAULT_SETTINGS.theme,
  }
}

export interface UseSettingsReturn {
  resetSettings: () => void
  settings: AppSettings
  updateSettings: (updates: Partial<AppSettings>) => void
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<AppSettings>(() =>
    normalizeSettings(
      getStoredValue<PersistedSettings>(APP_SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS),
    ),
  )

  useEffect(() => {
    setStoredValue(APP_SETTINGS_STORAGE_KEY, settings)
  }, [settings])

  return {
    resetSettings: () => setSettings(DEFAULT_SETTINGS),
    settings,
    updateSettings: (updates) =>
      setSettings((currentSettings) => normalizeSettings({ ...currentSettings, ...updates })),
  }
}
