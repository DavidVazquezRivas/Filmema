import { Image } from '@/pages/detail/models/movieDetails'
import { ImageSection } from '../sections/ImageSection'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { ImageContainer } from '@/components/containers/ImageContainer'

interface ImagePanelProps {
  image: Image
  images: Image[]
  title: string
}

export const ImagePanel: React.FC<ImagePanelProps> = ({
  image,
  images,
  title,
}) => {
  const theme = useTheme()

  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'))
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))

  let height
  if (image.aspectRatio >= 1) {
    height = isLgUp ? 500 : isMdUp ? 370 : isSmUp ? 300 : 250
  } else {
    height = isLgUp ? 800 : isMdUp ? 700 : isSmUp ? 600 : 450
  }

  return (
    <>
      <Box display="flex" justifyContent="center" mb={2} width="100%">
        <ImageContainer
          height={height}
          aspectRatio={image.aspectRatio}
          src={image.src}
          alt={`Image of ${title}`}
          borderRadius={3}
        />
      </Box>
      <ImageSection title={title} plainedImages={images} />
    </>
  )
}
