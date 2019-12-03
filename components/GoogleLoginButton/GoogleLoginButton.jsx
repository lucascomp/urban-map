import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';
import { loginWithGoogle } from '../../services/users';
import GoogleIcon from './google.svg';
import styles from './GoogleLoginButton.css';

const GoogleLoginButton = ({ className, fluid }) => {
  const onClick = () => loginWithGoogle();

  return (
    <Button className={classNames(styles.Button, className)} fluid={fluid} onClick={onClick}>
      <img src={GoogleIcon} width="16" alt="logo-google" />
      Entrar com Google
    </Button>
  );
};

GoogleLoginButton.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
};

GoogleLoginButton.defaultProps = {
  className: null,
  fluid: false,
};

export default GoogleLoginButton;
