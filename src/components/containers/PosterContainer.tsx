import { posterPlaceholder } from '@/constants/placeholders'
import { Box, CardMedia, Skeleton } from '@mui/material'
import React, { useEffect } from 'react'

type PosterContainerProps = {
  width?: string
  height?: string
  alt: string
  src: string
} & React.ComponentProps<'img'>

export const PosterContainer: React.FC<PosterContainerProps> = ({
  width,
  height,
  alt,
  src,
  ...restProps
}) => {
  const [imageState, setImageState] = React.useState({
    imageSrc: src,
    loading: true,
  })

  useEffect(() => {
    setImageState((prev) => ({
      imageSrc: src,
      loading: prev.imageSrc !== src,
    }))
  }, [src])

  const handleLoad = () => {
    setImageState((prev) => ({
      imageSrc: prev.imageSrc,
      loading: false,
    }))
  }

  const handleError = () => {
    setImageState((prev) => ({
      imageSrc: posterPlaceholder,
      loading: prev.loading,
    }))
  }

  const boxSx = width
    ? { width: width, aspectRatio: '2/3' }
    : height
    ? { height: height, aspectRatio: '2/3' }
    : { height: '200px', aspectRatio: '2/3' } // Default height

  return (
    <Box sx={boxSx} position="relative">
      {imageState.loading && (
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: 2, height: '100%', width: '100%' }}
        />
      )}
      <CardMedia
        component="img"
        alt={alt}
        image={imageState.imageSrc}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        sx={{
          borderRadius: 2,
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        {...restProps}
      />
    </Box>
  )
}
