import { Flex, Stack, Heading } from '@chakra-ui/core';
import Link from 'next/link';

import RouteLink from './route-link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return <RouteLink key={label} url={href} title={label} />;
    });

  return (
    <Flex alignItems="center" justifyContent="space-between" py={3} py={2}>
      <Link href="/">
        <Heading cursor="pointer" fontSize="xl">
          Teeket
        </Heading>
      </Link>
      <Stack isInline>{links}</Stack>
    </Flex>
  );
};

export default Header;
