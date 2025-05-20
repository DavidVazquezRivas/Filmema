import { HalfMovieCard } from '@/components/cards/HalfMovieCard'
import { Movie } from '@/models/movie'
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Link } from 'react-router-dom'

interface GenericSectionProps {
  title: string
  subtitle?: string
  href?: string
  descriptions?: string[]
  movies: Movie[]
}

export const GenericSection: React.FC<GenericSectionProps> = ({
  title,
  subtitle = title,
  href,
  descriptions,
  movies,
}) => {
  const theme = useTheme()
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'))
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const link = href ? (
    <IconButton component={Link} to={href} aria-label={subtitle}>
      <ArrowForwardRoundedIcon fontSize="large" sx={{ color: 'textPrimary' }} />
    </IconButton>
  ) : (
    ''
  )

  const descriptionsComponents = descriptions?.map((description) => {
    return (
      <Typography
        component="li"
        key={description}
        variant="body1"
        color="textSecondary"
      >
        {description}
      </Typography>
    )
  })

  const maxCards = isLgUp ? 6 : isMdUp ? 4 : 3

  const cards = movies
    .map((movie, index) => (
      <HalfMovieCard key={movie.id} movie={movie} index={`${index + 1}`} />
    ))
    .slice(0, maxCards)
  return (
    <Box
      component="section"
      width="100%"
      display="flex"
      flexDirection="column"
      position="relative"
      gap={2}
      p={2}
    >
      <Typography
        display={{ xs: 'none', md: 'block' }}
        variant="h2"
        position="absolute"
        fontWeight="bold"
        textAlign="center"
        color="textSecondary"
        zIndex={0}
        width="100%"
        top="20px"
        sx={{ fontSize: '8rem', opacity: 0.5 }}
      >
        {title}
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        gap={2}
        width="100%"
      >
        <CircleRoundedIcon
          fontSize="small"
          color="primary"
          sx={{ fontSize: '0.5rem' }}
        />
        <Typography variant="h3" fontSize={{ xs: '2rem', md: '3rem' }}>
          {subtitle}
        </Typography>
        {link}
      </Box>
      <Box
        component="ul"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width="100%"
        mt={-1}
        sx={{
          listStyle: 'none',
        }}
      >
        {descriptionsComponents}
      </Box>

      <Box
        component="section"
        gap={3}
        position="relative"
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        width="100%"
        flexWrap="wrap"
        justifyContent="center"
      >
        {cards}
      </Box>
    </Box>
  )
}
