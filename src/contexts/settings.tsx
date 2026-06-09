import React, { createContext, useContext } from 'react'
import { SettingsDto } from '../types/generated/SettingsDto.ts'
import settingsService from '../services/tauri/settings.ts'
import { useQuery } from '@tanstack/react-query'
import ErrorMessage from '../components/ErrorMessage.tsx'

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

  if (settingsResult.isError) {
    return <ErrorMessage text="Failed to load settings" />
  }
  if (!settingsResult.isSuccess) return
  return (
    <SettingsContext.Provider value={{ settings: settingsResult.data }}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default function useSettings() {
  const contextValue = useContext(SettingsContext)
  if (!contextValue) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return contextValue.settings
}
