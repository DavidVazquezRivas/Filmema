export interface TmdbFilters {
  with_genres?: number[]
  year?: number
  'vote_average.gte'?: number
  with_origin_country?: string[]
  'with_runtime.gte'?: number
  'with_runtime.lte'?: number
}
