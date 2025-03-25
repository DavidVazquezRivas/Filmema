import {
  BACKDROP_SIZES,
  POSTER_SIZES,
  TMDB_IMAGE_URL,
} from '@/constants/tmdbConstants'
import { GetMoviesResponse } from '@/pages/discover/models/response'

export const movieListAdapter = (obj: any): GetMoviesResponse => {
  const movies = obj.results.map((movie: any) => ({
    backdrop: `${TMDB_IMAGE_URL}/${BACKDROP_SIZES[0]}/${movie.backdrop_path}`,
    genres: movie.genre_ids,
    id: movie.id,
    overview: movie.overview,
    poster: `${TMDB_IMAGE_URL}/${POSTER_SIZES[1]}/${movie.poster_path}`,
    releaseDate: movie.release_date,
    title: movie.title,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
  }))

  return {
    movies: movies,
    page: obj.page,
    totalPages: obj.total_pages,
  }
}
