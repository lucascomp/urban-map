import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { logout } from '../../services/users';
import BackwardIcon from './backward.svg';
import styles from './Sidebar.css';

const Sidebar = ({ showSidebar, onClose, onLoggedOut }) => {
  const sideBar = classNames(
    styles.SideBar, {
      [styles.opened]: showSidebar,
    },
  );

  const onLogoutClick = async () => {
    await logout();
    onLoggedOut();
  };

  return (
    <>
      {showSidebar && (
        <div className={styles.Background}>
          <button type="button" onClick={onClose} aria-label="menu-background" />
        </div>
      )}
      <div className={sideBar}>
        <div className={styles.Header}>
          <h3>Mapa de Acessibilidade Urbana</h3>
          <button className={styles.Backward} type="button" onClick={onClose}>
            <img src={BackwardIcon} alt="backward-icon" />
          </button>
        </div>
        <ul className={styles.Widget}>
          <li className={styles.Item}>
            <button onClick={onLogoutClick} type="button">Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  showSidebar: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  showSidebar: false,
};

export default Sidebar;
