import { Languages } from '@/constants/languages'
import { setLanguage } from '@/redux/states/language'
import i18n from '@/translation/i18n'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export const LanguageSelector = () => {
  const dispatch = useDispatch()
  const currentLanguage = useSelector(
    (state: any) => state.language.currentLanguage
  )
  const { t } = useTranslation()

  const handleChange = async (event: SelectChangeEvent) => {
    const selectedLanguage = event.target.value
    if (currentLanguage === selectedLanguage) return
    await i18n.changeLanguage(selectedLanguage)
    dispatch(setLanguage(selectedLanguage))
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
