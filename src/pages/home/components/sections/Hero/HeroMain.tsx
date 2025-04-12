import { BookmarkButton } from '@/components/bookmarkbutton/BookmarkButton'
import { PosterContainer } from '@/components/containers/PosterContainer'
import { Movie } from '@/models/movie'
import { Box, IconButton, Typography } from '@mui/material'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { DetailActions } from '@/models/detailActions'

interface HeroMainProps {
  movie: Movie | null
}

export const HeroMain: React.FC<HeroMainProps> = ({ movie }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const navigateToMovie = () => {
    if (movie) {
      navigate(`/movie/${movie.id}`)
    }
  }

  if (!movie) {
    return null
  }

  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      position="relative"
      p={4}
    >
      <img
        src={movie.backdrop}
        alt={movie.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          zIndex: -1,
          borderRadius: 5,
          maskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 0) 90%)',
        }}
      />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
        mt="50%"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Movie poster */}
        <Box component="aside" position="relative">
          <PosterContainer
            alt={t('home.hero.posterAlt', { title: movie.title })}
            src={movie.poster}
            height="250px"
          />
          <BookmarkButton movieId={movie.id} style="icon" />
        </Box>
        {/* Movie info */}
        <Box component="section" display="flex" flexDirection="row" p={2}>
          <IconButton
            aria-label={t('home.hero.subtitle', { title: movie.title })}
            component={Link}
            to={`/movie/${movie.id}/${DetailActions.Play}`}
            sx={{
              width: 100,
              height: 100,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              transition: 'background-color 0.3s ease',
            }}
          >
            <PlayArrowRoundedIcon sx={{ fontSize: 60, color: 'white' }} />
          </IconButton>
          <Box component="article" display="flex" flexDirection="column" p={1}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="textPrimary"
              role="button"
              onClick={navigateToMovie}
              sx={{ cursor: 'pointer' }}
            >
              {movie.title}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              {t('home.hero.subtitle', { title: movie.title })}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
