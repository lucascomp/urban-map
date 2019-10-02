import React from 'react';
import { getCurrentUser } from '../../services/auth';
import redirect from '../../utils/router';

const publicOnly = (Component) => {
  const publicOnlyComponent = (props) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...props} />
  );

  publicOnlyComponent.getInitialProps = async (ctx) => {
    const currentUser = await getCurrentUser();

    if (currentUser) {
      redirect('/home', ctx);
      return {};
    }

    return Component.getInitialProps ? Component.getInitialProps(ctx) : {};
  };

  return publicOnlyComponent;
};

export default publicOnly;
