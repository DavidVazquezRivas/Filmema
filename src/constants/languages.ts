import { SelectOption } from '@/models/SelectOption'

export const Languages: SelectOption[] = [
  { label: 'EN', value: 'en' },
  { label: 'ES', value: 'es' },
  { label: 'CAT', value: 'cat' },
]

export const LanguagesMap: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  cat: 'ca-ES',
}
