import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useLocation } from '@/pages/near/contexts/LocationContext'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { MapConfig } from '@/pages/near/constants/map'
import { MallorcaCenter } from '@/pages/near/constants/mallorca'
import { NearMovie } from '@/pages/near/models/nearMovie'
import { MovieMarker } from './MovieMarker'

const UserIcon = L.icon({
  iconUrl: MapConfig.UserMarker.Url,
  iconSize: MapConfig.UserMarker.Size,
})

interface MovieMapProps {
  movies: NearMovie[]
}

export const MovieMap: React.FC<MovieMapProps> = ({ movies }) => {
  const { latitude, longitude } = useLocation()

  if (!latitude || !longitude) return null

  return (
    <MapContainer
      center={[MallorcaCenter.latitude, MallorcaCenter.longitude]}
      zoom={9}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      attributionControl={false}
    >
      <TileLayer url={MapConfig.TileUrl} attribution={MapConfig.Attribution} />
      <Marker position={[latitude, longitude]} icon={UserIcon}></Marker>
      {movies.map((movie) => (
        <MovieMarker key={movie.identifier} movie={movie} />
      ))}
    </MapContainer>
  )
}
