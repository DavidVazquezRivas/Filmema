import { configureStore } from '@reduxjs/toolkit'
import { genresSlice } from './states/genres'

export default configureStore({
  reducer: {
    genres: genresSlice.reducer,
  },
})
