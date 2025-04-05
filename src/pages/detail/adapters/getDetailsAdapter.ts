import {
  BACKDROP_SIZES,
  LOGO_SIZES,
  POSTER_SIZES,
  PROFILE_SIZES,
  TMDB_IMAGE_URL,
} from '@/constants/tmdbConstants'
import {
  Company,
  Image,
  MovieDetails,
  Person,
  Review,
  Video,
  WatchProvider,
} from '../models/movieDetails'
import { profilePlaceholder } from '@/constants/placeholders'
import { SelectOption } from '@/models/selectOption'
import { Movie } from '@/models/movie'

export const getDetailsAdapter = (obj: any): MovieDetails => {
  // TODO: Add country detection
  const country = 'US'
  console.log(obj)
  return {
    backdrop: `${TMDB_IMAGE_URL}/${BACKDROP_SIZES[1]}/${obj.backdrop_path}`,
    budget: obj.budget,
    credits: {
      cast: obj.credits.cast.map(mapPerson),
      crew: obj.credits.crew.map(mapPerson),
    },
    genres: obj.genres.map(mapGenre),
    homePage: obj.homepage,
    id: obj.id,
    images: {
      backdrops: obj.images.backdrops.map(mapBackdrop),
      posters: obj.images.posters.map(mapPoster),
    },
    overview: obj.overview,
    poster: `${TMDB_IMAGE_URL}/${POSTER_SIZES[3]}/${obj.poster_path}`,
    productionCompanies: obj.production_companies.map(mapProductionCompany),
    productionCountries: obj.production_countries.map(
      (country: any) => country.name
    ),
    releaseDate: new Date(obj.release_date),
    releaseYear: new Date(obj.release_date).getFullYear(),
    revenue: obj.revenue,
    reviews: obj.reviews.results.map(mapReview),
    runtime: obj.runtime,
    similarMovies: obj.similar.results.map(mapMovie),
    spokenLanguages: obj.spoken_languages.map((lang: any) => lang.name),
    title: obj.title,
    videos: obj.videos.results.map(mapVideo),
    voteAverage: obj.vote_average,
    voteCount: obj.vote_count,
    watchProviders: {
      buy: obj['watch/providers'].results[country]?.buy?.map(mapWatchProvider),
      rent: obj['watch/providers'].results[country]?.rent?.map(
        mapWatchProvider
      ),
      subscription:
        obj['watch/providers'].results[country]?.flatrate?.map(
          mapWatchProvider
        ),
    },
  }
}

function mapPerson(obj: any): Person {
  return {
    character: obj.character ?? null,
    department: obj.known_for_department,
    id: obj.id,
    name: obj.name,
    popularity: obj.popularity,
    profilePath: obj.profile_path
      ? `${TMDB_IMAGE_URL}/${PROFILE_SIZES[1]}/${obj.profile_path}`
      : profilePlaceholder,
  }
}

function mapGenre(obj: any): SelectOption {
  return {
    label: obj.name,
    value: obj.id,
  }
}

function mapBackdrop(obj: any): Image {
  return {
    src: `${TMDB_IMAGE_URL}/${BACKDROP_SIZES[1]}/${obj.file_path}`,
    aspectRatio: obj.aspect_ratio,
  }
}

function mapPoster(obj: any): Image {
  return {
    src: `${TMDB_IMAGE_URL}/${POSTER_SIZES[3]}/${obj.file_path}`,
    aspectRatio: obj.aspect_ratio,
  }
}

function mapProductionCompany(obj: any): Company {
  return {
    id: obj.id,
    name: obj.name,
    originCountry: obj.origin_country,
  }
}

function mapReview(obj: any): Review {
  return {
    author: obj.author,
    content: obj.content,
    createdAt: obj.created_at,
    id: obj.id,
    rating: obj.author_details.rating,
    updatedAt: obj.updated_at,
  }
}

function mapMovie(movie: any): Movie {
  return {
    backdrop: `${TMDB_IMAGE_URL}/${BACKDROP_SIZES[0]}/${movie.backdrop_path}`,
    genres: movie.genre_ids,
    id: movie.id,
    overview: movie.overview,
    poster: `${TMDB_IMAGE_URL}/${POSTER_SIZES[1]}/${movie.poster_path}`,
    releaseDate: movie.release_date,
    title: movie.title,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
  }
}

function mapVideo(obj: any): Video {
  return {
    id: obj.id,
    key: obj.key,
    name: obj.name,
  }
}

function mapWatchProvider(obj: any): WatchProvider {
  return {
    id: obj.provider_id,
    logoPath: `${TMDB_IMAGE_URL}/${LOGO_SIZES[1]}/${obj.logo_path}`,
    name: obj.provider_name,
    priority: obj.display_priority,
  }
}
