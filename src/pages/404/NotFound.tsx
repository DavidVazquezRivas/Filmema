import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Typography, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageLayout } from '@/components/pagelayout/PageLayout'

const NotFound: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <PageLayout>
      <Container maxWidth='md' sx={{ textAlign: 'center' }}>
        <Box>
          <img
            src='/assets/svg/404.svg'
            alt={t('notFound.alt')}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 400,
              maxWidth: 400,
              marginBottom: 24,
            }}
          />
          <Typography variant='h3' gutterBottom>
            {t('notFound.title')}
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            {t('notFound.description')}
          </Typography>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='center'
            gap={2}
            mt={3}>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={handleGoHome}
              startIcon={<HomeIcon />}>
              {t('notFound.home')}
            </Button>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              onClick={handleGoBack}
              startIcon={<ArrowBackIcon />}>
              {t('notFound.back')}
            </Button>
          </Box>
        </Box>
      </Container>
    </PageLayout>
  )
}

export default NotFound
