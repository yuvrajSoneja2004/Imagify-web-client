'use client';

import React from 'react';
import { useAppSelector } from '@/redux/store';
import { Avatar, Box, Center, Flex, Title } from '@mantine/core';
import { Stack } from 'react-bootstrap';

function page() {
  const { avatarURI, username } = useAppSelector((state) => state.authSlice.value);

  return (
    <Center h={'100vh'}>
      <Box>
        <Flex direction={'column'} gap={20} justify={'center'} align={'center'}>
          <Avatar src={avatarURI} alt="PROFILE_AVATAR" size={100} />
          <Title order={2}>{username ? username : 'fuck'}</Title>
        </Flex>
      </Box>
    </Center>
  );
}

export default page;
