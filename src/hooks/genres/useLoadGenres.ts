import { loadGenres } from '@/redux/states/genres'
import { getGenres } from '@/services/getGenres'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useLoadGenres = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getGenres()
      dispatch(loadGenres(genres))
    }

    fetchGenres()
  })
}
