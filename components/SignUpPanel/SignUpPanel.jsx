import React from 'react';
import Divison from '../Divison';
import Panel from '../Panel';
import FacebookLoginButton from '../FacebookLoginButton';
import GoogleLoginButton from '../GoogleLoginButton';
import SignUpForm from '../SignUpForm';
import redirect from '../../utils/router';
import styles from './SignUpPanel.css';

const SignUpPanel = () => {
  const onLoggedIn = () => {
    redirect('/');
  };

  return (
    <Panel>
      <h3 className={styles.Title}>Mapa de Acessibilidade Urbana</h3>
      <div className={styles.SocialLoginWrapper}>
        <FacebookLoginButton className={styles.FacebookButton} onLoggedIn={onLoggedIn} />
        <GoogleLoginButton className={styles.GoogleButton} onLoggedIn={onLoggedIn} />
      </div>
      <Divison>ou crie usando seu e-mail</Divison>
      <SignUpForm onLoggedIn={onLoggedIn} />
    </Panel>
  );
};

export default SignUpPanel;
