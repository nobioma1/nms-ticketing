import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box px={2}>
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
