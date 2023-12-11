import { Avatar, Box, Button, Flex, Stack, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

type Props = {};

function page({}: Props) {
  return (
    <Box p={20}>
      <Flex align={'center'} gap={15}>
        <Text fw={'bold'} fz={18}>
          Continue Chatting
        </Text>
        <Button variant="outline" leftSection={<IconTrash size={17} />} disabled>
          Clear History
        </Button>
      </Flex>
      {/* List of recent conversations (get data via API) */}
      <Stack mt={20}>
        <Link href={`/chat?id=123`} style={{ textDecoration: 'none', color: '#fff' }}>
          <Flex align={'start'} gap={10}>
            <Avatar size={55} />
            <Text fw={500}>Elon Musk</Text>
          </Flex>
        </Link>
      </Stack>
    </Box>
  );
}

export default page;