import { configureStore } from '@reduxjs/toolkit'
import { genresSlice } from './states/genres'
import { languageSlice } from './states/language'
import { loadingSlice } from './states/loading'

export const store = configureStore({
  reducer: {
    genres: genresSlice.reducer,
    language: languageSlice.reducer,
    loading: loadingSlice.reducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
