import { Movie } from '@/models/movie'
import { MAIN_HERO_INTERVAL } from '@/pages/home/constants/heroConstants'
import { useEffect, useState } from 'react'
import { HeroMain } from './HeroMain'
import { HeroCard } from './HeroCard'
import { Box } from '@mui/material'

interface HeroProps {
  movies: Movie[] | null
}

// TODO lazy loading, null args means loading
export const Hero: React.FC<HeroProps> = ({ movies }) => {
  const [currentMain, setCurrentMain] = useState<number>(0)

  useEffect(() => {
    if (movies && movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentMain((prev) => {
          return (prev + 1) % movies.length
        })
      }, MAIN_HERO_INTERVAL)

      return () => clearInterval(interval)
    }
  }, [movies])

  const heroCards = movies?.map((movie) => {
    return <HeroCard key={movie.id} movie={movie} />
  })

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="row"
      gap={3}
      minHeight="550px"
      height="60vh"
      width="100%"
    >
      <HeroMain movie={movies?.[currentMain] || null} />
      <Box
        component="ul"
        display="flex"
        flexDirection="column"
        gap={4}
        justifyContent="center"
      >
        {heroCards}
      </Box>
    </Box>
  )
}
