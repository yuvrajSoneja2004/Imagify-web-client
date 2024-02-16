'use client';
import { useAppSelector } from '@/redux/store';
import { Avatar, Box, Button, Flex, Stack, Text, useComputedColorScheme } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {};

function page({}: Props) {
  const userID = useAppSelector((state) => state.authSlice.value.userid);
  const [historyList, setHistoryList] = useState([]);
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const getHistory = async () => {
    try {
      const { data } = await axios.get(`/api/addHistory?id=${userID}`);

      console.log(data);
      if (data?.res) {
        setHistoryList(data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);
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
        {historyList.length === 0
          ? 'No recent conversations'
          : historyList.map((profile: { charId: string }, index) => {
              return (
                <Link
                  key={index}
                  href={`/chat?id=${profile?.charId}`}
                  style={{
                    textDecoration: 'none',
                    color: colorScheme === 'dark' ? '#ffffff' : '#000000',
                  }}
                >
                  <Flex align={'start'} gap={10}>
                    <Avatar size={55} src={profile?.charAvatar} />
                    <Text fw={500}>{profile?.charName}</Text>
                  </Flex>
                </Link>
              );
            })}
      </Stack>
    </Box>
  );
}

export default page;
