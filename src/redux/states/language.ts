import i18n from '@/translation/i18n'
import { createSlice } from '@reduxjs/toolkit'

export const LanguageInitialState = {
  currentLanguage: i18n.resolvedLanguage as string,
  version: 0,
}

export const languageSlice = createSlice({
  name: 'language',
  initialState: LanguageInitialState,
  reducers: {
    setLanguage: (state, action) => {
      if (state.currentLanguage === action.payload) return
      state.currentLanguage = action.payload
      state.version += 1
    },
    resetLanguage: () => LanguageInitialState,
  },
})

export const { setLanguage, resetLanguage } = languageSlice.actions
