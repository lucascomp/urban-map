import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { asPrivate } from '../../components/Auth';
import RegisterAdminPanel from '../../components/RegisterAdminPanel';
import UserContext from '../../components/UserContext';
import { getUser } from '../../services/users';
import { forceClearSession, getCookie } from '../../utils/auth';
import redirect from '../../utils/router';
import styles from './RegisterAdmin.css';

const RegisterAdmin = ({ user }) => (
  <>
    <Head>
      <title>Cadastre-se | Mapa de Acessibilide Urbana</title>
    </Head>
    <div className={styles.Wrapper}>
      <UserContext.Provider value={user}>
        <RegisterAdminPanel />
      </UserContext.Provider>
    </div>
  </>
);

RegisterAdmin.getInitialProps = async (ctx) => {
  const cookie = getCookie(ctx);

  try {
    const user = await getUser({ cookie });

    if (!user.admin) {
      redirect('/home', ctx);
      return {};
    }

    return { user };
  } catch ({ status }) {
    if (status === 401) {
      forceClearSession(ctx);
      redirect('/login', ctx);
      return {};
    }

    // erro de conexão ou erro na api
    return {};
  }
};

RegisterAdmin.propTypes = {
  user: PropTypes.shape({
    admin: PropTypes.bool,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};

export default asPrivate()(RegisterAdmin);
