import { DiscoverMode } from '@/models/discoverModes'
import { FilterType, FilterTypeEnum } from '@/models/filters'
import { SelectOption } from '@/models/selectOption'
import { TFunction } from 'i18next'

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

export const getFilters = (
  mode: DiscoverMode,
  genres: SelectOption[],
  t: TFunction<'translation', undefined>
): FilterType[] => {
  return [
    {
      key: 'genres',
      title: t('discover.filters.genres'),
      type: FilterTypeEnum.combobox,
      options: genres,
    },
    {
      key: 'releaseDate',
      title: t('discover.filters.releaseDate'),
      type: FilterTypeEnum.range,
      min: MIN_RELEASE_DATE[mode],
      max: MAX_RELEASE_DATE[mode],
    },
    {
      key: 'voteAverage',
      title: t('discover.filters.voteAverage'),
      type: FilterTypeEnum.rating,
      max: MAX_VOTE_AVERAGE,
    },
    {
      key: 'voteCount',
      title: t('discover.filters.voteCount'),
      type: FilterTypeEnum.number,
      min: MIN_VOTE_COUNT[mode],
      max: MAX_VOTE_COUNT,
    },
    {
      key: 'countries',
      title: t('discover.filters.countries'),
      type: FilterTypeEnum.combobox,
      options: [] as SelectOption[], // TODO get countries
    },
    {
      key: 'runtime',
      title: t('discover.filters.runtime'),
      type: FilterTypeEnum.range,
      min: MIN_RUNTIME,
      max: MAX_RUNTIME,
    },
  ]
}
