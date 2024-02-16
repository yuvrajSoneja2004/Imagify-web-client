'use client';
import { useChatScroll } from '@/hooks/useChatScroll';
import { addMessage, clearConversation } from '@/redux/features/currentConversation';
import { ActionIcon, Avatar, Box, Flex, Stack, Text, TextInput, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconArrowRight, IconSend, IconSendOff } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  params: {
    id: number;
  };
};

function ChatBody({ params }: Props) {
  const [textInput, setTextInput] = useState<String>('');
  const [isBeingSent, setIsBeingSent] = useState<boolean>(false);
  const [chats, setChats] = useState([]);
  const [isFirstMessage, setIsFirstMessage] = useState<boolean>(true);
  const ref = useChatScroll(chats);
  const dispatch = useDispatch();

  const checkEnterKey = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = async () => {
    setIsBeingSent(true);
    // Storing to global
    dispatch(
      addMessage({
        character: {
          cName: 'Current User',
          cAvatar: 'htis is the avatar src',
        },
        msg: textInput,
        role: 'user',
      })
    );
    try {
      if (textInput.length === 0) {
        alert('Dont send empty text');
      }
      setChats((prev) => [
        ...prev,
        {
          character: {
            cName: 'Current User',
            cAvatar: 'htis is the avatar src',
          },
          msg: textInput,
          role: 'user',
        },
      ]);
      setTextInput('');

      const { data } = await axios.post('/api/chat', {
        reqMsg: textInput,
        characterID: params?.id,
        isFirstMSG: isFirstMessage,
      });
      if (data?.res) {
        // Curse detection
        const endDetectionRx = /{false}/g;

        if (endDetectionRx.test(data?.msg?.toLowerCase())) {
          console.log('Saale gali mat de');
          notifications.show({
            title: 'Cursing is not allowed!',
            message: 'Hey there, your code is awesome! 🤥',
          });
        }
        setIsFirstMessage(false);
        const { responseGPT } = data;
        console.log(responseGPT);
        setChats((prev) => [...prev, responseGPT]);
        dispatch(addMessage(responseGPT));
      }
    } catch (error) {
      console.log(error, 'chaterror');
    } finally {
      setIsBeingSent(false);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup function to be called when the component unmounts
      dispatch(clearConversation());

      console.log('jagan ');
      // axiosInstance
      //   .post("/clearHistory")
      //   .then((response) => {
      //     console.log(response.data.msg);
      //   })
      //   .catch((error) => {
      //     console.error("Error clearing conversation history:", error);
      //   });
    };
  }, []);

  return (
    <Box ref={ref}>
      <Stack mt={15} h={400} style={{ overflowY: 'scroll' }} gap={30} id="conversation">
        {chats.map((chat, index) => {
          const {
            msg,
            character: { cName, cAvatar },
          } = chat;

          return (
            <Flex key={index} align={'start'} gap={10}>
              <Avatar src={cAvatar} alt="character-avatar" size={40} />
              <Flex direction={'column'}>
                <Text fw={'bold'}>{cName}</Text>
                <Text>{msg}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Stack>
      <TextInput
        mt={15}
        radius="xl"
        size="md"
        placeholder="Type a message"
        rightSectionWidth={42}
        onKeyDown={checkEnterKey}
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
        value={textInput as string}
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={'blue'}
            variant="filled"
            onClick={handleSend}
            loading={isBeingSent}
          >
            <IconSend style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        }
      />
    </Box>
  );
}

export default ChatBody;
