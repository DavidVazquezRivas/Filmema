import { BACKDROP_SIZES, POSTER_SIZES } from '@/constants/tmdbConstants'
import { extractNumber } from '@/utils/number-utils'

export const starLimit = 3

export const SLIDER_HEIGHT = 300

export const PROFILE_SIZE_INDEX = 1

export const POSTER_SIZE_INDEX = 3

export const BACKDROP_SIZE_INDEX = 1

export const DEFAULT_WIDTH = 300

export const POSTER_WIDTH =
  extractNumber(POSTER_SIZES[POSTER_SIZE_INDEX]) ?? DEFAULT_WIDTH

export const BACKDROP_WIDTH =
  extractNumber(BACKDROP_SIZES[BACKDROP_SIZE_INDEX]) ?? DEFAULT_WIDTH
