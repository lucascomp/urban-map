import React from 'react';
import { getAuth } from '../../utils/auth';
import redirect from '../../utils/router';

export default function asPublicOnly({ pathToRedirect = '/home' } = {}) {
  return (Component) => {
    function PublicOnlyComponent(props) {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props} />;
    }

    PublicOnlyComponent.getInitialProps = async (ctx) => {
      const { isLoggedIn } = getAuth(ctx);

      if (isLoggedIn) {
        redirect(pathToRedirect, ctx);

        return {};
      }

      return Component.getInitialProps ? Component.getInitialProps(ctx) : {};
    };

    return PublicOnlyComponent;
  };
}
