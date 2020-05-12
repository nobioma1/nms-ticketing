import { Box, Text } from '@chakra-ui/core';
import Link from 'next/link';

const RouteLink = ({ title, url }) => {
  return (
    <Box cursor="pointer" pl={3}>
      <Link href={url}>
        <Text>{title}</Text>
      </Link>
    </Box>
  );
};

export default RouteLink;
