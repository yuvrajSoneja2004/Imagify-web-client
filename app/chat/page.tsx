import ChatBody from '@/components/ChatBody/ChatBody';
import { Button, Container, Flex, Text } from '@mantine/core';
import {
  IconBrandHipchat,
  IconDotsVertical,
  IconHeart,
  IconHeartFilled,
  IconShare,
} from '@tabler/icons-react';
import React from 'react';

type Props = {
  searchParams: {
    id: number;
  };
};

function page({ searchParams }: Props) {
  return (
    <Container mt={20} mb={20}>
      <Flex align={'start'} justify={'space-between'}>
        <Flex direction={'column'}>
          <Flex align={'center'} gap={10}>
            <Text fw={'bold'}>Elon Musk</Text>
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
          <IconShare size={20} />
          <IconDotsVertical size={20} />
        </Flex>
      </Flex>
      {/* Chat Body  */}
      <ChatBody />
    </Container>
  );
}

export default page;
