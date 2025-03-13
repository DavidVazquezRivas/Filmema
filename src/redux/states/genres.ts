import { createSlice } from '@reduxjs/toolkit'

export const GenresEmptyState: Record<number, string> = {}

export const genresSlice = createSlice({
  name: 'genres',
  initialState: GenresEmptyState,
  reducers: {
    loadGenres: (state, action) => ({ ...state, genres: action.payload }),
    resetGenres: () => GenresEmptyState,
  },
})

export const { loadGenres, resetGenres } = genresSlice.actions
