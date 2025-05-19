import { NearMovie } from '../models/nearMovie'
import { dataUrls } from '../constants/data'
import { nearMoviesAdapter } from '../adapters/nearMoviesAdapter'

export const getNearMovies = async (language: string): Promise<NearMovie[]> => {
  const url = dataUrls[language]

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch movies')
  }
  const data = await response.json()
  return nearMoviesAdapter(data)
}
