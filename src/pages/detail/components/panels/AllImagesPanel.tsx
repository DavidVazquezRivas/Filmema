import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Image } from '@/pages/detail/models/movieDetails'
import { usePanel } from '@/context/PanelContext'
import { ImagePanel } from './ImagePanel'

interface AllImagesPanelProps {
  images: Image[]
  title: string
}

export const AllImagesPanel: React.FC<AllImagesPanelProps> = ({
  images,
  title,
}) => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()

  const handleOpenImage = (image: Image) => {
    openPanel(<ImagePanel images={images} image={image} title={title} />, title)
  }

  return (
    <>
      <Box
        component="header"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        borderBottom={1}
        paddingBottom={2}
        borderColor="divider"
        marginBottom={2}
      >
        <Typography variant="body1">{t('details.images.title')}</Typography>
        <Typography variant="body1" color="text.secondary">
          {t('details.images.count', { count: images.length })}
        </Typography>
      </Box>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              style={{
                width: '100%',
                display: 'block',
                borderRadius: 8,
                cursor: 'pointer',
              }}
              alt={t('details.images.alt', title)}
              loading="lazy"
              role="button"
              onClick={() => handleOpenImage(image)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  )
}
