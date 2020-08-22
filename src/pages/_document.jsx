import React from 'react';
import PropTypes from 'prop-types';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

// eslint-disable-next-line react/no-danger
const Script = ({ children }) => <script dangerouslySetInnerHTML={{ __html: children }} />;

Script.propTypes = {
  children: PropTypes.string.isRequired,
};

class UrbanMapDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#72B340" />
          <meta
            name="description"
            content="Site do Mapa de Acessibilidade Urbana"
          />
          <link rel="manifest" href="manifest.json" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Mapa de Acessibilidade" />
          <meta name="apple-mobile-web-app-title" content="Mapa de Acessibilidade" />
          <meta name="theme-color" content="#adadad" />
          <meta name="msapplication-navbutton-color" content="#adadad" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          <link rel="icon" type="image/png" sizes="72x72" href="icons/icon-72x72.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="icons/icon-72x72.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="icons/icon-96x96.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="96x96" href="icons/icon-96x96.png" />
          <link rel="icon" type="image/png" sizes="128x128" href="icons/icon-128x128.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="128x128" href="icons/icon-128x128.png" />
          <link rel="icon" type="image/png" sizes="144x144" href="icons/icon-144x144.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="144x144" href="icons/icon-144x144.png" />
          <link rel="icon" type="image/png" sizes="152x152" href="icons/icon-152x152.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="152x152" href="icons/icon-152x152.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192x192.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="icons/icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="384x384" href="icons/icon-384x384.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="384x384" href="icons/icon-384x384.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="icons/icon-512x512.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="512x512" href="icons/icon-512x512.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://apis.google.com/js/platform.js" async defer />
        </body>
      </Html>
    );
  }
}

export default UrbanMapDocument;
