import { Movie } from '@/models/movie'
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  useTheme,
} from '@mui/material'
import { PosterContainer } from '@/components/containers/PosterContainer'
import { BookmarkButton } from '@/components/bookmarkbutton/BookmarkButton'
import { useTranslation } from 'react-i18next'
import { AccesibleText } from '@/components/accessibletext/AccesibleText'
import { GenreChip } from '@/components/genrechip/GenreChip'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { Link } from 'react-router-dom'

interface HalfMovieCardProps {
  index?: string
  movie: Movie
}

export const HalfMovieCard: React.FC<HalfMovieCardProps> = ({
  index = '',
  movie,
}) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const indexSize = theme.typography.h4.fontSize

  return (
    <Card
      component={Link}
      to={`/movie/${movie.id}`}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        display: 'flex',
        p: 2,
        pl: 0,
        borderRadius: 2,
        minWidth: '100%',
        maxHeight: 240,
      }}
    >
      {/* Index */}
      <Box display="flex" alignItems="start" flexDirection="row" p={2}>
        <Typography variant="h4" fontWeight="bold" sx={{ fontSize: '1.5rem' }}>
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
        sx={{
          ml: 2,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <AccesibleText
          variant="h5"
          fontWeight="bold"
          maxLength={20}
          sx={{ fontSize: '1.3rem' }}
        >
          {movie.title}
        </AccesibleText>
        <Box
          component="ul"
          display="flex"
          flexWrap="wrap"
          overflow="scroll"
          gap={1}
          m={0}
          p={0}
          className="no-scrollbar"
        >
          {movie.genres.map((genre) => (
            <GenreChip
              genreId={genre}
              component="li"
              variant="filled"
              key={genre}
            />
          ))}
        </Box>
        <Box display="flex" gap={1} alignItems="center" flexDirection="row">
          <StarRoundedIcon color="primary" />
          <Typography mr={2} variant="body1" fontWeight="bold">
            {movie.voteAverage}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
