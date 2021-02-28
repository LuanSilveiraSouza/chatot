import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Text, Flex, Heading, Button, Input, useToast } from '@chakra-ui/react';

import { userState } from '../context/atoms';
import { socket } from '../services/socket';

import { Layout } from '../components/Layout';

const Chat: React.FC = () => {
  const history = useHistory();

  const toast = useToast();

  const [user, setUser] = useRecoilState(userState);
  const [userList, setUserList] = useState<any>([]);

  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);

  const inputRef = useRef(null);

  useEffect(() => {
    socket.on('user_list', (data: any) => {
      setUserList(data);
    });

    socket.on('messages', (data: any) => {
      setMessages(data);
    });

    socket.on('message', (data: any) => {
      if (messages.length < 1 || messages.some((msg) => msg.id == data.id)) {
        setMessages((oldArray) => [...oldArray, data]);
      }
    });

    socket.on('offline', (data: any) => {
      toast({
        title: 'User Offline',
        description: `User ${data.name} left the chat.`,
        status: 'success',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
    });

    document.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        sendMessage();
      }
    });
  }, []);

  const sendMessage = () => {
    if (text) {
      socket.emit('message', { user, content: text });
    }

    setText('');

    inputRef.current?.focus();
  };

  const handleLogoff = async () => {
    socket.disconnect();
    history.push('/');
  };

  return (
    <Layout>
      <Flex alignItems="center" w="100%" px={5}>
        <Heading marginRight={10}>{user.name}</Heading>
        <Button colorScheme="teal" alignSelf="start" onClick={handleLogoff}>
          Fazer Logoff
        </Button>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        marginTop={10}
        alignSelf="center"
        w="80%"
        h="80%"
      >
        <Heading alignSelf="self-start">Chat</Heading>

        <Flex w="100%" borderTop="2px" borderColor="teal.400">
          <Flex w="15%"></Flex>
          <Flex
            alignItems="self-start"
            flexDirection="column"
            borderRight="2px"
            borderColor="teal.400"
            w="70%"
            h="50vh"
            pr={2}
            my={5}
          >
            {messages.map((message) => (
              <Text
                key={message.id}
                fontSize={20}
                bg={message.user?.name == user.name ? 'teal.400' : 'gray.400'}
                color={message.user?.name == user.name ? 'white' : 'gray.800'}
                my={1}
                py={2}
                px={4}
                borderRadius="1000px"
                borderTopLeftRadius={
                  message.user?.name == user.name ? '1000px' : '0px'
                }
                alignSelf={
                  message.user?.name == user.name ? 'flex-end' : 'flex-start'
                }
              >
                {message.user?.name != user.name && `${message.user?.name}: `}
                {message.content}
              </Text>
            ))}
          </Flex>
          <Flex
            w="15%"
            px={5}
            flexDirection="column"
            alignItems="center"
            pt={5}
          >
            <Text>Users Online: {userList.length}</Text>
            {userList.map((user: any) => (
              <Text key={user.id}>{user.name}</Text>
            ))}
          </Flex>
        </Flex>

        <Flex alignItems="self-start" alignSelf="center" w="70%">
          <Input
            ref={inputRef}
            value={text}
            onChange={(event) => setText(event.target.value)}
            marginRight={10}
            placeholder="Escreva algo..."
          />
          <Button colorScheme="teal" onClick={sendMessage}>
            Enviar
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export { Chat };
