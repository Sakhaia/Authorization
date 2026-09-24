import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './common.css'
/* import App from './App.tsx' */
import { StoreProvider } from './app/providers/StoreProvider.tsx'
import { RouterProvider } from './app/providers/RouterProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider/>
    </StoreProvider>
  </StrictMode>,
)
