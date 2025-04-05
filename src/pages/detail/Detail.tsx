import { PageLayout } from '@/components/pagelayout/PageLayout'
import { DetailActions } from '@/models/detailActions'
import { useParams } from 'react-router-dom'
import { useGetDetails } from './hooks/useGetDetail'
import { Box } from '@mui/material'
import { Hero } from './components/sections/Hero'
import { ImageSection } from './components/sections/ImageSection'

export const Detail = () => {
  const { id, action } = useParams()
  const isValidAction =
    action && Object.values(DetailActions).includes(action as DetailActions)
  const typedAction = isValidAction
    ? (action as DetailActions)
    : DetailActions.None
  console.log('action', action, 'typedAction', typedAction)

  const { details, loading, error } = useGetDetails(id as string)

  console.log(details, loading, error)

  if (loading) return 'Loading...' // TODO: Handle loading state
  if (error) return 'Error loading details' // TODO: Handle error state
  if (!details) return 'No data fetched' // TODO: Handle no details state

  return (
    <PageLayout>
      <Box display="flex" flexDirection="column" gap={20} width="80%">
        <Hero
          backdrop={details.backdrop}
          genres={details.genres}
          id={details.id}
          overview={details.overview}
          poster={details.poster}
          releaseYear={details.releaseYear}
          runtime={details.runtime}
          title={details.title}
          cast={details.credits.cast}
          voteAverage={details.voteAverage}
          voteCount={details.voteCount}
        />
        <ImageSection
          title={details.title}
          images={details.images}
          onOpen={() => {}}
          onSeeAll={() => {}}
        />
      </Box>
    </PageLayout>
  )
}
