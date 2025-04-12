import { SliderSection } from '@/components/slidersection/SliderSection'
import { Person } from '@/pages/detail/models/movieDetails'
import { Box } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SLIDER_HEIGHT } from '@/pages/detail/constants/detailConstants'
import { AccesibleText } from '@/components/accessibletext/AccesibleText'
import { usePanel } from '@/context/PanelContext'
import { CreditPanel } from '../panels/CreditPanel'

interface CastSectionProps {
  title: string
  credits: {
    cast: Person[]
    crew: Person[]
  }
}

export const CastSection: React.FC<CastSectionProps> = ({ title, credits }) => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()

  const handleOpenAllCast = () => {
    openPanel(<CreditPanel credits={plainedCredits} />, title)
  }

  const cast = credits.cast
  const plainedCredits = [...credits.cast, ...credits.crew]

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
      onSeeAll={handleOpenAllCast}
      renderItem={renderItem}
      seeAllLabel={t('global.slider.seeAll')}
    />
  )
}
