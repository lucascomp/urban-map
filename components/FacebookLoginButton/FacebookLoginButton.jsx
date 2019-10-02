import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';
import { signInWithFacebook } from '../../services/auth';
import FacebookIcon from './facebook.svg';
import styles from './FacebookLoginButton.css';

const FacebookLoginButton = ({ className, fluid, onLoggedIn }) => {
  const onClick = async () => {
    try {
      await signInWithFacebook();
      onLoggedIn();
    } catch (error) {
      console.log(error); // TODO: exibir mensagem de erro pro usuário
    }
  };

  return (
    <Button className={classNames(styles.Button, className)} fluid={fluid} onClick={onClick}>
      <img src={FacebookIcon} width="16" alt="logo-facebook" />
      Entrar com Facebook
    </Button>
  );
};

FacebookLoginButton.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  onLoggedIn: PropTypes.func.isRequired,
};

FacebookLoginButton.defaultProps = {
  className: null,
  fluid: false,
};

export default FacebookLoginButton;
