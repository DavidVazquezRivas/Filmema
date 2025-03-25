import { DiscoverMode } from '@/models/discoverModes'
import {
  TmdbFilters,
  DiscoverFiltersResult,
} from '@/pages/discover/models/filters'
import {
  MAX_RELEASE_DATE,
  MIN_RELEASE_DATE,
  MIN_VOTE_COUNT,
} from '../constants/filters'

export const filterRequestAdapter = (
  filterValues: DiscoverFiltersResult,
  mode: DiscoverMode
): TmdbFilters => {
  const formatDate = (year?: number) => {
    const today = new Date()
    return year
      ? new Date(year, today.getMonth(), today.getDate())
          .toISOString()
          .split('T')[0]
      : undefined
  }

  const minVoteCount = filterValues.voteCount ?? MIN_VOTE_COUNT[mode]
  const minReleaseDate = filterValues.releaseDate?.min ?? MIN_RELEASE_DATE[mode]
  const maxReleaseDate = filterValues.releaseDate?.max ?? MAX_RELEASE_DATE[mode]

  const filters = {
    'primary_release_date.gte': formatDate(minReleaseDate),
    'primary_release_date.lte': formatDate(maxReleaseDate),
    'vote_average.gte': filterValues.voteAverage,
    'with_runtime.gte': filterValues.runtime?.min,
    'with_runtime.lte': filterValues.runtime?.max,
    'vote_count.gte': minVoteCount,
    with_genres: filterValues.genres?.map((genre) => parseInt(genre.value)),
    with_origin_country: filterValues.countries?.map((c) => c.value),
  }

  return Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null
    )
  )
}
