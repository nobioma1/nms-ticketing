import { useRouter } from 'next/router';
import { useState } from 'react';
import { Heading, Box, FormLabel, Input, Button, Stack } from '@chakra-ui/core';
import useRequest from '../../hooks/use-request';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => router.push('/'),
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    doRequest();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Heading as="h2">Sign In.</Heading>
      {errors}
      <Stack my={2}>
        <Box>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button type="submit" variant="solid" variantColor="blue">
          SignIn
        </Button>
      </Stack>
    </form>
  );
};

export default SignIn;
