import { createTheme, PaletteMode, Theme } from '@mui/material'
import { createContext, FC, PropsWithChildren, useContext } from 'react'
import { useColorTheme } from '@/theme/useColorTheme.ts'

type ThemeContextType = {
  mode: PaletteMode
  toggleColorMode: () => void
  theme: Theme
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
  theme: createTheme(),
})

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme()
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
