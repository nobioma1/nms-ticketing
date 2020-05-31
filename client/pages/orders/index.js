import { Heading, ListItem, List, Text, Box } from '@chakra-ui/core';

const OrderIndex = ({ orders }) => {
  const ordersList = orders.map((order) => {
    return (
      <ListItem key={order.id}>
        <Text>
          {order.ticket.title} ({order.status})
        </Text>
      </ListItem>
    );
  });

  return (
    <Box>
      <Heading as="h1" size="xl">
        Tickets
      </Heading>
      <List>{ordersList}</List>
    </Box>
  );
};

// get data during SSR process
// can be invoked on the client or the server(routing in app) on special occasions
OrderIndex.getInitialProps = async (_, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
