import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from './components/ui/sonner.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <App />
        <Toaster duration={1000} visibleToasts={1} position='top-right' richColors />
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </BrowserRouter>
)
