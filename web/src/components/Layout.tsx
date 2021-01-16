import React from 'react';
import { Flex } from '@chakra-ui/react';

const Layout: React.FC = ({ children }) => {
  return (
    <Flex
      minH="100vh"
      w="100%"
      bg="gray.50"
      p={4}
      flexDirection='column'
    >
      {children}
    </Flex>
  );
};

export { Layout };
