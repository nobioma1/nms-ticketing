import { Box, Heading, Text } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import RouteLink from '../../components/route-link';

const Order = ({ order, currentUser }) => {
  console.log(process.env);

  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => RouteLink.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();

      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    <Text>Order Expired</Text>;
  }

  return (
    <Box>
      <Heading>Order</Heading>
      <Text>{order.ticket.title}</Text>
      <Text>{timeLeft} seconds until order expires</Text>
      <StripeCheckout
        token={async (token) => {
          await doRequest({ token: token.id });
        }}
        stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </Box>
  );
};

Order.getInitialProps = async (context, client, currentUser) => {
  const { orderId } = context.query;

  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default Order;
