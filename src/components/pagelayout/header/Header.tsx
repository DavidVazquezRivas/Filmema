import { Box, Button, ButtonGroup, Container, IconButton } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'
import Logo from '@/assets/logo.svg'
import { useTranslation } from 'react-i18next'
import { SearchBar } from '@/components/pagelayout/header/SearchBar'
import { ThemeModeToggle } from '@/components/pagelayout/header/ThemeModeToggle'
import { LanguageSelector } from '@/components/pagelayout/header/LanguageSelector'

export const Header = () => {
  const { t } = useTranslation()

  return (
    <Box
      component="header"
      padding={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={1}
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
            to="/near-you"
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
        />
        <Box
          component="nav"
          sx={{ display: 'flex', gap: 1 }}
          aria-label={t('header.user.label')}
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
        <Box
          component="section"
          role="group"
          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
        >
          <LanguageSelector />
          <ThemeModeToggle />
        </Box>
      </Container>
    </Box>
  )
}
