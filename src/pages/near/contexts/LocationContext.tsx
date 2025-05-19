// contexts/LocationContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface LocationState {
  latitude: number | null
  longitude: number | null
  isLoading: boolean
  error: string | null
}

const initialLocationState: LocationState = {
  latitude: null,
  longitude: null,
  isLoading: false,
  error: null,
}

interface LocationContextType extends LocationState {
  getLocation: () => void
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
)

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<LocationState>(initialLocationState)

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: 'Geo location is not supported by this browser',
      }))
      return
    }

    setLocation((prev) => ({ ...prev, isLoading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isLoading: false,
          error: null,
        })
      },
      (error) => {
        setLocation({
          latitude: null,
          longitude: null,
          isLoading: false,
          error: error.message,
        })
      }
    )
  }

  // Get location on component mount
  useEffect(() => {
    getLocation()
  }, [])

  return (
    <LocationContext.Provider value={{ ...location, getLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}
