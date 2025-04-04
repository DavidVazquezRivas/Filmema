import { PosterContainer } from '@/components/containers/PosterContainer'
import { Movie } from '@/models/movie'
import { Box, IconButton, Typography } from '@mui/material'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { DetailActions } from '@/models/detailActions'

interface HeroCardProps {
  movie: Movie
}

export const HeroCard: React.FC<HeroCardProps> = ({ movie }) => {
  const { t } = useTranslation()

  return (
    <Box
      component="li"
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={2}
      p={2}
      overflow="hidden"
      sx={{
        position: 'relative',
        aspectRatio: '2',
        width: '300px',
        overflow: 'hidden',
        borderRadius: 6,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(50, 50, 50, 0.6), rgba(50, 50, 50, 0.6)),
            url(${movie.backdrop})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          zIndex: -1,
        },
      }}
    >
      {/* Movie poster */}
      <Box component="aside" position="relative">
        <PosterContainer
          alt={t('home.hero.posterAlt', { title: movie.title })}
          src={movie.poster}
          height="120px"
        />
      </Box>
      {/* Movie info */}
      <Box component="section" display="flex" flexDirection="column" gap={1}>
        <Box component="article" display="flex" flexDirection="column" p={1}>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="white"
            fontSize="0.9rem"
          >
            {movie.title}
          </Typography>
          <Typography variant="body1" color="lightgray" fontSize="0.65rem">
            {t('home.hero.subtitle', { title: movie.title })}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <IconButton
            aria-label={t('home.hero.subtitle', { title: movie.title })}
            component={Link}
            to={`/movie/${movie.id}/${DetailActions.Play}`}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            <PlayArrowRoundedIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
