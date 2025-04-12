type ThumbnailQuality =
  | '0' // 480x360
  | '1' // 120x90
  | '2' // 120x90
  | '3' // 120x90
  | 'default' // 120x90 a 480x360
  | 'mqdefault' // 320x180
  | 'hqdefault' // 480x360
  | 'sddefault' // 640x480
  | 'maxresdefault' // 1280x720

export const getThumbnailUrl = (
  key: string,
  quality: ThumbnailQuality = '0'
) => {
  return `https://img.youtube.com/vi/${key}/${quality}.jpg`
}

export const YOUTUBE_ASPECT_RATIO = 4 / 3
