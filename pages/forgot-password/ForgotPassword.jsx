import React from 'react';
import Head from 'next/head';
import { publicOnly } from '../../components/Auth';
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

ForgotPassword.getInitialProps = async () => ({});

export default publicOnly(ForgotPassword);
