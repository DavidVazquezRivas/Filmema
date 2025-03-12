import { Movie } from '@/models/movie'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { truncateText } from '@/utils/text-utils'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded'
import { BookmarkButton } from '@/components/bookmarkbutton/BookmarkButton'
import { PosterContainer } from '@/components/containers/PosterContainer'

interface FullMovieCardProps {
  index: number
  movie: Movie
}

export const FullMovieCard: React.FC<FullMovieCardProps> = ({
  index,
  movie,
}) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const handleClickRate = () => {
    // TODO: Open dialog to rate movie
    console.log('Rate movie')
  }

  const indexSize = theme.typography.h4.fontSize
  const releaseYear = new Date(movie.releaseDate).getFullYear()
  const overview = truncateText(movie.overview, 200)
  // TODO add tooltips to truncated text
  const movieTitle = truncateText(movie.title, 25)

  return (
    <Card
      component={'article'}
      sx={{
        position: 'relative',
        display: 'flex',
        p: 2,
        borderRadius: 2,
        maxWidth: 800,
        minWidth: 800,
        maxHeight: 240,
      }}
    >
      {/* Index number */}
      <Box display="flex" alignItems="start" flexDirection={'row'} p={2}>
        <Typography variant="h5" fontWeight="bold">
          {index}
        </Typography>
        <Divider
          orientation="vertical"
          sx={{
            height: indexSize,
            marginLeft: 1,
            borderColor: 'primary.main',
            borderWidth: 1,
          }}
        />
      </Box>
      {/* Movie poster */}
      <Box
        component="aside"
        position="relative"
        sx={{ height: '200px', aspectRatio: '2/3' }}
      >
        <PosterContainer
          alt={t('discover.card.posterAlt', { title: movie.title })}
          src={movie.poster}
        />
        <BookmarkButton movieId={movie.id} style="icon" />
      </Box>
      {/* Movie info */}
      <CardContent
        component="section"
        sx={{
          ml: 2,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {movieTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {releaseYear}
        </Typography>
        <Box component="ul" display="flex" gap={1} m={0} p={0}>
          {movie.genres.map((genre) => (
            <Chip component="li" key={genre} label={genre} variant="filled" />
          ))}
        </Box>
        <Typography variant="body2">{overview}</Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>{t('discover.card.votes')}</strong>
          {movie.voteCount.toLocaleString()}
        </Typography>
      </CardContent>
      {/* Rate movie */}
      <Box
        component="aside"
        display="flex"
        flexDirection="row"
        p={2}
        position="absolute"
        top={0}
        right={'10px'}
        alignItems="center"
      >
        <StarRoundedIcon color="primary" />
        <Typography mr={2} variant="h6">
          {movie.voteAverage}
        </Typography>
        <IconButton onClick={handleClickRate}>
          <StarOutlineRoundedIcon color="primary" />
        </IconButton>
        <Typography variant="body1">{t('discover.card.rate')}</Typography>
      </Box>
    </Card>
  )
}
