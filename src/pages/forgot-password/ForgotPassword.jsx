import React from 'react';
import Head from 'next/head';
import { asPublicOnly } from '../../components/Auth';
import ForgotPasswordPanel from '../../components/ForgotPasswordPanel';
import styles from './ForgotPassword.css';

const ForgotPassword = () => (
  <>
    <Head>
      <title>Esqueceu sua senha? | Mapa de Acessibilide Urbana</title>
    </Head>
    <div className={styles.Wrapper}>
      <ForgotPasswordPanel />
    </div>
  </>
);

export default asPublicOnly()(ForgotPassword);
