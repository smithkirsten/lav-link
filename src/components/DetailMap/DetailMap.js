import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import PropTypes from 'prop-types'

const containerStyle = {
  "width": '100%',
  "height": '100%',
  "borderRadius": '15px'
};

export default function DetailMap({ bathroom, link }) {
  // eslint-disable-next-line
  const [map, setMap] = useState(null)

  const center =  {lat: bathroom.latitude, lng: bathroom.longitude}

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const onLoad = useCallback(map => {
    setMap(map)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      zoom={15}
      center={center}
      options={{
        mapTypeControl: false,
      }}
    >
      <Marker position={center} onClick={() => window.open(link.current, '_blank', 'noreferrer')}/>
    </GoogleMap>
  ) : <></>
}

DetailMap.propType = {
  data: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired
}