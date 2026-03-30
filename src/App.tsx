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

const REPOSITORY_URL = 'https://github.com/mattgotteiner/spa-starter'

function AppContent(): React.ReactElement {
  const { resetSettings, settings, updateSettings } = useSettingsContext()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [samplePrompt, setSamplePrompt] = useState(
    'Replace this sample with the capability your app is meant to demo.',
  )

  const starterChecklist = useMemo(
    () => [
      'Swap the primary and secondary panels for your real UI.',
      'Wire app-wide appearance settings through spa-ui-controls instead of inventing a custom palette.',
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
            subtitle={
              <div className="app-subtitle-row">
                <span>
                  A browser-first starter with shell, settings, tests, assets, and GitHub Pages
                  wiring already in place.
                </span>
                <a
                  href={REPOSITORY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-subtitle-link"
                  aria-label="View source on GitHub"
                  title="View source repository"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              </div>
            }
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
                 gives you shared theme wiring, settings persistence, and a layout that is pleasant
                 enough to iterate on immediately.
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
                  <span className="starter-summary__label">Color scheme</span>
                  <div className="starter-summary__value">spa-ui-controls</div>
                  <p className="starter-summary__hint">
                    The starter consumes the shared library tokens instead of defining its own app
                    palette.
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
