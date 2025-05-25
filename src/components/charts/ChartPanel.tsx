import { Movie } from '@/models/movie'
import GenreChart from './genrechart/GenreChart'
import RatingChart from './ratingchart/RatingChart'
import { Box } from '@mui/material'
import ReleaseDateChart from './releasedatechart/ReleaseDateChart'
import VoteCountChart from './votecountchart/VoteCountChart'

interface ChartPanelProps {
  movies: Movie[]
}

export const ChartPanel: React.FC<ChartPanelProps> = ({ movies }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }}
      height="100%"
      gap={2}
    >
      <GenreChart movies={movies} series={[]} height={300} />
      <ReleaseDateChart movies={movies} series={[]} height={300} />
      <RatingChart movies={movies} series={[]} height={300} />
      <VoteCountChart movies={movies} series={[]} height={300} />
    </Box>
  )
}

export default ChartPanel
