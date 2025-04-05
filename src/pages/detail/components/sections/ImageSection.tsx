import React from 'react'
import { SliderSection } from '@/components/slidersection/SliderSection'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SLIDER_HEIGHT } from '@/pages/detail/constants/detailConstants'

interface ImageSectionProps {
  title: string
  images: {
    backdrops: string[]
    posters: string[]
  }
  onOpen: (image: string) => void
  onSeeAll: () => void
}

export const ImageSection: React.FC<ImageSectionProps> = ({
  title,
  images,
  onOpen,
  onSeeAll,
}) => {
  const { t } = useTranslation()

  const plainImages = [...images.backdrops, ...images.posters].sort(
    () => Math.random() - 0.5
  )

  const renderItem = (item: string) => {
    return (
      <Box
        component="img"
        role="button"
        src={item}
        alt={t('details.images.alt', { title })}
        height={SLIDER_HEIGHT}
        width="auto"
        onClick={() => onOpen(item)}
        borderRadius={3}
        sx={{ cursor: 'pointer' }}
        tabIndex={0}
      ></Box>
    )
  }

  return (
    <SliderSection
      title={t('details.images.title')}
      items={plainImages}
      onSeeAll={onSeeAll}
      renderItem={renderItem}
    />
  )
}
