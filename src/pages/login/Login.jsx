import React from 'react';
import Head from 'next/head';
import { asPublicOnly } from '../../components/Auth';
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

export default asPublicOnly()(Login);
