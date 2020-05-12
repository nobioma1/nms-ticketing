import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';

import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box px={2}>
        <Header currentUser={pageProps.currentUser} />
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
};

// get data during SSR process
// can be invoked on the client or the server(routing in app) on special occasions
AppComponent.getInitialProps = async ({ Component, ctx }) => {
  let res = await buildClient(ctx).get('/api/users/current-user');

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    ...res.data,
  };
};

export default AppComponent;
