import {
  getThumbnailUrl,
  YOUTUBE_ASPECT_RATIO,
} from '@/constants/youtubeConstants'
import { Video } from '@/pages/detail/models/movieDetails'
import { Box, IconButton } from '@mui/material'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { useTranslation } from 'react-i18next'
import { SLIDER_HEIGHT } from '@/pages/detail/constants/detailConstants'
import { SliderSection } from '@/components/slidersection/SliderSection'
import { ImageContainer } from '@/components/containers/ImageContainer'

interface VideoSectionProps {
  title: string
  videos: Video[]
  onOpen: (video: Video) => void
  onSeeAll: () => void
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  title,
  videos,
  onOpen,
  onSeeAll,
}) => {
  const { t } = useTranslation()

  const renderItem = (item: Video) => {
    return (
      <Box position="relative">
        <ImageContainer
          height={SLIDER_HEIGHT}
          aspectRatio={YOUTUBE_ASPECT_RATIO}
          src={getThumbnailUrl(item.key, '0')}
          alt={t('details.videos.alt', { title })}
          borderRadius={3}
        />
        <IconButton
          onClick={() => onOpen(item)}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            fontSize: '3rem',
            transition: 'background-color 0.3s, font-size 0.3s',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              fontSize: '4rem',
            },
          }}
        >
          <PlayArrowRoundedIcon fontSize="inherit" />
        </IconButton>
      </Box>
    )
  }

  return (
    <SliderSection
      title={t('details.videos.title')}
      items={videos}
      onSeeAll={onSeeAll}
      renderItem={renderItem}
      seeAllLabel={t('global.slider.seeAll') + ` ${videos.length}`}
      noContent={t('details.videos.noContent')}
    />
  )
}
