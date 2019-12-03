import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';
import { loginWithFacebook } from '../../services/users';
import FacebookIcon from './facebook.svg';
import styles from './FacebookLoginButton.css';

const FacebookLoginButton = ({ className, fluid }) => {
  const onClick = () => loginWithFacebook();

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
};

FacebookLoginButton.defaultProps = {
  className: null,
  fluid: false,
};

export default FacebookLoginButton;
