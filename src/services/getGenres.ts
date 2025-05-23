import { genreListAdapter } from '@/adapters/genreListAdapter'
import {
  TMDB_API_KEY,
  TMDB_API_URL,
  TMDB_DEFAULT_LANGUAGE,
} from '@/constants/tmdbConstants'
import axios from 'axios'
import i18n from '@/translation/i18n'

export const getGenres = async () => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  }

  const language = i18n.resolvedLanguage ?? TMDB_DEFAULT_LANGUAGE
  const url = `${TMDB_API_URL}/genre/movie/list?language=${language}`

  const response = await axios.get(url, options)
  const { genres } = await response.data
  return genreListAdapter(genres)
}
