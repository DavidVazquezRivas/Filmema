import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Stack,
} from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Logo from '@/assets/logo.svg'
import MenuIcon from '@mui/icons-material/Menu'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SearchBar } from '@/components/pagelayout/header/SearchBar'
import { ThemeModeToggle } from '@/components/pagelayout/header/ThemeModeToggle'
import { LanguageSelector } from '@/components/pagelayout/header/LanguageSelector'
import { useState } from 'react'

export const Header = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const navMenuItems = (
    <>
      <MenuItem
        component={Link}
        to="/discover"
        aria-label={t('header.navigation.discoverLabel')}
      >
        {t('header.navigation.discover')}
      </MenuItem>
      <MenuItem
        component={Link}
        to="/near"
        aria-label={t('header.navigation.nearYouLabel')}
      >
        {t('header.navigation.nearYou')}
      </MenuItem>
      <MenuItem
        component={Link}
        to="/now-playing"
        aria-label={t('header.navigation.nowPlayingLabel')}
      >
        {t('header.navigation.nowPlaying')}
      </MenuItem>
      <MenuItem
        component={Link}
        to="/upcoming"
        aria-label={t('header.navigation.upcomingLabel')}
      >
        {t('header.navigation.upcoming')}
      </MenuItem>
    </>
  )

  return (
    <Box
      component="header"
      padding={2}
      pl={0}
      pr={0}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={100}
      sx={{
        backgroundColor: 'darkZone',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Link to="/home">
          <Box component="img" src={Logo} alt="App Logo" maxHeight="35px" />
        </Link>
        <ButtonGroup
          variant="outlined"
          aria-label={t('header.navigation.label')}
          sx={{
            display: { xs: 'none', lg: 'flex' },
            border: 'none',
            '& .MuiButtonGroup-grouped': {
              border: 'none',
              borderRadius: 1,
            },
          }}
        >
          <Button
            component={Link}
            to="/discover"
            aria-label={t('header.navigation.discoverLabel')}
          >
            {t('header.navigation.discover')}
          </Button>
          <Button
            component={Link}
            to="/near"
            aria-label={t('header.navigation.nearYouLabel')}
          >
            {t('header.navigation.nearYou')}
          </Button>
          <Button
            component={Link}
            to="/now-playing"
            aria-label={t('header.navigation.nowPlayingLabel')}
          >
            {t('header.navigation.nowPlaying')}
          </Button>
          <Button
            component={Link}
            to="/upcoming"
            aria-label={t('header.navigation.upcomingLabel')}
          >
            {t('header.navigation.upcoming')}
          </Button>
        </ButtonGroup>
        <SearchBar
          placeholder={t('header.search.placeholder')}
          label={t('header.search.label')}
          sx={{
            display: { xs: 'none', md: 'flex' },
          }}
        />
        <Stack direction="row" spacing={0} alignItems="center">
          <Box
            component="section"
            role="group"
            display={{ xs: 'flex', md: 'flex' }}
            sx={{ alignItems: 'center' }}
          >
            <LanguageSelector />
            <ThemeModeToggle />
          </Box>
          <Box
            component="nav"
            sx={{ display: 'flex' }}
            aria-label={t('header.user.label')}
            display={{ xs: 'none', md: 'flex' }}
          >
            <IconButton
              component={Link}
              to="/watchlist"
              aria-label={t('header.user.watchlist.label')}
            >
              <BookmarkIcon />
            </IconButton>

            <IconButton
              component={Link}
              to="/profile"
              aria-label={t('header.user.profile.label')}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
          <Box display={{ xs: 'flex', lg: 'none' }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon sx={{ color: 'text.primary' }} />
                  </IconButton>
                </Box>

                {navMenuItems}
                <Divider sx={{ display: { xs: 'flex', md: 'none' }, my: 3 }} />
                <SearchBar
                  placeholder={t('header.search.placeholder')}
                  label={t('header.search.label')}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    maxWidth: '100%',
                  }}
                />
              </Box>
            </Drawer>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
