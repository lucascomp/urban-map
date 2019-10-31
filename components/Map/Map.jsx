import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MapComponents from '../MapComponents';

/* global navigator */

const Map = () => {
  const onLoad = (map) => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      map.panTo({ lat: latitude, lng: longitude });
    });
  };

  return (
    <LoadScript libraries={['places']} googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: '100vh' }}
        zoom={15}
        center={{
          lat: -22.906955,
          lng: -43.186902,
        }}
        onLoad={onLoad}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: false,
        }}
      >
        <MapComponents />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
