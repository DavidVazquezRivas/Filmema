import { SliderSection } from '@/components/slidersection/SliderSection'
import { Person } from '@/pages/detail/models/movieDetails'
import { Box } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SLIDER_HEIGHT } from '@/pages/detail/constants/detailConstants'
import { AccesibleText } from '@/components/accessibletext/AccesibleText'

interface CastSectionProps {
  cast: Person[]
  onSeeAll: () => void
}

export const CastSection: React.FC<CastSectionProps> = ({ cast, onSeeAll }) => {
  const { t } = useTranslation()

  const renderItem = (item: Person) => {
    return (
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Box
          component="img"
          loading="lazy"
          src={item.profilePath}
          alt={t('details.cast.alt', { name: item.name })}
          height={SLIDER_HEIGHT}
          borderRadius={3}
        ></Box>
        <AccesibleText
          variant="body1"
          color="textPrimary"
          mt={1}
          maxLength={20}
        >
          {item.name}
        </AccesibleText>
        <AccesibleText variant="body2" color="textSecondary" maxLength={20}>
          {item.character ?? item.department}
        </AccesibleText>
      </Box>
    )
  }

  return (
    <SliderSection
      title={t('details.cast.title')}
      items={cast}
      onSeeAll={onSeeAll}
      renderItem={renderItem}
      seeAllLabel={t('global.slider.seeAll')}
    />
  )
}
