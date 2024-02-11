'use client';
import { useAppSelector } from '@/redux/store';
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Input,
  Modal,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import html2canvas from 'html2canvas';
import React, { useState } from 'react';
import { ScrollArea } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type FeedShareModelProps = {
  opened: boolean;
  close: () => void;
  feedImg: string;
};

function FeedShareModel({ opened, close, feedImg }: FeedShareModelProps): JSX.Element {
  const [postTitle, setPostTitle] = useState<String>('');
  const [isBeingPosted, setIsBeingPosted] = useState<boolean>(false);
  const router = useRouter();
  const username = useAppSelector((state) => state.authSlice.value.username);

  const { currentConversation } = useAppSelector((state) => state);
  const handlePost = async () => {
    try {
      setIsBeingPosted(true);
      if (postTitle.length === 0) {
        alert('Enter title for the post');
      } else {
        const { data } = await axios.post('/api/postFeed', {
          postDesc: postTitle,
          conversation: currentConversation,
          userName: username,
          userAvatar: 'user?.photoURL',
        });

        if (data?.res) {
          router.push('/feed');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsBeingPosted(false);
    }
  };

  // TODO: Have to remove this function 'captureConversation'
  const captureConversation = async () => {
    const conversationElement = document.getElementById('conversation'); // Replace 'conversation' with the actual ID or class of your conversation container
    const canvas = await html2canvas(conversationElement as HTMLElement);
    const conversationImage = canvas.toDataURL('image/png');
    // Now, you can send conversationImage to your back end or use it as needed
    console.log('first', conversationImage);
  };

  console.log('There is no easy way out man', currentConversation);

  return (
    <Modal opened={opened} onClose={close} title="" centered fullScreen>
      <Container>
        <Center>
          <Flex align={'center'} justify={'center'} direction={'column'} gap={10} w={800}>
            <Title>Create a Post..</Title>
            <Text fs={'italic'}>
              Following is your conversation image which will be posted on the feed.
            </Text>
            <ScrollArea
              h={300}
              w={460}
              scrollbarSize={10}
              type="always"
              offsetScrollbars
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {currentConversation.map((chat, index) => {
                const {
                  character: { cName, cAvatar },
                  msg,
                } = chat;

                return (
                  <div>
                    <Flex key={index} align={'start'} gap={10} mt={15} mb={15}>
                      <Avatar src={cAvatar} alt="character-avatar" size={40} />
                      <Flex direction={'column'}>
                        <Text fw={'bold'}>{cName}</Text>
                        <Text>{msg}</Text>
                      </Flex>
                    </Flex>
                  </div>
                );
              })}
            </ScrollArea>
            <Box w={'100%'}>
              <TextInput
                type="text"
                label="Enter title"
                placeholder="Enter title here"
                onChange={(e) => {
                  setPostTitle(e.target.value);
                }}
                value={postTitle as String}
              />
            </Box>
            <Flex align={'end'} gap={20}>
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button variant="filled" onClick={handlePost} loading={isBeingPosted}>
                Post
              </Button>
            </Flex>
          </Flex>
        </Center>
      </Container>
    </Modal>
  );
}

export default FeedShareModel;
