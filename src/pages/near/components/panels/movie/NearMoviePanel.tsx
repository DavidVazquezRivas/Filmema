import { NearMovie } from '@/pages/near/models/nearMovie'
import { Hero } from './Hero'
import { Box, Button } from '@mui/material'
import { LocationSection } from './LocationSection'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePanel } from '@/context/PanelContext'

interface NearMoviePanelProps {
  movie: NearMovie
}

export const NearMoviePanel: React.FC<NearMoviePanelProps> = ({ movie }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { closePanel } = usePanel()

  const handleClick = () => {
    navigate(`/movie/${movie.identifier}`)
    closePanel()
  }

  const backdrop =
    movie.image.find((image) => image.name === 'Backdrop') ?? movie.image[0]
  const poster =
    movie.image.find((image) => image.name === 'Poster') ?? movie.image[0]
  console.log(movie)
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Hero
        backdrop={backdrop.contentUrl}
        poster={poster.contentUrl}
        overview={movie.description}
        releaseYear={new Date(movie.datePublished).getFullYear()}
        title={movie.name}
        voteAverage={movie.aggregateRating.ratingValue}
        voteCount={movie.aggregateRating.ratingCount}
        id={movie.identifier}
      />
      <LocationSection location={movie.locationCreated} />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleClick}
      >
        {t('discover.card.more')}
      </Button>
    </Box>
  )
}
