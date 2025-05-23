import { AiMovie } from '@/models/chat'

export const chatResponseAdapter = (response: any): AiMovie => {
  const result = JSON.parse(response.data.choices?.[0]?.message?.content)
  const { id, title, message } = result
  return {
    id: id || null,
    title: title || null,
    message: message || null,
  }
}
