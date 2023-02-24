import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function ResultsMap() {

const coordinates = useSelector((state) => state.landing.gpsCoordinates)

  const center = { lat: parseInt(coordinates.lat), lng: parseInt(coordinates.long) };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      zoom={1}
      center={center}
      options={{
        mapTypeControl: false,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  );
}
