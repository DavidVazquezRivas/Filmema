import { useEffect, useMemo, useState } from 'react'
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
import { Box, IconButton, PaperProps, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'

interface NearMovieFiltersProps extends PaperProps {
  movies: NearMovie[]
}

export const NearMovieFilterPanel: React.FC<NearMovieFiltersProps> = ({
  movies,
  ...props
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const { setAllMovies, updateFilters } = useFilterContext()
  const { t } = useTranslation()
  const genresRaw = useGetGenres()

  useEffect(() => {
    setAllMovies(movies)
  }, [movies])

  const toggleFilters = (newShowFilters: boolean) => () => {
    setShowFilters(newShowFilters)
  }

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

  return (
    <>
      <FilterPanel
        filters={filters}
        onApply={handleApplyFilters}
        {...props}
        sx={{ display: { xs: 'none', md: 'flex' } }}
      />
      <Box
        display={{ xs: 'flex', md: 'none' }}
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
        position="relative"
      >
        <Typography variant="h5" color="text.secondary">
          {t('global.filters.title')}
          <IconButton onClick={toggleFilters(!showFilters)}>
            <FilterListIcon />
          </IconButton>
        </Typography>
        <FilterPanel
          onApply={handleApplyFilters}
          filters={filters}
          sx={{
            display: showFilters ? 'flex' : 'none',
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 100,
            elevation: 5,
          }}
        />
      </Box>
    </>
  )
}
