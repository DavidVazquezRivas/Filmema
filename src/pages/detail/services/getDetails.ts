import { LanguagesMap } from '@/constants/languages'
import {
  TMDB_API_KEY,
  TMDB_API_URL,
  TMDB_DEFAULT_LANGUAGE,
} from '@/constants/tmdbConstants'
import i18n from '@/translation/i18n'
import { getDetailsAdapter } from '../adapters/getDetailsAdapter'
import axios from 'axios'

export const getDetails = async (id: string) => {
  const options = {
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

  const [response, imagesResponse] = await Promise.all([
    axios.get(url, options),
    axios.get(imagesUrl, options),
  ])

  const obj = response.data
  obj.images = imagesResponse.data

  return getDetailsAdapter(obj)
}
