import React from 'react';
import Head from 'next/head';
import { publicOnly } from '../../components/Auth';
import LoginPanel from '../../components/LoginPanel';
import styles from './Login.css';

const Login = () => (
  <>
    <Head>
      <title>Entrar | Mapa de Acessibilide Urbana</title>
    </Head>
    <div className={styles.Wrapper}>
      <LoginPanel />
    </div>
  </>
);

Login.getInitialProps = async () => ({});

export default publicOnly(Login);
