import axios from 'axios'
import { AI_KEY, AI_MODEL, AI_URL } from '@/constants/ai'
import { AiMovie, ChatMessage } from '@/models/chat'
import { chatResponseAdapter } from '@/adapters/chatResponseAdapter'

export const sendMessageToAi = async (
  messages: ChatMessage[]
): Promise<AiMovie> => {
  const sentMessages = messages.filter((msg) => msg.role !== 'bot')
  const response = await axios.post(
    AI_URL,
    {
      model: AI_MODEL,
      messages: sentMessages,
    },
    {
      headers: {
        Authorization: `Bearer ${AI_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://filmematv.com',
        'X-Title': 'Filmema',
      },
    }
  )

  return chatResponseAdapter(response)
}
