import React, { useCallback, useMemo } from 'react'
import { SliderSection } from '@/components/slidersection/SliderSection'
import { useTranslation } from 'react-i18next'
import { SLIDER_HEIGHT } from '@/pages/detail/constants/detailConstants'
import { Image } from '../../models/movieDetails'
import { ImageContainer } from '@/components/containers/ImageContainer'
import { plainImages } from '@/pages/detail/utils/image-utils'
import { AllImagesPanel } from '../panels/AllImagesPanel'
import { usePanel } from '@/context/PanelContext'
import { ImagePanel } from '../panels/ImagePanel'

interface ImageSectionProps {
  title: string
  images?: {
    backdrops: Image[]
    posters: Image[]
  }
  plainedImages?: Image[]
}

export const ImageSection: React.FC<ImageSectionProps> = ({
  title,
  images = {} as { backdrops: []; posters: [] },
  plainedImages,
}) => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()

  plainedImages = plainedImages ?? useMemo(() => plainImages(images), [images])

  const handleOpenAllImages = () => {
    openPanel(<AllImagesPanel images={plainedImages} title={title} />, title)
  }

  const handleOpenImage = (image: Image) => {
    openPanel(
      <ImagePanel images={plainedImages} image={image} title={title} />,
      title
    )
  }

  const renderItem = useCallback(
    (item: Image) => (
      <ImageContainer
        height={SLIDER_HEIGHT}
        aspectRatio={item.aspectRatio}
        src={item.src}
        role="button"
        alt={t('details.images.alt', { title })}
        onClick={() => handleOpenImage(item)}
        borderRadius={3}
        sx={{ cursor: 'pointer' }}
        tabIndex={0}
      />
    ),
    []
  )

  return (
    <>
      <SliderSection
        title={t('details.images.title')}
        items={plainedImages}
        onSeeAll={handleOpenAllImages}
        renderItem={renderItem}
        seeAllLabel={`${t('global.slider.seeAll')} ${plainedImages.length}`}
        noContent={t('details.images.noContent')}
      />
    </>
  )
}
