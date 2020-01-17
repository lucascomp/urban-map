import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useGoogleMap } from '@react-google-maps/api';
import RegisterBox from '../RegisterBox';
import { getMarkers, drawMarkers, cleanMarkers } from '../../services/markers';
import { arrayDiff, arrayIntersection } from '../../utils/array';
import { markerComparator } from '../../utils/marker';

/* global google */

const MapListeners = ({
  onCancelRegister,
  onConfirmRegister,
  registering,
  submittingRegister,
}) => {
  const [markers, setMarkers] = useState([]);
  const [registerLatitude, setRegisterLatitude] = useState('');
  const [registerLongitude, setRegisterLongitude] = useState('');
  const [searchError, setSearchError] = useState(false);
  const map = useGoogleMap();

  useEffect(() => {
    const idleListener = map.addListener('idle', async () => {
      const newMarkersPosition = await getMarkers(map);

      const markersPositionToInclude = arrayDiff(newMarkersPosition, markers, markerComparator);
      const markersToExclude = arrayDiff(markers, newMarkersPosition, markerComparator);

      if (markersPositionToInclude.length === 0 && markersToExclude.length === 0) {
        return;
      }

      const markersToKeep = arrayIntersection(markers, newMarkersPosition, markerComparator);
      const newMarkers = drawMarkers(map, markersPositionToInclude);

      cleanMarkers(markersToExclude);
      setMarkers([...markersToKeep, ...newMarkers]);
    });

    return () => google.maps.event.removeListener(idleListener);
  });

  useEffect(() => {
    const clickListener = map.addListener('click', async ({ latLng }) => {
      if (!registering) {
        return;
      }

      const lat = latLng.lat();
      const lng = latLng.lng();

      setRegisterLatitude(lat.toString());
      setRegisterLongitude(lng.toString());
      setSearchError(false);
    });

    return () => google.maps.event.removeListener(clickListener);
  });

  const onRegisterBoxCancel = () => {
    onCancelRegister();
  };

  const onRegisterBoxConfirm = () => {
    onConfirmRegister();
  };

  const onRegisterLatitudeChanged = (latitude) => {
    setRegisterLatitude(latitude);
    setSearchError(false);
  };

  const onRegisterLongitudeChanged = (longitude) => {
    setRegisterLongitude(longitude);
    setSearchError(false);
  };

  const onRegisterSearch = () => {
    const replaceCommaPerDot = (str) => str.replace(/,/g, '.');

    try {
      const lat = parseFloat(replaceCommaPerDot(registerLatitude), 10);
      const lng = parseFloat(replaceCommaPerDot(registerLongitude), 10);

      map.panTo({ lat, lng });
    } catch (e) {
      setSearchError(true);
    }
  };

  return registering && (
    <RegisterBox
      latitude={registerLatitude}
      longitude={registerLongitude}
      onCancel={onRegisterBoxCancel}
      onLatitudeChanged={onRegisterLatitudeChanged}
      onLongitudeChanged={onRegisterLongitudeChanged}
      onConfirm={onRegisterBoxConfirm}
      onSearch={onRegisterSearch}
      searchError={searchError}
      submitting={submittingRegister}
    />
  );
};

MapListeners.propTypes = {
  onCancelRegister: PropTypes.func.isRequired,
  onConfirmRegister: PropTypes.func.isRequired,
  registering: PropTypes.bool,
  submittingRegister: PropTypes.bool,
};

MapListeners.defaultProps = {
  registering: false,
  submittingRegister: false,
};

export default MapListeners;
