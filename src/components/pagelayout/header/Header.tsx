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
          <Box component="img" src={Logo} alt="App Logo" maxHeight={'35px'} />
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
          <Link to="/discover" style={{ textDecoration: 'none' }}>
            <Button aria-label={t('header.navigation.discoverLabel')}>
              {t('header.navigation.discover')}
            </Button>
          </Link>
          <Link to="/near-you" style={{ textDecoration: 'none' }}>
            <Button aria-label={t('header.navigation.nearYouLabel')}>
              {t('header.navigation.nearYou')}
            </Button>
          </Link>
          <Link to="/now-playing" style={{ textDecoration: 'none' }}>
            <Button aria-label={t('header.navigation.nowPlayingLabel')}>
              {t('header.navigation.nowPlaying')}
            </Button>
          </Link>
          <Link to="/upcoming" style={{ textDecoration: 'none' }}>
            <Button aria-label={t('header.navigation.upcomingLabel')}>
              {t('header.navigation.upcoming')}
            </Button>
          </Link>
        </ButtonGroup>
        <SearchBar
          onSearch={(input) => console.log('Searching: ', input)}
          placeholder={t('header.search.placeholder')}
          label={t('header.search.label')}
        />
        <Box
          sx={{ display: 'flex', gap: 1 }}
          aria-label={t('header.user.label')}
        >
          <Link
            to="/watchlist"
            style={{ textDecoration: 'none' }}
            aria-label={t('header.user.watchlist.link')}
          >
            <IconButton aria-label={t('header.user.watchlist.label')}>
              <BookmarkIcon />
            </IconButton>
          </Link>

          <Link
            to="/profile"
            style={{ textDecoration: 'none' }}
            aria-label={t('header.user.profile.link')}
          >
            <IconButton aria-label={t('header.user.profile.label')}>
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <LanguageSelector />
          <ThemeModeToggle />
        </Box>
      </Container>
    </Box>
  )
}
