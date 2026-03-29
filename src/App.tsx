import { useMemo, useState } from 'react'
import {
  AppShell,
  Button,
  Panel,
  SettingsButton,
  ThemeProvider,
  TopBar,
} from '@mattgotteiner/spa-ui-controls'
import './App.css'
import { SettingsSidebar } from './components/SettingsSidebar/SettingsSidebar'
import { SettingsProvider, useSettingsContext } from './context/SettingsContext'

function AppContent(): React.ReactElement {
  const { resetSettings, settings, updateSettings } = useSettingsContext()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [samplePrompt, setSamplePrompt] = useState(
    'Replace this sample with the capability your app is meant to demo.',
  )

  const starterChecklist = useMemo(
    () => [
      'Swap the primary and secondary panels for your real UI.',
      'Add your own settings fields in src/types and src/hooks/useSettings.ts.',
      'Update the title, manifest, icons, and README for the new app.',
    ],
    [],
  )

  return (
    <ThemeProvider
      onThemeChange={(theme) => updateSettings({ theme })}
      persist={false}
      theme={settings.theme}
    >
      <AppShell
        header={
          <TopBar
            title={
              <div className="app-title-block">
                <h1>{settings.appTitle}</h1>
              </div>
            }
            subtitle="A browser-first starter with shell, settings, tests, assets, and GitHub Pages wiring already in place."
            trailing={<SettingsButton onClick={() => setIsSettingsOpen(true)} />}
          />
        }
      >
        <div className="app-layout">
          <Panel as="section">
            <div className="starter-panel">
              <p className="starter-panel__eyebrow">Primary panel</p>
              <h2 className="starter-panel__title">Start with a finished-looking workspace</h2>
              <p className="starter-panel__body">
                This panel is the place to drop your main interaction surface. The starter already
                gives you theme wiring, settings persistence, and a layout that is pleasant enough
                to iterate on immediately.
              </p>

              <div className="starter-panel__example">
                <strong>Starter prompt</strong>
                <p>{samplePrompt}</p>
              </div>

              <div className="starter-panel__actions">
                <Button
                  onClick={() =>
                    setSamplePrompt(
                      'Use this area for the main capability: a form, composer, generator, parser, or live browser-side utility.',
                    )
                  }
                >
                  Load richer sample
                </Button>
                <Button onClick={() => setSamplePrompt('')} variant="secondary">
                  Clear sample
                </Button>
              </div>

              <ul className="starter-panel__list">
                {starterChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Panel>

          <Panel as="section">
            <div className="starter-panel">
              <p className="starter-panel__eyebrow">Secondary panel</p>
              <h2 className="starter-panel__title">Use this for output, guidance, or preview</h2>
              <p className="starter-panel__body">
                Keep the second panel for results, diagnostics, examples, or supporting controls.
                The out-of-the-box template should feel intentional even before any app-specific
                work starts.
              </p>

              <div className="starter-summary" aria-label="Starter summary">
                <section className="starter-summary__card">
                  <span className="starter-summary__label">Theme</span>
                  <div className="starter-summary__value">{settings.theme}</div>
                  <p className="starter-summary__hint">
                    Controlled by app settings rather than a library-managed persistent state.
                  </p>
                </section>

                <section className="starter-summary__card">
                  <span className="starter-summary__label">Accent preset</span>
                  <div className="starter-summary__value">{settings.accentPreset}</div>
                  <p className="starter-summary__hint">
                    Example select input persisted through the starter settings stack.
                  </p>
                </section>

                <section className="starter-summary__card">
                  <span className="starter-summary__label">Hints enabled</span>
                  <div className="starter-summary__value">
                    {settings.showHelpfulHints ? 'Enabled' : 'Disabled'}
                  </div>
                  <p className="starter-summary__hint">
                    Toggle this off to prove persistence and reset behavior work.
                  </p>
                </section>
              </div>
            </div>
          </Panel>
        </div>

        <SettingsSidebar
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onReset={resetSettings}
          onUpdate={updateSettings}
          settings={settings}
        />
      </AppShell>
    </ThemeProvider>
  )
}

function App(): React.ReactElement {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  )
}

export default App
