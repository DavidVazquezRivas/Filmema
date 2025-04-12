import '@/styled-components/global.css'
import '@justinribeiro/lite-youtube'
import '@/translation/i18n'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import { ThemeContextProvider } from '@/theme/ThemeContextProvider.tsx'
import { Provider } from 'react-redux'
import store from '@/redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>
  </StrictMode>
)
