import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

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
          <meta name="theme-color" content="#72B340" />
          <meta
            name="description"
            content="Site do Mapa de Acessibilidade Urbana"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default UrbanMapDocument;
