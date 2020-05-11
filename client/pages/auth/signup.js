import { useState } from 'react';
import { Heading, Box, FormLabel, Input, Button, Stack } from '@chakra-ui/core';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <form>
      <Heading as="h2">Create an Account</Heading>
      <Stack my={2}>
        <Box>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.vale)}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.vale)}
          />
        </Box>
        <Button variant="solid" variantColor="blue">
          Signup
        </Button>
      </Stack>
    </form>
  );
};

export default SignUp;
