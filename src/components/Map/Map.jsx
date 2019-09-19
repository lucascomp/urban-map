import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MapComponents from '../MapComponents';

const Map = () => {
  const onLoad = (map) => {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      map.panTo({ lat: latitude, lng: longitude });
    });
  };

  const onClick = (event) => {
    if (!event.placeId) {
      return;
    }

    event.stop();
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCbba3cKHWQtsY2nIlYMryfsPzRILaDmO8">
      <GoogleMap
        mapContainerStyle={{ height: '100vh' }}
        zoom={15}
        center={{
          lat: -22.906955,
          lng: -43.186902,
        }}
        onLoad={onLoad}
        onClick={onClick}
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
