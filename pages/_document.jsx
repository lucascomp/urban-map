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
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="icon" href="/static/favicon.ico" />
          <meta name="theme-color" content="#72B340" />
          <meta
            name="description"
            content="Site do Mapa de Acessibilidade Urbana"
          />
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
