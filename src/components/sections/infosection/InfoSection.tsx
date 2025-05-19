import { InfoItem } from '@/models/infoItem'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface InfoSectionProps {
  title: string
  items: InfoItem[]
}

export const InfoSection: React.FC<InfoSectionProps> = ({ title, items }) => {
  const { t } = useTranslation()
  const renderedItems = items.map((item, index) => (
    <>
      <Typography variant="h6" key={index}>
        {item.title}
      </Typography>
      <Stack direction="row" spacing={1} key={index}>
        {item.values.map((value) => value)}
      </Stack>
      {
        item.seeAll ? (
          <Button variant="contained" onClick={item.onSeeAll} key={index}>
            {item.seeAllText ?? t('global.slider.seeAll')}
          </Button>
        ) : (
          <div></div>
        ) /* Placeholder for spacing */
      }
    </>
  ))

  return (
    <Stack spacing={2} padding={2}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="auto 1fr auto"
        gap={3}
        alignItems="center"
      >
        {renderedItems}
      </Box>
    </Stack>
  )
}
