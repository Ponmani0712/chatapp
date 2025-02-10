import 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './src/app.jsx'

createRoot(document.getElementById('root')).render(
  // eslint-disable-next-line react/jsx-no-undef
  <StrictMode>
    <App />
  </StrictMode>,
)
