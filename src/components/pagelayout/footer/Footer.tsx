import { Box, Link, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import GitHubIcon from '@mui/icons-material/GitHub'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <Box
      component="footer"
      padding={4}
      alignItems="center"
      display="flex"
      justifyContent="space-evenly"
      sx={{
        backgroundColor: 'darkZone',
      }}
    >
      <Box
        component="section"
        aria-label={t('footer.credits.label')}
        display="flex"
        gap={1}
        flexDirection="column"
      >
        <Link
          variant="button"
          href="https://www.youtube.com/watch?v=XK0HQcGQGLg"
          target="_blank"
          rel="noopener noreferrer"
          color="textPrimary"
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {t('footer.credits.design')}
          <ArrowOutwardIcon fontSize="small" />
        </Link>
        <Link
          variant="button"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          color="textPrimary"
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {t('footer.credits.data')}
          <ArrowOutwardIcon fontSize="small" />
        </Link>
      </Box>
      <Box
        component="section"
        aria-label={t('footer.copyright.label')}
        display="flex"
        gap={2}
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="body2">
          Copyright © {new Date().getFullYear()} Filmema
        </Typography>
        <Link
          href="https://github.com/DavidVazquezRivas/Filmema"
          target="_blank"
          rel="noopener noreferrer"
          color="textPrimary"
          aria-label={t('footer.copyright.github.label')}
          sx={{
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          <GitHubIcon />
        </Link>
      </Box>
    </Box>
  )
}
