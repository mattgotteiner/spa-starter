import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { APP_SETTINGS_STORAGE_KEY } from '../types'
import { useSettings } from './useSettings'

describe('useSettings', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('loads defaults when storage is empty', () => {
    const { result } = renderHook(() => useSettings())

    expect(result.current.settings.appTitle).toBe('SPA Starter')
    expect(result.current.settings.theme).toBe('system')
    expect(result.current.settings.showHelpfulHints).toBe(true)
  })

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => useSettings())

    act(() => {
      result.current.updateSettings({
        appTitle: 'Saved title',
        showHelpfulHints: false,
        theme: 'dark',
      })
    })

    const persisted = JSON.parse(window.localStorage.getItem(APP_SETTINGS_STORAGE_KEY) ?? '{}')

    expect(persisted.appTitle).toBe('Saved title')
    expect(persisted.showHelpfulHints).toBe(false)
    expect(persisted.theme).toBe('dark')
  })
})
