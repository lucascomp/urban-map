import React from 'react';
import PropTypes from 'prop-types';
import { useGoogleMap } from '@react-google-maps/api';
import AccessibilityFilter from '../AccessibilityFilter';
import SearchBox from '../SearchBox';
import Sidebar from '../Sidebar';
import redirect from '../../utils/router';
import styles from './Menu.css';

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
      <div className={styles.Wrapper}>
        <SearchBox
          onMenuClick={onMenuClick}
          onPlaceChanged={onPlaceChanged}
        />
        <AccessibilityFilter />
      </div>
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
