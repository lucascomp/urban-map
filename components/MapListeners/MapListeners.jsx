import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useGoogleMap } from '@react-google-maps/api';
import RegisterBox from '../RegisterBox';
import {
  cleanMarkers,
  drawMarkers,
  drawRegisterMarker,
  getMarkers,
  filterMarkers,
  removeListener,
} from '../../services/markers';
import { arrayDiff, arrayIntersection } from '../../utils/array';
import { markerComparator } from '../../utils/marker';

let registerMarker = null;

const MapListeners = ({
  accessibilitiesFilter,
  onCancelRegister,
  onConfirmRegister,
  registering,
  submittingRegister,
}) => {
  const [markers, setMarkers] = useState([]);
  const [registerLatitude, setRegisterLatitude] = useState('');
  const [registerLongitude, setRegisterLongitude] = useState('');
  const [registerAccessibility, setRegisterAccessibility] = useState('1');
  const [searchError, setSearchError] = useState(false);
  const map = useGoogleMap();

  filterMarkers(map, markers, accessibilitiesFilter);

  const clearRegisterMarker = () => {
    if (registerMarker) {
      cleanMarkers([registerMarker]);
      registerMarker = null;
    }
  };

  const clearRegisters = () => {
    clearRegisterMarker();
    setRegisterLatitude('');
    setRegisterLongitude('');
    setRegisterAccessibility('1');
  };



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

    return () => removeListener(idleListener);
  });

  useEffect(() => {
    const fixLatLng = (value) => value.toFixed(6);

    const setRegisterLatitudeFixed = (lat) => {
      const fixedLat = fixLatLng(lat);
      setRegisterLatitude(fixedLat);
    };

    const setRegisterLongitudeFixed = (lng) => {
      const fixedLng = fixLatLng(lng);
      setRegisterLongitude(fixedLng);
    };

    const updateLatLng = ({ latLng }) => {
      setRegisterLatitudeFixed(latLng.lat());
      setRegisterLongitudeFixed(latLng.lng());
    };

    const clickListener = map.addListener('click', async ({ latLng }) => {
      if (!registering) {
        return;
      }

      const lat = latLng.lat();
      const lng = latLng.lng();

      clearRegisterMarker();

      registerMarker = drawRegisterMarker(map);
      registerMarker.addListener('drag', updateLatLng);
      registerMarker.setPosition({ lat, lng });

      updateLatLng({ latLng });
      setSearchError(false);
    });

    return () => removeListener(clickListener);
  });

  const onRegisterBoxCancel = () => {
    clearRegisters();
    onCancelRegister();
  };

  const onRegisterBoxConfirm = async () => {
    const successfullyRegistered = await onConfirmRegister({
      latitude: registerLatitude,
      longitude: registerLongitude,
      accessibility: registerAccessibility,
    });

    if (successfullyRegistered) {
      map.panTo({
        lat: parseFloat(registerLatitude),
        lng: parseFloat(registerLongitude),
      });
    }

    clearRegisters();
  };

  const onRegisterLatitudeChanged = (latitude) => {
    setRegisterLatitude(latitude);
    setSearchError(false);
  };

  const onRegisterLongitudeChanged = (longitude) => {
    setRegisterLongitude(longitude);
    setSearchError(false);
  };

  const onRegisterAccessibilityChanged = (accessibility) => {
    setRegisterAccessibility(accessibility);
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
      accessibility={registerAccessibility}
      onCancel={onRegisterBoxCancel}
      onLatitudeChanged={onRegisterLatitudeChanged}
      onLongitudeChanged={onRegisterLongitudeChanged}
      onAccessibilityChanged={onRegisterAccessibilityChanged}
      onConfirm={onRegisterBoxConfirm}
      onSearch={onRegisterSearch}
      searchError={searchError}
      submitting={submittingRegister}
    />
  );
};

MapListeners.propTypes = {
  accessibilitiesFilter: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
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
