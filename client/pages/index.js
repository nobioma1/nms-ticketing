import { Heading, Flex, Box, Text } from '@chakra-ui/core';
import Link from 'next/link';

const LandingPage = ({ tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <Link
        key={ticket.id}
        href="/tickets/[ticketId]"
        as={`/tickets/${ticket.id}`}
      >
        <Flex>
          <Text>{ticket.title}</Text>
          <Text>{ticket.price}</Text>
        </Flex>
      </Link>
    );
  });

  return (
    <Box>
      <Heading as="h1" size="xl">
        Tickets
      </Heading>
      <Box>{ticketList}</Box>
    </Box>
  );
};

// get data during SSR process
// can be invoked on the client or the server(routing in app) on special occasions
LandingPage.getInitialProps = async (_, client) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
