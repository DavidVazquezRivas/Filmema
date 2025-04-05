type ThumbnailQuality = '0' | '1' | '2' | '3'

export const getThumbnailUrl = (
  key: string,
  quality: ThumbnailQuality = '0'
) => {
  return `https://img.youtube.com/vi/${key}/${quality}.jpg`
}
