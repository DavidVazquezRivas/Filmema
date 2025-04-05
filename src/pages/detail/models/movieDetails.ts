import { Movie } from '@/models/movie'
import { SelectOption } from '@/models/selectOption'

export interface Company {
  id: number
  name: string
  originCountry: string
}

export interface Person {
  character?: string
  department: string
  id: number
  name: string
  popularity: number
  profilePath: string
}

export interface Review {
  author: string
  content: string
  createdAt: string
  id: string
  rating?: number
  updatedAt: string
}

export interface WatchProvider {
  id: number
  logoPath: string
  name: string
  priority: number
}

export interface Video {
  id: string
  key: string
  name: string
}

export interface Image {
  aspectRatio: number
  src: string
}

export interface MovieDetails {
  backdrop: string
  budget: number
  credits: {
    cast: Person[]
    crew: Person[]
  }
  genres: SelectOption[]
  homePage: string
  id: number
  images: {
    backdrops: Image[]
    posters: Image[]
  }
  overview: string
  poster: string
  productionCompanies: Company[]
  productionCountries: string[]
  releaseDate: Date
  releaseYear: number
  revenue: number
  reviews: Review[]
  runtime: number
  similarMovies: Movie[]
  spokenLanguages: string[]
  title: string
  videos: Video[]
  voteAverage: number
  voteCount: number
  watchProviders: {
    buy: WatchProvider[]
    rent: WatchProvider[]
    subscription: WatchProvider[]
  }
}

export interface Reviews {
  page: number
  results: Review[]
  totalPages: number
  totalResults: number
}
