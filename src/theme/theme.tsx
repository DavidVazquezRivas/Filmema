import { PaletteMode } from '@mui/material'

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          darkZone: '#d6d6d6',
        }
      : {
          // palette values for dark mode
          darkZone: '#080808',
        }),
  },
})
