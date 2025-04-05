import { Box, Typography, SxProps, Button } from '@mui/material'
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
// @ts-ignore Debería funcionar
import 'swiper/css'
import { useRef } from 'react'
import { NavigationButtons } from './NavigationButtons'
import { useTranslation } from 'react-i18next'

interface SliderSectionProps {
  title: string
  items: any[]
  onSeeAll: () => void
  seeAllLabel?: string
  renderItem: (item: any, index: number) => React.ReactNode
  sx?: SxProps
  slidesPerView?: number | 'auto'
  spaceBetween?: number
}

export const SliderSection = ({
  title,
  items,
  onSeeAll,
  seeAllLabel,
  renderItem,
  sx,
  slidesPerView = 'auto',
  spaceBetween = 20,
}: SliderSectionProps) => {
  const { t } = useTranslation()
  const swiperRef = useRef<SwiperRef>(null)

  seeAllLabel = seeAllLabel ?? t('global.slider.seeAll')

  return (
    <Box component="section" sx={{ position: 'relative', ...sx }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={4}>
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Button
            onClick={onSeeAll}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
              borderRadius: 3,
              padding: 1.5,
              backgroundColor: 'rgba(120, 120, 120, 0.4)',
              color: 'text.primary',
              textTransform: 'none',
            }}
          >
            <Typography variant="body1">{seeAllLabel}</Typography>
            <ChevronRightIcon />
          </Button>
        </Box>
        <NavigationButtons ref={swiperRef} />
      </Box>

      {/* Slider Container */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        navigation
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} style={{ width: 'auto' }}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
