import React, { createContext } from 'react'
import useSessionStorage from '../hooks/useSessionStorage.ts'
import notificationService from '../services/notification.ts'
import useSettings from '../hooks/useSettings.ts'

export type NotificationContextType = {
  allowNextPermissionPrompt: () => void
  trySendTimerNotification: typeof notificationService.sendTimerNotification
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null)

type NotificationProviderProps = {
  children: React.ReactNode
}

export function NotificationProvider(props: NotificationProviderProps) {
  const settings = useSettings()
  const [hasAskedPermission, setHasAskedPermission] = useSessionStorage(
    'hasAskedPermission',
    false
  )

  const allowNextPermissionPrompt = () => setHasAskedPermission(false)

  const trySendTimerNotification = async (
    finishedState: Parameters<
      typeof notificationService.sendTimerNotification
    >[0],
    pomodoroCount: Parameters<
      typeof notificationService.sendTimerNotification
    >[1],
    isLongBreakNext: Parameters<
      typeof notificationService.sendTimerNotification
    >[2]
  ) => {
    if (!settings.notifications_enabled) return
    const permissionGranted = await notificationService.isPermissionGranted()
    if (permissionGranted) {
      await notificationService.sendTimerNotification(
        finishedState,
        pomodoroCount,
        isLongBreakNext
      )
    } else if (!hasAskedPermission) {
      const newPermissionGranted = await notificationService.requestPermission()
      setHasAskedPermission(true)
      if (newPermissionGranted) {
        await notificationService.sendTimerNotification(
          finishedState,
          pomodoroCount,
          isLongBreakNext
        )
      }
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        allowNextPermissionPrompt,
        trySendTimerNotification,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}
