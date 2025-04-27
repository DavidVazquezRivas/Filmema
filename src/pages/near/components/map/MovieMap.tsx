import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useLocation } from '@/pages/near/contexts/LocationContext'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { MapConfig } from '@/pages/near/constants/map'
import { MallorcaCenter } from '@/pages/near/constants/mallorca'
import { MovieMarker } from './MovieMarker'
import { useFilterContext } from '@/pages/near/contexts/FilterContext'

const UserIcon = L.icon({
  iconUrl: MapConfig.UserMarker.Url,
  iconSize: MapConfig.UserMarker.Size,
})

interface MovieMapProps {}

export const MovieMap: React.FC<MovieMapProps> = () => {
  const { latitude, longitude } = useLocation()
  const { filteredMovies: movies } = useFilterContext()

  const userMarker =
    latitude && longitude ? (
      <Marker position={[latitude, longitude]} icon={UserIcon}></Marker>
    ) : null

  return (
    <MapContainer
      center={[MallorcaCenter.latitude, MallorcaCenter.longitude]}
      zoom={9}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      attributionControl={false}
      className="leaflet-container"
    >
      <TileLayer url={MapConfig.TileUrl} attribution={MapConfig.Attribution} />
      {userMarker}
      {movies.map((movie) => (
        <MovieMarker key={movie.identifier} movie={movie} />
      ))}
    </MapContainer>
  )
}
