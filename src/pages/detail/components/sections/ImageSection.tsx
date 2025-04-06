import React from 'react'
import { SliderSection } from '@/components/slidersection/SliderSection'
import { useTranslation } from 'react-i18next'
import { SLIDER_HEIGHT } from '@/pages/detail/constants/detailConstants'
import { Image } from '../../models/movieDetails'
import { ImageContainer } from '@/components/containers/ImageContainer'

interface ImageSectionProps {
  title: string
  images: {
    backdrops: Image[]
    posters: Image[]
  }
  onOpen: (image: Image) => void
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

  const renderItem = (item: Image) => {
    return (
      <ImageContainer
        height={SLIDER_HEIGHT}
        aspectRatio={item.aspectRatio}
        src={item.src}
        role="button"
        alt={t('details.images.alt', { title })}
        onClick={() => onOpen(item)}
        borderRadius={3}
        sx={{ cursor: 'pointer' }}
        tabIndex={0}
      />
    )
  }

  return (
    <SliderSection
      title={t('details.images.title')}
      items={plainImages}
      onSeeAll={onSeeAll}
      renderItem={renderItem}
      seeAllLabel={t('global.slider.seeAll') + ` ${plainImages.length}`}
      noContent={t('details.images.noContent')}
    />
  )
}
