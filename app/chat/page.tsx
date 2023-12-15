'use client';
// Importing required modules and components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  CopyButton,
  Flex,
  Loader,
  Modal,
  Text,
  Title,
  em,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconBrandHipchat, IconFriends, IconHeart, IconShare } from '@tabler/icons-react';
import ChatBody from '@/components/ChatBody/ChatBody';
import Chatoptions from '@/utils/Chatoptions';
import { useAppSelector } from '@/redux/store';

// Type definition for character information
interface CharacterInfo {
  avatar: string;
  name: string;
  currentlyOnline: string;
  createdBy: {
    username: string;
  };
  likes: number;
}

// Type definition for component props
interface Props {
  searchParams: {
    id: number;
  };
}

// Functional component for the chat page
function ChatPage({ searchParams }: Props) {
  // State and hook variables
  const [opened, { open, close }] = useDisclosure(false);
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [clientSideLikes, setClientSideLikes] = useState([]);

  const userID = useAppSelector((state) => state.authSlice.value.userid);

  // Function to fetch data
  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/chat?id=${searchParams?.id}`);

      if (data?.res) {
        const { charData } = data;
        setClientSideLikes(charData?.likes?.length);
        setCharacterInfo(charData);
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to Like / Unlike bot
  const handleLike = async () => {
    setIsLikeLoading(true);
    try {
      const { data } = await axios.post(`/api/like`, {
        userId: userID,
        botId: searchParams?.id,
      });

      if (data?.res) {
        setClientSideLikes((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const addView = async () => {
    try {
      const { data } = await axios.post('/api/addView', {
        userId: userID,
        botId: searchParams?.id,
      });

      console.log(data, 'views');
    } catch (error) {
      console.log(error);
    }
  };

  const addHistory = async () => {
    try {
      const { data } = await axios.post('/api/addHistory', {
        userId: userID,
        botInfo: {
          botId: searchParams?.id,
          botName: characterInfo?.name,
          botAvatar: characterInfo?.avatar,
        },
      });

      console.log(data, 'history');
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    getData();
    addView();
    addHistory();
  }, [searchParams?.id]);

  // return loading component if server is yet to respond
  if (isLoading) {
    return <Loader color="blue" />;
  }

  // JSX structure for the component
  return (
    <Container mt={20} mb={20}>
      {/* Share Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Flex align={'center'} gap={5}>
            <IconFriends />
            <Title order={3}>Share</Title>
          </Flex>
        }
        centered
        size={'lg'}
      >
        <Text>
          This will <strong>not share</strong> your conversations.
        </Text>
        <Center pt={20} pb={20}>
          <Flex align={'center'} gap={10} direction={!isMobile ? 'row' : 'column'}>
            <Box bg={'#3B3B3B'} p={10}>
              <Text>{window.location.href}</Text>
            </Box>
            <CopyButton value={window.location.href}>
              {({ copied, copy }) => (
                <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                  {copied ? 'Copied URL' : 'Copy URL'}
                </Button>
              )}
            </CopyButton>
          </Flex>
        </Center>
      </Modal>

      {/* Character Information Section */}
      <Flex align={'start'} justify={'space-between'}>
        <Flex direction={'column'}>
          <Flex align={'center'} gap={10}>
            <Avatar src={characterInfo?.avatar} alt="character-avatar" />
            <Text fw={'bold'}>{characterInfo?.name}</Text>
            <Flex align={'center'}>
              <IconBrandHipchat size={14} />
              <Text ml={2}>{characterInfo?.views?.length}</Text>
            </Flex>
          </Flex>
          <Flex align={'center'} gap={6}>
            <Text c={'dimmed'} fz={13}>
              created by
            </Text>
            <Text c={'white'} fz={13}>
              @
              {characterInfo?.createdBy?.username === ''
                ? 'NOT_DEFINED'
                : characterInfo?.createdBy?.username}
            </Text>
          </Flex>
          <Button
            variant="outline"
            leftSection={<IconHeart size={20} />}
            w={90}
            mt={15}
            loading={isLikeLoading}
            onClick={handleLike}
          >
            {clientSideLikes}
          </Button>
        </Flex>

        {/* Share and Chat options Section */}
        <Flex align={'center'} gap={10}>
          <IconShare size={20} onClick={open} cursor={'pointer'} />
          <Chatoptions />
        </Flex>
      </Flex>

      {/* Chat Body Section */}
      <ChatBody params={searchParams} />
    </Container>
  );
}

export default ChatPage;
