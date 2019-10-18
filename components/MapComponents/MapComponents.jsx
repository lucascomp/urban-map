import React, { useState } from 'react';
import { useGoogleMap } from '@react-google-maps/api';
import SearchBox from '../SearchBox';
import Sidebar from '../Sidebar';
import redirect from '../../utils/router';

const Menu = () => {
  const map = useGoogleMap();
  const [showSidebar, setShowSidebar] = useState(false);

  const onMenuClick = () => {
    setShowSidebar(true);
  };

  const onPlaceChanged = (place) => {
    map.panTo(place.geometry.location);
    map.setZoom(18);
  };

  const onSidebarClose = () => {
    setShowSidebar(false);
  };

  const onLoggedOut = () => {
    redirect('/login');
  };

  return (
    <>
      <SearchBox onMenuClick={onMenuClick} onPlaceChanged={onPlaceChanged} />
      <Sidebar showSidebar={showSidebar} onClose={onSidebarClose} onLoggedOut={onLoggedOut} />
    </>
  );
};

export default Menu;
