import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Tooltip } from 'radix-ui'
import { SettingsProvider } from './contexts/settings.tsx'
import isDesktop from './utils/isDesktop.ts'

if (isDesktop()) {
  document.documentElement.dataset.desktop = ''
} else {
  delete document.documentElement.dataset.desktop
}

// @ts-ignore
window.android?.onFrontendReady()

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
          <App />
          <div className="hidden desktop:block">
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </SettingsProvider>
      </QueryClientProvider>
    </Tooltip.Provider>
  </React.StrictMode>
)
