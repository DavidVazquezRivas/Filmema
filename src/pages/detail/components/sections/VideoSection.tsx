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
import { usePanel } from '@/context/PanelContext'
import { useCallback, useEffect } from 'react'
import { AllVideosPanel } from '../panels/AllVideosPanel'
import { VideoPanel } from '../panels/VideoPanel'

interface VideoSectionProps {
  title: string
  videos: Video[]
  autoplay?: boolean
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  title,
  videos,
  autoplay = false,
}) => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()

  useEffect(() => {
    if (autoplay && videos.length > 0) {
      handleOpenVideo(videos[0])
    }
  }, [autoplay, videos])

  const handleOpenAllVideos = () => {
    openPanel(<AllVideosPanel videos={videos} title={title} />, title)
  }

  const handleOpenVideo = (video: Video) => {
    openPanel(
      <VideoPanel video={video} videos={videos} title={title} autoplay />,
      video.name
    )
  }

  const renderItem = useCallback((item: Video) => {
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
          onClick={() => handleOpenVideo(item)}
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
  }, [])

  return (
    <SliderSection
      title={t('details.videos.title')}
      items={videos}
      onSeeAll={() => handleOpenAllVideos()}
      renderItem={renderItem}
      seeAllLabel={t('global.slider.seeAll') + ` ${videos.length}`}
      noContent={t('details.videos.noContent')}
    />
  )
}
