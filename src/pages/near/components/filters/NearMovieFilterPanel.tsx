import { useEffect, useMemo } from 'react'
import {
  AddressRegion,
  NearMovie,
  ZoneType,
} from '@/pages/near/models/nearMovie'
import { useFilterContext } from '@/pages/near/contexts/FilterContext'
import { NearMovieFilters } from '../../models/filters'
import { FilterType, FilterTypeEnum } from '@/models/filters'
import { useTranslation } from 'react-i18next'
import { useGetGenres } from '@/hooks/genres/useGetGenres'
import { FilterPanel } from '@/components/filters/FilterPanel'

interface NearMovieFiltersProps {
  movies: NearMovie[]
}

export const NearMovieFilterPanel: React.FC<NearMovieFiltersProps> = ({
  movies,
}) => {
  const { setAllMovies, updateFilters } = useFilterContext()
  const { t } = useTranslation()
  const genresRaw = useGetGenres()

  useEffect(() => {
    setAllMovies(movies)
  }, [movies])

  const genres = useMemo(
    () =>
      Object.entries(genresRaw).map(([id, name]) => ({
        value: id,
        label: name,
      })),
    [genresRaw]
  )

  const filters: FilterType[] = useMemo(
    () => [
      {
        key: 'genres',
        title: t('near.filters.genres'),
        type: FilterTypeEnum.combobox,
        options: genres,
      },
      {
        key: 'releaseDate',
        title: t('near.filters.releaseDate'),
        type: FilterTypeEnum.range,
        min: 1950,
        max: new Date().getFullYear(),
      },
      {
        key: 'voteAverage',
        title: t('near.filters.voteAverage'),
        type: FilterTypeEnum.rating,
        max: 10,
      },
      {
        key: 'zoneType',
        title: t('near.filters.zoneType.title'),
        type: FilterTypeEnum.combobox,
        options: Object.values(ZoneType)
          .filter((x) => !isNaN(Number(x)))
          .map((zt) => ({
            label: t(`near.filters.zoneType.options.${zt}`),
            value: zt.toString(),
          })),
      },
      {
        key: 'regions',
        title: t('near.filters.regions.title'),
        type: FilterTypeEnum.combobox,
        options: Object.values(AddressRegion)
          .filter((key) => !isNaN(Number(key)))
          .map((region) => ({
            label: t(`near.filters.regions.options.${region}`),
            value: region.toString(),
          })),
      },
      {
        key: 'distance',
        title: t('near.filters.distance'),
        type: FilterTypeEnum.number,
        min: 0,
        max: 100,
      },
    ],
    [genres]
  )

  const handleApplyFilters = (newFilters: NearMovieFilters) => {
    updateFilters(newFilters)
  }

  return <FilterPanel filters={filters} onApply={handleApplyFilters} />
}
