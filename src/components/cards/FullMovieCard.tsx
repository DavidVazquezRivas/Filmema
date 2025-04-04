import { Movie } from '@/models/movie'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded'
import { BookmarkButton } from '@/components/bookmarkbutton/BookmarkButton'
import { PosterContainer } from '@/components/containers/PosterContainer'
import { AccesibleText } from '@/components/accessibletext/AccesibleText'
import { GenreChip } from '@/components/genrechip/GenreChip'
import { Link } from 'react-router-dom'
import { DetailActions } from '@/models/detailActions'

interface FullMovieCardProps {
  movie: Movie
}

export const FullMovieCard: React.FC<FullMovieCardProps> = ({ movie }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const indexSize = theme.typography.h4.fontSize
  const releaseYear = new Date(movie.releaseDate).getFullYear()

  return (
    <Card
      component="article"
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
      {/* Left divider (used to be index) */}
      <Box display="flex" alignItems="start" flexDirection="row" p={2}>
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
        sx={{
          ml: 2,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <AccesibleText variant="h5" fontWeight="bold" maxLength={20} audible>
          {movie.title}
        </AccesibleText>
        <Typography variant="body2" color="text.secondary">
          {releaseYear}
        </Typography>
        <Box component="ul" display="flex" gap={1} m={0} p={0}>
          {movie.genres.map((genre) => (
            <GenreChip
              genreId={genre}
              component="li"
              variant="filled"
              key={genre}
            />
          ))}
        </Box>
        <AccesibleText variant="body2" maxLength={200} audible>
          {movie.overview}
        </AccesibleText>
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          pr={1}
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            <strong>{t('discover.card.votes')}</strong>
            {movie.voteCount.toLocaleString()}
          </Typography>
          <Link
            to={`/movie/${movie.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button variant="contained" color="primary" size="small">
              {t('discover.card.more')}
            </Button>
          </Link>
        </Box>
      </CardContent>
      {/* Rate movie */}
      <Box
        component="aside"
        display="flex"
        flexDirection="row"
        p={2}
        position="absolute"
        top={0}
        right="10px"
        alignItems="center"
      >
        <StarRoundedIcon color="primary" />
        <Typography mr={2} variant="h6">
          {movie.voteAverage}
        </Typography>
        <IconButton
          component={Link}
          to={`/movie/${movie.id}/${DetailActions.Rate}`}
          aria-label={t('discover.card.rate')}
        >
          <StarOutlineRoundedIcon color="primary" />
        </IconButton>
        <Typography variant="body1">{t('discover.card.rate')}</Typography>
      </Box>
    </Card>
  )
}
