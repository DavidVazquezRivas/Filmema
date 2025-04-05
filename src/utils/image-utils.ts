import { PLACEHOLDER_COLOR } from '@/constants/placeholders'

export const getSvgPlaceholder = (
  width: number,
  height: number,
  color: string = PLACEHOLDER_COLOR
) => {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}" />
    </svg>
  `.trim()
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

type Dimensions = { width: number; height: number; aspectRatio: number }

export const getDimensions = (
  width?: number,
  height?: number,
  aspectRatio?: number
): Dimensions => {
  if (width && height)
    return { width, height, aspectRatio: Math.round(width / height) }

  if (width)
    return {
      width,
      height: Math.round(width / (aspectRatio ?? 1)),
      aspectRatio: aspectRatio ?? 1,
    }

  if (height)
    return {
      width: Math.round(height * (aspectRatio ?? 1)),
      height,
      aspectRatio: aspectRatio ?? 1,
    }

  return { width: 200, height: 200, aspectRatio: 1 } // Default dimensions
}
