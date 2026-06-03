import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { injectVerificationAndJsonLd } from './seo/injectVerificationAndJsonLd'

document.documentElement.classList.add('js-reveal')
injectVerificationAndJsonLd()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
