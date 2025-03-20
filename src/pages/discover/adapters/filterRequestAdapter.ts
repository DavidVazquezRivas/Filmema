import {
  TmdbFilters,
  DiscoverFiltersResult,
} from '@/pages/discover/models/filters'

export const filterRequestAdapter = (
  filterValues: DiscoverFiltersResult
): TmdbFilters => {
  const formatDate = (year?: number) =>
    year ? new Date(year, 0, 1).toISOString().split('T')[0] : undefined

  const filters = {
    'primary_release_date.gte': formatDate(filterValues.releaseDate?.min),
    'primary_release_date.lte': formatDate(filterValues.releaseDate?.max),
    'vote_average.gte': filterValues.voteAverage,
    'with_runtime.gte': filterValues.runtime?.min,
    'with_runtime.lte': filterValues.runtime?.max,
    'vote_count.gte': filterValues.voteCount,
    with_genres: filterValues.genres?.map((genre) => parseInt(genre.value)),
    with_origin_country: filterValues.countries?.map((c) => c.value),
  }

  return Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null
    )
  )
}
