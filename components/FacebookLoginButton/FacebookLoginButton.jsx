import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';
import FacebookIcon from './facebook.svg';
import styles from './FacebookLoginButton.css';

const FacebookLoginButton = ({ className, fluid, onLoggedIn }) => (
  <Button className={classNames(styles.Button, className)} fluid={fluid} onClick={onLoggedIn}>
    <img src={FacebookIcon} width="16" alt="logo-facebook" />
    Entrar com Facebook
  </Button>
);

FacebookLoginButton.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  onLoggedIn: PropTypes.func,
};

FacebookLoginButton.defaultProps = {
  className: null,
  fluid: false,
  onLoggedIn: null,
};

export default FacebookLoginButton;
