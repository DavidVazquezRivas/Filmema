import { BarChart, BarChartProps } from '@mui/x-charts/BarChart'
import { Movie } from '@/models/movie'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface VoteCountChartProps extends BarChartProps {
  movies: Movie[]
  binCount?: number
}

export const VoteCountChart: React.FC<VoteCountChartProps> = ({
  movies,
  binCount = 10,
  ...props
}) => {
  const { t } = useTranslation()

  if (movies.length === 0) {
    return <Typography>{t('global.charts.voteCount.noData')}</Typography>
  }

  const voteCounts = movies.map(({ voteCount }) => voteCount)

  const minCountRaw = Math.min(...voteCounts)
  const maxCountRaw = Math.max(...voteCounts)

  const minCount = Math.floor(minCountRaw / 1000) * 1000
  const maxCount = Math.ceil(maxCountRaw / 1000) * 1000

  const range = maxCount - minCount
  const binSize = range / binCount

  const bins = Array(binCount).fill(0)

  voteCounts.forEach((count) => {
    const index = Math.min(
      Math.floor((count - minCount) / binSize),
      binCount - 1
    )
    bins[index]++
  })

  const labels = Array.from({ length: binCount }, (_, i) =>
    String(Math.round(minCount + i * binSize))
  )

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        {t('global.charts.voteCount.title')}
      </Typography>
      <BarChart
        {...props}
        xAxis={[
          {
            scaleType: 'band',
            data: labels,
            tickPlacement: 'start',
            tickLabelPlacement: 'tick',
          },
        ]}
        series={[{ data: bins, color: 'mediumseagreen' }]}
      />
    </Stack>
  )
}

export default VoteCountChart
