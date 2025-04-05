import { getDimensions, getSvgPlaceholder } from '@/utils/image-utils'
import { Box, BoxProps, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'

type ImageProps =
  | { width: number; height: number; aspectRatio?: never }
  | { width: number; aspectRatio: number; height?: never }
  | { height: number; aspectRatio: number; width?: never }

type ImageContainerProps = { src: string; alt?: string } & BoxProps & ImageProps

interface ImageContainerState {
  imageSrc: string
  loading: boolean
}

export const ImageContainer: React.FC<ImageContainerProps> = ({
  width,
  height,
  aspectRatio,
  src,
  alt,
  ...props
}) => {
  const [imageState, setImageState] = useState<ImageContainerState>({
    imageSrc: src,
    loading: true,
  })

  useEffect(() => {
    setImageState((prev) => ({
      imageSrc: src,
      loading: prev.imageSrc !== src,
    }))
  }, [src])

  const dimensions = getDimensions(width, height, aspectRatio)

  const placeholder = getSvgPlaceholder(dimensions.width, dimensions.height)

  const handleLoad = () => {
    setImageState((prev) => ({
      imageSrc: prev.imageSrc,
      loading: false,
    }))
  }

  const handleError = () => {
    setImageState((prev) => ({
      imageSrc: placeholder,
      loading: prev.loading,
    }))
  }

  return (
    <Box
      borderRadius={2}
      {...props}
      height={dimensions.height}
      width={dimensions.width}
      position="relative"
      overflow="hidden"
      sx={{
        aspectRatio: dimensions.aspectRatio,
      }}
    >
      {/* Pay attention to order when using ...props, previous props will be overriden */}
      {imageState.loading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          height="100%"
          width="100%"
        />
      )}
      <Box
        component="img"
        src={imageState.imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        width="100%"
        height="100%"
      />
    </Box>
  )
}
