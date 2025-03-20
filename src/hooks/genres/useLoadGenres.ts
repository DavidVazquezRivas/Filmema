import { loadGenres } from '@/redux/states/genres'
import { getGenres } from '@/services/getGenres'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const useLoadGenres = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getGenres()
        dispatch(loadGenres(genres))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchGenres()
  })

  return loading
}
