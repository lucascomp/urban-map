import React from 'react';
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api';
import MapComponents from '../MapComponents/MapComponents';

/* global google, navigator */

const { GOOGLE_MAPS_API_KEY } = process.env;
let userMarker;

const Map = () => {
  const center = { lat: -22.906955, lng: -43.186902 };
  const libraries = ['places'];
  const mapContainerStyle = { height: '100vh' };
  const options = {
    fullscreenControl: false,
    mapTypeControl: false,
    minZoom: 14,
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

  const onLoad = (map) => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      map.panTo({
        lat: latitude,
        lng: longitude,
      });
    });

    navigator.geolocation.watchPosition(({ coords: { latitude, longitude } }) => {
      if (!userMarker) {
        userMarker = new google.maps.Marker({
          map,
        });
      }

      userMarker.setPosition({
        lat: latitude,
        lng: longitude,
      });
    });
  };

  return (
    <LoadScriptNext
      libraries={libraries}
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        center={center}
        mapContainerStyle={mapContainerStyle}
        onLoad={onLoad}
        options={options}
        zoom={zoom}
      >
        <MapComponents />
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default Map;
