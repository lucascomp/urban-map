import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { asPublicOnly } from '../../components/Auth';
import ResetPasswordPanel from '../../components/ResetPasswordPanel';
import styles from './ResetPassword.css';

const ResetPassword = ({ token }) => (
  <>
    <Head>
      <title>Esqueceu sua senha? | Mapa de Acessibilide Urbana</title>
    </Head>
    <div className={styles.Wrapper}>
      <ResetPasswordPanel token={token} />
    </div>
  </>
);

ResetPassword.getInitialProps = ({ query: { token } }) => ({ token });

ResetPassword.propTypes = {
  token: PropTypes.string,
};

ResetPassword.defaultProps = {
  token: '',
};

export default asPublicOnly()(ResetPassword);
