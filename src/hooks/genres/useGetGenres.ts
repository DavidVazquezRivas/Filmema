import { useSelector } from 'react-redux'

export const useGetGenres = (): Record<number, string> => {
  return useSelector((store: any) => store.genres.genres)
}
