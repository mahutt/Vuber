import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || ''

export default function Map({
  startLocation,
  endLocation,
  pingLocation,
}: {
  startLocation: string
  endLocation: string
  pingLocation?: string
}) {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    })

    return () => {
      mapRef.current?.remove()
    }
  }, [])

  useEffect(() => {
    if (!startLocation && !endLocation) return
    const timeout = setTimeout(() => {
      if (!mapRef.current) return
      if (startLocation && !endLocation) {
        flyTo(mapRef.current, startLocation)
      } else if (startLocation && endLocation && !pingLocation) {
        addRoute(mapRef.current, startLocation, endLocation)
      } else if (startLocation && endLocation && pingLocation) {
        addRouteWithWaypoint(
          mapRef.current,
          startLocation,
          pingLocation,
          endLocation
        )
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [startLocation, pingLocation, endLocation])

  useEffect(() => {
    if (!pingLocation) return
    const timeout = setTimeout(() => {
      if (!mapRef.current) return
      fetchCoordinates(pingLocation).then((coords) => {
        if (coords && mapRef.current) addPing(mapRef.current, coords)
      })
    }, 500)
    return () => clearTimeout(timeout)
  }, [pingLocation])

  return (
    <>
      <div
        className="h-full w-full rounded-2xl"
        id="map-container"
        ref={mapContainerRef}
      />
    </>
  )
}

const addPing = (
  map: mapboxgl.Map,
  coordinates: [number, number],
  color: string = '#3b82f6'
) => {
  if (map.getLayer('ping-marker')) {
    map.removeLayer('ping-marker')
  }
  if (map.getSource('ping-marker')) {
    map.removeSource('ping-marker')
  }

  map.addSource('ping-marker', {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: coordinates,
      },
    },
  })

  map.addLayer({
    id: 'ping-marker',
    type: 'circle',
    source: 'ping-marker',
    paint: {
      'circle-radius': 10,
      'circle-color': color,
      'circle-stroke-width': 3,
      'circle-stroke-color': 'white',
    },
  })
}

export const fetchCoordinates = async (
  location: string
): Promise<[number, number]> => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      location
    )}.json?access_token=${mapboxgl.accessToken}`
  )
  const data = await response.json()
  return data.features[0]?.center
}

const fetchRoute = async (start: number[], end: number[]) => {
  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(
      ','
    )};${end.join(',')}?geometries=geojson&access_token=${mapboxgl.accessToken}`
  )
  const data = await response.json()
  if (!data.routes?.length) return null
  return data.routes[0].geometry.coordinates
}

const flyTo = async (map: mapboxgl.Map, location: string) => {
  const coords = await fetchCoordinates(location)
  if (!coords) return
  map.flyTo({
    center: coords,
    zoom: 12,
  })
}

const addRoute = async (
  map: mapboxgl.Map,
  startLocation: string,
  endLocation: string
) => {
  const startCoords = await fetchCoordinates(startLocation)
  const endCoords = await fetchCoordinates(endLocation)
  if (!startCoords || !endCoords) return

  const routeCoordinates = await fetchRoute(startCoords, endCoords)
  if (!routeCoordinates) return

  if (map.getSource('route')) {
    ;(map.getSource('route') as mapboxgl.GeoJSONSource).setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: routeCoordinates,
      },
    })
  } else {
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routeCoordinates,
        },
      },
    })
    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#3b82f6',
        'line-width': 4,
      },
    })
  }

  const bounds = routeCoordinates.reduce(
    (bounds: mapboxgl.LngLatBounds, coord: [number, number]) =>
      bounds.extend(coord),
    new mapboxgl.LngLatBounds(routeCoordinates[0], routeCoordinates[0])
  )
  map.fitBounds(bounds, { padding: 50 })
}

const addRouteWithWaypoint = async (
  map: mapboxgl.Map,
  startLocation: string,
  waypointLocation: string,
  endLocation: string
) => {
  const [startCoords, waypointCoords, endCoords] = await Promise.all([
    fetchCoordinates(startLocation),
    fetchCoordinates(waypointLocation),
    fetchCoordinates(endLocation),
  ])

  if (!startCoords || !waypointCoords || !endCoords) return

  // Fetch route with waypoint
  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.join(
      ','
    )};${waypointCoords.join(',')};${endCoords.join(
      ','
    )}?geometries=geojson&access_token=${mapboxgl.accessToken}`
  )
  const data = await response.json()
  const routeCoordinates = data.routes?.[0]?.geometry?.coordinates
  if (!routeCoordinates) return

  // Update or add the route source
  if (map.getSource('route')) {
    ;(map.getSource('route') as mapboxgl.GeoJSONSource).setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: routeCoordinates,
      },
    })
  } else {
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routeCoordinates,
        },
      },
    })
    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#3b82f6',
        'line-width': 4,
      },
    })
  }

  // Fit bounds to include all points
  const bounds = new mapboxgl.LngLatBounds()
  bounds.extend(startCoords)
  bounds.extend(waypointCoords)
  bounds.extend(endCoords)

  map.fitBounds(bounds, { padding: 50 })
}

export const fetchPlaceName = async (
  longitude: number,
  latitude: number
): Promise<string | null> => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
  )
  const data = await response.json()
  return data.features[0]?.place_name || null
}
