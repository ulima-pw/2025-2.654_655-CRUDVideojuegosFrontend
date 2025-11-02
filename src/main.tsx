import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import CRUDVideojuegosPage from './pages/CRUDVideojuegosPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CRUDVideojuegosPage />
  </StrictMode>,
)
