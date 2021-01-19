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

  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.on('user_list', (data: any) => {
      console.log(data);
    });

    socket.on('message', (data: any) => {
      console.log(data);

      const messageArray = messages;
      messageArray.push(data);
      setMessages(messageArray);
    });

    socket.on('offline', (data: any) => {
      console.log(data);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('message', { user, content: text });

    setText('');
  };

  const handleLogoff = () => {
    socket.disconnect();
    history.goBack();
  };

  return (
    <Layout>
      <Button colorScheme="teal" alignSelf="start" onClick={handleLogoff}>
        Fazer Logoff
      </Button>

      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Heading>Chat Screen</Heading>

        {messages.map((message) => (
          <Text key={message.id}>{message.content}</Text>
        ))}
      </Flex>

      <Input value={text} onChange={(event) => setText(event.target.value)} />
      <Button onClick={sendMessage}>Enviar</Button>
    </Layout>
  );
};

export { Chat };
