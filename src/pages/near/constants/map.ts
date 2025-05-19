export const MapConfig = {
  TileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  Attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  UserMarker: {
    Url: '/assets/markers/user.svg',
    Size: [32, 32] as [number, number],
  },
  MovieMarker: {
    Url: '/assets/markers/movie.svg',
    Size: [32, 32] as [number, number],
    Anchor: [16, 32] as [number, number],
  },
}
