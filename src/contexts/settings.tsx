import React, { createContext } from 'react'
import { SettingsDto } from '../types/generated/SettingsDto.ts'
import settingsService from '../services/tauri/settings.ts'
import { useQuery } from '@tanstack/react-query'

type SettingsContextType = {
  settings: SettingsDto
}

export const SettingsContext = createContext<SettingsContextType | null>(null)

type SettingsContextProviderProps = {
  children: React.ReactNode
}

export function SettingsProvider(props: SettingsContextProviderProps) {
  const settingsResult = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  })

  if (settingsResult.isPending) {
    return <div>Loading...</div> // TODO: proper loading indicator
  }
  if (settingsResult.isError) {
    return <div>Error loading settings</div> // TODO: proper error handling
  }

  return (
    <SettingsContext.Provider value={{ settings: settingsResult.data }}>
      {props.children}
    </SettingsContext.Provider>
  )
}
