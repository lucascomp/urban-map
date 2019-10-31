import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MapComponents from '../MapComponents';

/* global navigator */
/* global google */

const Map = () => {
  const onLoad = (map) => {
    const localMarker = new google.maps.Marker({
      map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7.5,
        fillColor: '#f17569',
        fillOpacity: 1,
        strokeWeight: 0.2,
      },
    });

    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      map.panTo({ lat: latitude, lng: longitude });
    });

    navigator.geolocation.watchPosition(({ coords: { latitude: lat, longitude: lng } }) => {
      localMarker.setPosition({ lat, lng });
    });
  };

  return (
    <LoadScript libraries={['places']} googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: '100vh' }}
        zoom={20}
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
