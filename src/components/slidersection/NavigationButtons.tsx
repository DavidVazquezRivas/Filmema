import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { SwiperRef } from 'swiper/react'

interface NavigationButtonsProps {
  ref: React.RefObject<SwiperRef | null>
}

interface NavigationButtonState {
  isBeginning: boolean
  isEnd: boolean
}

const NavigationButtonInitialState: NavigationButtonState = {
  isBeginning: true,
  isEnd: true,
}

const NavigationButtonsStyle = {
  backgroundColor: 'rgba(50, 50, 50, 0.1)',
  cursor: 'pointer',
  '&:disabled': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    cursor: 'not-allowed',
  },
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  ref,
}) => {
  const [state, setState] = useState<NavigationButtonState>(
    NavigationButtonInitialState
  )

  const updateNavigationState = () => {
    const swiper = ref?.current?.swiper
    if (!swiper) return

    const isBeginning = swiper.isBeginning
    const isEnd = swiper.isEnd
    if (isBeginning === state.isBeginning && isEnd === state.isEnd) return
    setState({ isBeginning, isEnd })
  }

  useEffect(() => {
    const swiper = ref?.current?.swiper
    if (!swiper) return

    swiper.on('slideChange', updateNavigationState)
    updateNavigationState()

    return () => {
      swiper.off('slideChange', updateNavigationState)
    }
  }, [ref])

  return (
    <Box display="flex" justifyContent="center" gap={2}>
      <IconButton
        onClick={() => ref?.current?.swiper.slidePrev()}
        sx={NavigationButtonsStyle}
        disabled={state.isBeginning}
      >
        <ChevronLeftIcon fontSize="large" />
      </IconButton>
      <IconButton
        onClick={() => ref?.current?.swiper.slideNext()}
        sx={NavigationButtonsStyle}
        disabled={state.isEnd}
      >
        <ChevronRightIcon fontSize="large" />
      </IconButton>
    </Box>
  )
}
