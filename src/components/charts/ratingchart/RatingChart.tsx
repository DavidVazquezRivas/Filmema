import { BarChart, BarChartProps } from '@mui/x-charts/BarChart'
import { Movie } from '@/models/movie'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface RatingChartProps extends BarChartProps {
  movies: Movie[]
  binSize?: number
}

export const RatingChart: React.FC<RatingChartProps> = ({
  movies,
  binSize = 0.5,
  ...props
}) => {
  const { t } = useTranslation()

  const binCount = Math.ceil(10 / binSize)

  const binsCount = Array(binCount).fill(0)

  movies.forEach(({ voteAverage }) => {
    const index = Math.min(Math.floor(voteAverage / binSize), binCount - 1)
    binsCount[index]++
  })

  const labels = Array.from({ length: binCount }, (_, i) =>
    String((i + 1) * binSize)
  )

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        {t('global.charts.rating.title')}
      </Typography>
      <BarChart
        {...props}
        xAxis={[
          {
            scaleType: 'band',
            data: labels,
            tickPlacement: 'end',
            tickLabelPlacement: 'tick',
          },
        ]}
        series={[{ data: binsCount, color: 'gold' }]}
      />
    </Stack>
  )
}

export default RatingChart
