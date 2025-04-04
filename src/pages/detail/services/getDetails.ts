import { LanguagesMap } from '@/constants/languages'
import {
  TMDB_API_KEY,
  TMDB_API_URL,
  TMDB_DEFAULT_LANGUAGE,
} from '@/constants/tmdbConstants'
import i18n from '@/translation/i18n'
import { getDetailsAdapter } from '../adapters/getDetailsAdapter'

export const getDetails = async (id: string) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  }
  const language =
    LanguagesMap[i18n.resolvedLanguage as string] ?? TMDB_DEFAULT_LANGUAGE

  const appended = 'videos,credits,similar,watch/providers,reviews'
  const url = `${TMDB_API_URL}/movie/${id}?append_to_response=${appended}&language=${language}`
  const imagesUrl = `${TMDB_API_URL}/movie/${id}/images?include_image_language=${
    language.split('-')[0]
  }`

  const response = await fetch(url, options)
  const imagesResponse = await fetch(imagesUrl, options)
  const obj = await response.json()
  const imagesObj = await imagesResponse.json()

  obj.images = imagesObj

  return getDetailsAdapter(obj)
}
