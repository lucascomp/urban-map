import React from 'react';
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api';
import MapListeners from '../MapListeners';
import Menu from '../Menu';

const { GOOGLE_MAPS_API_KEY } = process.env;

const Map = () => {
  const center = { lat: -22.906955, lng: -43.186902 };
  const libraries = ['places'];
  const mapContainerStyle = { height: '100vh' };
  const options = {
    fullscreenControl: false,
    mapTypeControl: false,
    minZoom: 15,
    streetViewControl: false,
    styles: [
      {
        featureType: 'landscape',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'transit',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
    ],
    zoomControl: false,
  };
  const zoom = 15;

  return (
    <LoadScriptNext
      libraries={libraries}
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        center={center}
        mapContainerStyle={mapContainerStyle}
        options={options}
        zoom={zoom}
      >
        <MapListeners />
        <Menu />
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default Map;
