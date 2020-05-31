import { Box, Heading, Button, Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import useRequest from '../../hooks/use-request';

const Ticket = ({ ticket }) => {
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <Box>
      <Heading>{ticket.title}</Heading>
      <Text>{ticket.price}</Text>
      {errors}
      <Button onClick={() => doRequest()}>Purchase</Button>
    </Box>
  );
};

Ticket.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default Ticket;
