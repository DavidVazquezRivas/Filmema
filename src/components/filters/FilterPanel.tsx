import { FilterResult, FilterType } from '@/models/filters'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  PaperProps,
  Typography,
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useTranslation } from 'react-i18next'
import { MemoizedFilterComponent } from './FilterComponent'
import { useCallback, useState } from 'react'

interface FilterPanelProps extends PaperProps {
  filters: FilterType[]
  onApply: (filterValues: FilterResult) => void
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onApply,
  ...props
}) => {
  const { t } = useTranslation()
  const [filterValues, setFilterValues] = useState<FilterResult>({})

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilterValues((prev) => {
      if (prev[key] === value) return prev
      return { ...prev, [key]: value }
    })
  }, [])

  const filterItems = filters.map((filter, index) => {
    return (
      <Accordion
        disableGutters
        key={index}
        sx={{
          boxShadow: 0,
          borderBottom: 'none',
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          id={`accordion-${index}`}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{filter.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MemoizedFilterComponent
            filter={filter}
            value={filterValues[filter.key] || null}
            onChange={handleFilterChange}
          />
        </AccordionDetails>
      </Accordion>
    )
  })

  return (
    <Paper
      {...props}
      sx={{
        display: 'flex',
        position: 'sticky',
        top: 100,
        width: 300,
        height: 'fit-content',
        padding: 2,
        borderRadius: 2,
        gap: 2,
        flexDirection: 'column',
        alignItems: 'left',
        ...props.sx,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" color="text.secondary">
          <FilterListIcon style={{ marginRight: 8 }} />
          {t('global.filters.title')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
          onClick={() => onApply(filterValues)}
        >
          {t('global.filters.apply')}
        </Button>
      </Box>
      {filterItems}
    </Paper>
  )
}
