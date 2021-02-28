import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Text, Button, Flex, Image, Heading, Input } from '@chakra-ui/react';

import { userState } from '../context/atoms';
import { socket, connectSocket } from '../services/socket';

import { Layout } from '../components/Layout';
import conversationImg from '../assets/conversation.png';

const Home: React.FC = () => {
  const history = useHistory();

  const setUser = useSetRecoilState(userState);
  const [name, setName] = useState<string>('');

  const handleLogin = () => {
    if (!socket || !socket.connected) {
      connectSocket();
      socket.connect();
    }

    socket.on('login_success', (data: any) => {
      setUser(() => {
        return { id: data.id, name: data.name };
      });

      history.push('/chat');
    });

    socket.on('login_error', (data: any) => {
      alert('Login Inválido');
      setName('');
    });

    socket.emit('login', { name });
  };

  return (
    <Layout>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: 'column-reverse', md: 'row' }}
      >
        <Image
          position={{ base: 'initial', md: 'initial' }}
          w={{ base: '100%', md: '40%' }}
          src={conversationImg}
          alt="Conversa"
        />

        <Flex flexDirection="column" w={{ base: '100%', md: '50%' }} p={8}>
          <Heading as="h1">Chatot</Heading>
          <Text>As melhores conversas com as melhores companhias.</Text>

          <Flex w={{ base: '100%', md: '70%' }} flexDirection="column" mt={12}>
            <Text>Nome</Text>
            <Input
              placeholder="Insira seu nome"
              w="100%"
              colorScheme="teal"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Button
              colorScheme="blue"
              mt={8}
              w="50%"
              alignSelf="center"
              onClick={handleLogin}
            >
              Entrar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export { Home };
