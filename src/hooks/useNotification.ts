import { useContext } from 'react'
import { NotificationContext } from '../contexts/notification.tsx'

export default function useNotification() {
  const contextValue = useContext(NotificationContext)
  if (!contextValue) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return contextValue
}
