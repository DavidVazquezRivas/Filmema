export const genreListAdapter = (result: any): Record<number, string> => {
  return result.reduce((acc: Record<number, string>, genre: any) => {
    acc[genre.id] = genre.name
    return acc
  }, {})
}
