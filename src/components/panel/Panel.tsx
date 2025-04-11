import React from 'react'
import { usePanel } from '@/context/PanelContext'
import {
  SwipeableDrawer,
  IconButton,
  Box,
  Typography,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface PanelProps {}

export const Panel: React.FC<PanelProps> = () => {
  const { panelState, closePanel } = usePanel()
  const theme = useTheme()
  const isOpen = panelState.isOpen

  const handleCloseDrawer = () => {
    closePanel()
  }

  const handleOpenDrawer = () => {}

  const { content: PanelContent, title } = panelState

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onClose={handleCloseDrawer}
      onOpen={handleOpenDrawer}
      disableSwipeToOpen={true}
      allowSwipeInChildren={true}
      swipeAreaWidth={0}
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: '100%',
              md: '80vw',
            },
            minWidth: {
              md: theme.breakpoints.values.sm,
            },
            maxWidth: {
              md: theme.breakpoints.values.lg,
            },
            minHeight: '60vh',
            maxHeight: '90vh',
            margin: '0 auto',
            overflow: 'hidden',
            borderRadius: '16px 16px 0 0',
            boxShadow: 24,
            touchAction: 'none',
          },
        },
      }}
      ModalProps={{ disableScrollLock: true, keepMounted: true }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 4,
          pt: 2,
          pb: 1.5,
          position: 'sticky',
        }}
      >
        <Typography variant="h6" component="div">
          {title}
        </Typography>

        <IconButton
          onClick={handleCloseDrawer}
          aria-label="cerrar"
          sx={{ color: 'text.primary', mr: -1 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        className="only-scrollbar"
        sx={{
          p: 4,
          pt: 0,
          overflow: 'auto',
          overscrollBehavior: 'contain',
        }}
      >
        {PanelContent}
      </Box>
    </SwipeableDrawer>
  )
}
