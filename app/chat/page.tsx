'use client';
import ChatBody from '@/components/ChatBody/ChatBody';
import Chatoptions from '@/utils/Chatoptions';
import { Box, Button, Center, Container, CopyButton, Flex, Modal, Text, em } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconBrandHipchat, IconHeart, IconShare } from '@tabler/icons-react';
import React from 'react';

type Props = {
  searchParams: {
    id: number;
  };
};

function page({ searchParams }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Container mt={20} mb={20}>
      <Modal opened={opened} onClose={close} title="Share Character" centered size={'lg'}>
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
            <Text fw={'bold'}>{searchParams?.id}</Text>
            <Flex align={'center'}>
              <IconBrandHipchat size={14} />
              <Text ml={2}>22m</Text>
            </Flex>
          </Flex>
          <Flex align={'center'} gap={6}>
            <Text c={'dimmed'} fz={13}>
              created by
            </Text>
            <Text c={'white'} fz={13}>
              @examplename
            </Text>
          </Flex>
          <Button variant="outline" leftSection={<IconHeart size={20} />} w={90} mt={15}>
            122
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
