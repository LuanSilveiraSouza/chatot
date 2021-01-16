import React, { useEffect } from 'react';
import { Text, Flex, Heading, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { socket } from '../services/socket';

const Chat: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected!');
    });

    socket.on('login', (data: any) => {
      console.log(data);
    });

    socket.on('offline', (data: any) => {
      console.log(data);
    });
  });

  const handleLogoff = () => {
    socket.disconnect();
    history.goBack();
  };

  return (
    <Layout>
      <Button colorScheme="teal" alignSelf="start" onClick={handleLogoff}>
        Fazer Logoff
      </Button>

      <Heading>Chat Screen</Heading>

      <Button
        onClick={() => socket.emit('login', { id: '000', name: 'test_user' })}
      >
        Login
      </Button>
    </Layout>
  );
};

export { Chat };
