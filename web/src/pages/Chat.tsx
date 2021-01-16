import React from 'react';
import { Text, Flex, Heading, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { Layout } from '../components/Layout';

const Chat: React.FC = () => {
  const history = useHistory();

  return (
    <Layout>
      <Button colorScheme='teal' onClick={() => history.goBack()} >Fazer Logoff</Button>

      <Heading>Chat Screen</Heading>
    </Layout>
  );
};

export { Chat };
