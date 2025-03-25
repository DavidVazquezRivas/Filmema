import { Movie } from '@/models/movie'

export interface GetMoviesResponse {
  page: number
  totalPages: number
  movies: Movie[]
}
