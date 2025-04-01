import '@/styled-components/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import { ThemeContextProvider } from '@/theme/ThemeContextProvider.tsx'
import '@/translation/i18n'
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
