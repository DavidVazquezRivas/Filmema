import { PageLayout } from '@/components/pagelayout/PageLayout'
import { Movie } from '@/models/movie'
import { FullMovieCard } from './components/FullMovieCard'
import { Box } from '@mui/material'
import { DiscoverMode } from '@/models/discoverModes'
import { getMovies } from './services/getMovies'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FilterPanel } from '@/components/filters/FilterPanel'
import { FilterType, FilterTypeEnum } from '@/models/filters'
import { useTranslation } from 'react-i18next'
import { useGetGenres } from '@/hooks/genres/useGetGenres'
import { SelectOption } from '@/models/selectOption'
import { DiscoverFiltersResult } from './models/filters'
import { filterRequestAdapter } from './adapters/filterRequestAdapter'

interface DiscoverProps {
  mode?: DiscoverMode
}

interface DiscoverState {
  movies: Movie[]
  filters: DiscoverFiltersResult
}

export const Discover: React.FC<DiscoverProps> = ({
  mode = DiscoverMode.discover,
}) => {
  const [state, setState] = useState<DiscoverState>({ movies: [], filters: {} })
  const { query } = useParams<{ query: string }>()
  const { t } = useTranslation()
  const genresRaw = useGetGenres()

  const genres = useMemo(
    () =>
      Object.entries(genresRaw).map(([id, name]) => ({
        value: id,
        label: name,
      })),
    [genresRaw]
  )

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies({
        mode,
        query: query || '',
        filters: filterRequestAdapter(state.filters),
      })
      if (JSON.stringify(state.movies) === JSON.stringify(moviesData)) return
      setState((prev) => ({ ...prev, movies: moviesData }))
    }

    fetchMovies()
  }, [mode, query, state.filters])

  const handleApplyFilters = useCallback(
    (filterValues: DiscoverFiltersResult) => {
      if (JSON.stringify(state.filters) === JSON.stringify(filterValues)) return
      setState((prev) => ({ ...prev, filters: filterValues }))
    },
    []
  )

  const filters: FilterType[] = [
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
      min: 1900,
      max: 2022,
    },
    {
      key: 'voteAverage',
      title: t('discover.filters.voteAverage'),
      type: FilterTypeEnum.rating,
      max: 10,
    },
    {
      key: 'voteCount',
      title: t('discover.filters.voteCount'),
      type: FilterTypeEnum.number,
      max: 5000,
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
      min: 0,
      max: 300,
    },
  ]

  const movieCards = state.movies.map((movie, index) => (
    <FullMovieCard key={movie.id} index={index + 1} movie={movie} />
  ))

  return (
    <PageLayout>
      <Box
        component="main"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        gap={2}
      >
        <FilterPanel onApply={handleApplyFilters} filters={filters} />
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          component="section"
          alignItems="center"
        >
          {movieCards}
        </Box>
      </Box>
    </PageLayout>
  )
}
