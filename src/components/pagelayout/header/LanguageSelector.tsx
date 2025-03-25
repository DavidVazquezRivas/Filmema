import { Languages } from '@/constants/languages'
import i18n from '@/translation/i18n'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.resolvedLanguage)
  const { t } = useTranslation()

  const handleChange = (event: SelectChangeEvent) => {
    const selectedLanguage = event.target.value
    if (currentLanguage === selectedLanguage) return
    i18n.changeLanguage(selectedLanguage)
    setCurrentLanguage(selectedLanguage)
    window.location.reload()
  }

  const options = Languages.map((lang) => (
    <MenuItem key={lang.value} value={lang.value}>
      <Tooltip
        title={t(`header.language.options.${lang.value}`)}
        placement="right"
      >
        <span>{lang.label}</span>
      </Tooltip>
    </MenuItem>
  ))

  return (
    <FormControl component="fieldset">
      <InputLabel
        component="label"
        id="language-label"
        sx={{ display: 'none' }}
      >
        {t('header.language.label')}
      </InputLabel>
      <Select
        labelId="language-label"
        value={currentLanguage}
        onChange={handleChange}
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
      >
        {options}
      </Select>
    </FormControl>
  )
}
