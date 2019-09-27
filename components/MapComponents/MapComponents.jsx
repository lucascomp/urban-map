import React, { useState } from 'react';
import { useGoogleMap } from '@react-google-maps/api';
import SearchBox from '../SearchBox';
import Sidebar from '../Sidebar';

const Menu = () => {
  const map = useGoogleMap();
  const [showSidebar, setShowSidebar] = useState(false);

  const onMenuClick = () => {
    setShowSidebar(true);
  };

  const onSidebarClose = () => {
    setShowSidebar(false);
  };

  const onPlaceChanged = (place) => {
    map.panTo(place.geometry.location);
    map.setZoom(18);
  };

  return (
    <>
      <SearchBox onMenuClick={onMenuClick} onPlaceChanged={onPlaceChanged} />
      <Sidebar showSidebar={showSidebar} onClose={onSidebarClose} />
    </>
  );
};

export default Menu;
