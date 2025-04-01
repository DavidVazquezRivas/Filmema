import { LanguagesMap } from '@/constants/languages'
import { homeMoviesAdapter } from '../adapters/homeMoviesAdapter'
import i18n from '@/translation/i18n'
import {
  TMDB_API_KEY,
  TMDB_API_URL,
  TMDB_DEFAULT_LANGUAGE,
} from '@/constants/tmdbConstants'

export const getHomeMovies = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  }
  const language =
    LanguagesMap[i18n.resolvedLanguage as string] ?? TMDB_DEFAULT_LANGUAGE
  const url = `${TMDB_API_URL}/discover/movie?language=${language}&sort_by=popularity.desc&page=1`
  const dateIso = new Date().toISOString().split('T')[0]
  const lastMonthsDateIso = new Date(
    new Date().setMonth(new Date().getMonth() - 3)
  )
    .toISOString()
    .split('T')[0]

  const heroQuery = `${url}&vote_count.gte=5000&primary_release_date.gte=2020-01-01`
  const discoverQuery = `${url}&vote_count.gte=500`
  const upcomingQuery = `${url}&primary_release_date.gte=${dateIso}`
  const nowPlayingQuery = `${url}&primary_release_date.lte=${dateIso}&primary_release_date.gte=${lastMonthsDateIso}&vote_count.gte=200`

  const heroResponse = await fetch(heroQuery, options)
  const discoverResponse = await fetch(discoverQuery, options)
  const upcomingResponse = await fetch(upcomingQuery, options)
  const nowPlayingResponse = await fetch(nowPlayingQuery, options)

  const heroObj = await heroResponse.json()
  const discoverObj = await discoverResponse.json()
  const upcomingObj = await upcomingResponse.json()
  const nowPlayingObj = await nowPlayingResponse.json()

  return homeMoviesAdapter({
    hero: heroObj.results,
    discover: discoverObj.results,
    upcoming: upcomingObj.results,
    nowPlaying: nowPlayingObj.results,
  })
}
