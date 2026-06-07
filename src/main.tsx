import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Tooltip } from 'radix-ui'
import { SettingsProvider } from './contexts/settings.tsx'
import { NotificationProvider } from './contexts/notification.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Tooltip.Provider>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <NotificationProvider>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </NotificationProvider>
        </SettingsProvider>
      </QueryClientProvider>
    </Tooltip.Provider>
  </React.StrictMode>
)
