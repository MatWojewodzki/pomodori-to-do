import React, { useEffect, useState } from 'react'

export default function useSessionStorage<T>(
  storageKey: string,
  initialState: T,
  overridePreviousState?: boolean
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = sessionStorage.getItem(storageKey)
      if (!item || overridePreviousState) return initialState
      return JSON.parse(item)
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${storageKey}":`, error)
      return initialState
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state))
    } catch (error) {
      console.warn(`Error writing sessionStorage key "${storageKey}":`, error)
    }
  }, [storageKey, state])

  return [state, setState]
}
