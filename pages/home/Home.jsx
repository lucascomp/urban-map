import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { asPrivate } from '../../components/Auth';
import AccessibilitiesContext from '../../components/AccessibilitiesContext';
import Map from '../../components/Map';
import { getAccessibilities } from '../../services/accessibilities';
import { forceClearSession, getCookie } from '../../utils/auth';
import redirect from '../../utils/router';

const Home = ({ accessibilities }) => (
  <div>
    <Head>
      <title>Home | Mapa de Acessibilide Urbana</title>
    </Head>
    <AccessibilitiesContext.Provider value={accessibilities}>
      <Map />
    </AccessibilitiesContext.Provider>
  </div>
);

Home.getInitialProps = async (ctx) => {
  const cookie = getCookie(ctx);

  try {
    const accessibilities = await getAccessibilities({ cookie });

    return { accessibilities };
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
};

export default asPrivate()(Home);
