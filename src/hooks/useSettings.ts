import { useContext } from 'react'
import { SettingsContext } from '../contexts/settings.tsx'

export default function useSettings() {
  const contextValue = useContext(SettingsContext)
  if (!contextValue) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return contextValue.settings
}
