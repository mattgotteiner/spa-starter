import { Button, FormField, ThemeToggle } from '@mattgotteiner/spa-ui-controls'
import { type AppSettings } from '../../types'
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
        <p className="settings-section__notice">
          Keep appearance settings wired through `@mattgotteiner/spa-ui-controls` so the app uses
          the shared color scheme and theme primitives.
        </p>

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
