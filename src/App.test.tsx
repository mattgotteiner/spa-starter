import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import { APP_SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS } from './types'

describe('App', () => {
  it('renders the starter shell', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'SPA Starter' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View source on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/mattgotteiner/spa-starter',
    )
    expect(screen.getByText(/start with a finished-looking workspace/i)).toBeInTheDocument()
    expect(screen.getByText(/use this for output, guidance, or preview/i)).toBeInTheDocument()
  })

  it('opens settings and renders the starter controls', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByLabelText('Open settings'))

    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeInTheDocument()
    expect(screen.getByLabelText('App title')).toBeInTheDocument()
    expect(screen.getByLabelText('Accent preset')).toBeInTheDocument()
    expect(screen.getByLabelText('Light')).toBeInTheDocument()
    expect(screen.getByLabelText('Dark')).toBeInTheDocument()
    expect(screen.getByLabelText('System')).toBeInTheDocument()
  })

  it('loads persisted settings from localStorage', () => {
    localStorage.setItem(
      APP_SETTINGS_STORAGE_KEY,
      JSON.stringify({
        ...DEFAULT_SETTINGS,
        accentPreset: 'emerald',
        appTitle: 'Persisted Starter',
        showHelpfulHints: false,
        theme: 'dark',
      }),
    )

    render(<App />)

    expect(screen.getByRole('heading', { name: 'Persisted Starter' })).toBeInTheDocument()
    expect(screen.getByText('emerald')).toBeInTheDocument()
    expect(screen.getByText('Disabled')).toBeInTheDocument()
  })
})
