import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';
import { signInWithGoogle } from '../../services/auth';
import GoogleIcon from './google.svg';
import styles from './GoogleLoginButton.css';

const GoogleLoginButton = ({ className, fluid, onLoggedIn }) => {
  const onClick = async () => {
    try {
      await signInWithGoogle();
      onLoggedIn();
    } catch (error) {
      console.log(error); // TODO: exibir mensagem de erro pro usuário
    }
  };

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
  onLoggedIn: PropTypes.func.isRequired,
};

GoogleLoginButton.defaultProps = {
  className: null,
  fluid: false,
};

export default GoogleLoginButton;
