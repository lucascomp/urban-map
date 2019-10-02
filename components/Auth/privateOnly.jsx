import React from 'react';
import { getCurrentUser } from '../../services/auth';
import redirect from '../../utils/router';

const privateOnly = (Component) => {
  const privateOnlyComponent = (props) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...props} />
  );

  privateOnlyComponent.getInitialProps = async (ctx) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      redirect('/login', ctx);
      return {};
    }

    return Component.getInitialProps ? Component.getInitialProps(ctx) : {};
  };

  return privateOnlyComponent;
};

export default privateOnly;
