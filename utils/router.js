import Router from 'next/router';

const redirect = (destination, { res } = {}, status = 302) => {
  if (res) {
    res.writeHead(status, { Location: destination });
    res.end();
  } else {
    Router.push(destination);
  }
};

export default redirect;
