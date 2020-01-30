import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { asPrivate } from '../../components/Auth';
import AccessibilitiesContext from '../../components/AccessibilitiesContext';
import Map from '../../components/Map';
import { getAccessibilities } from '../../services/accessibilities';

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

Home.getInitialProps = async () => {
  const accessibilities = await getAccessibilities();

  return { accessibilities };
};

Home.propTypes = {
  accessibilities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};

export default asPrivate()(Home);
