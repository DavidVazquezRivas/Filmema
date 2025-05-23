import { useState } from 'react'
import { sendMessageToAi } from '@/services/aiService'
import { useTranslation } from 'react-i18next'
import { ChatMessage } from '@/models/chat'
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Fade,
} from '@mui/material'
import { MessageContent } from './MessageContent'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import CloseIcon from '@mui/icons-material/Close'

const ChatBot = () => {
  const { t } = useTranslation()
  const initialMessages: ChatMessage[] = [
    { role: 'system', content: t('global.ai.getByDescription.system') },
    { role: 'bot', content: t('global.ai.getByDescription.initial') },
  ]
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = { role: 'user', content: input }
    addMessage(userMessage)
    setInput('')

    try {
      const reply = await sendMessageToAi([...messages, userMessage])
      const botMessage: ChatMessage = { role: 'bot', content: reply }
      addMessage(botMessage)
    } catch (error) {
      console.error(error)
      addMessage({ role: 'bot', content: t('global.ai.common.error') })
    }
  }

  const displayedMessages = messages
    .filter((msg) => msg.role !== 'system')
    .map((msg) => (
      <Box key={msg.role + msg.content} mb={1}>
        <Typography
          component="span"
          fontWeight="bold"
          color={msg.role === 'user' ? 'primary.main' : 'secondary.main'}
          mr={1}
        >
          {t(`global.ai.common.roles.${msg.role}`)}:
        </Typography>
        <MessageContent message={msg} />
      </Box>
    ))

  return (
    <>
      <IconButton
        color="primary"
        onClick={() => setOpen(!open)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          width: 56,
          height: 56,
          borderRadius: '50%',
          boxShadow: 3,
          zIndex: 50,
        }}
        aria-label={open ? t('global.chat.close') : t('global.chat.open')}
      >
        {open ? <CloseIcon /> : <ChatBubbleIcon />}
      </IconButton>

      <Fade in={open} timeout={300}>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            width: { xs: '90%', sm: 400 },
            maxHeight: 580,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            boxShadow: 6,
            borderRadius: 2,
            zIndex: 50,
          }}
        >
          {/* Header close button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('global.chat.title') || 'Chat AI'}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              aria-label={t('global.chat.close')}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              overflowY: 'auto',
            }}
          >
            {displayedMessages}
          </Box>

          {/* Input and buttons */}
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={t('global.chat.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              multiline
              minRows={1}
              maxRows={4}
            />
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1} mt={1}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setMessages(initialMessages)}
                disabled={messages.length === initialMessages.length}
              >
                {t('global.chat.clear')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={sendMessage}
                disabled={!input.trim()}
              >
                {t('global.chat.send')}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </>
  )
}

export default ChatBot
