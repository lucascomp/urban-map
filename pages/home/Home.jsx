import React from 'react';
import Head from 'next/head';
import { asPrivate } from '../../components/Auth';
import Map from '../../components/Map';

const Home = () => (
  <div>
    <Head>
      <title>Home | Mapa de Acessibilide Urbana</title>
    </Head>
    <Map />
  </div>
);

export default asPrivate()(Home);
