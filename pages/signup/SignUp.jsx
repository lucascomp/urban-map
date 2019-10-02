import React from 'react';
import Head from 'next/head';
import { publicOnly } from '../../components/Auth';
import SignUpPanel from '../../components/SignUpPanel';
import styles from './SignUp.css';

const SignUp = () => (
  <>
    <Head>
      <title>Cadastre-se | Mapa de Acessibilide Urbana</title>
    </Head>
    <div className={styles.Wrapper}>
      <SignUpPanel />
    </div>
  </>
);

SignUp.getInitialProps = async () => ({});

export default publicOnly(SignUp);
