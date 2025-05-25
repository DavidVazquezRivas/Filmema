import { BarChart, BarChartProps } from '@mui/x-charts/BarChart'
import { Movie } from '@/models/movie'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ReleaseDateChartProps extends BarChartProps {
  movies: Movie[]
  binSize?: number
}

export const ReleaseDateChart: React.FC<ReleaseDateChartProps> = ({
  movies,
  binSize = 10,
  ...props
}) => {
  const { t } = useTranslation()

  if (movies.length === 0) {
    return <Typography>{t('global.charts.releaseDate.noData')}</Typography>
  }

  const years = movies.map(({ releaseDate }) =>
    new Date(releaseDate).getFullYear()
  )

  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)

  const minDecade = Math.floor(minYear / binSize) * binSize
  const maxDecade = Math.floor(maxYear / binSize) * binSize

  const binCount = Math.ceil((maxDecade - minDecade + 1) / binSize)

  const binsCount = Array(binCount).fill(0)

  years.forEach((year) => {
    const index = Math.min(
      Math.floor((Math.floor(year / binSize) * binSize - minDecade) / binSize),
      binCount - 1
    )
    binsCount[index]++
  })

  const labels = Array.from({ length: binCount }, (_, i) => {
    const start = minDecade + i * binSize
    const end = start + binSize - 1
    return `${start}-${end}`
  })

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        {t('global.charts.releaseDate.title')}
      </Typography>
      <BarChart
        {...props}
        xAxis={[
          {
            scaleType: 'band',
            data: labels,
          },
        ]}
        series={[{ data: binsCount, color: 'red' }]}
      />
    </Stack>
  )
}

export default ReleaseDateChart
