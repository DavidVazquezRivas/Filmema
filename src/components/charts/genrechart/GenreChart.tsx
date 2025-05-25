import { BarChart, BarChartProps } from '@mui/x-charts/BarChart'
import { useGetGenres } from '@/hooks/genres/useGetGenres'
import { Movie } from '@/models/movie'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface GenreChartProps extends BarChartProps {
  movies: Movie[]
}

export const GenreChart: React.FC<GenreChartProps> = ({ movies, ...props }) => {
  const { t } = useTranslation()
  const genres = useGetGenres()

  const genreCounts = movies.reduce((acc, movie) => {
    movie.genres.forEach((genreId) => {
      acc[genreId] = (acc[genreId] || 0) + 1
    })
    return acc
  }, {} as Record<number, number>)

  const sortedData = Object.entries(genreCounts)
    .map(([genreId, count]) => ({
      genre: genres[Number(genreId)],
      count,
    }))
    .sort((a, b) => a.genre.localeCompare(b.genre))

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        {t('global.charts.genre.title')}
      </Typography>
      <BarChart
        {...props}
        xAxis={[
          { scaleType: 'band', data: sortedData.map((item) => item.genre) },
        ]}
        series={[
          { data: sortedData.map((item) => item.count), color: 'skyblue' },
        ]}
      />
    </Stack>
  )
}

export default GenreChart
