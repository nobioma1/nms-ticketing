import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';

import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box px={2}>
        <Header currentUser={currentUser} />
        <Component currentUser={currentUser} {...pageProps} />
      </Box>
    </ThemeProvider>
  );
};

// get data during SSR process
// can be invoked on the client or the server(routing in app) on special occasions
AppComponent.getInitialProps = async ({ Component, ctx }) => {
  const client = buildClient(ctx);
  const { data } = await buildClient(ctx).get('/api/users/current-user');

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx, client, data.currentUser);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
