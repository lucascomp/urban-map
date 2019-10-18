import React from 'react';
import Link from 'next/link';
import Divison from '../Divison';
import Panel from '../Panel';
import FacebookLoginButton from '../FacebookLoginButton';
import GoogleLoginButton from '../GoogleLoginButton';
import LoginForm from '../LoginForm';
import redirect from '../../utils/router';
import styles from './LoginPanel.css';

const LoginPanel = () => {
  const onLoggedIn = () => {
    redirect('/home');
  };

  return (
    <Panel>
      <h3 className={styles.Title}>Mapa de Acessibilidade Urbana</h3>
      <FacebookLoginButton className={styles.FacebookLoginButton} onLoggedIn={onLoggedIn} fluid />
      <GoogleLoginButton className={styles.GoogleLoginButton} onLoggedIn={onLoggedIn} fluid />
      <Divison>ou</Divison>
      <LoginForm onLoggedIn={onLoggedIn} />
      <Link href="/signup">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.SignUpLink}>
          Não possui conta?
          {' '}
          <b>Crie agora!</b>
        </a>
      </Link>
    </Panel>
  );
};

export default LoginPanel;
