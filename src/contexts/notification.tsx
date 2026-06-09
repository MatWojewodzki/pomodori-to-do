import React, { createContext } from 'react'
import useSessionStorage from '../hooks/useSessionStorage.ts'
import notificationService from '../services/notification.ts'
import useSettings from '../hooks/useSettings.ts'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export type NotificationContextType = {
  notificationPermissionGranted: boolean
  trySendTimerNotification: typeof notificationService.sendTimerNotification
  requestNotificationPermission: () => Promise<boolean>
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

  const queryClient = useQueryClient()
  const permissionGrantedResult = useQuery({
    queryKey: ['notificationPermissionGranted'],
    queryFn: notificationService.isPermissionGranted,
  })

  async function requestNotificationPermission() {
    setHasAskedPermission(true)
    const newPermission = await notificationService.requestPermission()
    await queryClient.invalidateQueries({
      queryKey: ['notificationPermissionGranted'],
    })
    return newPermission
  }

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
      const newPermissionGranted = await requestNotificationPermission()
      if (newPermissionGranted) {
        await notificationService.sendTimerNotification(
          finishedState,
          pomodoroCount,
          isLongBreakNext
        )
      }
    }
  }

  if (permissionGrantedResult.isPending) {
    return <div>Loading...</div> // TODO: proper loading indicator
  }
  if (permissionGrantedResult.isError) {
    return <div>Error while loading notification permission state</div> // TODO: proper error handling
  }

  return (
    <NotificationContext.Provider
      value={{
        notificationPermissionGranted: permissionGrantedResult.data,
        trySendTimerNotification,
        requestNotificationPermission,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}
