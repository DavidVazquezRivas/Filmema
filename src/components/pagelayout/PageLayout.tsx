import { PropsWithChildren } from 'react'
import { Footer } from '@/components/pagelayout/footer/Footer'
import { Header } from '@/components/pagelayout/header/Header'
import { Box, Container } from '@mui/material'

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Header />
        <Container maxWidth="lg" sx={{ padding: 2 }} component="main">
          {children}
        </Container>
      </Box>
      <Footer />
    </>
  )
}
