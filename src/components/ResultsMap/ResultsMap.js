import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { selectBathroom } from '../ResultCard/resultSlice';

const containerStyle = {
  "width": '100%',
  "height": '100%',
  "borderRadius": '15px'
};

export default function ResultsMap({ filteredResults }) {
  // eslint-disable-next-line
  const [map, setMap] = useState(null);
  const coordinates = useSelector((state) => state.landing.gpsCoordinates)
  const center = { lat: +(coordinates.lat), lng: +(coordinates.long) };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const createMarkers = () => {
    return filteredResults.map((result) => <Marker 
      position={{ lat: result.latitude, lng: result.longitude }} 
      onClick={() => {
        dispatch(selectBathroom(result));
        navigate('/results/details');
      }}
      title={result.name}
      key={result.id}
    />) 
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      zoom={13}
      center={center}
      options={{
        mapTypeControl: false,
      }}
    >
      {createMarkers()}
    </GoogleMap>
  ) : (
    <></>
  );
}

ResultsMap.propTypes = {
  filteredResults: PropTypes.array.isRequired
};