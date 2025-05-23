import { InfoSection } from '@/components/sections/infosection/InfoSection'
import { SliderSection } from '@/components/slidersection/SliderSection'
import { Location, NearImage } from '@/pages/near/models/nearMovie'
import { Box, Stack, Typography } from '@mui/material'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface LocationProps {
  location: Location
}

export const LocationSection: React.FC<LocationProps> = ({ location }) => {
  const { t } = useTranslation()

  const renderItem = useCallback(
    (item: NearImage) => (
      <img
        src={item.contentUrl}
        alt={item.description}
        style={{
          borderRadius: 6,
          maxHeight: '400px',
          maxWidth: '100%',
        }}
      />
    ),
    []
  )

  const accesibility = location.additionalProperty.find(
    (property) => property.name === 'accessibility'
  )?.value as string

  const access = location.additionalProperty.find(
    (property) => property.name === 'publicAccess'
  )?.value as string

  const zoneType = location.additionalProperty.find(
    (property) => property.name === 'zoneType'
  )?.value as string
  const video = location.additionalProperty.find(
    (property) => property.name === 'video'
  )?.value as string

  const infoItems = [
    {
      title: t('near.detail.info.name'),
      values: [<Typography>{location.name}</Typography>],
    },
    {
      title: t('near.detail.info.description'),
      values: [<Typography>{location.description}</Typography>],
    },
    {
      title: t('near.detail.info.country'),
      values: [<Typography>{location.address.addressCountry}</Typography>],
    },
    {
      title: t('near.detail.info.region'),
      values: [
        <Typography>
          {t(`near.detail.renderers.region.${location.address.addressRegion}`)}
        </Typography>,
      ],
    },
    {
      title: t('near.detail.info.locality'),
      values: [<Typography>{location.address.addressLocality}</Typography>],
    },
    {
      title: t('near.detail.info.zoneType'),
      values: [
        <Typography>
          {t(`near.detail.renderers.zoneType.${zoneType}`)}
        </Typography>,
      ],
    },
    {
      title: t('near.detail.info.accesibility'),
      values: [
        <Typography>
          {t(`near.detail.renderers.accesibility.${accesibility}`)}
        </Typography>,
      ],
    },
    {
      title: t('near.detail.info.access'),
      values: [
        <Typography>{t(`near.detail.renderers.access.${access}`)}</Typography>,
      ],
    },
  ]

  return (
    <Stack spacing={5}>
      <SliderSection
        title={t('near.detail.images')}
        items={location.image}
        onSeeAll={() => {}}
        renderItem={renderItem}
        seeAll={false}
      />
      <Stack spacing={2} direction="column">
        <Typography variant="h5" fontWeight="bold">
          {t('near.detail.video.title')}
        </Typography>
        <Box
          component="video"
          controls
          width="100%"
          sx={{ borderRadius: 2, bgcolor: 'black' }}
        >
          <source src={video} type="video/webm" />
          {t('near.detail.video.unsupported')}
        </Box>
      </Stack>
      <InfoSection title={t('near.detail.info.title')} items={infoItems} />
    </Stack>
  )
}
