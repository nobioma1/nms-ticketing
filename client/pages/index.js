import { Heading } from '@chakra-ui/core';

const LandingPage = ({ currentUser }) => {
  return (
    <Heading as="h1" size="xl">
      {currentUser ? 'You are signed In' : 'You are not signed In'}
    </Heading>
  );
};

// get data during SSR process
// can be invoked on the client or the server(routing in app) on special occasions
LandingPage.getInitialProps = async (context) => {
  return {};
};

export default LandingPage;
