import L from 'leaflet'
import { Marker, Tooltip } from 'react-leaflet'
import { NearMovie } from '@/pages/near/models/nearMovie'
import { MapConfig } from '@/pages/near/constants/map'
import { Box, Typography, styled } from '@mui/material'
import { AccesibleText } from '@/components/accessibletext/AccesibleText'
import { useTranslation } from 'react-i18next'
import { usePanel } from '@/context/PanelContext'
import { NearMoviePanel } from '../panels/NearMoviePanel'

const Icon = L.icon({
  iconUrl: MapConfig.MovieMarker.Url,
  iconSize: MapConfig.MovieMarker.Size,
  iconAnchor: MapConfig.MovieMarker.Anchor,
})

interface MovieMarkerProps {
  movie: NearMovie
}

export const MovieMarker: React.FC<MovieMarkerProps> = ({ movie }) => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()

  const handleOpen = () => {
    openPanel(<NearMoviePanel movie={movie} />, movie.name)
  }

  const StyledTooltip = styled(Tooltip)(({ theme }) => ({
    backgroundColor: `${theme.palette.primary.contrastText} !important`,
    border: `1px solid ${theme.palette.divider} !important`,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[4],
    padding: theme.spacing(1.5) + '!important',
    backdropFilter: 'blur(4px)',
    width: '300px',
  }))

  return (
    <Marker
      position={[
        movie.locationCreated.geo.latitude,
        movie.locationCreated.geo.longitude,
      ]}
      icon={Icon}
      eventHandlers={{
        click: handleOpen,
      }}
    >
      <StyledTooltip
        direction="top"
        offset={[0, -10]}
        permanent={false}
        interactive
      >
        <Box display="flex" width="100%" flexDirection="column" gap={0.5}>
          <Typography
            variant="h6"
            component="h3"
            fontWeight={600}
            lineHeight={1.2}
            color="text.primary"
            width="100%"
          >
            {movie.name}
          </Typography>
          <Typography width="100%" variant="body2" color="textSecondary">
            {t('near.map.year')}: <strong>{movie.datePublished}</strong>
          </Typography>
          <AccesibleText
            variant="body2"
            color="textSecondary"
            lineHeight={1.4}
            fontStyle="italic"
            width="100%"
            overflow="hidden"
            whiteSpace="normal"
            audible={false}
            maxLength={100}
          >
            {movie.description}
          </AccesibleText>
        </Box>
      </StyledTooltip>
    </Marker>
  )
}
