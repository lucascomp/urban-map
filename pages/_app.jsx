import React from 'react';
import App from 'next/app';
import './_app.css';

class UrbanMapApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...pageProps} />;
  }
}

export default UrbanMapApp;
