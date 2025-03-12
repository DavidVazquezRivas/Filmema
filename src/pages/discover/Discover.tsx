import { PageLayout } from '@/components/pagelayout/PageLayout'
import { Movie } from '@/models/movie'
import { FullMovieCard } from './components/FullMovieCard'
import { Box } from '@mui/material'

export const Discover = () => {
  const mockMovies: Movie[] = [
    {
      backdrop:
        'https://image.tmdb.org/t/p/w300/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg',
      genres: ['Action', 'Adventure', 'Fantasy'],
      id: 1,
      overview:
        'Eternals is a movie about a group of ancient heroes who reunite to protect humanity from their evil counterparts, the Deviants.',
      poster: 'https://image.tmdb.org/t/p/w154/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg',
      releaseDate: '2021-11-05',
      title: 'Eternals',
      voteAverage: 7.8,
      voteCount: 1234,
    },
    {
      backdrop:
        'https://image.tmdb.org/t/p/w300/iJQIbOPm81fPEGKt5BPuZmfnA54.jpg',
      genres: ['Action', 'Adventure', 'Fantasy', 'Science Fiction', 'Thriller'],
      id: 502356,
      overview:
        'While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.',
      poster: 'https://image.tmdb.org/t/p/w154/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
      releaseDate: '2023-04-05',
      title: 'The Super Mario Bros. Movie',
      voteAverage: 7.5,
      voteCount: 1435,
    },
    {
      backdrop:
        'https://image.tmdb.org/t/p/w300/nDxJJyA5giRhXx96q1sWbOUjMBI.jpg',
      genres: ['Action', 'Thriller'],
      id: 594767,
      overview:
        'While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.',
      poster: 'https://image.tmdb.org/t/p/w154/2VK4d3mqqTc7LVZLnLPeRiPaJ71.jp', // On purpose
      releaseDate: '2023-03-15',
      title: 'Shazam! Fury of the Gods',
      voteAverage: 6.8,
      voteCount: 1203,
    },
  ]

  const movieCards = mockMovies.map((movie, index) => (
    <FullMovieCard key={movie.id} index={index + 1} movie={movie} />
  ))

  return (
    <PageLayout>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        <h1>Discover</h1>
        {movieCards}
      </Box>
    </PageLayout>
  )
}
