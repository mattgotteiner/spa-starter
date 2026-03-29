import { Button, FormField, ThemeToggle } from '@mattgotteiner/spa-ui-controls'
import { ACCENT_PRESETS, type AppSettings } from '../../types'
import './SettingsPanel.css'

interface SettingsPanelProps {
  onReset: () => void
  onUpdate: (updates: Partial<AppSettings>) => void
  settings: AppSettings
}

export function SettingsPanel({
  onReset,
  onUpdate,
  settings,
}: SettingsPanelProps): React.ReactElement {
  return (
    <div className="settings-panel">
      <section className="settings-section">
        <h3 className="settings-section__title">Appearance</h3>

        <div className="settings-field">
          <span className="settings-field__label">Theme</span>
          <ThemeToggle
            className="settings-field__theme-toggle"
            onChange={(theme) => onUpdate({ theme })}
            value={settings.theme}
          />
        </div>

        <FormField
          hint="Example text input that flows through the typed settings store and updates the shell immediately."
          htmlFor="settings-app-title"
          label="App title"
        >
          <input
            id="settings-app-title"
            className="settings-panel__control"
            type="text"
            value={settings.appTitle}
            onChange={(event) => onUpdate({ appTitle: event.target.value })}
          />
        </FormField>

        <FormField
          hint="Example select input. Replace this with whatever enum-like option your app actually needs."
          htmlFor="settings-accent-preset"
          label="Accent preset"
        >
          <select
            id="settings-accent-preset"
            className="settings-panel__control"
            value={settings.accentPreset}
            onChange={(event) =>
              onUpdate({ accentPreset: event.target.value as AppSettings['accentPreset'] })
            }
          >
            {ACCENT_PRESETS.map((preset) => (
              <option key={preset} value={preset}>
                {preset}
              </option>
            ))}
          </select>
        </FormField>

        <label className="settings-checkbox">
          <input
            type="checkbox"
            checked={settings.showHelpfulHints}
            onChange={(event) => onUpdate({ showHelpfulHints: event.target.checked })}
          />
          <span>
            <span className="settings-field__label">Show starter hints</span>
            <span className="settings-checkbox__hint">
              Example toggle stored in localStorage for non-secret preferences.
            </span>
          </span>
        </label>
      </section>

      <section className="settings-section settings-section--clear">
        <h3 className="settings-section__title">Reset</h3>
        <p className="settings-section__notice">
          Keep this button in new apps unless your settings model has a stronger recovery flow.
        </p>
        <Button variant="danger" onClick={onReset}>
          Reset defaults
        </Button>
      </section>
    </div>
  )
}
