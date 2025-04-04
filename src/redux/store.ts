import { configureStore } from '@reduxjs/toolkit'
import { genresSlice } from './states/genres'
import { languageSlice } from './states/language'

export default configureStore({
  reducer: {
    genres: genresSlice.reducer,
    language: languageSlice.reducer,
  },
})
