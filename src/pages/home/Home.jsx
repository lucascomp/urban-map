import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { asPrivate } from '../../components/Auth';
import AccessibilitiesContext from '../../components/AccessibilitiesContext';
import Map from '../../components/Map';
import UserContext from '../../components/UserContext';
import { getAccessibilities } from '../../services/accessibilities';
import { getUser } from '../../services/users';
import { forceClearSession, getCookie } from '../../utils/auth';
import redirect from '../../utils/router';

const Home = ({ accessibilities, user }) => (
  <div>
    <Head>
      <title>Home | Mapa de Acessibilide Urbana</title>
    </Head>
    <UserContext.Provider value={user}>
      <AccessibilitiesContext.Provider value={accessibilities}>
        <Map />
      </AccessibilitiesContext.Provider>
    </UserContext.Provider>
  </div>
);

Home.getInitialProps = async (ctx) => {
  const cookie = getCookie(ctx);

  try {
    const accessibilities = await getAccessibilities({ cookie });
    const user = await getUser({ cookie });

    return { accessibilities, user };
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

Home.propTypes = {
  accessibilities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  user: PropTypes.shape({
    admin: PropTypes.bool,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};

export default asPrivate()(Home);
