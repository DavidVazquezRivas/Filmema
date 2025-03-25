import { PageLayout } from '@/components/pagelayout/PageLayout'
import { Movie } from '@/models/movie'
import { FullMovieCard } from './components/FullMovieCard'
import { Box, Typography } from '@mui/material'
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
import { DiscoverPagination } from './components/DiscoverPagination'
import { INITIAL_PAGE, MAX_PAGES } from './constants/pageConstants'
import {
  MAX_RELEASE_DATE,
  MAX_RUNTIME,
  MAX_VOTE_AVERAGE,
  MAX_VOTE_COUNT,
  MIN_RELEASE_DATE,
  MIN_RUNTIME,
  MIN_VOTE_COUNT,
} from './constants/filters'

interface DiscoverProps {
  mode?: DiscoverMode
}

interface DiscoverState {
  movies: Movie[]
  filters: DiscoverFiltersResult
  page: number
  totalPages: number
}

export const Discover: React.FC<DiscoverProps> = ({
  mode = DiscoverMode.discover,
}) => {
  const [state, setState] = useState<DiscoverState>({
    movies: [],
    filters: {},
    page: INITIAL_PAGE,
    totalPages: MAX_PAGES,
  })
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
      const response = await getMovies({
        mode,
        query: query || '',
        filters: filterRequestAdapter(state.filters, mode),
        page: state.page,
      })

      if (JSON.stringify(state.movies) === JSON.stringify(response.movies))
        return
      setState((prev) => ({
        ...prev,
        movies: response.movies,
        page: response.page,
        totalPages: Math.min(response.totalPages, MAX_PAGES),
      }))
    }

    fetchMovies()
  }, [mode, query, state.filters, state.page])

  const handleApplyFilters = useCallback(
    (filterValues: DiscoverFiltersResult) => {
      if (JSON.stringify(state.filters) === JSON.stringify(filterValues)) return
      setState((prev) => ({ ...prev, filters: filterValues }))
    },
    []
  )

  const handleChangePage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, page }))
  }, [])

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

  const movieCards = state.movies.map((movie) => (
    <FullMovieCard key={movie.id} movie={movie} />
  ))

  const noContent = (
    <Typography
      variant="h4"
      p={2}
      pt={10}
      sx={{ textAlign: 'center', textWrap: 'balance' }}
    >
      {t('discover.noResults')}
    </Typography>
  )

  const content = state.movies.length ? movieCards : noContent

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
          <DiscoverPagination
            page={state.page}
            totalPages={state.totalPages}
            setPage={handleChangePage}
          />
          {content}
          <DiscoverPagination
            page={state.page}
            totalPages={state.totalPages}
            setPage={handleChangePage}
          />
        </Box>
      </Box>
    </PageLayout>
  )
}
