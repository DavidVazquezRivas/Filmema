import { PageLayout } from '@/components/pagelayout/PageLayout'
import { Movie } from '@/models/movie'
import { FullMovieCard } from '@/components/cards/FullMovieCard'
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { DiscoverMode } from '@/models/discoverModes'
import { getMovies } from './services/getMovies'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FilterPanel } from '@/components/filters/FilterPanel'
import { useTranslation } from 'react-i18next'
import { useGetGenres } from '@/hooks/genres/useGetGenres'
import { DiscoverFiltersResult } from './models/filters'
import { filterRequestAdapter } from './adapters/filterRequestAdapter'
import { DiscoverPagination } from './components/DiscoverPagination'
import { INITIAL_PAGE, MAX_PAGES } from './constants/pageConstants'
import { getFilters } from './constants/filters'
import FilterListIcon from '@mui/icons-material/FilterList'
import { HalfMovieCard } from '@/components/cards/HalfMovieCard'

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
  const [showFilters, setShowFiltrs] = useState<boolean>(false)
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))
  const { query } = useParams<{ query: string }>()
  const { t } = useTranslation()
  const genresRaw = useGetGenres()

  const toggleFilters = (newShowFilters: boolean) => () => {
    setShowFiltrs(newShowFilters)
  }

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

  const filters = getFilters(mode, genres, t)

  const movieCards = state.movies.map((movie) =>
    isSmUp ? (
      <FullMovieCard key={movie.id} movie={movie} />
    ) : (
      <HalfMovieCard key={movie.id} movie={movie} />
    )
  )

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
        <FilterPanel
          onApply={handleApplyFilters}
          filters={filters}
          sx={{ display: { xs: 'none', lg: 'flex' } }}
        />
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          component="section"
          alignItems="center"
        >
          <Box
            display={{ xs: 'flex', lg: 'none' }}
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
