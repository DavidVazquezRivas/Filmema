import { Image } from '../models/movieDetails'

export const plainImages = (images: {
  backdrops: Image[]
  posters: Image[]
}): Image[] => {
  return [...images.backdrops, ...images.posters].sort(
    () => Math.random() - 0.5
  )
}
