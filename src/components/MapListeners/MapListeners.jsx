import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useGoogleMap } from '@react-google-maps/api';
import RegisterBox from '../RegisterBox';
import { useUser } from '../UserContext';
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
import redirect from '../../utils/router';

let registerMarker = null;

const MapListeners = ({
  accessibilitiesFilter,
  editing,
  onCancelRegister,
  onConfirmRegister,
  onEditClick: onEditClickProp,
  registering,
  submittingRegister,
}) => {
  const [markers, setMarkers] = useState([]);
  const [registerLatitude, setRegisterLatitude] = useState('');
  const [registerLongitude, setRegisterLongitude] = useState('');
  const [registerDescription, setRegisterDescription] = useState('');
  const [registerAccessibility, setRegisterAccessibility] = useState('1');
  const [searchError, setSearchError] = useState(false);
  const map = useGoogleMap();
  const { admin } = useUser();

  filterMarkers(map, markers, accessibilitiesFilter);

  const clearRegisterMarker = () => {
    if (registerMarker) {
      cleanMarkers([registerMarker]);
      registerMarker = null;
    }
  };

  const clearRegisters = () => {
    clearRegisterMarker();
    setRegisterAccessibility('1');
    setRegisterDescription('');
    setRegisterLatitude('');
    setRegisterLongitude('');
  };

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

  const onEditClick = (marker) => {
    if (!admin) {
      return;
    }

    const {
      accessibilityId,
      description,
      position,
    } = marker;

    setRegisterAccessibility(accessibilityId.toString());
    setRegisterDescription(description.toString());
    setRegisterLatitude(position.lat().toString());
    setRegisterLongitude(position.lng().toString());

    registerMarker = marker;

    registerMarker.setDraggable(true);
    registerMarker.addListener('drag', updateLatLng);

    onEditClickProp(registerMarker);
  };

  useEffect(() => {
    const idleListener = map.addListener('idle', async () => {
      try {
        const newMarkersPosition = await getMarkers(map);
        const markersPositionToInclude = arrayDiff(newMarkersPosition, markers, markerComparator);
        const markersToExclude = arrayDiff(markers, newMarkersPosition, markerComparator);

        if (markersPositionToInclude.length === 0 && markersToExclude.length === 0) {
          return;
        }

        const markersToKeep = arrayIntersection(markers, newMarkersPosition, markerComparator);
        const newMarkers = drawMarkers(map, markersPositionToInclude, onEditClick);

        cleanMarkers(markersToExclude);
        setMarkers([...markersToKeep, ...newMarkers]);
      } catch (e) {
        redirect('/login');
      }
    });

    return () => removeListener(idleListener);
  });

  useEffect(() => {
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
    await onConfirmRegister({
      latitude: registerLatitude,
      longitude: registerLongitude,
      description: registerDescription,
      accessibility: registerAccessibility,
    });

    map.panTo({
      lat: parseFloat(registerLatitude),
      lng: parseFloat(registerLongitude),
    });

    clearRegisters();
  };

  const onRegisterDescriptionChanged = (description) => {
    setRegisterDescription(description);
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

  return (editing || registering) && (
    <RegisterBox
      latitude={registerLatitude}
      longitude={registerLongitude}
      description={registerDescription}
      accessibility={registerAccessibility}
      editing={editing}
      onCancel={onRegisterBoxCancel}
      onDescriptionChanged={onRegisterDescriptionChanged}
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
  editing: PropTypes.string,
  onCancelRegister: PropTypes.func.isRequired,
  onConfirmRegister: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  registering: PropTypes.bool,
  submittingRegister: PropTypes.bool,
};

MapListeners.defaultProps = {
  editing: null,
  registering: false,
  submittingRegister: false,
};

export default MapListeners;
