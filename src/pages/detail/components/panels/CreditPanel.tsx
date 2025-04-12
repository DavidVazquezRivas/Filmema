import { Person } from '@/pages/detail/models/movieDetails'
import { DEPARTMENTS, Department } from '@/constants/departments'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { ImageContainer } from '@/components/containers/ImageContainer'

interface CreditPanelProps {
  credits: Person[]
}

export const CreditPanel: React.FC<CreditPanelProps> = ({ credits }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(
    DEPARTMENTS[0]
  )
  const { t } = useTranslation()

  const filterButtons = DEPARTMENTS.map((department) => {
    const isSelected = department === selectedDepartment

    return (
      <Button
        key={department}
        sx={{
          justifyContent: 'flex-start',
          width: '100%',
        }}
        variant={isSelected ? 'contained' : 'text'}
        onClick={() => setSelectedDepartment(department)}
      >
        {t(`details.credits.departments.${department}`)}
      </Button>
    )
  })

  const groupedByDepartment = useMemo(() => {
    return DEPARTMENTS.reduce(
      (acc: Record<Department, Person[]>, department) => {
        acc[department] = credits.filter(
          (credit) => credit.department === department
        )
        return acc
      },
      {} as Record<Department, Person[]>
    )
  }, [credits])

  const cards = groupedByDepartment[selectedDepartment].map((person) => (
    <Box
      component="li"
      display="grid"
      gridTemplateColumns={'100px 200px 1fr'}
      gap={10}
      alignItems="center"
      key={person.id}
    >
      <ImageContainer
        src={person.profilePath}
        alt={t('details.cast.alt', { name: person.name })}
        height={140}
        width={100}
        style={{
          borderRadius: 8,
          objectFit: 'cover',
        }}
      />
      <Typography variant="body1" color="textPrimary">
        {person.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {person.character ?? person.department}
      </Typography>
    </Box>
  ))

  return (
    <Box
      display="grid"
      gridTemplateColumns="220px 1fr"
      gap={2}
      position="relative"
      overflow="visible"
    >
      <Box
        position="sticky"
        height="fit-content"
        top={0}
        display="flex"
        flexDirection="column"
        gap={0}
      >
        {filterButtons}
      </Box>
      <Box
        component="section"
        key={selectedDepartment}
        display="flex"
        flexDirection="column"
        gap={2}
        mt={-1}
      >
        <Typography variant="h6">
          {t(`details.credits.departments.${selectedDepartment}`)}
        </Typography>
        <Box component="ul" display="flex" gap={2} flexDirection="column" p={0}>
          {cards}
        </Box>
      </Box>
    </Box>
  )
}
