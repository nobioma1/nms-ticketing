import { Box, Heading, FormLabel, Input, Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useRequest from '../../hooks/use-request';

const NewTicket = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => router.push('/'),
  });

  const parsePrice = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await doRequest();
  };

  return (
    <Box>
      <Heading>Create a Ticket</Heading>
      {errors}
      <form onSubmit={onSubmitHandler}>
        <Box>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="price">Price</FormLabel>
          <Input
            type="number"
            onBlur={parsePrice}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Box>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default NewTicket;
