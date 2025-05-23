import { ChatMessage } from '@/models/chat'
import { Chip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface MessageContentProps {
  message: ChatMessage
}

export const MessageContent: React.FC<MessageContentProps> = ({ message }) => {
  const { t } = useTranslation()

  if (typeof message.content === 'string') {
    return <Typography component="span">{message.content}</Typography>
  }

  if (!message.content.id || !message.content.title) {
    return (
      <Typography component="span">
        {String(message.content.message) ?? t('global.ai.common.error')}
      </Typography>
    )
  }

  return (
    <Chip
      component={Link}
      to={`/movie/${message.content.id}`}
      label={message.content.title}
      clickable
      color="primary"
    />
  )
}
