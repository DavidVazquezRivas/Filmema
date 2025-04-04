import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { SelectOption } from '@/models/selectOption'
import { Person } from '@/pages/detail/models/movieDetails'
import { minToHoursMin } from '@/utils/time-utils'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { shortNumber } from '@/utils/number-utils'
import { PosterContainer } from '@/components/containers/PosterContainer'
import { BookmarkButton } from '@/components/bookmarkbutton/BookmarkButton'
import { GenreChip } from '@/components/genrechip/GenreChip'
import { AccesibleText } from '@/components/accessibletext/AccesibleText'
import { starLimit } from '@/pages/detail/constants/detailConstants'

interface HeroProps {
  backdrop: string
  genres: SelectOption[]
  id: number
  overview: string
  poster: string
  releaseYear: number
  runtime: number
  title: string
  cast: Person[]
  voteAverage: number
  voteCount: number
}

export const Hero: React.FC<HeroProps> = ({
  backdrop,
  genres,
  id,
  overview,
  poster,
  releaseYear,
  runtime,
  title,
  cast,
  voteAverage,
  voteCount,
}) => {
  const { t } = useTranslation()
  const formattedRuntime = minToHoursMin(runtime)

  const handleClickRate = () => {
    // TODO : Handle rate click
  }

  const handleAddToWatchlist = () => {
    // TODO : Handle add to watchlist click
  }

  const genreChips = genres.map((genre) => (
    <GenreChip
      genreId={Number(genre.value)}
      component="li"
      variant="filled"
      key={genre.value}
    />
  ))

  const stars = cast
    .filter((person) => person.popularity >= starLimit)
    .map((person) => (
      <Typography key={person.id} color="primary" variant="body1">
        {person.name}
      </Typography>
    ))

  const starsContent =
    stars.length > 0 ? (
      <Box
        component="ul"
        display="flex"
        flexDirection="row"
        gap={1.5}
        m={0}
        p={0}
      >
        {stars}
      </Box>
    ) : (
      <Typography color="text.secondary" variant="body1">
        {t('details.hero.noStars')}
      </Typography>
    )

  return (
    <Box
      component="section"
      position="relative"
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
    >
      <Box
        component="header"
        position="relative"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body1" color="text.secondary">
            {`${releaseYear} · ${formattedRuntime}`}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" gap={1}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
              borderRadius: 3,
              padding: 1.5,
            }}
            onClick={handleClickRate}
          >
            <StarRoundedIcon />
            <Typography variant="body1">{t('details.hero.rate')}</Typography>
          </Button>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1}
            borderRadius={3}
            p={1.5}
            sx={{ backgroundColor: 'rgba(120, 120, 120, 0.4)' }}
          >
            <StarRoundedIcon color="primary" />
            <Typography variant="body1" color="text.secondary">
              <b>{voteAverage}</b>
              {`/10 (${shortNumber(voteCount)})`}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* TODO: try to fix backdrop fit */}
      <Box
        position="relative"
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        gap={1}
        width="100%"
        height="400px"
        overflow="hidden"
      >
        <PosterContainer
          src={poster}
          alt={t('details.hero.posterAlt', { title: title })}
          height="100%"
          style={{
            borderRadius: '0',
          }}
        />
        <Box
          component="img"
          src={backdrop}
          alt={t('details.hero.backdropAlt', { title: title })}
          sx={{
            objectFit: 'fill',
          }}
        />
      </Box>
      <Box
        display="flex"
        position="relative"
        flexDirection="row"
        justifyContent="space-between"
        gap={10}
      >
        <Box
          display="grid"
          gridTemplateColumns="auto 1fr"
          gap={3}
          alignItems="flex-start"
          width="100%"
        >
          {/* First row */}
          <Typography
            variant="body1"
            color="text.secondary"
            fontWeight="bold"
            sx={{ alignSelf: 'center' }}
          >
            {t('details.hero.genre')}
          </Typography>
          <Box component="ul" display="flex" gap={1} m={0} p={0}>
            {genreChips}
          </Box>

          {/* Second row */}
          <Typography variant="body1" color="text.secondary" fontWeight="bold">
            {t('details.hero.overview')}
          </Typography>
          <AccesibleText audible>{overview}</AccesibleText>

          {/* Third row */}
          <Typography variant="body1" color="text.secondary" fontWeight="bold">
            {t('details.hero.stars')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {starsContent}
          </Typography>
        </Box>
        <BookmarkButton movieId={id} style="button" />
      </Box>
    </Box>
  )
}
