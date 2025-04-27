import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { NearMovieFilters } from '../models/filters'
import { NearMovie } from '../models/nearMovie'
import { calculateHaversineDistance } from '../utils/geo'
import { useLocation } from './LocationContext'

interface FilterContextState {
  allMovies: NearMovie[]
  filters: NearMovieFilters
}

const initialFilterState: FilterContextState = {
  allMovies: [],
  filters: {},
}

interface FilterContextType extends FilterContextState {
  filteredMovies: NearMovie[]
  setAllMovies: (movies: NearMovie[]) => void
  setFilters: (filters: NearMovieFilters) => void
  updateFilters: (newFilters: Partial<NearMovieFilters>) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

// Filter function to apply filters to the movies
export const applyMovieFilters = (
  movies: NearMovie[],
  filters: NearMovieFilters,
  userCoords: { latitude: number; longitude: number } | null = null
): NearMovie[] => {
  return movies.filter((movie) => {
    // Genre filter
    const genreMatch =
      !filters.genres?.length ||
      movie.genre.some((movieGenre) =>
        filters.genres?.some((fGenre) => fGenre.label === movieGenre)
      )

    // Release date filter
    const releaseDateMatch =
      !filters.releaseDate ||
      (new Date(movie.datePublished).getFullYear() >= filters.releaseDate.min &&
        new Date(movie.datePublished).getFullYear() <= filters.releaseDate.max)

    // Rating filter
    const voteAverageMatch =
      !filters.voteAverage ||
      movie.aggregateRating.ratingValue >= filters.voteAverage

    // Zone type filter
    const zoneTypeMatch =
      !filters.zoneType?.length ||
      filters.zoneType.some(
        (zt) =>
          Number(zt.value) ===
          movie.locationCreated.additionalProperty.find(
            (p) => p.name === 'zoneType'
          )?.value
      )

    // Region filter
    const regionsMatch =
      !filters.regions?.length ||
      filters.regions.some(
        (region) =>
          Number(region.value) === movie.locationCreated.address.addressRegion
      )

    // Distance filter
    const distanceMatch = (() => {
      if (!filters.distance || !userCoords) return true

      const movieCoords = movie.locationCreated.geo
      const distance = calculateHaversineDistance(userCoords, movieCoords)

      return distance <= filters.distance
    })()

    return (
      genreMatch &&
      releaseDateMatch &&
      voteAverageMatch &&
      zoneTypeMatch &&
      regionsMatch &&
      distanceMatch
    )
  })
}

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<FilterContextState>(initialFilterState)
  const { latitude, longitude } = useLocation()

  const userCoords = useMemo(
    () => (latitude && longitude ? { latitude, longitude } : null),
    [latitude, longitude]
  )

  const filteredMovies = useMemo(
    () => applyMovieFilters(state.allMovies, state.filters, userCoords),
    [state.allMovies, state.filters]
  )

  const setAllMovies = useCallback((movies: NearMovie[]) => {
    setState((prev) => ({ ...prev, allMovies: movies }))
  }, [])

  const setFilters = useCallback((filters: NearMovieFilters) => {
    setState((prev) => ({ ...prev, filters }))
  }, [])

  const updateFilters = useCallback((newFilters: Partial<NearMovieFilters>) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters },
    }))
  }, [])

  return (
    <FilterContext.Provider
      value={{
        ...state,
        filteredMovies,
        setAllMovies,
        setFilters,
        updateFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider')
  }
  return context
}
