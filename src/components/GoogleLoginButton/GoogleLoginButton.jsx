import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';
import GoogleIcon from './google.svg';
import styles from './GoogleLoginButton.css';

const GoogleLoginButton = ({ className, fluid, onLoggedIn }) => (
  <Button className={classNames(styles.Button, className)} fluid={fluid} onClick={onLoggedIn}>
    <img src={GoogleIcon} width="16" alt="logo-google" />
    Entrar com Google
  </Button>
);

GoogleLoginButton.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  onLoggedIn: PropTypes.func,
};

GoogleLoginButton.defaultProps = {
  className: null,
  fluid: false,
  onLoggedIn: null,
};

export default GoogleLoginButton;