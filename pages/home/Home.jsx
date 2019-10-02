import React from 'react';
import Head from 'next/head';
import { privateOnly } from '../../components/Auth';
import Map from '../../components/Map';

const Home = () => (
  <div>
    <Head>
      <title>Home | Mapa de Acessibilide Urbana</title>
    </Head>
    <Map />
  </div>
);

Home.getInitialProps = async () => ({});

export default privateOnly(Home);
