import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Text, Flex, Heading, Button, Input } from '@chakra-ui/react';

import { userState } from '../context/atoms';
import { socket } from '../services/socket';

import { Layout } from '../components/Layout';

const Chat: React.FC = () => {
  const history = useHistory();

  const [user, setUser] = useRecoilState(userState);
  const [userList, setUserList] = useState<any>([]);

  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.on('user_list', (data: any) => {
      setUserList(data);
    });

    socket.on('message', (data: any) => {
      if (messages.length < 1 || messages.some((msg) => msg.id == data.id)) {
        setMessages((oldArray) => [...oldArray, data]);
      }
    });

    socket.on('offline', (data: any) => {
      setUserList((userList: any[]) =>
        userList.filter((user: any) => user.id !== data)
      );
    });
  }, []);

  const sendMessage = () => {
    if (text) {
      socket.emit('message', { user, content: text });
    }

    setText('');
  };

  const handleLogoff = () => {
    socket.disconnect();
    history.goBack();
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

        <Flex w="100%">
          <Flex w="15%"></Flex>
          <Flex
            borderTop="2px"
            borderColor="teal.400"
            alignItems="self-start"
            flexDirection="column"
            w="70%"
            h="50vh"
            my={5}
            overflowY="auto"
          >
            {messages.map((message) => (
              <Text key={message.id} fontSize={20}>
                {message.user?.name}: {message.content}
              </Text>
            ))}
          </Flex>
          <Flex w="15%" px={5} flexDirection="column" alignItems="center">
            <Text>Users Online: {userList.length}</Text>
            {userList.map((user: any) => (
              <Text key={user.id}>{user.name}</Text>
            ))}
          </Flex>
        </Flex>

        <Flex alignItems="self-start" alignSelf="center" w="70%">
          <Input
            value={text}
            onChange={(event) => setText(event.target.value)}
            marginRight={10}
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
