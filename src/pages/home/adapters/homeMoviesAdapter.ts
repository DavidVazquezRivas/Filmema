import {
  BACKDROP_SIZES,
  POSTER_SIZES,
  TMDB_IMAGE_URL,
} from '@/constants/tmdbConstants'
import { HomeMovies } from '../models/homeMovies'
import {
  discoverMovieAmmount,
  heroMovieAmmount,
  nowPlayingMovieAmmount,
  upcomingMovieAmmount,
} from '../constants/homeConstants'

export const homeMoviesAdapter = (obj: any): HomeMovies => {
  return {
    hero: mapMovies(obj.hero, heroMovieAmmount).slice(0, heroMovieAmmount),
    discover: mapMovies(obj.discover).slice(0, discoverMovieAmmount),
    upcoming: mapMovies(obj.upcoming).slice(0, upcomingMovieAmmount),
    nowPlaying: mapMovies(obj.nowPlaying).slice(0, nowPlayingMovieAmmount),
  }
}

function mapMovies(movies: any[], backdropSize = 0): any[] {
  return movies.map((movie: any) => ({
    backdrop: `${TMDB_IMAGE_URL}/${BACKDROP_SIZES[backdropSize]}/${movie.backdrop_path}`,
    genres: movie.genre_ids,
    id: movie.id,
    overview: movie.overview,
    poster: `${TMDB_IMAGE_URL}/${POSTER_SIZES[1]}/${movie.poster_path}`,
    releaseDate: movie.release_date,
    title: movie.title,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
  }))
}
