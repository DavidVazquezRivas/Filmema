import { Video } from '@/pages/detail/models/movieDetails'
import { Box } from '@mui/material'
import { VideoSection } from '../sections/VideoSection'

interface VideoPanelProps {
  video: Video
  videos: Video[]
  title: string
  autoplay?: boolean
}

export const VideoPanel: React.FC<VideoPanelProps> = ({
  video,
  videos,
  title,
  autoplay = false,
}) => {
  const player = autoplay ? (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
      title={video.name}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : (
    // @ts-ignore
    <lite-youtube
      videoid={video.key}
      title={video.name}
      posterquality="maxresdefault"
      style={{ width: '100%', height: '100%' }}
    />
  )

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        mb={2}
        width="100%"
        sx={{
          aspectRatio: '16 / 9',
        }}
      >
        {player}
      </Box>
      <VideoSection title={title} videos={videos} />
    </>
  )
}
