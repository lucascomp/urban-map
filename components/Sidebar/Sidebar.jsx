import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useUser } from '../UserContext';
import { logout } from '../../services/users';
import BackwardIcon from './backward.svg';
import styles from './Sidebar.css';

const Sidebar = ({
  onRequestClose,
  onLoggedOut,
  onRegisterAccessibilityClick,
  onRegisterAdminClick,
  active,
}) => {
  const { admin } = useUser();

  const sidebarClassName = classNames(
    styles.Sidebar, {
      [styles.active]: active,
    },
  );

  const onLogoutClick = async () => {
    await logout();
    onLoggedOut();
  };

  return (
    <>
      {active && (
        <div className={styles.Background}>
          <button type="button" onClick={onRequestClose} aria-label="menu-background" />
        </div>
      )}
      <div className={sidebarClassName}>
        <div className={styles.Header}>
          <h3>Mapa de Acessibilidade Urbana</h3>
          <button className={styles.Backward} type="button" onClick={onRequestClose}>
            <img src={BackwardIcon} alt="backward-icon" />
          </button>
        </div>
        <ul className={styles.Widget}>
          {admin && (
            <li className={styles.Item}>
              <button onClick={onRegisterAdminClick} type="button">Cadastrar administrador</button>
            </li>
          )}
          <li className={styles.Item}>
            <button onClick={onRegisterAccessibilityClick} type="button">Cadastrar indicativo de acessiblidade</button>
          </li>
          <li className={styles.Item}>
            <button onClick={onLogoutClick} type="button">Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  active: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  onRegisterAccessibilityClick: PropTypes.func.isRequired,
  onRegisterAdminClick: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  active: false,
};

export default Sidebar;
