import {
  NumberResult,
  RangeResult,
  RatingResult,
  SelectResult,
} from '@/models/filters'

export interface NearMovieFilters {
  genres?: SelectResult
  releaseDate?: RangeResult
  voteAverage?: RatingResult
  zoneType?: SelectResult
  regions?: SelectResult
  distance?: NumberResult
}
