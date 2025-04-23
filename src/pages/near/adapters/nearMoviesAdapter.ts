import { NearMovie } from '../models/nearMovie'

export const nearMoviesAdapter = (obj: any): NearMovie[] => {
  return obj.movies
}
