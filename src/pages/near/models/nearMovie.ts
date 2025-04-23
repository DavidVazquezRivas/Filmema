export interface NearImage {
  contentUrl: string
  description: string
  name?: string
}

export enum Accesibility {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export enum ZoneType {
  Beach = 0,
  Mountain = 1,
  City = 2,
  Forest = 3,
  River = 4,
  Desert = 5,
  Town = 6,
  Cave = 7,
  Other = 8,
}

export enum AddressRegion {
  Palma = 0,
  Tramuntana = 1,
  Raiguer = 2,
  Pla = 3,
  Llevant = 4,
  Migjorn = 5,
}

export interface Address {
  addressCountry: string
  addressLocality: string
  addressRegion: AddressRegion
}

export interface NameValue {
  name: string
  value: unknown
}

export interface Location {
  address: Address
  additionalProperty: NameValue[]
  description: string
  geo: {
    latitude: number
    longitude: number
  }
  image: NearImage[]
  name: string
}

export interface NearReview {
  author: {
    name: string
    image?: string
  }
  datePublished: string
  reviewBody: string
}

export interface NearTrailer {
  identifier: string
  contentUrl: string
  description: string
  embedUrl: string
  name: string
  thumbnailUrl: string
  uploadDate: string
}

export interface NearMovie {
  aggregateRating: {
    ratingCount: number
    ratingValue: number
  }
  image: NearImage[]
  datePublished: string
  description: string
  genre: string[]
  identifier: number
  locationCreated: Location
  name: string
  review: NearReview[]
  trailer: NearTrailer[]
  url: string
}
