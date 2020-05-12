import React, { useEffect } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

const SignOut = ({ currentUser }) => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    if (currentUser) {
      doRequest();
    }
  }, []);

  return <div>Signing Out</div>;
};

export default SignOut;
