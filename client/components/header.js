import { Flex, Stack, Heading } from '@chakra-ui/core';
import Link from 'next/link';

import RouteLink from './route-link';

const Header = (props) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" py={3} py={2}>
      <Link href="/">
        <Heading cursor="pointer" fontSize="xl">
          Teeket
        </Heading>
      </Link>

      {!props.currentUser ? (
        <Stack isInline>
          <RouteLink url="/auth/signin" title="Sign In" />
          <RouteLink url="/auth/signup" title="Sign Up" />
        </Stack>
      ) : (
        <RouteLink url="/auth/signout" title="Sign Out" />
      )}
    </Flex>
  );
};

export default Header;
