import { getThumbnailUrl } from '@/constants/youtubeConstants'
import { Video } from '@/pages/detail/models/movieDetails'
import { Box, IconButton } from '@mui/material'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { useTranslation } from 'react-i18next'
import { AccesibleText } from '@/components/accessibletext/AccesibleText'
import { VideoPanel } from './VideoPanel'
import { usePanel } from '@/context/PanelContext'

interface AllVideosPanelProps {
  videos: Video[]
  title: string
}

export const AllVideosPanel: React.FC<AllVideosPanelProps> = ({
  videos,
  title,
}) => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()

  const handleOpenVideoPlaying = (video: Video) => {
    openPanel(
      <VideoPanel videos={videos} video={video} title={video.name} autoplay />,
      title
    )
  }

  const handleOpenVideo = (video: Video) => {
    openPanel(
      <VideoPanel videos={videos} video={video} title={video.name} />,
      title
    )
  }

  return (
    <Box
      display="grid"
      gap={2}
      gridTemplateColumns={{
        xs: 'repeat(auto-fill, minmax(250px, 1fr))',
        sm: 'repeat(auto-fill, minmax(350px, 1fr))',
      }}
      padding={2}
    >
      {videos.map((video) => (
        <Box key={video.key} position="relative" borderRadius={3} pb={2}>
          <img
            src={getThumbnailUrl(video.key, '0')}
            alt={t('details.videos.alt', { title })}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 8,
              marginBottom: -7,
            }}
          />

          <AccesibleText
            variant="h6"
            role="button"
            onClick={() => handleOpenVideo(video)}
            sx={{
              cursor: 'pointer',
            }}
          >
            {video.name}
          </AccesibleText>
          <IconButton
            onClick={() => handleOpenVideoPlaying(video)}
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
      ))}
    </Box>
  )
}
