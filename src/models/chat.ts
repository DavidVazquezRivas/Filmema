export interface AiMovie {
  id: number | null
  title: string | null
  message: string | null
}

type ChatRole = 'user' | 'assistant' | 'system' | 'bot'

export interface ChatMessage {
  role: ChatRole
  content: string | AiMovie
}
