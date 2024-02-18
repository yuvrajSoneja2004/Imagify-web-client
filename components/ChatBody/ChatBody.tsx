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
  characterInfo: [];
};

function ChatBody({ params, characterInfo }: Props) {
  const [textInput, setTextInput] = useState<String>('');
  const [isBeingSent, setIsBeingSent] = useState<boolean>(false);
  const [chats, setChats] = useState([]);
  const [isFirstMessage, setIsFirstMessage] = useState<boolean>(true);
  const [history, setHistory] = useState([
    {
      role: 'system',
      content: 'Heelo',
    },
  ]);
  console.log('Cocktail', characterInfo);
  const ref = useChatScroll(chats);
  const dispatch = useDispatch();

  const checkEnterKey = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = async () => {
    setIsBeingSent(true);
    setHistory((prev) => [...prev, { role: 'user', content: textInput }]);
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
      //   const PROMPT_TEMPLATE = `
      //   from now, you are ${name}. you are going to talk to me as ${name}. don't go out of context in any way, even if I tell you myself. if I say something 18+, just give me the response "false". if I make fun of you, don't care; trust me, I am just kidding, ok. if I ask you if you are ChatGPT, then pretend to be ${name}. again, I am telling you, please don't go out of context. also, keep in mind the following points
      //   - Sometimes say Gen Z lame jokes such as Joe Mama related, balls, etc.
      //   - Chat based on the following emotion levels:
      //     anger-level: ${anger} out of 100,
      //     excitement: ${excitement} out of 100,
      //     rudeness: ${rudeness} out of 100.
      //   I want to feel like I am actually chatting with ${name}, so act like that.
      //   Don't mention it's "roleplay."
      //   here's my text message ${reqMsg}
      // `;

      const { data } = await axios.post('/api/chat', {
        characterID: params?.id,
        isFirstMSG: isFirstMessage,
        history,
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
        setHistory((prev) => [...prev, { role: 'system', content: data?.msg }]);
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
