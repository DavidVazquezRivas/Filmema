import {
  NumberResult,
  RangeResult,
  RatingResult,
  SelectResult,
} from '@/models/filters'

export interface DiscoverFiltersResult {
  genres?: SelectResult
  releaseDate?: RangeResult
  voteAverage?: RatingResult
  voteCount?: NumberResult
  countries?: SelectResult
  runtime?: RangeResult
}

export interface TmdbFilters {
  with_origin_country?: string[]
  with_genres?: number[]
  'primary_release_date.gte'?: string
  'primary_release_date.lte'?: string
  'vote_average.gte'?: number
  'with_runtime.gte'?: number
  'with_runtime.lte'?: number
  'vote_count.gte'?: number
}
