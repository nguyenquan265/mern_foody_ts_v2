import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
)
