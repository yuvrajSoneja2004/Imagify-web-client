'use client';
import ChatBody from '@/components/ChatBody/ChatBody';
import Chatoptions from '@/utils/Chatoptions';
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  CopyButton,
  Flex,
  Modal,
  Text,
  Title,
  em,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconBrandHipchat,
  IconChartPie4,
  IconFriends,
  IconHeart,
  IconShare,
} from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Props = {
  searchParams: {
    id: number;
  };
};

function page({ searchParams }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [characterInfo, setCharacterInfo] = useState([]);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/chat?id=${searchParams?.id}`);

      if (data?.res) {
        const { charData } = data;
        setCharacterInfo(charData);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container mt={20} mb={20}>
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
          This will <strong>not share</strong> your convertions
        </Text>
        <Center pt={20} pb={20}>
          <Flex align={'center'} gap={10} direction={!isMobile ? 'row' : 'column'}>
            <Box bg={'#3B3B3B'} p={10}>
              <Text>{window.location.href}</Text>
            </Box>
            <CopyButton value={window.location.href}>
              {({ copied, copy }) => (
                <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                  {copied ? 'Copied url' : 'Copy url'}
                </Button>
              )}
            </CopyButton>
          </Flex>
        </Center>
      </Modal>
      <Flex align={'start'} justify={'space-between'}>
        <Flex direction={'column'}>
          <Flex align={'center'} gap={10}>
            <Avatar src={characterInfo?.avatar} alt="character-avatar" />
            <Text fw={'bold'}>{characterInfo?.name}</Text>
            <Flex align={'center'}>
              <IconBrandHipchat size={14} />
              <Text ml={2}>{characterInfo?.currentlyOnline}</Text>
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
          <Button variant="outline" leftSection={<IconHeart size={20} />} w={90} mt={15}>
            {characterInfo?.likes}
          </Button>
        </Flex>
        <Flex align={'center'} gap={10}>
          <IconShare size={20} onClick={open} cursor={'pointer'} />
          {/* on utils.Chatoptions.tsx */}
          <Chatoptions />
        </Flex>
      </Flex>
      {/* Chat Body  */}
      <ChatBody params={searchParams} />
    </Container>
  );
}

export default page;
