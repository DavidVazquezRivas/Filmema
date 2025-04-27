import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { shortNumber } from '@/utils/number-utils'
import { PosterContainer } from '@/components/containers/PosterContainer'
import { BookmarkButton } from '@/components/bookmarkbutton/BookmarkButton'
import { AccesibleText } from '@/components/accessibletext/AccesibleText'

interface HeroProps {
  backdrop: string
  id: number
  overview: string
  poster: string
  releaseYear: number
  title: string
  voteAverage: number
  voteCount: number
}

export const Hero: React.FC<HeroProps> = ({
  backdrop,
  id,
  overview,
  poster,
  releaseYear,
  title,
  voteAverage,
  voteCount,
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClickRate = () => {
    // TODO : Handle rate click
  }

  // const handleAddToWatchlist = () => {
  //   // TODO : Handle add to watchlist click
  // }

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
            {`${releaseYear}`}
          </Typography>
        </Box>
        <Box
          display="flex"
          gap={1}
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        >
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
        justifyContent="center"
        gap={1}
        width="100%"
        height="400px"
        overflow="hidden"
      >
        {isSmall ? (
          <PosterContainer
            src={poster}
            alt={t('details.hero.posterAlt', { title: title })}
            height="100%"
            style={{
              borderRadius: '0',
            }}
          />
        ) : (
          <Box
            component="img"
            src={backdrop}
            alt={t('details.hero.backdropAlt', { title: title })}
            sx={{
              objectFit: 'fill',
            }}
          />
        )}
      </Box>
      <Box
        display="grid"
        position="relative"
        gap={3}
        sx={
          isSmall
            ? {
                gridTemplateRows: 'auto auto',
              }
            : {
                gridTemplateColumns: '3fr 1fr',
              }
        }
      >
        <Box
          display="grid"
          gridTemplateColumns="auto 1fr"
          gap={3}
          alignItems="flex-start"
        >
          <Typography variant="body1" color="text.secondary" fontWeight="bold">
            {t('details.hero.overview')}
          </Typography>
          <AccesibleText audible>{overview}</AccesibleText>
        </Box>
        <BookmarkButton movieId={id} style="button" />
      </Box>
    </Box>
  )
}
