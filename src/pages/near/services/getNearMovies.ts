import axios from 'axios'
import { NearMovie } from '../models/nearMovie'
import { dataUrls } from '../constants/data'
import { nearMoviesAdapter } from '../adapters/nearMoviesAdapter'

export const getNearMovies = async (language: string): Promise<NearMovie[]> => {
  const url = dataUrls[language]

  try {
    const response = await axios.get(url)
    return nearMoviesAdapter(response.data)
  } catch (error) {
    throw new Error('Failed to fetch movies')
  }
}
