import { PropsWithChildren } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Container } from '@mui/material'

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ padding: 2 }}>
        {children}
      </Container>
      <Footer />
    </>
  )
}
