import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || ''

export default function Map({
  startLocation,
  endLocation,
}: {
  startLocation: string
  endLocation: string
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
      } else if (startLocation && endLocation) {
        addRoute(mapRef.current, startLocation, endLocation)
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [startLocation, endLocation])

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

const fetchCoordinates = async (location: string) => {
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
