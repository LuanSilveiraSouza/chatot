import React from 'react';
import { Text, Button, Flex, Image, Heading } from '@chakra-ui/react';
import conversationImg from './assets/conversation.png';

const App: React.FC = () => {
  return (
    <Flex
      minH="100vh"
      w="100%"
      bg="gray.50"
      p={4}
      alignItems="center"
      justifyContent="center"
      overflowX='hidden'
    >
      <Flex alignItems="center" justifyContent="center">
        <Image
          w="50%"
          src={conversationImg}
          alt="Conversa"
        />

        <Flex flexDirection='column' w="50%" p={8}>
          <Heading as='h1'>Chatot</Heading>
          <Text>As melhores conversas com as melhores companhias.</Text>
          <Button colorScheme="blue" mt={8} w='70%'>Entrar</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default App;
