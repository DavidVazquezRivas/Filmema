import { DiscoverMode } from '@/models/discoverModes'

export const MAX_VOTE_AVERAGE = 10
export const MAX_VOTE_COUNT = 5000
export const MAX_RUNTIME = 300
export const MIN_RUNTIME = 0
export const MIN_VOTE_COUNT = {
  [DiscoverMode.search]: 100,
  [DiscoverMode.discover]: 100,
  [DiscoverMode.nowPlaying]: 50,
  [DiscoverMode.upcoming]: 0,
}

export const MIN_RELEASE_DATE = {
  [DiscoverMode.search]: 1900,
  [DiscoverMode.discover]: 1900,
  [DiscoverMode.nowPlaying]: new Date().getFullYear() - 1,
  [DiscoverMode.upcoming]: new Date().getFullYear(),
}

export const MAX_RELEASE_DATE = {
  [DiscoverMode.search]: new Date().getFullYear(),
  [DiscoverMode.discover]: new Date().getFullYear(),
  [DiscoverMode.nowPlaying]: new Date().getFullYear(),
  [DiscoverMode.upcoming]: new Date().getFullYear() + 1,
}
