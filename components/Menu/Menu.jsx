import React, { useState } from 'react';
import { useGoogleMap } from '@react-google-maps/api';
import SearchBox from '../SearchBox';
import Sidebar from '../Sidebar';
import redirect from '../../utils/router';

const Menu = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const map = useGoogleMap();

  const onMenuClick = () => {
    setShowSidebar(true);
  };

  const onPlaceChanged = ({ geometry: { location } }) => {
    map.panTo(location);
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
      <SearchBox
        onMenuClick={onMenuClick}
        onPlaceChanged={onPlaceChanged}
      />
      <Sidebar
        onLoggedOut={onLoggedOut}
        showSidebar={showSidebar}
        onClose={onSidebarClose}
      />
    </>
  );
};

export default Menu;
