import { useState, useEffect } from 'react'
import { getDetails } from '../services/getDetails'
import { MovieDetails } from '../models/movieDetails'

interface UseGetDetailsState {
  details: MovieDetails | null
  loading: boolean
  error: boolean
}

const initialState: UseGetDetailsState = {
  details: null,
  loading: true,
  error: false,
}

export const useGetDetails = (id: string) => {
  const [state, setState] = useState<UseGetDetailsState>(initialState)

  useEffect(() => {
    const fetchDetails = async () => {
      setState({ details: null, loading: true, error: false })

      try {
        const data = await getDetails(id)
        setState({ details: data, loading: false, error: false })
      } catch (error) {
        setState({ details: null, loading: false, error: true })
        console.log('Error fetching details:', error)
      }
    }

    fetchDetails()
  }, [id])

  return state
}
