import { MovieDetails } from '../models/movieDetails'

export const MovieJsonLd = ({ movie }: { movie: MovieDetails }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    image: movie.poster,
    description: movie.overview,
    datePublished: movie.releaseDate.toISOString(),
    director: movie.credits.crew
      .filter((p) => p.department === 'Directing')
      .map((d) => ({ '@type': 'Person', name: d.name })),
    actor: movie.credits.cast
      .slice(0, 5)
      .map((a) => ({ '@type': 'Person', name: a.name })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: movie.voteAverage.toFixed(1),
      ratingCount: movie.voteCount,
    },
    genre: movie.genres.map((g) => g.label),
    duration: `PT${movie.runtime}M`,
    url: movie.homePage,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default MovieJsonLd
