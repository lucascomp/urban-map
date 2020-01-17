import React from 'react';
import PropTypes from 'prop-types';
import { useGoogleMap } from '@react-google-maps/api';
import SearchBox from '../SearchBox';
import Sidebar from '../Sidebar';
import redirect from '../../utils/router';

const Menu = ({
  onMenuClick,
  onRegisterAccessibilityClick,
  onSidebarRequestClose,
  sidebarActive,
}) => {
  const map = useGoogleMap();

  const onPlaceChanged = ({ geometry: { location } }) => {
    map.panTo(location);
    map.setZoom(18);
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
        active={sidebarActive}
        onLoggedOut={onLoggedOut}
        onRegisterAccessibilityClick={onRegisterAccessibilityClick}
        onRequestClose={onSidebarRequestClose}
      />
    </>
  );
};

Menu.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  onRegisterAccessibilityClick: PropTypes.func.isRequired,
  onSidebarRequestClose: PropTypes.func.isRequired,
  sidebarActive: PropTypes.bool,
};

Menu.defaultProps = {
  sidebarActive: false,
};

export default Menu;
