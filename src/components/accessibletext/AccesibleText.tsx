import { IconButton, Tooltip, Typography, TypographyProps } from '@mui/material'
import { useTranslation } from 'react-i18next'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { AUDIBLE_LIMIT } from '@/constants/accesibility'
import { truncateText } from '@/utils/text-utils'
import i18n from '@/translation/i18n'
import { LanguagesMap } from '@/constants/languages'

interface AccesibleTextProps extends TypographyProps {
  children: string
  maxLength?: number
  audible?: boolean
}

export const AccesibleText: React.FC<AccesibleTextProps> = ({
  children,
  maxLength = Infinity,
  audible,
  ...typographyProps
}) => {
  const { t } = useTranslation()

  const textContent = children || t('global.noData')
  const isAudible = audible ?? textContent.length > AUDIBLE_LIMIT
  const displayedText = truncateText(textContent, maxLength)
  const isTruncated = children && textContent !== displayedText

  const handleClick = () => {
    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(textContent)
    const language = LanguagesMap[i18n.resolvedLanguage as string]
    speech.lang = language
    speech.volume = 1
    speech.rate = 1
    speech.pitch = 1

    const voices = window.speechSynthesis.getVoices()
    const selectedVoice =
      voices.find((voice) => voice.lang === language) || voices[0]
    speech.voice = selectedVoice

    window.speechSynthesis.speak(speech)
  }

  const content = (
    <Typography {...typographyProps}>
      {displayedText}
      {isAudible && (
        <IconButton
          size="small"
          sx={{ p: 0, ml: 1 }}
          onClick={handleClick}
          aria-label={t('global.listen')}
        >
          <VolumeUpIcon />
        </IconButton>
      )}
    </Typography>
  )

  return isTruncated ? (
    <Tooltip title={textContent}>{content}</Tooltip>
  ) : (
    content
  )
}
