import React from 'react';
import PropTypes from 'prop-types';
import { useGoogleMap } from '@react-google-maps/api';
import AccessibilityFilter from '../AccessibilityFilter';
import SearchBox from '../SearchBox';
import Sidebar from '../Sidebar';
import redirect from '../../utils/router';
import styles from './Menu.css';

const Menu = ({
  accessibilitiesFilter,
  onAccessibilitiesFilterChange,
  onMenuClick,
  onRegisterAccessibilityClick,
  onRegisterAdminClick,
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
        <AccessibilityFilter
          accessibilities={accessibilitiesFilter}
          onAccessibilitiesChange={onAccessibilitiesFilterChange}
        />
      </div>
      <Sidebar
        active={sidebarActive}
        onLoggedOut={onLoggedOut}
        onRegisterAccessibilityClick={onRegisterAccessibilityClick}
        onRegisterAdminClick={onRegisterAdminClick}
        onRequestClose={onSidebarRequestClose}
      />
    </>
  );
};

Menu.propTypes = {
  accessibilitiesFilter: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  onAccessibilitiesFilterChange: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onRegisterAccessibilityClick: PropTypes.func.isRequired,
  onRegisterAdminClick: PropTypes.func.isRequired,
  onSidebarRequestClose: PropTypes.func.isRequired,
  sidebarActive: PropTypes.bool,
};

Menu.defaultProps = {
  sidebarActive: false,
};

export default Menu;
