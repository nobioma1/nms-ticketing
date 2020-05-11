import { ThemeProvider, CSSReset } from '@chakra-ui/core';

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
