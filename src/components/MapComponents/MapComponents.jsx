import React, { useState } from 'react';
import { useAccessibilities } from '../AccessibilitiesContext';
import MapListeners from '../MapListeners';
import Menu from '../Menu';
import { createMarker, editMarker } from '../../services/markers';
import redirect from '../../utils/router';

const MapComponents = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submittingRegister, setSubmittingRegister] = useState(false);
  const accessibilities = useAccessibilities();
  const [
    accessibilitiesFilter,
    setAccessibilitiesFilter,
  ] = useState(accessibilities.map((accessibility) => ({
    ...accessibility,
    checked: true,
  })));

  const onAccessibilitiesFilterChange = (newAccessibilitiesFilter) => {
    setAccessibilitiesFilter(newAccessibilitiesFilter);
  };

  const onMenuClick = () => {
    setSidebarActive(true);
  };

  const onRegisterAccessibilityClick = () => {
    setSidebarActive(false);
    setRegistering(true);
  };

  const onRegisterAdminClick = () => {
    redirect('/register-admin');
  };

  const onSidebarRequestClose = () => {
    setSidebarActive(false);
  };

  const onCancelRegister = () => {
    setRegistering(false);
    setEditing(null);
  };

  const onConfirmRegister = async ({
    latitude,
    longitude,
    description,
    accessibility,
  }) => {
    setSubmittingRegister(true);

    if (registering) {
      await createMarker({
        accessibilityId: accessibility,
        description,
        lat: latitude,
        lng: longitude,
      });

      setRegistering(false);
    } else if (editing) {
      await editMarker({
        accessibilityId: accessibility,
        description,
        id: editing,
        lat: latitude,
        lng: longitude,
      });

      setEditing(null);
    }

    setSubmittingRegister(false);
  };

  const onEditClick = ({ id }) => {
    setEditing(id.toString());
  };

  return (
    <>
      <MapListeners
        accessibilitiesFilter={accessibilitiesFilter}
        editing={editing}
        onCancelRegister={onCancelRegister}
        onConfirmRegister={onConfirmRegister}
        onEditClick={onEditClick}
        registering={registering}
        submittingRegister={submittingRegister}
      />
      <Menu
        accessibilitiesFilter={accessibilitiesFilter}
        onAccessibilitiesFilterChange={onAccessibilitiesFilterChange}
        onMenuClick={onMenuClick}
        onRegisterAccessibilityClick={onRegisterAccessibilityClick}
        onRegisterAdminClick={onRegisterAdminClick}
        onSidebarRequestClose={onSidebarRequestClose}
        sidebarActive={sidebarActive}
      />
    </>
  );
};

export default MapComponents;
