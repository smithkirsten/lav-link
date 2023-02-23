import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function DetailMap() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={map => setMap(map)}
      zoom={10}
    >
    </GoogleMap>
  )
}