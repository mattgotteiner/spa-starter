import { SettingsDrawer } from '@mattgotteiner/spa-ui-controls'
import type { AppSettings } from '../../types'
import { SettingsPanel } from '../SettingsPanel/SettingsPanel'

interface SettingsSidebarProps {
  isOpen: boolean
  onClose: () => void
  onReset: () => void
  onUpdate: (updates: Partial<AppSettings>) => void
  settings: AppSettings
}

export function SettingsSidebar({
  isOpen,
  onClose,
  onReset,
  onUpdate,
  settings,
}: SettingsSidebarProps): React.ReactElement {
  return (
    <SettingsDrawer isOpen={isOpen} onClose={onClose} title="Settings" width={400}>
      <SettingsPanel onReset={onReset} onUpdate={onUpdate} settings={settings} />
    </SettingsDrawer>
  )
}
