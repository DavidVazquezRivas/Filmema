import { Movie } from '@/models/movie'

export interface HomeMovies {
  hero: Movie[]
  discover: Movie[]
  upcoming: Movie[]
  nowPlaying: Movie[]
}
