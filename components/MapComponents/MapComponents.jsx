import React, { useState } from 'react';
import MapListeners from '../MapListeners';
import Menu from '../Menu';
import { createMarker } from '../../services/markers';

const MapComponents = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [submittingRegister, setSubmittingRegister] = useState(false);

  const onMenuClick = () => {
    setSidebarActive(true);
  };

  const onRegisterAccessibilityClick = () => {
    setSidebarActive(false);
    setRegistering(true);
  };

  const onSidebarRequestClose = () => {
    setSidebarActive(false);
  };

  const onCancelRegister = () => {
    setRegistering(false);
  };

  const onConfirmRegister = async ({
    latitude,
    longitude,
    accessibility,
  }) => {
    setSubmittingRegister(true);

    await createMarker({
      lat: latitude,
      lng: longitude,
      accessibilityId: accessibility,
    });

    setSubmittingRegister(false);
    setRegistering(false);

    return true;
  };

  return (
    <>
      <MapListeners
        registering={registering}
        onCancelRegister={onCancelRegister}
        onConfirmRegister={onConfirmRegister}
        submittingRegister={submittingRegister}
      />
      <Menu
        onMenuClick={onMenuClick}
        onRegisterAccessibilityClick={onRegisterAccessibilityClick}
        onSidebarRequestClose={onSidebarRequestClose}
        sidebarActive={sidebarActive}
      />
    </>
  );
};

export default MapComponents;
