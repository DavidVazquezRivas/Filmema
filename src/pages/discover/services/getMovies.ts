import { LanguagesMap } from '@/constants/languages'
import {
  TMDB_API_KEY,
  TMDB_API_URL,
  TMDB_DEFAULT_LANGUAGE,
} from '@/constants/tmdbConstants'
import { DiscoverMode } from '@/models/discoverModes'
import { TmdbFilters } from '@/models/filters'
import i18n from '@/translation/i18n'
import { movieListAdapter } from '@/pages/discover/adapters/movieListAdapter'

interface GetMoviesParams {
  query?: string
  mode: DiscoverMode
  page?: number
  filters?: TmdbFilters
}

export const getMovies = async ({
  query,
  mode,
  page = 1,
  filters,
}: GetMoviesParams) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  }

  const modeUrl = getModeUrl(mode, query)
  const language =
    LanguagesMap[i18n.resolvedLanguage as string] ?? TMDB_DEFAULT_LANGUAGE
  const filterQuery = filters
    ? Object.entries(filters).reduce((acc, [key, value]) => {
        if (value instanceof Array) {
          return `${acc}&${key}=${value.join('|')}`
        }
        return `${acc}&${key}=${value}`
      }, '')
    : ''

  let url = `${TMDB_API_URL}/${modeUrl}page=${page}&language=${language}&sort_by=popularity.desc${filterQuery}`

  const response = await fetch(url, options)
  const { results } = await response.json()
  return movieListAdapter(results)
}

const getModeUrl = (mode: DiscoverMode, query = '') => {
  const modeUrls: Record<DiscoverMode, string> = {
    [DiscoverMode.discover]: 'discover/movie?',
    [DiscoverMode.search]: `search/movie?query=${query}&`,
    [DiscoverMode.upcoming]: 'movie/upcoming?',
    [DiscoverMode.nowPlaying]: 'movie/now_playing?',
  }

  return modeUrls[mode]
}
