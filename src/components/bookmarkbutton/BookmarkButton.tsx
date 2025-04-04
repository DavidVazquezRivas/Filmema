import { IconButton } from '@mui/material'
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp'
import BookmarkBorderSharpIcon from '@mui/icons-material/BookmarkBorderSharp'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface BookmarkButtonProps {
  movieId: number
  style: 'button' | 'icon'
}

// TODO: Add cool animation to the bookmark button
export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  movieId,
  style,
}) => {
  // TODO: Implement logic to know if the movie is already in the watchlist and toggle watchlist
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const { t } = useTranslation()
  const handleToggleWatchlist = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setIsInWatchlist((prev) => !prev)
    console.log('Toggle watchlist: ' + movieId)
  }

  const bookmarkIcon = isInWatchlist ? (
    <BookmarkSharpIcon
      sx={{ position: 'absolute', fontSize: 'inherit', top: '-4px' }}
    />
  ) : (
    <BookmarkBorderSharpIcon
      sx={{ position: 'absolute', fontSize: 'inherit', top: '-4px' }}
    />
  )

  return style === 'icon' ? (
    <IconButton
      onClick={handleToggleWatchlist}
      sx={{
        position: 'absolute',
        top: 0,
        left: '10%',
        color: 'primary.main',
        ...bookmarkHover,
      }}
      size={'large'}
      aria-label={t('global.watchlist')}
    >
      {bookmarkIcon}
    </IconButton>
  ) : (
    'not implemented yet'
  )
}

const bookmarkHover = {
  '&:hover': {
    '& svg': {
      transform: 'scaleY(1.5)',
      transformOrigin: 'top',
    },
  },
  '& svg': {
    transition: 'transform 0.3s ease',
    transformOrigin: 'top',
    transform: 'scaleY(1)',
  },
}
